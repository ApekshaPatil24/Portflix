import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth/get-current-user"
import { generatePortfolioSection } from "@/lib/ai/portfolio-advisor"

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser?.dbUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { sectionType } = body

    if (!sectionType) {
      return NextResponse.json({ error: "Missing sectionType" }, { status: 400 })
    }

    const portfolio = await prisma.portfolio.findUnique({
      where: { userId: currentUser.dbUser.id },
      include: {
        projects: {
          orderBy: { updatedAt: "desc" },
        },
      },
    })

    if (!portfolio) {
      return NextResponse.json({ error: "Portfolio not found" }, { status: 404 })
    }

    const generatedText = await generatePortfolioSection(sectionType, portfolio, portfolio.projects)

    return NextResponse.json({ generatedText })
  } catch (error: any) {
    console.error("[PORTFOLIO_AUTOFIX_ERROR]", error)
    return NextResponse.json(
      { error: "Failed to generate portfolio section" },
      { status: 500 }
    )
  }
}
