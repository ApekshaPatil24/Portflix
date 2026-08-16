import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth/get-current-user"

export async function GET() {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser?.dbUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const portfolio = await prisma.portfolio.findUnique({
      where: { userId: currentUser.dbUser.id },
      include: { user: true },
    })

    if (!portfolio) {
      return NextResponse.json({ error: "Portfolio not found" }, { status: 404 })
    }

    return NextResponse.json({
      settings: {
        displayName: portfolio.displayName,
        username: portfolio.username,
        email: portfolio.user.email,
        professionalTitle: portfolio.professionalTitle,
        headline: portfolio.headline,
        location: portfolio.location,
        isAvailable: portfolio.isAvailable,
        visibility: portfolio.visibility,
        templateKey: portfolio.templateKey,
        githubUsername: portfolio.user.githubUsername,
        plan: portfolio.user.plan,
      },
    })
  } catch (error: any) {
    console.error("[SETTINGS_GET_ERROR]", error)
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser?.dbUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { displayName, professionalTitle, headline, location, isAvailable, visibility } = body

    const updatedPortfolio = await prisma.portfolio.update({
      where: { userId: currentUser.dbUser.id },
      data: {
        displayName,
        professionalTitle,
        headline,
        location,
        isAvailable: Boolean(isAvailable),
        visibility,
      },
    })

    return NextResponse.json({
      message: "Settings saved successfully",
      portfolio: updatedPortfolio,
    })
  } catch (error: any) {
    console.error("[SETTINGS_PUT_ERROR]", error)
    return NextResponse.json({ error: "Failed to save settings" }, { status: 500 })
  }
}
