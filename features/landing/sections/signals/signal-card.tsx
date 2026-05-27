import LiveIndicator from "./live-indicator"

type SignalCardProps = {
  title: string
  value: string
  status: string
  glow: "cyan" | "violet" | "pink"
}

export default function SignalCard({
  title,
  value,
  status,
  glow,
}: SignalCardProps) {
  return (
    <div
      className={`
        group
        relative
        overflow-hidden

        rounded-[22px]

        border

        ${
          glow === "cyan"
            ? "border-cyan-400/10"
            : glow === "violet"
            ? "border-violet-400/10"
            : "border-pink-400/10"
        }

        bg-white/[0.03]

        p-6

        transition-all
        duration-500

        hover:-translate-y-2
      `}
    >
      {/* glow */}
      <div
        className={`
          absolute
          inset-0

          opacity-0

          transition-opacity
          duration-500

          group-hover:opacity-100

          ${
            glow === "cyan"
              ? "bg-[radial-gradient(circle_at_top,rgba(0,229,255,0.12),transparent_70%)]"
              : glow === "violet"
              ? "bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.14),transparent_70%)]"
              : "bg-[radial-gradient(circle_at_top,rgba(236,72,153,0.14),transparent_70%)]"
          }
        `}
      />

      {/* top */}
      <div
        className="
          relative
          z-10

          mb-5

          flex
          items-center
          justify-between
        "
      >
        <div
          className="
            text-[11px]
            uppercase
            tracking-[1px]

            text-zinc-500
          "
        >
          {title}
        </div>

        <LiveIndicator />
      </div>

      {/* value */}
      <div
        className="
          relative
          z-10

          mb-3

          text-[40px]
          font-black

          text-white
        "
        style={{
          fontFamily:
            "var(--font-display)",
        }}
      >
        {value}
      </div>

      {/* status */}
      <div
        className="
          relative
          z-10

          flex
          items-center
          gap-2

          text-[12px]
          text-zinc-400
        "
      >
        <span className="text-cyan-300">↗</span>

        {status}
      </div>

      {/* bottom line */}
      <div
        className="
          absolute
          bottom-0
          left-0

          h-[2px]
          w-full

          bg-gradient-to-r
          from-transparent
          via-white/20
          to-transparent
        "
      />
    </div>
  )
}