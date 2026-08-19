"use client"

import { useState, useEffect } from "react"
import { ExternalLink, Eye, Sun, Moon, Menu, X } from "lucide-react"
import { useTheme } from "@/features/dashboard/components/theme-provider"
import PortfolioQRModal from "@/features/portfolio/components/portfolio-qr-modal"
import Sidebar from "../sidebar/sidebar"

export default function Topbar() {
  const [username, setUsername] = useState<string | null>(null)
  const [displayName, setDisplayName] = useState<string | undefined>(undefined)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    async function fetchUserUsername() {
      try {
        const res = await fetch("/api/user/portfolio")
        const data = await res.json()
        if (data?.portfolio?.username) {
          setUsername(data.portfolio.username)
          setDisplayName(data.portfolio.displayName)
        }
      } catch (err) {
        console.error("Failed to fetch username for topbar preview", err)
      }
    }
    fetchUserUsername()
  }, [])

  return (
    <>
      <header
        className="
          h-16
          border-b
          border-white/[0.04]
          bg-[#03030d]/40
          backdrop-blur-md
          px-4 md:px-6
          sticky
          top-0
          z-30
        "
      >
        <div className="flex h-full items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Mobile Sidebar Hamburger Toggle */}
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="md:hidden p-1.5 rounded-lg border border-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Toggle navigation sidebar"
            >
              {mobileSidebarOpen ? <X size={18} /> : <Menu size={18} />}
            </button>

            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
              <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                Console // System
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            {/* Light / Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="
                flex h-9 w-9 items-center justify-center
                rounded-xl
                border border-white/[0.1]
                bg-white/5
                text-zinc-300
                hover:text-cyan-400
                hover:border-cyan-500/40
                transition-all
                cursor-pointer
              "
              title={`Switch to ${theme === "dark" ? "Light Mode" : "Dark Mode"}`}
            >
              {theme === "dark" ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} className="text-indigo-400" />}
            </button>

            {/* Unique QR Code Generator */}
            {username && (
              <PortfolioQRModal username={username} displayName={displayName} />
            )}

            {/* Universal Live Portfolio Preview Button */}
            {username && (
              <a
                href={`/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex items-center gap-2
                  px-3 md:px-4 py-1.5
                  rounded-xl
                  border border-cyan-500/30
                  bg-cyan-500/10
                  text-cyan-400
                  hover:bg-cyan-500/20
                  hover:border-cyan-400/60
                  hover:shadow-[0_0_20px_rgba(34,211,238,0.25)]
                  text-xs font-mono font-bold uppercase tracking-wider
                  transition-all
                  duration-300
                  cursor-pointer
                "
              >
                <Eye size={14} className="animate-pulse" />
                <span className="hidden sm:inline">Live Preview</span>
                <ExternalLink size={12} />
              </a>
            )}

            <div
              className="
                hidden sm:flex h-9 w-9 items-center justify-center
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

      {/* Mobile Sidebar Overlay Drawer */}
      {mobileSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-[150] flex">
          {/* Backdrop */}
          <div
            onClick={() => setMobileSidebarOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
          />

          {/* Drawer container */}
          <div className="relative z-10 w-72 max-w-[80vw] h-full bg-[#050515] animate-in slide-in-from-left duration-200">
            <Sidebar onCloseMobile={() => setMobileSidebarOpen(false)} />
          </div>
        </div>
      )}
    </>
  )
}