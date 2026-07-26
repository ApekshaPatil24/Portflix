import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth/get-current-user"
import { analyzePortfolio } from "@/lib/ai/portfolio-advisor"

export async function GET() {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser?.dbUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
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

    const suggestions = await analyzePortfolio(portfolio, portfolio.projects)

    return NextResponse.json({ suggestions })
  } catch (error: any) {
    console.error("[PORTFOLIO_AUDIT_ERROR]", error)
    return NextResponse.json(
      { error: "Failed to audit portfolio" },
      { status: 500 }
    )
  }
}
