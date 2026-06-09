export default function OnboardingVisual() {
  return (
    <div className="hidden lg:flex w-1/2 relative items-center justify-center overflow-hidden border-r border-white/5">

      {/* Background Glow */}
      <div className="absolute inset-0">

        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-cyan-500/10 blur-[150px] rounded-full" />

        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-violet-500/10 blur-[150px] rounded-full" />

      </div>

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 flex flex-col items-center float-slow">

        <div className="relative w-[420px] h-[420px]">

          {/* Rotating Ring */}
          <div
            className="
              absolute
              inset-0
              rounded-full
              border
              border-cyan-400/10
              animate-spin
            "
            style={{
              animationDuration: "35s",
            }}
          />

          {/* Orbit Light */}
          <div
            className="absolute inset-0 animate-spin"
            style={{
              animationDuration: "18s",
            }}
          >
            <div
              className="
                absolute
                top-0
                left-1/2
                -translate-x-1/2
                w-4
                h-4
                rounded-full
                bg-cyan-400
                blur-sm
                shadow-[0_0_30px_rgba(34,211,238,0.9)]
              "
            />
          </div>

          {/* Inner Ring */}
          <div
            className="
              absolute
              inset-10
              rounded-full
              border
              border-white/5
            "
          />

          {/* Horizontal Beam */}
          <div
            className="
              absolute
              left-1/2
              top-1/2
              -translate-x-1/2
              -translate-y-1/2
              w-[280px]
              h-[2px]
              bg-gradient-to-r
              from-transparent
              via-cyan-400/40
              to-transparent
              blur-sm
            "
          />

          {/* Vertical Beam */}
          <div
            className="
              absolute
              left-1/2
              top-1/2
              -translate-x-1/2
              -translate-y-1/2
              h-[280px]
              w-[2px]
              bg-gradient-to-b
              from-transparent
              via-cyan-400/40
              to-transparent
              blur-sm
            "
          />

          {/* Floating Particle */}
          <div
            className="
              absolute
              top-[40px]
              left-[80px]
              w-2
              h-2
              rounded-full
              bg-cyan-400/70
              animate-bounce
            "
            style={{
              animationDuration: "5s",
            }}
          />

          <div
            className="
              absolute
              bottom-[60px]
              right-[90px]
              w-2
              h-2
              rounded-full
              bg-violet-400/70
              animate-bounce
            "
            style={{
              animationDuration: "7s",
            }}
          />

          {/* Center Core */}
          <div
            className="
              absolute
              left-1/2
              top-1/2
              -translate-x-1/2
              -translate-y-1/2
              w-32
              h-32
              rounded-full
              bg-cyan-400/10
              border
              border-cyan-400/30
              backdrop-blur-xl
              flex
              items-center
              justify-center
            "
          >

            {/* Breathing Glow */}
            <div
              className="
                absolute
                inset-0
                rounded-full
                bg-cyan-400/10
                blur-3xl
                animate-pulse
              "
            />

            <span
              className="
                relative
                text-4xl
                font-bold
                tracking-[-0.08em]
                text-white
              "
            >
              P
            </span>

          </div>

          {/* Nodes */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2">
            <Node label="GitHub" />
          </div>

          <div className="absolute right-0 top-1/2 -translate-y-1/2">
            <Node label="Projects" />
          </div>

          <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
            <Node label="Skills" />
          </div>

          <div className="absolute left-0 top-1/2 -translate-y-1/2">
            <Node label="Portfolio" />
          </div>

        </div>

        {/* Caption */}
        <div className="mt-14 text-center max-w-sm">

          <p
            className="
              text-cyan-400
              text-[11px]
              tracking-[0.35em]
              uppercase
              font-mono
              mb-4
            "
          >
            Building Developer Identity
          </p>

          <p
            className="
              text-white/45
              text-[15px]
              leading-8
            "
          >
            Connect projects, skills and experience into
            one living portfolio powered by Portlix.
          </p>

        </div>

      </div>

    </div>
  )
}

function Node({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center gap-3">

      <div
        className="
          w-12
          h-12
          rounded-full
          bg-white/[0.03]
          border
          border-white/10
          backdrop-blur-xl
        "
      />

      <span
        className="
          text-[11px]
          uppercase
          tracking-[0.18em]
          font-mono
          text-white/45
        "
      >
        {label}
      </span>

    </div>
  )
}