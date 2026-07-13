"use client";

import { LogOut } from "lucide-react";
import { useLogout } from "@/features/auth/hooks/use-logout";

export default function SidebarUser() {
  const { logout, isLoading } = useLogout();
  return (
    
    <div className="border-t border-white/[0.04] p-4 bg-[#050515]/30">
      <div
        className="
          flex items-center justify-between
          rounded-xl
          p-2
        "
      >
        <div className="flex items-center gap-3">
          <div
            className="
              flex h-9 w-9 items-center justify-center
              rounded-xl
              border border-cyan-500/20
              bg-[#0a0a1f]
              text-xs font-mono font-bold text-cyan-400
              shadow-[0_0_10px_rgba(34,211,238,0.1)]
            "
          >
            SYS
          </div>

          <div>
            <p className="text-xs font-bold text-zinc-200">
              Apeksha
            </p>

            <p className="text-[9px] font-mono tracking-widest text-cyan-400/65 uppercase mt-0.5">
              DEV_FREE
            </p>
          </div>
        </div>

        <button
          onClick={logout}
          disabled={isLoading}
          className="
            p-1.5
            rounded-lg
            text-zinc-500
            transition-colors
            hover:text-red-400
            hover:bg-red-500/5
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          <LogOut size={15} />
        </button>
      </div>
    </div>
  );
}