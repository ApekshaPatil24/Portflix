import { z } from "zod"

const RESERVED_USERNAMES = [
  "admin",
  "root",
  "api",
  "support",
  "help",
  "settings",
  "dashboard",
  "login",
  "signup",
  "register",
  "portlix",
  "www",
  "mail",
  "docs",
  "blog",
]

export const onboardingSchema = z.object({
  username: z
    .string()
    .trim()
    .toLowerCase()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be under 30 characters")
    .regex(
      /^(?!-)(?!.*--)[a-z0-9-]+(?<!-)$/,
      "Only lowercase letters, numbers and hyphens are allowed"
    )
    .refine(
      (value) =>
        !RESERVED_USERNAMES.includes(value),
      {
        message:
          "This username is reserved",
      }
    ),

 tagline: z
  .string()
  .trim()
  .max(
    100,
    "Tagline must be under 100 characters"
  )
  .optional()
  .or(z.literal("")),

  skills: z
    .array(
      z
        .string()
        .trim()
        .min(1)
        .max(30)
    )
    .min(
      2,
      "Select at least 2 skills"
    )
    .max(20, "Maximum 20 skills")
    .refine(
      (skills) =>
        new Set(
          skills.map((s) =>
            s.toLowerCase()
          )
        ).size === skills.length,
      {
        message:
          "Duplicate skills are not allowed",
      }
    )
    .refine(
  (skills) => {
    const unique = new Set(
      skills.map((s) =>
        s.toLowerCase().trim()
      )
    )

    return unique.size >= 2
  },
  {
    message:
      "Select at least 2 unique skills",
  }
),
    
})

export type OnboardingInput =
  z.infer<typeof onboardingSchema>