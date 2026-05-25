//onboarding form validation

import { z } from "zod"

export const onboardingSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be under 30 characters")
    .regex(
      /^[a-z0-9-]+$/,
      "Only lowercase letters, numbers, and hyphens allowed"
    ),
  tagline: z
    .string()
    .max(100, "Tagline must be under 100 characters")
    .optional(),
  skills: z
    .array(z.string().min(1))
    .min(1, "Add at least one skill")
    .max(20, "Maximum 20 skills"),
})

export type OnboardingInput = z.infer<typeof onboardingSchema>