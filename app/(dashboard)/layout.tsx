//FRONTEND: protected pages (has sidebar)
//sidebar + topbar wrapper for ALL dashboard pages
import { redirect } from "next/navigation"

import { getCurrentUser } from "@/lib/auth/get-current-user"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser =
    await getCurrentUser()

  // Not logged in
  if (!currentUser?.authUser) {
    redirect("/login")
  }

  // Logged in but onboarding not completed
  if (!currentUser.dbUser) {
    redirect("/onboarding")
  }

  return (
    <div>
      {children}
    </div>
  )
}