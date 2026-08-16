"use client"

import { useState, useEffect } from "react"

export default function SidebarProgress() {
  const [score, setScore] = useState(35)

  useEffect(() => {
    async function calculateRealScore() {
      try {
        const res = await fetch("/api/user/portfolio")
        const data = await res.json()
        if (data?.portfolio) {
          const { avatarUrl, projects, skills, githubUrl } = data.portfolio
          let calc = 20 // Base score for creating account
          if (githubUrl) calc += 25
          if (projects && projects.length > 0) calc += 35
          if (avatarUrl) calc += 10
          if (skills && skills.length > 0) calc += 10
          setScore(calc)
        }
      } catch (err) {
        console.error("Failed to load showcase score", err)
      }
    }
    calculateRealScore()
  }, [])

  return (
    <div className="px-4 pb-4">
      <div
        className="
          rounded-xl
          border border-white/[0.04]
          bg-[#0a0a1f]/40
          p-4
        "
      >
        <div className="flex items-center justify-between font-mono text-[11px] tracking-wider uppercase">
          <span className="font-semibold text-zinc-400">
            SHOWCASE SCORE
          </span>

          <span className="text-cyan-400 font-bold">
            {score}%
          </span>
        </div>

        <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-white/[0.04] p-[1px]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-sky-400 shadow-[0_0_8px_rgba(34,211,238,0.5)] transition-all duration-1000"
            style={{ width: `${score}%` }}
          />
        </div>

        <a
          href="/portfolio"
          className="
            mt-3
            block
            w-full
            text-center
            text-[10px]
            font-mono
            uppercase
            tracking-widest
            text-zinc-500
            transition-colors
            hover:text-cyan-300
          "
        >
          &gt; OPTIMIZE SYSTEM
        </a>
      </div>
    </div>
  )
}