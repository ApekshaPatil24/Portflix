type Props = {
  variant: "cyan" | "pink" | "purple"
}

export default function FeatureGlow({ variant }: Props) {
  const styles = {
    cyan: "bg-cyan-400",
    pink: "bg-pink-400",
    purple: "bg-violet-400",
  }

  return (
    <div
      className={`
        absolute
        -top-10
        -right-10
        w-32
        h-32
        rounded-full
        blur-3xl
        opacity-10
        ${styles[variant]}
      `}
    />
  )
}