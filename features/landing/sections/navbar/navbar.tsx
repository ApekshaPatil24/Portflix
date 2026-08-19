"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import NavActions from "./nav-actions"
import NavLinks from "./nav-links"

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-[200] h-16 px-[5%] md:px-[6%] flex items-center justify-between">
      {/* Glass Background */}
      <div className="absolute inset-0 bg-[rgba(2,3,13,0.7)] backdrop-blur-2xl border-b border-white/[0.05]" />

      {/* Glow Line */}
      <div className="absolute bottom-0 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

      {/* Logo */}
      <Link
        href="/"
        className="
          relative z-10
          font-black
          tracking-[-1.5px]
          text-[28px] md:text-[32px]
          leading-none
          bg-gradient-to-r
          from-cyan-400
          via-sky-300
          to-violet-400
          bg-clip-text
          text-transparent
        "
        style={{
          fontFamily: "var(--font-display)",
        }}
      >
        Portflix
      </Link>

      {/* Desktop Links & Actions */}
      <div className="hidden md:flex items-center gap-8">
        <NavLinks />
        <NavActions />
      </div>

      {/* Mobile Hamburger Toggle Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden relative z-10 p-2 text-zinc-400 hover:text-white transition-colors cursor-pointer"
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-16 bg-[#030312]/95 backdrop-blur-2xl border-b border-white/10 p-6 flex flex-col gap-5 z-[190] animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-4 font-mono text-sm">
            {["Features", "Templates", "Pricing", "About"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
                className="text-zinc-300 hover:text-cyan-400 transition-colors py-1"
              >
                {link}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-3">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl border border-white/10 text-xs font-semibold text-zinc-200 hover:text-white"
            >
              Log in
            </Link>
            <Link
              href="/onboarding"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 shadow-lg"
            >
              Get Started →
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}