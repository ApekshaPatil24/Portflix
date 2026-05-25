import { prisma } from "@/lib/prisma"

export async function isUsernameAvailable(
  username: string
) {
  const existing = await prisma.user.findUnique({
    where: {
      username: username.toLowerCase(),
    },
    select: {
      id: true,
    },
  })

  return !existing
}