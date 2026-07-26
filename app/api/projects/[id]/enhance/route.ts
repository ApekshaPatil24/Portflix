import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth/get-current-user"
import { decrypt } from "@/lib/encryption"
import { analyzeRepoWithAI } from "@/lib/ai/analyze-repo"

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const currentUser = await getCurrentUser()
    if (!currentUser?.dbUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: currentUser.dbUser.id },
      include: { portfolio: true },
    })

    if (!user || !user.portfolio) {
      return NextResponse.json({ error: "Portfolio not found" }, { status: 404 })
    }

    if (!user.githubAccessToken || !user.githubUsername) {
      return NextResponse.json({ error: "GitHub account not connected" }, { status: 400 })
    }

    const project = await prisma.project.findUnique({
      where: { id: id },
    })

    if (!project || project.portfolioId !== user.portfolio.id) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    const accessToken = decrypt(user.githubAccessToken)

    const repoFullName = `${user.githubUsername}/${project.title}`
    let readmeContent = null
    let languages: string[] = []
    
    try {
      const readmeRes = await fetch(`https://api.github.com/repos/${repoFullName}/readme`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/vnd.github.v3.raw", 
        },
      })
      if (readmeRes.ok) {
        readmeContent = await readmeRes.text()
      }

      const langRes = await fetch(`https://api.github.com/repos/${repoFullName}/languages`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/vnd.github.v3+json", 
        },
      })
      if (langRes.ok) {
        const langData = await langRes.json()
        languages = Object.keys(langData)
      }
    } catch (err) {
      console.error(`Failed to fetch repo data for ${repoFullName}`, err)
    }

    // 2. Run Curator AI (Gemini) strictly on this one repository
    const aiAnalysis = await analyzeRepoWithAI(project.title, project.description, readmeContent, languages)

    // 3. Update the specific project in the database
    const updatedProject = await prisma.project.update({
      where: { id: project.id },
      data: {
        description: aiAnalysis.description,
        techStack: aiAnalysis.techStack,
      },
    })

    return NextResponse.json({
      message: "Curator AI successfully enhanced the project.",
      project: updatedProject,
    })
  } catch (error: any) {
    console.error("[PROJECT_ENHANCE_ERROR]", error)
    return NextResponse.json(
      { error: error?.message || "Curator AI failed to enhance project" },
      { status: 500 }
    )
  }
}
