import DashboardPage from "@/features/dashboard/dashboard-page"
import { getCurrentUser } from "@/lib/auth/get-current-user"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"

export default async function Page() {
  const currentUser = await getCurrentUser()

  if (!currentUser?.dbUser) {
    redirect("/login")
  }

  const portfolio = await prisma.portfolio.findUnique({
    where: { userId: currentUser.dbUser.id },
    select: {
      displayName: true,
      username: true,
      skills: true,
    },
  })

  return (
    <DashboardPage
      githubUsername={currentUser.dbUser.githubUsername}
      userEmail={currentUser.dbUser.email}
      displayName={portfolio?.displayName ?? "Developer"}
      username={portfolio?.username ?? "user"}
      skills={portfolio?.skills ?? []}
    />
  )
}
