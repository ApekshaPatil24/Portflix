import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

import { handleOAuthCallback } from "@/features/auth/services/auth.service"

export async function GET(
  request: NextRequest
) {
  const { searchParams, origin } =
    new URL(request.url)

  const code =
    searchParams.get("code") ?? ""

  const result =
    await handleOAuthCallback(
      code,
      origin
    )

  return NextResponse.redirect(
    result.redirectTo
  )
}