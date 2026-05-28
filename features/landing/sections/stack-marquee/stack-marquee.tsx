import { STACK_ITEMS } from "./stack-items"

export default function StackMarquee() {
  return (
    <section
      className="
        relative
        z-10

        py-10
        mt-8
        mb-5
        overflow-hidden

        border-y
        border-white/5

        bg-white/[0.02]
        backdrop-blur-sm
      "
    >
      {/* LEFT GLOW */}
      <div
        className="
          absolute
          left-[-120px]
          top-1/2
          -translate-y-1/2

          w-[260px]
          h-[260px]

          rounded-full

          bg-cyan-500/10

          blur-[110px]

          pointer-events-none
        "
      />

      {/* CENTER GLOW */}
      <div
        className="
          absolute
          left-1/2
          top-1/2
          -translate-x-1/2
          -translate-y-1/2

          w-[320px]
          h-[180px]

          bg-violet-500/10

          blur-[120px]

          pointer-events-none
        "
      />

      {/* RIGHT GLOW */}
      <div
        className="
          absolute
          right-[-120px]
          top-1/2
          -translate-y-1/2

          w-[260px]
          h-[260px]

          rounded-full

          bg-pink-500/10

          blur-[110px]

          pointer-events-none
        "
      />

      {/* TOP LIGHT */}
      <div
        className="
          absolute
          inset-x-0
          top-0
          h-[1px]

          bg-gradient-to-r
          from-transparent
          via-violet-400/50
          to-transparent
        "
      />

      {/* BOTTOM LIGHT */}
      <div
        className="
          absolute
          inset-x-0
          bottom-0
          h-[1px]

          bg-gradient-to-r
          from-transparent
          via-pink-400/40
          to-transparent
        "
      />

      <div className="stack-marquee-track">
        {[...STACK_ITEMS, ...STACK_ITEMS].map(
          (item, index) => (
            <div
              key={index}
              className="
                flex
                items-center
                gap-8
                shrink-0
              "
            >
              <span
                className="
                  text-[8px]
                  md:text-[12px]

                  italic
                  font-black

                  tracking-[-0.04em]

                  text-white/25

                  drop-shadow-[0_0_12px_rgba(255,255,255,0.08)]

                  hover:text-cyan-300

                  transition-colors
                  duration-300
                "
                style={{
                  fontFamily:
                    "var(--font-display)",
                }}
              >
                {item}
              </span>

              <span
                className="
                  text-white/15
                  text-[10px]
                "
              >
                ✦
              </span>
            </div>
          )
        )}
      </div>
    </section>
  )
}