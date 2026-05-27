"use client"

import ProfilePanel from "./profile-panel"
import AIStoryCard from "./ai-story-card"
import ProjectGrid from "./project-grid"
import GithubGrid from "./github-grid"
import ResumeStrip from "./resume-strip"

export default function HeroCard() {
  return (
    <div
      className="
        w-full
        max-w-[1050px]
        mx-auto
        perspective-[1400px]
        fade-up
      "
    >
      <div
        className="
          relative
          rounded-[30px]
          overflow-hidden

          border
          border-white/[0.08]

          bg-white/[0.03]

          shadow-[0_40px_120px_rgba(0,0,0,0.75)]

          backdrop-blur-xl

          rotate-x-[8deg]
          rotate-y-[-2deg]

          transition-all
          duration-500

          hover:scale-[1.01]
hover:rotate-x-[4deg]
hover:rotate-y-0
        "
      >
        {/* glow overlay */}
        <div
          className="
            absolute
            inset-0
            pointer-events-none

            bg-[linear-gradient(160deg,rgba(0,229,255,0.05)_0%,transparent_40%,rgba(124,58,237,0.04)_100%)]
          "
        />
        <div
  className="
    absolute
    inset-0
    opacity-[0.03]
    mix-blend-soft-light
    pointer-events-none
  "
  style={{
    backgroundImage:
      "url('https://grainy-gradients.vercel.app/noise.svg')",
  }}
/>
        {/* top bar */}
        <div
          className="
            flex
            items-center
            gap-2

            px-6
            py-4

            border-b
            border-white/[0.06]

            bg-black/30
          "
        >
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />

          <div
            className="
              ml-4

              px-4
              py-1.5

              rounded-lg

              border
              border-white/[0.08]

              bg-white/[0.04]

              text-[11px]
              text-zinc-400
              font-mono

              flex
              items-center
              gap-2
            "
          >
            <span className="text-green-400">🔒</span>

            portlix.dev/alex
          </div>
        </div>

        {/* body */}
        <div
          className="
            grid
            grid-cols-[220px_1fr]
            gap-5
            hero-float
            p-5
          "
        >
            <div
  className="
    absolute
    left-1/2
    bottom-[-70px]

    h-[120px]
    w-[70%]

    -translate-x-1/2

    rounded-full

    bg-violet-500/20

    blur-[120px]
  "
/>
          {/* LEFT */}
          <div className="flex flex-col gap-4">
            <ProfilePanel />
            <AIStoryCard />
          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-4">
            <ProjectGrid />
            <GithubGrid />
            <ResumeStrip />
          </div>
        </div>
      </div>
    </div>
  )
}