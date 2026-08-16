import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth/get-current-user"
import { decrypt } from "@/lib/encryption"
import { analyzeRepoWithAI } from "@/lib/ai/analyze-repo"

// GET: Fetch available repositories from GitHub and categorize into imported vs pending
export async function GET() {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser?.dbUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: currentUser.dbUser.id },
      include: { portfolio: { include: { projects: true } } },
    })

    if (!user || !user.portfolio) {
      return NextResponse.json({ error: "Portfolio not found" }, { status: 404 })
    }

    if (!user.githubAccessToken) {
      return NextResponse.json({ error: "GitHub account not connected" }, { status: 400 })
    }

    const accessToken = decrypt(user.githubAccessToken)

    // Fetch user's public repositories from GitHub
    const reposResponse = await fetch(
      "https://api.github.com/user/repos?type=owner&sort=updated&per_page=30",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    )

    if (reposResponse.status === 401) {
      return NextResponse.json(
        { error: "GitHub token expired. Please reconnect.", code: "GITHUB_TOKEN_EXPIRED" },
        { status: 401 }
      )
    }

    if (!reposResponse.ok) {
      throw new Error("Failed to fetch GitHub repositories")
    }

    const repos = await reposResponse.json()

    // Existing imported projects titles
    const importedTitles = new Set(user.portfolio.projects.map((p) => p.title.toLowerCase()))

    const pendingRepos = []
    const importedRepos = []

    for (const repo of repos) {
      if (repo.fork) continue

      const repoItem = {
        name: repo.name,
        fullName: repo.full_name,
        description: repo.description,
        htmlUrl: repo.html_url,
        updatedAt: repo.updated_at,
        language: repo.language,
        stargazersCount: repo.stargazers_count,
      }

      if (importedTitles.has(repo.name.toLowerCase())) {
        importedRepos.push(repoItem)
      } else {
        pendingRepos.push(repoItem)
      }
    }

    return NextResponse.json({
      pendingRepos,
      importedRepos,
      totalRepos: repos.length,
    })
  } catch (error: any) {
    console.error("[PROJECTS_GET_ERROR]", error)
    return NextResponse.json(
      { error: error?.message || "Failed to fetch repositories" },
      { status: 500 }
    )
  }
}

// POST: Add selected GitHub repository to Portfolio as a project (with AI analysis)
export async function POST(request: Request) {
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

    const body = await request.json()
    const { repoName } = body

    if (!repoName) {
      return NextResponse.json({ error: "Repository name is required" }, { status: 400 })
    }

    // Check if already added
    const existingProject = await prisma.project.findFirst({
      where: {
        portfolioId: user.portfolio.id,
        title: repoName,
      },
    })

    if (existingProject) {
      return NextResponse.json({ message: "Project already added", project: existingProject })
    }

    let description = null
    let readmeContent = null
    let languages: string[] = []

    if (user.githubAccessToken) {
      const accessToken = decrypt(user.githubAccessToken)
      const fullName = `${user.githubUsername}/${repoName}`

      try {
        const repoRes = await fetch(`https://api.github.com/repos/${fullName}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/vnd.github.v3+json",
          },
        })
        if (repoRes.ok) {
          const repoData = await repoRes.json()
          description = repoData.description
        }

        const readmeRes = await fetch(`https://api.github.com/repos/${fullName}/readme`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/vnd.github.v3.raw",
          },
        })
        if (readmeRes.ok) {
          readmeContent = await readmeRes.text()
        }

        const langRes = await fetch(`https://api.github.com/repos/${fullName}/languages`, {
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
        console.error(`Error fetching repo details for ${fullName}:`, err)
      }
    }

    // Analyze with Curator AI
    const aiAnalysis = await analyzeRepoWithAI(repoName, description, readmeContent, languages)

    const newProject = await prisma.project.create({
      data: {
        portfolioId: user.portfolio.id,
        title: repoName,
        description: aiAnalysis.description,
        techStack: aiAnalysis.techStack,
      },
    })

    return NextResponse.json({
      message: "Project successfully added to portfolio!",
      project: newProject,
    })
  } catch (error: any) {
    console.error("[PROJECTS_POST_ERROR]", error)
    return NextResponse.json(
      { error: error?.message || "Failed to add project" },
      { status: 500 }
    )
  }
}