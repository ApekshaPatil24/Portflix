type StatCardProps = {
  number: string
  label: string
}

export default function StatCard({
  number,
  label,
}: StatCardProps) {
  return (
    <div
      className="
        group
        relative
        overflow-hidden

        rounded-[22px]

        border
        border-white/[0.07]

        bg-white/[0.025]

        px-6
        py-8

        text-center

        transition-all
        duration-500

        hover:-translate-y-2
        hover:border-cyan-400/20
      "
    >
      {/* glow */}
      <div
        className="
          absolute
          inset-0

          opacity-0

          transition-opacity
          duration-500

          group-hover:opacity-100

          bg-[radial-gradient(circle_at_top,rgba(0,229,255,0.12),transparent_60%)]
        "
      />

      {/* top line */}
      <div
        className="
          absolute
          left-0
          top-0

          h-[1px]
          w-full

          bg-gradient-to-r
          from-transparent
          via-cyan-400/40
          to-transparent
        "
      />

      {/* number */}
      <div
        className="
          relative
          z-10

          mb-3

          text-[clamp(32px,4vw,48px)]
          font-black

          bg-gradient-to-r
          from-cyan-300
          via-violet-300
          to-pink-300

          bg-clip-text
          text-transparent
        "
        style={{
          fontFamily:
            "var(--font-display)",
        }}
      >
        {number}
      </div>

      {/* label */}
      <div
        className="
          relative
          z-10

          text-[13px]
          text-zinc-400
        "
      >
        {label}
      </div>
    </div>
  )
}