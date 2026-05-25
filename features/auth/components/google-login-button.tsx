"use client"

import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"

export default function GoogleLoginButton() {
  const handleLogin = async () => {
    const supabase = createClient()

    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    })
  }

  return (
    <Button
      onClick={handleLogin}
      variant="outline"
      className="w-full h-14 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 text-white text-base font-semibold"
    >
      Continue with Google
    </Button>
  )
}