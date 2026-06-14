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
      border-zinc-800
      bg-[#0F0F11]
      px-6
      "
    >
      <div className="flex h-full items-center justify-between">
        <h2 className="text-lg font-semibold text-white">
          Dashboard
        </h2>

        <div className="flex items-center gap-3">
          <button
            className="
            flex h-10 w-10 items-center justify-center
            rounded-lg
            border border-zinc-800
            bg-white/[0.02]
            text-zinc-400
            hover:text-white
            "
          >
            <Search size={18} />
          </button>

          <button
            className="
            flex h-10 w-10 items-center justify-center
            rounded-lg
            border border-zinc-800
            bg-white/[0.02]
            text-zinc-400
            hover:text-white
            "
          >
            <Bell size={18} />
          </button>

          <div
            className="
            flex h-10 w-10 items-center justify-center
            rounded-full
            border border-zinc-800
            bg-zinc-900
            text-sm font-semibold text-white
            "
          >
            A
          </div>
        </div>
      </div>
    </header>
  );
}