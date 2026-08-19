import Link from "next/link"

export default function HeroCTA() {
  return (
    <div
      className="
        flex
        gap-5
        justify-center
        flex-wrap
        mb-24
        fade-up
      "
    >
      {/* Primary Button */}
      <Link
        href="/onboarding"
        className="
          h-[50px]
          px-10 md:px-12
          rounded-[15px]
          flex items-center justify-center
          text-[14px]
          font-[700]
          tracking-[-0.4px]
          antialiased
          text-white
          bg-gradient-to-r
          from-cyan-400
          via-sky-400
          to-violet-500
          shadow-[0_10px_40px_rgba(124,58,237,0.38)]
          hover:scale-[1.02]
          hover:translate-y-[-2px]
          transition-all
          duration-300
          cursor-pointer
        "
        style={{
          fontFamily: "'Syne', sans-serif",
        }}
      >
        Start Building — Free
      </Link>

      {/* Secondary Button */}
      <a
        href="#features"
        className="
          h-[50px]
          px-10 md:px-12
          rounded-[15px]
          flex items-center justify-center
          text-[14px]
          font-[700]
          tracking-[-0.4px]   
          antialiased
          text-white
          border
          border-white/[0.08]
          bg-[rgba(255,255,255,0.03)]
          backdrop-blur-xl
          hover:bg-white/[0.05]
          hover:border-white/[0.12]
          transition-all
          duration-300
          cursor-pointer
        "
        style={{
          fontFamily: "'Syne', sans-serif",
        }}
      >
        Explore Features ↓
      </a>
    </div>
  )
}