import { redirect } from "next/navigation"

import OnboardingForm from "@/features/auth/onboarding-form"
import { getCurrentUser } from "@/lib/auth/get-current-user"

export default async function OnboardingPage() {
  const currentUser =
    await getCurrentUser()

  if (!currentUser?.authUser) {
    redirect("/login")
  }

  // Already completed onboarding
  if (currentUser.dbUser) {
    redirect("/dashboard")
  }

  return <OnboardingForm />
}