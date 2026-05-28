import { ReactNode } from "react"

interface AuthCardProps {
  children: ReactNode
}

export default function AuthCard({
  children,
}: AuthCardProps) {
  return (
    <div
      className="
        relative

        overflow-hidden

        rounded-[28px]

        border
        border-white/[0.08]

        bg-white/[0.03]

        backdrop-blur-[24px]

        p-7

        shadow-[0_20px_80px_rgba(0,0,0,0.45)]
      "
    >
      <div
        className="
          absolute
          inset-x-0
          top-0
          h-px

          bg-gradient-to-r
          from-transparent
          via-cyan-300/40
          to-transparent
        "
      />

      {children}
    </div>
  )
}