"use client";

import SidebarItem from "./sidebar-item";
import SidebarUser from "./sidebar-user";

import { sidebarLinks } from "../../constants/sidebar-links";
import SidebarProgress from "./sidebar-progress";
import { X } from "lucide-react";

interface SidebarProps {
  onCloseMobile?: () => void;
}

export default function Sidebar({ onCloseMobile }: SidebarProps) {
  return (
    <aside
      className="
        w-66
        h-full
        overflow-y-auto
        border-r
        border-white/[0.06]
        bg-[#050515]/95 md:bg-[#050515]/60
        backdrop-blur-2xl
        flex flex-col
        relative
        z-20
      "
    >

      {/* Decorative vertical light strip */}
      <div className="absolute right-0 top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent" />

      <div className="p-6 relative flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2.5xl font-black tracking-[-0.05em] uppercase bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-400 to-violet-500">
              PORTFLIX
            </h1>
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
          </div>

          <p className="mt-1.5 text-[11px] font-mono tracking-widest text-cyan-400/50 uppercase">
            Build. Sync. Showcase.
          </p>
        </div>

        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="md:hidden p-1.5 rounded-lg text-zinc-400 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <div className="mx-4 border-t border-white/[0.04]" />

      <div className="px-6 py-5">
        <p
          className="
            text-[10px]
            font-mono
            uppercase
            tracking-[0.25em]
            text-zinc-500
          "
        >
          System Nodes
        </p>
      </div>

      <nav className="flex-1 px-4 space-y-1.5">
        {sidebarLinks.map((item) => (
          <div key={item.href} onClick={onCloseMobile}>
            <SidebarItem
              title={item.title}
              href={item.href}
              icon={item.icon}
            />
          </div>
        ))}
      </nav>

      <SidebarProgress />
      <SidebarUser />
    </aside>
  );
}