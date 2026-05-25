/* features/auth/services/auth.service.ts

Contains:

exchangeCodeForSession
getUser
existing user check
redirects */

import { createClient } from "@/lib/supabase/server"
import { prisma } from "@/lib/prisma"

export async function handleOAuthCallback(
  code: string,
  origin: string
) {
  if (!code) {
    return {
      redirectTo: `${origin}/login?error=cancelled`,
    }
  }

  const supabase = await createClient()

  // Exchange OAuth code for session
  const { error } =
    await supabase.auth.exchangeCodeForSession(
      code
    )

  if (error) {
    return {
      redirectTo: `${origin}/login?error=auth_failed`,
    }
  }

  // Get authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return {
      redirectTo: `${origin}/login?error=no_user`,
    }
  }

  // Check if user exists in DB
  const existingUser =
    await prisma.user.findUnique({
      where: {
        supabaseId: user.id,
      },
      select: {
        username: true,
      },
    })

  // Existing user → dashboard
  if (existingUser) {
    return {
      redirectTo: `${origin}/dashboard`,
    }
  }

  // New user → onboarding
  return {
    redirectTo: `${origin}/onboarding`,
  }
}