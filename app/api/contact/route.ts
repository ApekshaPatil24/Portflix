import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { username, recruiterName, company, email, roleType, message } = body || {}

    if (!username || !email || !message) {
      return NextResponse.json(
        { error: "Username, email, and message are required fields" },
        { status: 400 }
      )
    }

    // Find recipient portfolio
    const portfolio = await prisma.portfolio.findUnique({
      where: { username },
      include: { user: true },
    })

    if (!portfolio) {
      return NextResponse.json({ error: "Portfolio not found" }, { status: 404 })
    }

    console.log(`[RECRUITER_INQUIRY_RECEIVED] For @${username} from ${recruiterName} (${company || "N/A"}) <${email}>: ${message}`)

    // Create entry response
    return NextResponse.json({
      success: true,
      message: `Inquiry successfully delivered to ${portfolio.displayName}!`,
    })
  } catch (error: any) {
    console.error("[RECRUITER_INQUIRY_ERROR]", error)
    return NextResponse.json(
      { error: error?.message || "Failed to submit inquiry" },
      { status: 500 }
    )
  }
}
