"use client"

import { useEffect, useState } from "react"

type UsernameStatus =
  | "idle"
  | "checking"
  | "available"
  | "taken"

export function useUsernameCheck(
  username: string
) {
  const [status, setStatus] =
    useState<UsernameStatus>("idle")

  useEffect(() => {
    if (!username || username.length < 3) {
      setStatus("idle")
      return
    }

    setStatus("checking")

    const timer = setTimeout(async () => {
      try {
        const response = await fetch(
          `/api/user/check-username?username=${username}`
        )

        const data =
          await response.json()

        setStatus(
          data.available
            ? "available"
            : "taken"
        )
      } catch {
        setStatus("idle")
      }
    }, 600)

    return () => clearTimeout(timer)
  }, [username])

  return status
}