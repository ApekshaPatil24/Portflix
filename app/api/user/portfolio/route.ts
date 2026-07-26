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
      include: {
        projects: {
          orderBy: { updatedAt: "desc" },
        },
      },
    })

    if (!portfolio) {
      return NextResponse.json({ error: "Portfolio not found" }, { status: 404 })
    }

    return NextResponse.json({ portfolio, projects: portfolio.projects })
  } catch (error: any) {
    console.error("[PORTFOLIO_GET_ERROR]", error)
    return NextResponse.json(
      { error: "Failed to fetch portfolio data" },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser?.dbUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { 
      displayName,
      professionalTitle, 
      headline, 
      about, 
      location, 
      skills, 
      githubUrl, 
      linkedinUrl, 
      twitterUrl, 
      websiteUrl 
    } = body

    const updatedPortfolio = await prisma.portfolio.update({
      where: { userId: currentUser.dbUser.id },
      data: {
        displayName,
        professionalTitle,
        headline,
        about,
        location,
        skills,
        githubUrl,
        linkedinUrl,
        twitterUrl,
        websiteUrl
      },
    })

    return NextResponse.json({ 
      message: "Portfolio updated successfully",
      portfolio: updatedPortfolio 
    })
  } catch (error: any) {
    console.error("[PORTFOLIO_PUT_ERROR]", error)
    return NextResponse.json(
      { error: "Failed to update portfolio data" },
      { status: 500 }
    )
  }
}
