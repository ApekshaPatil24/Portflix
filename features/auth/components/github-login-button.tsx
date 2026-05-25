"use client"

import { Globe } from "lucide-react"

import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"

export default function GitHubLoginButton() {
  const handleLogin = async () => {
    const supabase = createClient()

    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
        scopes: "read:user user:email",
      },
    })
  }

  return (
    <Button
      onClick={handleLogin}
      className="w-full h-14 rounded-2xl bg-white text-black hover:bg-zinc-200 text-base font-semibold"
    >
      <Globe className="w-5 h-5 mr-3" />
      Continue with GitHub
    </Button>
  )
}