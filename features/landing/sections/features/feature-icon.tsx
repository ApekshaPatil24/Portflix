type Props = {
  icon: any
  variant: "cyan" | "pink" | "purple"
}

export default function FeatureIcon({
  icon: Icon,
  variant,
}: Props) {
  return (
    <div
      className={`
        w-[46px]
        h-[46px]

        rounded-2xl

        border

        flex
        items-center
        justify-center

        mb-6

        ${
          variant === "cyan"
            ? "bg-cyan-400/10 border-cyan-400/20 text-cyan-300"
            : variant === "pink"
            ? "bg-pink-400/10 border-pink-400/20 text-pink-300"
            : "bg-violet-400/10 border-violet-400/20 text-violet-300"
        }
      `}
    >
      <Icon size={20} strokeWidth={2.2} />
    </div>
  )
}