//login folder = FRONTEND: login + onboarding pages (no sidebar)
//LOGIN UI — the page user sees
import { redirect } from "next/navigation"

import LoginForm from "@/features/auth/components/login-form"
import { getCurrentUser } from "@/lib/auth/get-current-user"

export default async function LoginPage() {
  const currentUser =
    await getCurrentUser()

  if (currentUser?.authUser) {
    if (currentUser.dbUser) {
      redirect("/dashboard")
    }

    redirect("/onboarding")
  }

  return <LoginForm />
}