"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import AuthCard from "./auth-card"
import UsernameField from "./username-field"
import SkillSelector from "./skill-selector"

import { useUsernameCheck } from "../hooks/use-username-check"

import { SUGGESTED_SKILLS } from "../constants/skills"

export default function OnboardingForm() {
  const router = useRouter()

  const [username, setUsername] =
    useState("")

  const [tagline, setTagline] =
    useState("")

  const [skills, setSkills] = useState<
    string[]
  >([])

  const [loading, setLoading] =
    useState(false)

  const usernameStatus =
    useUsernameCheck(username)

  const toggleSkill = (
    skill: string
  ) => {
    setSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    )
  }

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    try {
      setLoading(true)

      const response = await fetch(
        "/api/user/onboard",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            username,
            tagline,
            skills,
          }),
        }
      )

      if (!response.ok) {
        throw new Error(
          "Failed onboarding"
        )
      }

      router.push("/dashboard")

    } catch (error) {
      console.error(error)

    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-6 py-10">
      <AuthCard>
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold text-white">
              Complete Your Profile
            </h1>

            <p className="text-zinc-400">
              Setup your Portlix identity
            </p>
          </div>

          <UsernameField
            value={username}
            onChange={setUsername}
            status={usernameStatus}
          />

          <div className="space-y-2">
            <Label>Tagline</Label>

            <Input
              value={tagline}
              onChange={(e) =>
                setTagline(
                  e.target.value
                )
              }
              placeholder="Full Stack Developer"
              className="h-12 rounded-xl"
            />
          </div>

          <div className="space-y-3">
            <Label>Skills</Label>

            <SkillSelector
              skills={skills}
              toggleSkill={toggleSkill}
              suggestions={
                SUGGESTED_SKILLS
              }
            />
          </div>

          <Button
            disabled={loading}
            className="w-full h-12 rounded-xl"
          >
            {loading
              ? "Creating..."
              : "Continue"}
          </Button>
        </form>
      </AuthCard>
    </div>
  )
}