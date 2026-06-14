export default function SidebarProgress() {
  const progress = 35;

  return (
    <div className="px-4 pb-4">
      <div
        className="
        rounded-xl
        border border-zinc-800
        bg-white/[0.02]
        p-4
        "
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-white">
            Portfolio Score
          </span>

          <span className="text-sm text-sky-400">
            {progress}%
          </span>
        </div>

        <div className="mt-3 h-2 overflow-hidden rounded-full bg-zinc-800">
          <div
            className="h-full rounded-full bg-sky-400"
            style={{ width: `${progress}%` }}
          />
        </div>

        <button
          className="
          mt-4
          text-sm
          text-zinc-400
          transition-colors
          hover:text-white
          "
        >
          Complete Profile →
        </button>
      </div>
    </div>
  );
}