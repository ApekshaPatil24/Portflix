import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth/get-current-user"
import { sendNotificationEmail } from "@/lib/email/email.service"

export async function POST() {
  try {
    // 1. Get currently authenticated user
    const currentUser = await getCurrentUser()
    if (!currentUser?.dbUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { email, githubUsername } = currentUser.dbUser

    if (!githubUsername) {
      return NextResponse.json(
        { error: "No GitHub profile is connected" },
        { status: 400 }
      )
    }

    let recipientEmail = email

    try {
      const clientId = process.env.GITHUB_CLIENT_ID?.trim()
      const clientSecret = process.env.GITHUB_CLIENT_SECRET?.trim()
      const headers: Record<string, string> = {
        "User-Agent": "portflix-identity-verifier",
        Accept: "application/json",
      }
      if (clientId && clientSecret) {
        const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64")
        headers["Authorization"] = `Basic ${credentials}`
      }

      const githubResponse = await fetch(
        `https://api.github.com/users/${encodeURIComponent(githubUsername)}`,
        { headers }
      )
      if (githubResponse.ok) {
        const userData = await githubResponse.json()
        if (userData.email) {
          recipientEmail = userData.email
        }
      }
    } catch (err) {
      console.error("[FETCH_GITHUB_EMAIL_DISCONNECT_ERROR]", err)
    }

    // 2. Clear PostgreSQL user and portfolio records
    await prisma.$transaction([
      prisma.user.update({
        where: { id: currentUser.dbUser.id },
        data: {
          githubUsername: null,
        },
      }),
      prisma.portfolio.update({
        where: { userId: currentUser.dbUser.id },
        data: {
          githubUrl: null,
        },
      }),
    ])

    // 3. Send email notification
    await sendNotificationEmail({
      to: recipientEmail,
      subject: "Security Alert: GitHub Disconnected from Portflix",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h2 style="color: #ef4444;">GitHub Account Disconnected</h2>
          <p>Hello Developer,</p>
          <p>This is a security alert confirming that your GitHub account (<strong>@${githubUsername}</strong>) has been successfully disconnected from your Portflix profile.</p>
          <p>Your sync pipeline is now frozen, and project showcase histories are suspended.</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
          <p style="font-size: 12px; color: #6b7280;">If you did not authorize this change, please log in and reconnect your GitHub profile immediately or contact support.</p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[DISCONNECT_GITHUB_ERROR]", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
