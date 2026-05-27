import NavActions from "./nav-actions"
import NavLinks from "./nav-links"

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[200] h-16 px-[6%] flex items-center justify-between">

      {/* Glass Background */}
      <div className="absolute inset-0 bg-[rgba(2,3,13,0.6)] backdrop-blur-2xl border-b border-white/[0.05]" />

      {/* Glow Line */}
      <div className="absolute bottom-0 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

      {/* Logo */}
      <div
        className="
          relative z-10
          font-black
          tracking-[-1.5px]
          text-[32px]
          leading-none
          bg-gradient-to-r
          from-cyan-400
          via-sky-300
          to-violet-400
          bg-clip-text
          text-transparent
        "
        style={{
          fontFamily:
            "var(--font-display)",
        }}
      >
        Portlix
      </div>

      <NavLinks />

      <NavActions />

    </nav>
  )
}