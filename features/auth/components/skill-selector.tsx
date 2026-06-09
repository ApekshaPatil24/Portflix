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

      {skills.length > 0 && (
  <div
    className="
      p-4
      rounded-2xl
      border
      border-cyan-400/10
      bg-white/[0.03]
      mb-4
    "
  >
    <div className="flex items-center justify-between mb-3">

      <span className="text-[11px] uppercase tracking-widest text-white/40">
        Selected Stack
      </span>

      <span
        className={`
          text-xs font-mono
          ${
            skills.length >= 15
              ? "text-amber-400"
              : "text-cyan-400"
          }
        `}
      >
        {skills.length}/20
      </span>

    </div>

    <div className="flex flex-wrap gap-2">

      {skills.map((skill) => (
        <button
          key={skill}
          type="button"
          onClick={() =>
            toggleSkill(skill)
          }
          className="
            px-3
            py-1.5
            rounded-full
            bg-cyan-400/10
            border
            border-cyan-400/20
            text-cyan-400
            text-xs
            hover:bg-cyan-400/20
            transition-all
          "
        >
          {skill}
        </button>
      ))}

    </div>

  </div>
)}

      {/* Count indicator */}
      <div className="flex items-center justify-between">
        {skills.length < 2 && (
  <p className="text-amber-400 text-xs">
    Select at least 2 skills to continue
  </p>
)}

{skills.length >= 15 && (
  <p className="text-white/35 text-xs">
    Focus on your strongest technologies.
  </p>
)}

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