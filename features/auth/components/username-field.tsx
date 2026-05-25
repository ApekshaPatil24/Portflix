"use client"

import { Check, Loader2, X } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface UsernameFieldProps {
  value: string
  onChange: (value: string) => void
  status:
    | "idle"
    | "checking"
    | "available"
    | "taken"
}

export default function UsernameField({
  value,
  onChange,
  status,
}: UsernameFieldProps) {
  return (
    <div className="space-y-2">
      <Label>Username</Label>

      <div className="relative">
        <Input
          value={value}
          onChange={(e) =>
            onChange(e.target.value)
          }
          placeholder="johndoe"
          className="h-12 rounded-xl pr-10"
        />

        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {status === "checking" && (
            <Loader2 className="w-4 h-4 animate-spin text-zinc-400" />
          )}

          {status === "available" && (
            <Check className="w-4 h-4 text-green-500" />
          )}

          {status === "taken" && (
            <X className="w-4 h-4 text-red-500" />
          )}
        </div>
      </div>
    </div>
  )
}