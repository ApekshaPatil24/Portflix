interface SkillSelectorProps {
  skills: string[]
  toggleSkill: (skill: string) => void
  suggestions: string[]
}

export default function SkillSelector({
  skills,
  toggleSkill,
  suggestions,
}: SkillSelectorProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {suggestions.map((skill) => {
        const active =
          skills.includes(skill)

        return (
          <button
            key={skill}
            type="button"
            onClick={() =>
              toggleSkill(skill)
            }
            className={`px-4 py-2 rounded-full border transition ${
              active
                ? "bg-white text-black border-white"
                : "bg-white/5 border-white/10 text-white"
            }`}
          >
            {skill}
          </button>
        )
      })}
    </div>
  )
}