import Link from "next/link"

export default function NavActions() {
  return (
    <div className="relative z-10 hidden md:flex gap-3 items-center">
      <Link
        href="/login"
        className="
          px-[18px]
          py-[7px]
          rounded-[9px]
          text-[13px]
          font-medium
          border
          border-white/10
          text-zinc-400
          hover:text-white
          hover:border-white/20
          transition-all
        "
      >
        Log in
      </Link>

      <Link
        href="/onboarding"
        className="
          px-[18px]
          py-[7px]
          rounded-[9px]
          text-[13px]
          font-semibold
          text-cyan-300
          border
          border-cyan-400/30
          bg-gradient-to-br
          from-cyan-400/10
          to-violet-500/20
          hover:from-cyan-400/20
          hover:to-violet-500/30
          shadow-[0_0_20px_rgba(0,229,255,0.1)]
          hover:shadow-[0_0_32px_rgba(0,229,255,0.25)]
          transition-all
        "
      >
        Get Started →
      </Link>
    </div>
  )
}