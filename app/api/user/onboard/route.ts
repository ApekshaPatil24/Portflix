import { NextResponse } from "next/server"

import { onboardUser } from "@/features/auth/services/onboarding.service"

export async function POST(
  request: Request
) {
  try {
    const body = await request.json()

    const result = await onboardUser(body)

    return NextResponse.json(result, {
      status: 201,
    })

  } catch (error: any) {
    return NextResponse.json(
      {
        error:
          error.message ??
          "Something went wrong",
      },
      {
        status: 400,
      }
    )
  }
}