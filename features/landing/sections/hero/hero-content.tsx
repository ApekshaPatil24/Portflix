export default function HeroContent() {
  return (
   <div className="w-full max-w-[1850px] mx-auto">
      {/* Eyebrow */}
      <div
        className="
          inline-flex
          items-center
          gap-2
          rounded-full
          border
          border-cyan-400/20
          bg-gradient-to-br
          from-cyan-400/10
          to-violet-500/10
          px-4 py-2
          text-[11px]
          uppercase
          tracking-[1px]
          text-cyan-300
          mb-8
          fade-up
        "
      >
        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />

        AI · Auto-Sync · Get Hired Faster
      </div>

      {/* Heading */}
      <h1
        className="
          text-[clamp(36px,7vw,86px)]
          leading-[1.05]
          tracking-[-2px] md:tracking-[-3px]
          font-black
          mb-2
          fade-up
        "
        style={{
          fontFamily: "var(--font-display)",
        }}
      >
        Build your
      </h1>

      <div
        className="
          text-[clamp(36px,7vw,76px)]
          leading-[1.05]
          tracking-[-2px] md:tracking-[-3px]
          font-black
          mb-7
          bg-gradient-to-r
          from-cyan-400
          via-violet-400
          to-pink-400
          bg-clip-text
          text-transparent
          fade-up
        "
        style={{
          fontFamily: "var(--font-display)",
        }}
      >
        Developer Identity.
      </div>

      {/* Description */}
      <p
        className="
          max-w-[720px]
          mx-auto
          text-zinc-400
          text-sm md:text-[18px]
          leading-[1.6] md:leading-[1.7]
          mb-10 md:mb-14
          fade-up
        "
      >
        Auto-sync GitHub. Generate AI portfolios and summaries tailored for recruiters.
        Let your story find the right opportunity — all on autopilot.
      </p>


      
    </div>
  )
}