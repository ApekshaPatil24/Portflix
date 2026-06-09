"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Loader2 } from "lucide-react"

import UsernameField from "./components/username-field"
import SkillSelector from "./components/skill-selector"

import { useUsernameCheck } from "./hooks/use-username-check"
import { SUGGESTED_SKILLS } from "./constants/skills"

import OnboardingVisual from "./components/onboarding-visual"
import ProtocolRail from "./components/protocol-rail"

import "@/features/auth/styles/auth.css"

export default function OnboardingForm() {
  const router = useRouter()

  const [step, setStep] = useState<1 | 2>(1)
  const [username, setUsername] = useState("")
  const [tagline, setTagline] = useState("")
  const [skills, setSkills] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const usernameStatus = useUsernameCheck(username)

  const toggleSkill = (skill: string) => {
    setSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : prev.length < 20
        ? [...prev, skill]
        : prev
    )
  }

  const handleNext = () => {
    if (!username || username.length < 3) {
      setError("Username must be at least 3 characters")
      return
    }
    if (usernameStatus === "taken") return
    if (usernameStatus === "checking") return
    setError("")
    setStep(2)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (skills.length < 2) {
      setError(
        "Select at least 2 skills"
      )
    return
  }

    try {
      setLoading(true)
      setError("")

      const response = await fetch("/api/user/onboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          tagline: tagline.trim() || undefined,
          skills,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed onboarding")
      }

      router.push("/dashboard")
      router.refresh()

    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

 return (
  <div className="min-h-screen bg-[#050816] overflow-hidden">

    <div className="flex min-h-screen">

      <OnboardingVisual />

      <section className="relative w-full lg:w-1/2 flex items-center justify-center px-12">

        <ProtocolRail />

        <div className="relative z-10 w-full max-w-md">

        {/* Header */}
<div className="space-y-4 mb-8">

  <div className="inline-flex items-center px-3 py-1 rounded-full border border-cyan-400/20 bg-cyan-400/5">
    <span className="text-[11px] font-mono tracking-[0.2em] text-cyan-400 uppercase">
      {step === 1
        ? "Step 01 : Protocol"
        : "Step 02 : Expertise"}
    </span>
  </div>

  {step === 1 ? (
    <>
      <div className="relative mb-4">

        <span
          className="
            absolute
            -top-1
            left-0
            text-[78px]
            font-black
            uppercase
            tracking-[-0.06em]
            text-white/[0.09]
            select-none
            pointer-events-none
            leading-none
          "
        >
          CLAIM YOUR
        </span>

        <h1
          className="
            relative
            z-10
            pt-10
            -top-3
            left-28
            text-[44px]
            tracking-[-0.08em]
            leading-none
          "
        >
          <span className="font-bold text-white">
            Name
          </span>

          <span className="font-extralight text-white/80">
            space
          </span>
        </h1>

      </div>

      <p className="max-w-sm text-[15px] leading-8 text-white/40">
        Reserve your permanent developer identity and
        create a public namespace for your work.
      </p>
    </>
  ) : (
    <>
      
           <div className="relative mb-4">

  {/* Background Word */}
  <span
    className="
      absolute
      -top-1
      left-0
      text-[78px]
      font-black
      uppercase
      tracking-[-0.06em]
      text-white/[0.09]
      select-none
      pointer-events-none
      leading-none
    "
  >
    CLAIM YOUR
  </span>

  {/* Main Word */}
  <h1
  className="
    relative
    z-10
    pt-10
    -top-3
    left-28
    text-[44px]
    tracking-[-0.08em]
    leading-none
  "
>
  <span className="font-bold text-white">
    Name
  </span>

  <span className="font-extralight text-white/80">
    space
  </span>
</h1>

</div>

      <p className="max-w-sm text-[15px] leading-8 text-white/40">
        Select the technologies that define your
        expertise and shape your developer identity.
      </p>
    </>
  )}

</div>

         
          {/* Progress */}
          <div className="flex gap-2 mb-10">

            <div className="h-1 w-10 rounded-full bg-cyan-400" />

            <div
              className={`h-1 w-10 rounded-full ${
                step === 2 ? "bg-cyan-400" : "bg-white/10"
              }`}
            />

          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            {step === 1 && (
              <>
                <UsernameField
                  value={username}
                  onChange={setUsername}
                  status={usernameStatus}
                />

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={
                    usernameStatus === "taken" ||
                    usernameStatus === "checking" ||
                    username.length < 3
                  }
                  className="
                    w-full
                    h-[58px]
                    text-[14px]
                    rounded-xl
                    bg-cyan-400/90
                    text-[#050816]
                    font-bold
                    uppercase
                    tracking-widest
                    hover:shadow-[0_0_35px_rgba(34,211,238,0.25)]
                    transition-all
                    cursor-pointer
                  "
                >
                  Initialize Protocol →
                </button>

                <div className="pt-6 border-t border-white/5 grid grid-cols-2 gap-4">

                  <div>
                    <span className="text-[10px] uppercase text-white/30 font-mono">
                      Latency
                    </span>

                    <p className="text-white font-mono">
                      14ms
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase text-white/30 font-mono">
                      Encryption
                    </span>

                    <p className="text-white font-mono">
                      AES-256
                    </p>
                  </div>

                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="space-y-3">

                <div
  className="
    p-5
    rounded-2xl
    border
    border-cyan-400/10
    bg-white/[0.03]
    backdrop-blur-xl
  "
>
  <div className="flex items-center justify-between">

    <div>
      <p className="text-white font-medium">
        @{username}
      </p>

      <p className="text-white/40 text-sm mt-1">
        {tagline || "Your developer identity"}
      </p>
    </div>

    <div
      className="
        h-3
        w-3
        rounded-full
        bg-cyan-400
        shadow-[0_0_15px_rgba(34,211,238,0.8)]
      "
    />
  </div>

</div>

                  <label className="text-xs uppercase tracking-widest text-white/40">
      Tagline
    </label>

    <span className="text-xs text-white/25">
      {tagline.length}/100
    </span>
                   <input
    value={tagline}
    onChange={(e) =>
      setTagline(e.target.value)
    }
    maxLength={100}
    placeholder="Full Stack Developer • Building AI Products"
    className="
      w-full
      h-[60px]
      rounded-2xl
      bg-white/[0.03]
      border
      border-white/10
      px-5
      text-white
      focus:outline-none
      focus:border-cyan-400/40
      transition-all
    "
  />

                </div>

              

                <SkillSelector
                  skills={skills}
                  toggleSkill={toggleSkill}
                  suggestions={SUGGESTED_SKILLS}
                />

                <div className="flex gap-3">

                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="
                      px-5
                      py-4
                      bg-white/5
                      border border-white/10
                      rounded-xl
                      text-white/70
                    "
                  >
                    Back
                  </button>

                  <button
                    type="submit"
                    disabled={loading || skills.length === 0}
                    className="
                      flex-1
                      py-4
                      bg-cyan-400/90
                      rounded-xl
                      text-[#050816]
                      font-bold
                      hover:shadow-[0_0_35px_rgba(34,211,238,0.25)]
                    "
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin inline mr-2" />
                        Creating...
                      </>
                    ) : (
                      "Generate Identity →"
                    )}
                  </button>

                </div>
              </>
            )}

          </form>

        </div>

      </section>

    </div>

  </div>
)
}