export default function ResumeStrip() {
  return (
    <div
      className="
        relative
        overflow-hidden

        rounded-[18px]
        border
        border-white/[0.07]

        bg-gradient-to-r
        from-cyan-400/[0.04]
        via-violet-500/[0.04]
        to-pink-400/[0.04]

        px-5 py-4
      "
    >
      {/* glow */}
      <div
        className="
          absolute
          inset-0

          bg-[radial-gradient(circle_at_top_right,rgba(0,229,255,0.08),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(124,58,237,0.08),transparent_35%)]
        "
      />

      <div
        className="
          relative
          z-10

          flex
          items-center
          justify-between
          gap-6

          flex-wrap
        "
      >
        {/* LEFT */}
        <div>
          <div
            className="
              mb-2
              text-[11px]
              uppercase
              tracking-[1px]

              text-cyan-300
            "
          >
            AI Resume Engine
          </div>

          <h3
            className="
              text-[17px]
              font-black
              text-white
            "
            style={{
              fontFamily:
                "var(--font-display)",
            }}
          >
            Resume tailored instantly
          </h3>

          <p
            className="
              mt-2
              max-w-[320px]

              text-[12px]
              leading-[1.6]

              text-zinc-400
            "
          >
            Portlix analyzes job descriptions and rewrites
            your resume automatically to maximize recruiter
            matching.
          </p>
        </div>

        {/* RIGHT */}
        <div
          className="
            flex
            items-center
            gap-4
          "
        >
          {/* score */}
          <div
            className="
              rounded-[14px]

              border
              border-cyan-400/20

              bg-cyan-400/10

              px-5
              py-4

              text-center
            "
          >
            <div
              className="
                text-[24px]
                font-black
                text-cyan-300
              "
              style={{
                fontFamily:
                  "var(--font-display)",
              }}
            >
              98%
            </div>

            <div
              className="
                mt-1
                text-[10px]
                uppercase

                text-cyan-200
              "
            >
              Match Score
            </div>
          </div>

          {/* button */}
          <button
            className="
              h-[54px]

              rounded-[14px]

              border
              border-white/[0.08]

              bg-white/[0.05]

              px-6

              text-[13px]
              font-semibold
              text-white

              backdrop-blur-xl

              hover:bg-white/[0.08]

              transition-all
            "
            style={{
              fontFamily:
                "var(--font-display)",
            }}
          >
            Generate Resume →
          </button>
        </div>
      </div>
    </div>
  )
}