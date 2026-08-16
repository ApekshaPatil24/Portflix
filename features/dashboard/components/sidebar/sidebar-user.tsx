"use client"

import { useState, useEffect } from "react"
import { LogOut, User } from "lucide-react"
import { useLogout } from "@/features/auth/hooks/use-logout"

export default function SidebarUser() {
  const { logout, isLoading } = useLogout()
  const [userData, setUserData] = useState<{ displayName: string; plan: string; avatarUrl?: string }>({
    displayName: "Developer",
    plan: "FREE",
  })

  useEffect(() => {
    async function fetchUserData() {
      try {
        const res = await fetch("/api/user/portfolio")
        const data = await res.json()
        if (data?.portfolio) {
          setUserData({
            displayName: data.portfolio.displayName || "Developer",
            plan: data.portfolio.user?.plan || "FREE",
            avatarUrl: data.portfolio.avatarUrl,
          })
        }
      } catch (err) {
        console.error("Failed to load user info in sidebar", err)
      }
    }
    fetchUserData()
  }, [])

  return (
    <div className="border-t border-white/[0.04] p-4 bg-[#050515]/30">
      <div className="flex items-center justify-between rounded-xl p-2">
        <div className="flex items-center gap-3">
          {userData.avatarUrl ? (
            <img
              src={userData.avatarUrl}
              alt={userData.displayName}
              className="h-9 w-9 rounded-xl border border-cyan-500/20 object-cover shadow-[0_0_10px_rgba(34,211,238,0.1)]"
            />
          ) : (
            <div
              className="
                flex h-9 w-9 items-center justify-center
                rounded-xl
                border border-cyan-500/20
                bg-[#0a0a1f]
                text-xs font-mono font-bold text-cyan-400
                shadow-[0_0_10px_rgba(34,211,238,0.1)]
              "
            >
              {userData.displayName.charAt(0).toUpperCase()}
            </div>
          )}

          <div className="min-w-0">
            <p className="text-xs font-bold text-zinc-200 truncate max-w-[110px]">
              {userData.displayName}
            </p>

            <p className="text-[9px] font-mono tracking-widest text-cyan-400/65 uppercase mt-0.5">
              DEV_{userData.plan}
            </p>
          </div>
        </div>

        <button
          onClick={logout}
          disabled={isLoading}
          title="Logout"
          className="
            p-1.5
            rounded-lg
            text-zinc-500
            transition-colors
            hover:text-red-400
            hover:bg-red-500/5
            disabled:cursor-not-allowed
            disabled:opacity-50
            cursor-pointer
          "
        >
          <LogOut size={15} />
        </button>
      </div>
    </div>
  )
}