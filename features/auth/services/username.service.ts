import { prisma } from "@/lib/prisma"

const RESERVED_USERNAMES = [
  "admin",
  "root",
  "api",
  "support",
  "help",
  "settings",
  "dashboard",
  "login",
  "signup",
  "register",
  "portlix",
  "www",
  "mail",
  "docs",
  "blog",
]

export async function isUsernameAvailable(
  username: string
) {
  const normalizedUsername =
    username
      .trim()
      .toLowerCase()

  if (
    RESERVED_USERNAMES.includes(
      normalizedUsername
    )
  ) {
    return false
  }

  const existing =
    await prisma.user.findUnique({
      where: {
        username:
          normalizedUsername,
      },
      select: {
        id: true,
      },
    })

  return !existing
}