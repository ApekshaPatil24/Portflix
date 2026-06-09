import { NextResponse } from "next/server"
import { ZodError } from "zod"

import { createClient } from "@/lib/supabase/server"
import { onboardUser } from "@/features/auth/services/onboarding.service"
import { onboardingSchema } from "@/features/auth/validations/onboarding.schema"

export async function POST(
  request: Request
) {
  try {
    // AUTH FIRST
    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      )
    }

    // THEN VALIDATION
    const body = await request.json()

    const validation =
      onboardingSchema.safeParse(body)

    if (!validation.success) {
      throw validation.error
    }

    const result =
      await onboardUser(validation.data)

    return NextResponse.json(
      result,
      {
        status: 201,
      }
    )

  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: error.flatten(),
        },
        {
          status: 400,
        }
      )
    }

    console.error(
      "[ONBOARD_USER_ERROR]",
      error
    )

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Something went wrong",
      },
      {
        status: 500,
      }
    )
  }
}