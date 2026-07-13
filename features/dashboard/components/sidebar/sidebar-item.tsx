"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarItemProps {
  title: string;
  href: string;
  icon: React.ElementType;
}

export default function SidebarItem({
  title,
  href,
  icon: Icon,
}: SidebarItemProps) {
  const pathname = usePathname();

  const active = pathname === href;

  return (
    <Link
      href={href}
      className={`
        relative flex items-center gap-3
        rounded-xl px-4 py-3
        transition-all duration-300
        font-mono text-sm
        ${
          active
            ? `
              bg-cyan-500/[0.05]
              text-cyan-300
              border
              border-cyan-500/15
              shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_0_15px_rgba(34,211,238,0.05)]
            `
            : `
              text-zinc-500
              hover:text-zinc-300
              hover:bg-white/[0.02]
              border
              border-transparent
            `
        }
      `}
    >
      {active && (
        <div
          className="
            absolute left-0 top-1/2
            h-6 w-[3px]
            -translate-y-1/2
            rounded-r-full
            bg-cyan-400
            shadow-[0_0_10px_rgba(34,211,238,0.8)]
          "
        />
      )}

      <Icon 
        size={18} 
        className={`transition-colors duration-300 ${active ? "text-cyan-400" : "text-zinc-500 group-hover:text-zinc-300"}`} 
      />

      <span className="font-semibold tracking-wide">
        {title}
      </span>
    </Link>

  );
}