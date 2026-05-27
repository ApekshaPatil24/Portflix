const rows = 4
const cols = 24

export default function GithubGrid() {
  const pattern = [
    0, 1, 2, 4, 0, 2, 5, 1, 0, 3, 4, 2,
    1, 0, 5, 4, 3, 1, 0, 2, 5, 4, 1, 0,
  ]

  return (
    <div
      className="
        relative
        overflow-hidden
        scanlines

        rounded-[16px]
        border
        border-white/[0.06]

        bg-[rgba(255,255,255,0.03)]

        px-5
        py-4
      "
    >
      {/* ambient glow */}
      <div
        className="
          absolute
          -right-10
          top-1/2

          h-32
          w-32

          -translate-y-1/2

          rounded-full

          bg-cyan-400/10

          blur-[70px]
        "
      />

      {/* moving line */}
      <div className="github-flow-line" />

      {/* floating pills */}
      <div
        className="
          absolute
          top-4
          right-5

          flex
          items-center
          gap-2
        "
      >
        <div
          className="
            rounded-full
            border
            border-cyan-400/20

            bg-cyan-400/10

            px-3
            py-1

            text-[9px]
            font-semibold
            uppercase
            tracking-[0.8px]

            text-cyan-300

            backdrop-blur-xl
          "
        >
          AI Sync
        </div>

        <div
          className="
            rounded-full
            border
            border-violet-400/20

            bg-violet-400/10

            px-3
            py-1

            text-[9px]
            font-semibold
            uppercase
            tracking-[0.8px]

            text-violet-300

            backdrop-blur-xl
          "
        >
          Live Graph
        </div>
      </div>

      {/* top */}
      <div
        className="
          mb-4
          flex
          items-center
          justify-between
        "
      >
        <div
          className="
            text-[11px]
            font-semibold
            uppercase
            tracking-[1.2px]

            text-zinc-500
          "
        >
          GitHub Activity — Last 6 Months
        </div>

        <div
          className="
            flex
            items-center
            gap-2

            text-[10px]
            text-zinc-500
          "
        >
          <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />

          Active
        </div>
      </div>

      {/* ai indicator */}
      <div
        className="
          absolute
          right-12
          top-[88px]

          flex
          items-center
          gap-2

          rounded-full

          border
          border-cyan-400/20

          bg-[#07111f]/80

          px-3
          py-1.5

          text-[10px]
          text-cyan-300

          backdrop-blur-xl

          shadow-[0_0_20px_rgba(34,211,238,0.18)]
        "
      >
        <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />

        AI detected peak coding streak
      </div>

      {/* GRID */}
      <div className="flex flex-col gap-[4px]">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div
            key={rowIndex}
            className="flex gap-[4px]"
          >
            {Array.from({ length: cols }).map((_, colIndex) => {
              const value =
                pattern[
                  (rowIndex * cols + colIndex) %
                    pattern.length
                ]

              return (
                <div
                  key={colIndex}
                  className={`
                    h-[22px]
                    w-[22px]

                    rounded-[4px]

                    transition-all
                    duration-300

                    animate-pulse

                    ${
                      value === 0
                        ? "bg-white/[0.04]"
                        : value === 1
                        ? "bg-cyan-400/20"
                        : value === 2
                        ? "bg-cyan-400/35"
                        : value === 3
                        ? "bg-cyan-400/55"
                        : value === 4
                        ? "bg-cyan-400/75"
                        : "bg-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.8)]"
                    }

                    hover:scale-110
                  `}
                  style={{
                    animationDelay: `${
                      (
                        (rowIndex * cols + colIndex) %
                        10
                      ) * 0.2
                    }s`,
                  }}
                />
              )
            })}
          </div>
        ))}
      </div>

      {/* bottom live status */}
      <div
        className="
          absolute
          bottom-4
          right-5

          flex
          items-center
          gap-2

          text-[10px]
          uppercase
          tracking-[1px]

          text-zinc-500
        "
      >
        <span className="animate-pulse">↗</span>

        Auto updating metrics
      </div>

      {/* footer */}
      <div
        className="
          mt-4
          flex
          items-center
          justify-between

          border-t
          border-white/[0.05]

          pt-3
        "
      >
        <div className="flex items-center gap-5">
          <div>
            <div
              className="
                text-[13px]
                font-black
                text-white
              "
              style={{
                fontFamily:
                  "var(--font-display)",
              }}
            >
              147
            </div>

            <div
              className="
                text-[9px]
                uppercase
                tracking-[0.8px]

                text-zinc-500
              "
            >
              Repositories
            </div>
          </div>

          <div>
            <div
              className="
                text-[13px]
                font-black
                text-white
              "
              style={{
                fontFamily:
                  "var(--font-display)",
              }}
            >
              28
            </div>

            <div
              className="
                text-[9px]
                uppercase
                tracking-[0.8px]

                text-zinc-500
              "
            >
              OSS Projects
            </div>
          </div>
        </div>

        <div
          className="
            text-[10px]
            text-zinc-500
          "
        >
          Updated 2h ago
        </div>
      </div>
    </div>
  )
}