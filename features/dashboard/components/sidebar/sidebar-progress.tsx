export default function SidebarProgress() {
  const progress = 35;

  return (
    <div className="px-4 pb-4">
      <div
        className="
          rounded-xl
          border border-white/[0.04]
          bg-[#0a0a1f]/40
          p-4
        "
      >
        <div className="flex items-center justify-between font-mono text-[11px] tracking-wider uppercase">
          <span className="font-semibold text-zinc-400">
            SHOWCASE SCORE
          </span>

          <span className="text-cyan-400 font-bold">
            {progress}%
          </span>
        </div>

        <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-white/[0.04] p-[1px]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-sky-400 shadow-[0_0_8px_rgba(34,211,238,0.5)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        <button
          className="
            mt-3
            w-full
            text-center
            text-[10px]
            font-mono
            uppercase
            tracking-widest
            text-zinc-500
            transition-colors
            hover:text-cyan-300
          "
        >
          &gt; OPTIMIZE SYSTEM
        </button>
      </div>
    </div>
  );
}