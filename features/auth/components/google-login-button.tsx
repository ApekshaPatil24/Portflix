"use client"

import { createClient } from "@/lib/supabase/client"

export default function GoogleLoginButton() {
  const handleLogin = async () => {
    const supabase = createClient()

    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo:
  typeof window !== "undefined"
    ? `${window.location.origin}/api/auth/callback`
    : undefined,
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
        cursor-pointer
        rounded-[18px]

        border
        border-white/[0.08]

        bg-white/[0.03]

        py-4

        text-[13px]
        font-semibold

        text-white

        transition-all
        duration-200

        hover:bg-white/[0.05]

        active:scale-[0.98]
      "
    >
      <img
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        alt="Google"
        className="h-5 w-5 opacity-80"
      />

      Continue with Google
    </button>
  )
}