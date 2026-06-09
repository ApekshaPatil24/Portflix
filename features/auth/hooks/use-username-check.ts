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
    const normalized =
  username.trim().toLowerCase()

if (
  !normalized ||
  normalized.length < 3
) {
  setStatus("idle")
  return
}

if (
  !/^(?!-)(?!.*--)[a-z0-9-]+(?<!-)$/.test(
    normalized
  )
) {
  setStatus("idle")
  return
}

    const controller =
      new AbortController()

    setStatus("checking")

    const timer = setTimeout(async () => {
      try {
        const response = await fetch(
  `/api/user/check-username?username=${encodeURIComponent(
    normalized
  )}`,
          {
            signal:
              controller.signal,
          }
        )

        if (!response.ok) {
          throw new Error(
            "Username check failed"
          )
        }

        const data =
          await response.json()

        setStatus(
          data.available
            ? "available"
            : "taken"
        )
      } catch (error) {
        if (
          error instanceof DOMException &&
          error.name === "AbortError"
        ) {
          return
        }

        setStatus("idle")
      }
    }, 500)

    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [username])

  return status
}