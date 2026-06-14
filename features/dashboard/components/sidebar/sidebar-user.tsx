import { LogOut } from "lucide-react";

export default function SidebarUser() {
  return (
    <div className="border-t border-zinc-800 p-4">
      <div
        className="
        flex items-center justify-between
        rounded-xl
        border border-zinc-800
        bg-white/[0.02]
        p-3
        "
      >
        <div className="flex items-center gap-3">
          <div
            className="
            flex h-10 w-10 items-center justify-center
            rounded-full
            border border-zinc-700
            bg-zinc-900
            text-sm font-semibold text-white
            "
          >
            A
          </div>

          <div>
            <p className="text-sm font-medium text-white">
              Apeksha
            </p>

            <p className="text-xs text-zinc-500">
              Free Plan
            </p>
          </div>
        </div>

        <button
          className="
          text-zinc-500
          transition-colors
          hover:text-white
          "
        >
          <LogOut size={16} />
        </button>
      </div>
    </div>
  );
}