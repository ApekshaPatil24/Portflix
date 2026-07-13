import {
  Bell,
  Search,
} from "lucide-react";

export default function Topbar() {
  return (
    <header
      className="
        h-16
        border-b
        border-white/[0.04]
        bg-[#03030d]/30
        backdrop-blur-md
        px-6
        sticky
        top-0
        z-10
      "
    >
      <div className="flex h-full items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
          <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400">
            Console // System
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            className="
              flex h-9 w-9 items-center justify-center
              rounded-xl
              border border-white/[0.04]
              bg-[#050515]/60
              text-zinc-500
              hover:text-cyan-300
              hover:border-cyan-500/20
              hover:shadow-[0_0_15px_rgba(34,211,238,0.1)]
              transition-all
              duration-300
              cursor-pointer
            "
          >
            <Search size={16} />
          </button>

          <button
            className="
              flex h-9 w-9 items-center justify-center
              rounded-xl
              border border-white/[0.04]
              bg-[#050515]/60
              text-zinc-500
              hover:text-cyan-300
              hover:border-cyan-500/20
              hover:shadow-[0_0_15px_rgba(34,211,238,0.1)]
              transition-all
              duration-300
              cursor-pointer
            "
          >
            <Bell size={16} />
          </button>

          <div
            className="
              flex h-9 w-9 items-center justify-center
              rounded-xl
              border border-cyan-500/20
              bg-[#0a0a20]
              text-xs font-mono font-bold text-cyan-400
              shadow-[0_0_10px_rgba(34,211,238,0.1)]
            "
          >
            SYS
          </div>
        </div>
      </div>
    </header>
  );
}