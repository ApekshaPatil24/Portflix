import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth/get-current-user"
import { generateAIAvatar } from "@/lib/ai/generate-avatar"

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser?.dbUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const portfolio = await prisma.portfolio.findUnique({
      where: { userId: currentUser.dbUser.id },
    })

    if (!portfolio) {
      return NextResponse.json({ error: "Portfolio not found" }, { status: 404 })
    }

    const body = await request.json().catch(() => ({}))
    const { forceRegenerate } = body || {}

    // Validation: If avatar already assigned and forceRegenerate is false, ask for confirmation
    if (portfolio.avatarUrl && !forceRegenerate) {
      return NextResponse.json(
        { 
          error: "AI Avatar is already assigned to your profile.", 
          code: "AVATAR_ALREADY_EXISTS",
          avatarUrl: portfolio.avatarUrl 
        }, 
        { status: 400 }
      )
    }

    // Call DALL-E / Gemini to generate avatar based on professional title and username
    const avatarUrl = await generateAIAvatar(portfolio.professionalTitle || "Developer", portfolio.username)

    // Update Prisma
    const updatedPortfolio = await prisma.portfolio.update({
      where: { id: portfolio.id },
      data: { avatarUrl },
    })

    return NextResponse.json({
      message: "Avatar generated successfully",
      avatarUrl: updatedPortfolio.avatarUrl,
    })
  } catch (error: any) {
    console.error("[AVATAR_GENERATION_ERROR]", error)
    return NextResponse.json(
      { error: error?.message || "Failed to generate avatar" },
      { status: 500 }
    )
  }
}
