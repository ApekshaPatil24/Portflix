"use client"

import { Code2 } from "lucide-react"

import { createClient } from "@/lib/supabase/client"

export default function GitHubLoginButton() {
  const handleLogin = async () => {
    const supabase = createClient()

    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo:
  typeof window !== "undefined"
    ? `${window.location.origin}/api/auth/callback`
    : undefined,
        scopes: "read:user user:email",
      },
    })
  }

  return (
    <button
      onClick={handleLogin}
      className="
  flex
  w-full
  items-center
  justify-center
  gap-3
  
  rounded-[18px]

  border
  border-white/[0.08]

  bg-white/[0.03]

  py-4

  text-[13px]
  font-semibold

  text-white

  cursor-pointer

  transition-all
  duration-200

  hover:bg-white/[0.05]
  
  active:scale-[0.98]
"
    >
      <Code2 className="h-5 w-5 text-white/70" />

      Continue with GitHub
    </button>
  )
}