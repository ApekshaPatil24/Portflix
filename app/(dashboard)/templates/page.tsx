import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/auth/get-current-user"
import { prisma } from "@/lib/prisma"
import TemplatesPage from "@/features/templates/templates-page"

export const metadata = {
  title: "Portfolio Templates | Portflix",
  description: "Choose a beautiful template for your portfolio",
}

export default async function TemplatesRoute() {
  const currentUser = await getCurrentUser()
  if (!currentUser?.dbUser) redirect("/login")

  const portfolio = await prisma.portfolio.findUnique({
    where: { userId: currentUser.dbUser.id },
    select: { username: true },
  })

  if (!portfolio) redirect("/portfolio")

  return <TemplatesPage username={portfolio.username} />
}
