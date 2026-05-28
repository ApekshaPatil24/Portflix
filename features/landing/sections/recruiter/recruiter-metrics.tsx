type Props = {
  number: string
  label: string
}

export default function RecruiterMetrics({
  number,
  label,
}: Props) {
  return (
    <div
      className="
        bg-white/[0.03]
        border
        border-white/[0.06]

        rounded-2xl

        p-4

        text-center
      "
    >
      <div
        className="
          text-cyan-300

          text-[22px]
          font-black

          tracking-[-0.04em]
        "
        style={{
          fontFamily: "var(--font-display)",
        }}
      >
        {number}
      </div>

      <div
        className="
          mt-1

          text-[10px]
          uppercase
          tracking-[0.12em]

          text-white/40
        "
      >
        {label}
      </div>
    </div>
  )
}