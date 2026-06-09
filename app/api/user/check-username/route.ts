import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

import { isUsernameAvailable } from "@/features/auth/services/username.service"
import { onboardingSchema } from "@/features/auth/validations/onboarding.schema"

export async function GET(
  request: NextRequest
) {
  try {
    const username =
      request.nextUrl.searchParams.get(
        "username"
      )

    if (!username) {
      return NextResponse.json(
        {
          available: false,
        },
        {
          status: 400,
        }
      )
    }

    const validation =
      onboardingSchema.shape.username.safeParse(
        username
      )

    if (!validation.success) {
      return NextResponse.json(
        {
          available: false,
        },
        {
          status: 400,
        }
      )
    }

    const available =
      await isUsernameAvailable(
        validation.data
      )

    return NextResponse.json({
      available,
    })
  } catch (error) {
    console.error(
      "[USERNAME_CHECK_ERROR]",
      error
    )

    return NextResponse.json(
      {
        available: false,
      },
      {
        status: 500,
      }
    )
  }
}