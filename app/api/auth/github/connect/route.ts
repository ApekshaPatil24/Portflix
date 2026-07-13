import { NextResponse } from "next/server"

export async function GET() {
  const clientId = (process.env.PORTFLIX_GITHUB_CLIENT_ID ?? process.env.GITHUB_CLIENT_ID)?.trim()
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  const redirectUri = `${appUrl}/api/auth/github/callback`

  if (!clientId) {
    return NextResponse.json(
      { error: "PORTFLIX_GITHUB_CLIENT_ID is not configured in environment variables" },
      { status: 500 }
    )
  }

  // Redirect user to GitHub OAuth consent screen
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${encodeURIComponent(
    clientId
  )}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=read:user`

  return NextResponse.redirect(githubAuthUrl)
}
