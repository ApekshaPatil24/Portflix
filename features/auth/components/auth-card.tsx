import { ReactNode } from "react"

interface AuthCardProps {
  children: ReactNode
}

export default function AuthCard({
  children,
}: AuthCardProps) {
  return (
    <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">
      {children}
    </div>
  )
}