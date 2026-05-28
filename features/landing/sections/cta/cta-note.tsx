type Props = {
  text: string
}

export default function CtaNote({
  text,
}: Props) {
  return (
    <div
      className="
        flex
        items-center
        gap-2
      "
    >
      <span className="text-cyan-300">
        ✓
      </span>

      <span
        className="
          text-[12px]
          text-white/45
        "
      >
        {text}
      </span>
       <span className="text-cyan-500">
        .
      </span>
    </div>
  )
}