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
    <div className="space-y-3">

      {/* Count indicator */}
      <div className="flex items-center justify-between">
        <p className="text-white/30 text-xs">
          {skills.length === 0
            ? "Select at least one skill"
            : `${skills.length} skill${skills.length > 1 ? "s" : ""} selected`}
        </p>
        {skills.length > 0 && (
          <button
            type="button"
            onClick={() => skills.forEach(s => toggleSkill(s))}
            className="text-white/30 text-xs hover:text-white/60 transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Skill pills */}
      <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-1">
        {suggestions.map((skill) => {
          const active = skills.includes(skill)
          return (
            <button
              key={skill}
              type="button"
              onClick={() => toggleSkill(skill)}
              className={`
                px-3.5 py-1.5
                rounded-full
                text-xs font-medium
                border
                transition-all duration-150
                ${active
                  ? "bg-cyan-400 text-[#050816] border-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.25)]"
                  : "bg-white/5 text-white/60 border-white/10 hover:border-white/25 hover:text-white/80"
                }
              `}
            >
              {skill}
            </button>
          )
        })}
      </div>

    </div>
  )
}