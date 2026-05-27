export default function ProjectGrid() {
  const projects = [
    {
      title: "Nexus CLI",
      desc: "AI-powered deployment toolkit for cloud-native teams.",
      glow: "cyan",
      metric: "12k installs",
    },
    {
      title: "VectraDB",
      desc: "Ultra-fast vector search engine for AI retrieval systems.",
      glow: "violet",
      metric: "3.2ms latency",
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-4">
      {projects.map((project) => (
        <div
          key={project.title}
          className={`
            relative
            overflow-hidden

            rounded-[18px]
            border

            ${
              project.glow === "cyan"
                ? "border-cyan-400/15"
                : "border-violet-400/15"
            }

            bg-white/[0.03]

            p-5
          `}
        >
          {/* glow blur */}
          <div
            className={`
              absolute
              -top-10
              -right-10

              h-28
              w-28
              rounded-full
              blur-[60px]

              ${
                project.glow === "cyan"
                  ? "bg-cyan-400/10"
                  : "bg-violet-500/10"
              }
            `}
          />

          {/* top icon */}
          <div
            className={`
              mb-4
              flex
              h-11
              w-11
              items-center
              justify-center

              rounded-xl

              text-lg

              ${
                project.glow === "cyan"
                  ? "bg-cyan-400/10 text-cyan-300"
                  : "bg-violet-500/10 text-violet-300"
              }
            `}
          >
            {project.glow === "cyan" ? "⚡" : "🧠"}
          </div>

          {/* title */}
          <h3
            className="
              mb-2
              text-[17px]
              font-black
              text-white
            "
            style={{
              fontFamily: "var(--font-display)",
            }}
          >
            {project.title}
          </h3>

          {/* description */}
          <p
            className="
              mb-5
              text-[12px]
              leading-[1.6]
              text-zinc-400
            "
          >
            {project.desc}
          </p>

          {/* footer */}
          <div
            className="
              flex
              items-center
              justify-between
            "
          >
            <div
              className="
                rounded-full
                border
                border-white/[0.08]

                bg-white/[0.03]

                px-3
                py-1

                text-[10px]
                font-medium
                text-zinc-300
              "
            >
              {project.metric}
            </div>

            <div
              className="
                text-[11px]
                text-zinc-500
              "
            >
              View →
            </div>
            <div className="flex items-center gap-2">
  <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />

  <div
    className="
      text-[10px]
      uppercase
      tracking-[0.4px]
      text-zinc-500
    "
  >
    Live
  </div>
</div>
          </div>
        </div>
      ))}
    </div>
  )
}