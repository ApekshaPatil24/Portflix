export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Hero */}
      <section
        className="
        rounded-2xl
        border border-zinc-800
        bg-[#111113]
        p-8
      "
      >
        <h1 className="text-3xl font-bold text-white">
          Welcome Back 👋
        </h1>

        <p className="mt-3 text-zinc-400">
          Your portfolio is 35% complete.
          Complete your profile to unlock your full
          portfolio experience.
        </p>

        <button
          className="
          mt-6
          rounded-xl
          border border-zinc-700
          bg-white/[0.04]
          px-5
          py-2.5
          text-sm
          font-medium
          text-white
          transition-colors
          hover:bg-white/[0.08]
        "
        >
          Continue Setup
        </button>
      </section>

      {/* Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Portfolio Preview */}
        <section
          className="
          rounded-2xl
          border border-zinc-800
          bg-[#111113]
          p-6
        "
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">
              Portfolio Preview
            </h2>

            <button className="text-sm text-sky-400">
              View →
            </button>
          </div>

          <div
            className="
            mt-5
            rounded-xl
            border border-zinc-800
            bg-[#0F0F11]
            p-5
          "
          >
            <h3 className="text-xl font-semibold text-white">
              Apeksha Patel
            </h3>

            <p className="mt-2 text-zinc-400">
              Full Stack Developer
            </p>

            <div className="mt-6 flex gap-2">
              <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300">
                React
              </span>

              <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300">
                Next.js
              </span>

              <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300">
                AI
              </span>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section
          className="
          rounded-2xl
          border border-zinc-800
          bg-[#111113]
          p-6
        "
        >
          <h2 className="text-lg font-semibold text-white">
            Quick Stats
          </h2>

          <div className="mt-6 grid gap-4">
            <div className="rounded-xl border border-zinc-800 p-4">
              <p className="text-sm text-zinc-500">
                Portfolio Views
              </p>

              <p className="mt-2 text-2xl font-bold text-white">
                12
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800 p-4">
              <p className="text-sm text-zinc-500">
                Profile Score
              </p>

              <p className="mt-2 text-2xl font-bold text-white">
                35%
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800 p-4">
              <p className="text-sm text-zinc-500">
                GitHub Sync
              </p>

              <p className="mt-2 text-2xl font-bold text-green-400">
                Connected
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* AI Suggestions */}
      <section
        className="
        rounded-2xl
        border border-zinc-800
        bg-[#111113]
        p-6
      "
      >
        <h2 className="text-lg font-semibold text-white">
          AI Suggestions
        </h2>

        <div className="mt-5 space-y-3">
          <div className="rounded-xl border border-zinc-800 p-4">
            Add 2 more GitHub projects to improve your
            portfolio quality.
          </div>

          <div className="rounded-xl border border-zinc-800 p-4">
            Upload a professional profile image.
          </div>

          <div className="rounded-xl border border-zinc-800 p-4">
            Add a short developer bio.
          </div>
        </div>
      </section>
    </div>
  );
}