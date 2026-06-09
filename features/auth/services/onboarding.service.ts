import { prisma } from "@/lib/prisma"
import { createClient } from "@/lib/supabase/server"

import { onboardingSchema } from "../validations/onboarding.schema"

export async function onboardUser(
  body: unknown
) {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    throw new Error("Unauthorized")
  }

  const validation =
    onboardingSchema.safeParse(body)

  if (!validation.success) {
    throw new Error("Invalid form data")
  }

  const {
    username,
    tagline,
    skills,
  } = validation.data

  const normalizedUsername =
    username.toLowerCase().trim()

  /*
   * Prevent duplicate onboarding
   */
  const existingSupabaseUser =
    await prisma.user.findUnique({
      where: {
        supabaseId: user.id,
      },
      select: {
        id: true,
      },
    })

  if (existingSupabaseUser) {
    throw new Error(
      "User has already completed onboarding"
    )
  }

  /*
   * Prevent duplicate usernames
   */
  const existingUsername =
    await prisma.user.findUnique({
      where: {
        username: normalizedUsername,
      },
      select: {
        id: true,
      },
    })

  if (existingUsername) {
    throw new Error(
      "This username is already taken"
    )
  }

  const metadata =
    user.user_metadata ?? {}

  const email =
    user.email?.trim() ?? ""

  const name =
    metadata.full_name?.trim() ??
    metadata.name?.trim() ??
    normalizedUsername

  const avatarUrl =
    metadata.avatar_url ?? null

  const githubUsername =
    metadata.user_name?.trim() ??
    null

  const githubUrl =
    githubUsername
      ? `https://github.com/${githubUsername}`
      : null

  const newUser =
    await prisma.user.create({
      data: {
        supabaseId: user.id,
        email,
        username:
          normalizedUsername,
        name,
        avatarUrl,
        tagline:
          tagline?.trim() ?? null,
        skills,
        githubUsername,
        githubUrl,
      },
    })

  return {
    success: true,
    username: newUser.username,
  }
}