import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth/get-current-user"
import { decrypt } from "@/lib/encryption"
import { analyzeRepoWithAI } from "@/lib/ai/analyze-repo"

export async function POST() {
  try {
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

    if (!user.githubAccessToken) {
      return NextResponse.json({ error: "GitHub account not connected" }, { status: 400 })
    }

    const accessToken = decrypt(user.githubAccessToken)

    // 1. Fetch user's public repositories (limit to 5 most recently updated to save time/tokens)
    const reposResponse = await fetch(
      "https://api.github.com/user/repos?type=owner&sort=updated&per_page=5",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    )

    if (!reposResponse.ok) {
      throw new Error("Failed to fetch repositories from GitHub")
    }

    const repos = await reposResponse.json()

    const syncedProjects = []

    // 2. Process each repository
    for (const repo of repos) {
      if (repo.fork) continue // Skip forks

      let readmeContent = null
      let languages: string[] = []
      
      try {
        const readmeRes = await fetch(`https://api.github.com/repos/${repo.full_name}/readme`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/vnd.github.v3.raw", 
          },
        })
        if (readmeRes.ok) {
          readmeContent = await readmeRes.text()
        }

        const langRes = await fetch(`https://api.github.com/repos/${repo.full_name}/languages`, {
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
        console.error(`Failed to fetch repo data for ${repo.name}`, err)
      }

      // 3. Analyze with AI
      const aiAnalysis = await analyzeRepoWithAI(repo.name, repo.description, readmeContent, languages)

      // 4. Save to database (Upsert based on title matching, or just create new if not exists)
      // Since we don't have a unique githubRepoId in Project, we'll try to find by title.
      const existingProject = await prisma.project.findFirst({
        where: {
          portfolioId: user.portfolio.id,
          title: repo.name,
        },
      })

      let project
      if (existingProject) {
        project = await prisma.project.update({
          where: { id: existingProject.id },
          data: {
            description: aiAnalysis.description,
            techStack: aiAnalysis.techStack,
          },
        })
      } else {
        project = await prisma.project.create({
          data: {
            portfolioId: user.portfolio.id,
            title: repo.name,
            description: aiAnalysis.description,
            techStack: aiAnalysis.techStack,
          },
        })
      }

      syncedProjects.push(project)
    }

    return NextResponse.json({
      message: "Successfully synchronized projects",
      projects: syncedProjects,
    })
  } catch (error) {
    console.error("[PROJECTS_SYNC_ERROR]", error)
    return NextResponse.json(
      { error: "Failed to synchronize projects" },
      { status: 500 }
    )
  }
}
