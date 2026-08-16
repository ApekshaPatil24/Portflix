import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth/get-current-user"

export async function GET() {
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

    const isGithubConnected = !!user.githubUsername

    const integrations = [
      {
        id: "github",
        name: "GitHub Developer OAuth",
        category: "Code Repositories & Commit Sync",
        description: "Connect your GitHub account to sync repos, extract READMEs, and generate AI descriptions.",
        connected: isGithubConnected,
        username: user.githubUsername,
        icon: "github",
        syncFreq: "Realtime Webhook / On-Demand",
        lastSynced: isGithubConnected ? "Just now" : "Never",
      },
      {
        id: "linkedin",
        name: "LinkedIn Professional Profile",
        category: "Social & Professional Signals",
        description: "Link your LinkedIn profile to display verified credentials and professional badges.",
        connected: !!user.portfolio.linkedinUrl,
        username: user.portfolio.linkedinUrl ? "@linkedIn" : null,
        icon: "linkedin",
        syncFreq: "Daily Refresh",
        lastSynced: user.portfolio.linkedinUrl ? "Today" : "Never",
      },
      {
        id: "gemini",
        name: "Google Gemini 1.5 Flash AI",
        category: "Curator AI Core Engine",
        description: "Powers Curator AI analysis, resume scoring, project storytelling, and automated suggestions.",
        connected: true,
        username: "Gemini-Pro-v1.5",
        icon: "cpu",
        syncFreq: "Always Active",
        lastSynced: "Active",
      },
      {
        id: "supabase",
        name: "Supabase SSR Auth & DB",
        category: "Identity & Database Persistence",
        description: "Secures authentication, session management, and encrypted token storage.",
        connected: true,
        username: user.email,
        icon: "database",
        syncFreq: "Realtime",
        lastSynced: "Active",
      },
    ]

    return NextResponse.json({ integrations })
  } catch (error: any) {
    console.error("[INTEGRATIONS_GET_ERROR]", error)
    return NextResponse.json({ error: "Failed to load integrations" }, { status: 500 })
  }
}
