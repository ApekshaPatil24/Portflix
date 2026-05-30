export default function OnboardingVisual() {
  return (
    <div className="hidden lg:flex w-1/2 relative items-center justify-center overflow-hidden border-r border-white/5">

      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full" />

        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-violet-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 flex flex-col items-center">

        <div
          className="
          w-[320px]
          h-[320px]
          rounded-[40px]
          border
          border-cyan-400/20
          bg-white/[0.02]
          backdrop-blur-xl
          shadow-[0_0_80px_rgba(34,211,238,0.15)]
          animate-pulse
        "
        />

        <div className="mt-12 text-center max-w-sm">
          <p className="text-cyan-400 text-xs tracking-[0.3em] uppercase font-mono mb-4">
            Syncing Developer Identity...
          </p>

          <p className="text-white/50 text-sm leading-relaxed">
            Secure your unique developer identity across the
            Portlix ecosystem.
          </p>
        </div>

      </div>

    </div>
  )
}