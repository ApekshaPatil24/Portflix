"use client"

import { Check, Loader2, X } from "lucide-react"

interface UsernameFieldProps {
  value: string
  onChange: (value: string) => void
  status: "idle" | "checking" | "available" | "taken"
}

export default function UsernameField({
  value,
  onChange,
  status,
}: UsernameFieldProps) {
  return (
    <div className="space-y-3">

      <label className="text-[11px] uppercase tracking-[0.25em] text-white/35 font-mono">
        Portfolio URL
      </label>

      <div className="relative">

        {/* Prefix */}
        <div className="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none">
          <span className="text-cyan-400/80 font-mono text-[15px]">
            portlix.dev/
          </span>
        </div>

        {/* Input */}
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          spellCheck={false}
          autoComplete="off"
          placeholder="username"
          className="
            w-full
            h-[68px]
            rounded-2xl
            bg-white/[0.03]
            border
            border-cyan-400/20
            pl-[155px]
            pr-14
            text-white
            font-mono
            text-[15px]
            tracking-wide
            outline-none
            transition-all
            focus:border-cyan-400/50
            focus:bg-white/[0.05]
            focus:shadow-[0_0_25px_rgba(34,211,238,0.12)]
            placeholder:text-white/20
          "
        />

        {/* Status Icon */}
        <div className="absolute right-5 top-1/2 -translate-y-1/2">

          {status === "checking" && (
            <Loader2 className="w-4 h-4 animate-spin text-white/40" />
          )}

          {status === "available" && (
            <Check className="w-4 h-4 text-cyan-400" />
          )}

          {status === "taken" && (
            <X className="w-4 h-4 text-red-400" />
          )}

        </div>

      </div>

      {/* Status */}
      <div className="flex items-center gap-2 pl-1">

        <div
          className={`w-1.5 h-1.5 rounded-full ${
            status === "available"
              ? "bg-cyan-400"
              : status === "taken"
              ? "bg-red-400"
              : "bg-white/20"
          }`}
        />

        <span
          className={`text-[11px] uppercase tracking-[0.15em] font-mono ${
            status === "available"
              ? "text-cyan-400"
              : status === "taken"
              ? "text-red-400"
              : "text-white/35"
          }`}
        >
          {status === "available"
            ? "Namespace Available"
            : status === "taken"
            ? "Namespace Unavailable"
            : "Waiting For Input"}
        </span>

      </div>

    </div>
  )
}