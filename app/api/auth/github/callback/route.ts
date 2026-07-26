import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth/get-current-user"
import { sendNotificationEmail } from "@/lib/email/email.service"
import { encrypt } from "@/lib/encryption"

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

  if (!code) {
    return NextResponse.redirect(`${appUrl}/dashboard?error=missing_code`)
  }

  try {
    const clientId = (process.env.PORTFLIX_GITHUB_CLIENT_ID ?? process.env.GITHUB_CLIENT_ID)?.trim()
    const clientSecret = (process.env.PORTFLIX_GITHUB_CLIENT_SECRET ?? process.env.GITHUB_CLIENT_SECRET)?.trim()

    if (!clientId || !clientSecret) {
      throw new Error("PORTFLIX_GITHUB keys are not configured in environment variables")
    }

    // 1. Exchange OAuth code for Access Token
    const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: `${appUrl}/api/auth/github/callback`,
      }),
    })

    if (!tokenResponse.ok) {
      throw new Error("Failed to exchange code for GitHub access token")
    }

    const tokenData = await tokenResponse.json()
    const accessToken = tokenData.access_token

    if (!accessToken) {
      throw new Error(tokenData.error_description || "AccessToken exchange returned empty token")
    }

    // 2. Fetch authenticated GitHub user details
    const userResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "User-Agent": "portflix-identity-linker",
      },
    })

    if (!userResponse.ok) {
      throw new Error("Failed to fetch verified user details from GitHub profile API")
    }

    const githubUser = await userResponse.json()
    const verifiedUsername = githubUser.login
    const githubUrl = `https://github.com/${verifiedUsername}`

    // 3. Get currently logged in Portflix user
    const currentUser = await getCurrentUser()
    if (!currentUser?.dbUser) {
      return NextResponse.redirect(`${appUrl}/login?error=unauthorized`)
    }

    // 4. Update Prisma User and Portfolio records
    await prisma.$transaction([
      prisma.user.update({
        where: { id: currentUser.dbUser.id },
        data: {
          githubUsername: verifiedUsername,
          githubAccessToken: encrypt(accessToken),
        },
      }),
      prisma.portfolio.update({
        where: { userId: currentUser.dbUser.id },
        data: {
          githubUrl,
        },
      }),
    ])

    // 5. Send Connection Email Alert (GitHub email fallback to Portflix login email)
    const recipientEmail = githubUser.email || currentUser.dbUser.email

    if (recipientEmail) {
      try {
        await sendNotificationEmail({
          to: recipientEmail,
          subject: "Security Notification: GitHub Account Connected to Portflix",
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
              <h2 style="color: #06b6d4;">GitHub Account Linked</h2>
              <p>Hello Developer,</p>
              <p>This email confirms that your GitHub account (<strong>@${verifiedUsername}</strong>) has been successfully connected to your Portflix profile.</p>
              <p>Your sync pipeline is now active, and repositories will automatically populate and score on your portfolio.</p>
              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
              <p style="font-size: 12px; color: #6b7280;">If you did not authorize this change, please log in immediately and disconnect the account from your dashboard settings.</p>
            </div>
          `,
        })
      } catch (err) {
        console.error("Failed to send link email alert during callback:", err)
      }
    }

    return NextResponse.redirect(`${appUrl}/dashboard?github=connected`)
  } catch (error) {
    console.error("[GITHUB_OAUTH_CALLBACK_ERROR]", error)
    const errorMessage = error instanceof Error ? encodeURIComponent(error.message) : "oauth_error"
    return NextResponse.redirect(`${appUrl}/dashboard?error=${errorMessage}`)
  }
}
