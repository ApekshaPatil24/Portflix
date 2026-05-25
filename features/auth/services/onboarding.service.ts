import { prisma } from "@/lib/prisma"
import { createClient } from "@/lib/supabase/server"

import { onboardingSchema } from "../validations/onboarding.schema"

export async function onboardUser(
  body: unknown
) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  const validation =
    onboardingSchema.safeParse(body)

  if (!validation.success) {
    throw new Error("Invalid form data")
  }

  const { username, tagline, skills } =
    validation.data

  const existingUser =
    await prisma.user.findUnique({
      where: {
        username: username.toLowerCase(),
      },
      select: {
        id: true,
      },
    })

  if (existingUser) {
    throw new Error(
      "This username is already taken"
    )
  }

  const metadata = user.user_metadata

  const email = user.email ?? ""

  const name =
    metadata?.full_name ??
    metadata?.name ??
    username

  const avatarUrl =
    metadata?.avatar_url ?? null

  const githubUsername =
    metadata?.user_name ?? null

  const githubUrl = githubUsername
    ? `https://github.com/${githubUsername}`
    : null

  const newUser = await prisma.user.create({
    data: {
      supabaseId: user.id,
      email,
      username: username.toLowerCase(),
      name,
      avatarUrl,
      tagline,
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