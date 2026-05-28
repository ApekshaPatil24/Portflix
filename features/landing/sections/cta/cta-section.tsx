import CtaNote from "./cta-note"

const notes = [
  "No credit card",
  "2-min setup",
  "Auto-syncs GitHub",
  "Built with Next.js + Node.js",
]

export default function CtaSection() {
  return (
    <section
      className="
        relative
        z-10

        px-[6%]
        py-16
      "
    >
      <div
        className="
          relative

          overflow-hidden

          max-w-[1180px]
          mx-auto

          rounded-[32px]

          border
          border-white/[0.08]

          bg-white/[0.025]

          px-6
          py-14

          md:px-12
          md:py-16

          text-center
        "
      >
        {/* GLOW */}
        <div
          className="
            absolute
            left-1/2
            top-1/2

            h-[260px]
            w-[520px]

            -translate-x-1/2
            -translate-y-1/2

            rounded-full

            bg-violet-500/20

            blur-[120px]

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
            via-cyan-400/50
            to-transparent
          "
        />

        {/* SIDE GLOWS */}
        <div
          className="
            absolute
            left-[-80px]
            top-1/2
            -translate-y-1/2

            h-[180px]
            w-[180px]

            rounded-full

            bg-cyan-500/10

            blur-[90px]
          "
        />

        <div
          className="
            absolute
            right-[-80px]
            top-1/2
            -translate-y-1/2

            h-[180px]
            w-[180px]

            rounded-full

            bg-pink-500/10

            blur-[90px]
          "
        />

        <div className="relative z-10">
          <h2
            className="
              text-[36px]
              md:text-[52px]

              font-black

              leading-[0.95]
              tracking-[-0.06em]

              text-white
            "
            style={{
              fontFamily:
                "var(--font-display)",
            }}
          >
            Ready to be
            <br />

            <span
              className="
                bg-gradient-to-r
                from-cyan-300
                via-sky-400
                to-violet-400

                bg-clip-text
                text-transparent
              "
            >
              discovered?
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-4

              max-w-[500px]

              text-[15px]
              leading-7

              text-white/55
            "
          >
            52,000 developers already turned
            their GitHub into their career
            launchpad. Your turn.
          </p>

          {/* BUTTONS */}
          <div
            className="
              mt-7

              flex
              flex-wrap
              items-center
              justify-center

              gap-3
            "
          >
            <button
              className="
                rounded-2xl

                border
                border-cyan-400/20

                bg-gradient-to-r
                from-cyan-400
                to-violet-500

                px-7
                py-3.5

                text-[14px]
                font-bold

                text-white

                shadow-[0_10px_40px_rgba(124,58,237,0.35)]

                transition-all
                duration-300

                hover:-translate-y-1
              "
              style={{
                fontFamily:
                  "var(--font-display)",
              }}
            >
              Start Building — Free
            </button>

            <button
              className="
                rounded-2xl

                border
                border-white/[0.08]

                bg-white/[0.03]

                px-7
                py-3.5

                text-[14px]
                font-semibold

                text-white/80

                backdrop-blur-xl

                transition-all
                duration-300

                hover:bg-white/[0.05]
              "
            >
              See live portfolios →
            </button>
          </div>

          {/* NOTES */}
          <div
            className="
              mt-6

              flex
              flex-wrap
              items-center
              justify-center

              gap-4
            "
          >
            {notes.map((note) => (
              <CtaNote
                key={note}
                text={note}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}