import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

import { isUsernameAvailable } from "@/features/auth/services/username.service"

export async function GET(
  request: NextRequest
) {
  const username =
    request.nextUrl.searchParams.get(
      "username"
    )

  if (!username || username.length < 3) {
    return NextResponse.json({
      available: false,
    })
  }

  const available =
    await isUsernameAvailable(username)

  return NextResponse.json({
    available,
  })
}