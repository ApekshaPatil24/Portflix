"use client";

import SidebarItem from "./sidebar-item";
import SidebarUser from "./sidebar-user";

import { sidebarLinks } from "../../constants/sidebar-links";
import SidebarProgress from "./sidebar-progress";

export default function Sidebar() {
  return (
    <aside
  className="
  w-64
  overflow-hidden
  border-r
  border-zinc-800
  bg-[#0F0F11]
  flex flex-col
"
>
      <div className="p-6">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          PORTLIX
        </h1>

        <p className="mt-1 text-sm text-zinc-600">
          Build. Sync. Showcase.
        </p>
      </div>

      <div className="mx-4 border-t border-zinc-800" />

      <div className="px-6 py-4">
  <p
    className="
    text-[11px]
    uppercase
    tracking-[0.18em]
    text-zinc-600
    "
  >
    Navigation
  </p>
</div>

      <nav className="flex-1 px-4 space-y-1">

        {sidebarLinks.map((item) => (
          <SidebarItem
            key={item.href}
            title={item.title}
            href={item.href}
            icon={item.icon}
          />
        ))}
      </nav>

      <SidebarProgress />
      <SidebarUser />
    </aside>
  );
}