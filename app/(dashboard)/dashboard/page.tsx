//dashboard = home stats

"use client"

import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const router = useRouter()

  const handleLogout = async () => {
  try {
    await fetch("/api/auth/logout", {
      method: "POST",
    })

    router.replace("/login")
    router.refresh()

  } catch (error) {
    console.error("Logout error:", error)
  }
}

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">
        Dashboard
      </h1>

      <button
        onClick={handleLogout}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  )
}