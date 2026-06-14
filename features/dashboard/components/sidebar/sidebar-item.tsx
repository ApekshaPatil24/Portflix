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
    transition-colors duration-200
    ${
      active
        ? `
          bg-white/[0.04]
          text-white
          border
          border-zinc-800
        `
        : `
          text-zinc-500
          hover:text-zinc-200
          hover:bg-white/[0.03]
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
      bg-sky-400
      "
    />
  )}

  <Icon size={19} />

  <span className="font-medium">
    {title}
  </span>
</Link>

  );
}