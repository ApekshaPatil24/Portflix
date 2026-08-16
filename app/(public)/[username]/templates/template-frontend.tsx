"use client"

import { useState } from "react"
import { ExternalLink, Mail, MapPin, Globe, Zap } from "lucide-react"

export default function TemplateFrontend({ portfolio }: { portfolio: any }) {
  const [activeSkill, setActiveSkill] = useState<string | null>(null)

  const terracotta = "#C1644C"
  const olive      = "#5C6B3A"
  const sand       = "#E8D5B0"
  const dark       = "#1A1208"
  const cream      = "#FAF6EE"

  return (
    <main style={{ backgroundColor: cream, color: dark }} className="min-h-screen font-sans">

      {/* ── NAV ─────────────────────────────────────────────── */}
      <nav className="flex items-center justify-between px-8 md:px-16 py-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: olive }}>
            <span className="text-white text-xs font-black">{portfolio.displayName?.charAt(0)}</span>
          </div>
          <span className="font-bold text-sm tracking-tight">{portfolio.username}</span>
        </div>
        <div className="flex items-center gap-5">
          {portfolio.githubUrl && <a href={portfolio.githubUrl} target="_blank" rel="noreferrer" className="text-xs font-mono opacity-40 hover:opacity-80 transition-opacity uppercase tracking-widest">GitHub</a>}
          {portfolio.linkedinUrl && <a href={portfolio.linkedinUrl} target="_blank" rel="noreferrer" className="text-xs font-mono opacity-40 hover:opacity-80 transition-opacity uppercase tracking-widest">LinkedIn</a>}
          <a href={`mailto:${portfolio.user?.email || ""}`} className="px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-white transition-all" style={{ backgroundColor: terracotta }}>Hire Me</a>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="px-8 md:px-16 pt-10 pb-24 relative overflow-hidden">
        {/* Organic blob shapes */}
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-30" style={{ background: `radial-gradient(circle, ${terracotta}, transparent 70%)`, filter: "blur(60px)" }} />
        <div className="absolute bottom-0 left-1/4 w-56 h-56 rounded-full opacity-20" style={{ background: `radial-gradient(circle, ${olive}, transparent 70%)`, filter: "blur(80px)" }} />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            {/* Role badge */}
            <div className="inline-flex items-center gap-3 mb-8 px-4 py-2 rounded-full border" style={{ borderColor: `${olive}40`, backgroundColor: `${olive}10` }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: olive }} />
              <span className="text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: olive }}>{portfolio.professionalTitle}</span>
            </div>

            {/* Display name */}
            <div className="text-[11px] font-mono tracking-[0.3em] uppercase mb-3 opacity-40">Hi, I'm</div>
            <h1 className="font-black leading-none tracking-[-0.03em] mb-6">
              <span className="block text-6xl md:text-8xl" style={{ color: dark }}>{portfolio.displayName?.split(" ")[0]}</span>
              <span className="block text-5xl md:text-7xl" style={{ WebkitTextStroke: `2px ${terracotta}`, color: "transparent" }}>{portfolio.displayName?.split(" ").slice(1).join(" ")}</span>
            </h1>
            <h2 className="text-base italic font-medium mb-10 max-w-sm" style={{ color: `${dark}60` }}>"{portfolio.headline || `Designing beautiful web experiences for brands with soul.`}"</h2>

            <div className="flex items-center gap-4 flex-wrap">
              <a href="#work" className="px-8 py-3 rounded-full font-black text-sm text-white inline-flex items-center gap-2" style={{ backgroundColor: terracotta }}>View My Work <ExternalLink size={14} /></a>
              {portfolio.location && <span className="flex items-center gap-2 text-xs opacity-50"><MapPin size={12} />{portfolio.location}</span>}
            </div>
          </div>

          {/* Right side: avatar + organic shape */}
          <div className="relative flex justify-center">
            <div className="relative">
              {/* The organic circle behind */}
              <div className="absolute inset-[-20px] rounded-full opacity-15" style={{ background: `linear-gradient(135deg, ${terracotta}, ${olive})` }} />
              {/* Avatar */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4" style={{ borderColor: sand }}>
                {portfolio.avatarUrl ? (
                  <img src={portfolio.avatarUrl} alt={portfolio.displayName} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-6xl font-black" style={{ backgroundColor: `${terracotta}20`, color: terracotta }}>
                    {portfolio.displayName?.charAt(0)}
                  </div>
                )}
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl" style={{ backgroundColor: olive, color: "#fff" }}>
                Creative<br/>• Strategic<br/>• Impactful
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SELECTED WORK ────────────────────────────────────── */}
      <section id="work" className="px-8 md:px-16 py-20" style={{ backgroundColor: `${sand}30` }}>
        <div className="flex items-center gap-4 mb-3">
          <div className="w-4 h-px" style={{ backgroundColor: terracotta }} />
          <div className="text-[10px] font-mono tracking-[0.4em] uppercase" style={{ color: terracotta }}>SELECTED WORK</div>
          <div className="flex-1 h-px" style={{ backgroundColor: `${dark}10` }} />
        </div>
        <h2 className="text-4xl font-black mb-14" style={{ color: dark }}>Projects</h2>

        {portfolio.projects.length > 0 ? (
          <div className="space-y-8">
            {portfolio.projects.map((project: any, i: number) => (
              <div key={project.id} className="group grid grid-cols-1 md:grid-cols-3 gap-8 items-center p-8 rounded-3xl border transition-all duration-500 hover:shadow-xl" style={{ borderColor: `${dark}10`, backgroundColor: "#fff" }}>
                {/* Number + title col */}
                <div className="md:col-span-1">
                  <div className="text-5xl font-black tabular-nums opacity-10 mb-3" style={{ color: terracotta }}>{String(i+1).padStart(2,"0")}</div>
                  <h3 className="text-xl font-black mb-2" style={{ color: dark }}>{project.title}</h3>
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs font-bold rounded-full px-4 py-2 transition-all" style={{ backgroundColor: `${terracotta}15`, color: terracotta }}>
                      View ↗
                    </a>
                  )}
                </div>
                {/* Description */}
                <div className="md:col-span-1">
                  <p className="text-sm leading-relaxed" style={{ color: `${dark}60` }}>{project.description}</p>
                </div>
                {/* Tags */}
                <div className="md:col-span-1 flex flex-wrap gap-2">
                  {project.techStack.map((t: string) => (
                    <span key={t} className="px-3 py-1.5 rounded-full text-xs font-semibold" style={{ backgroundColor: `${olive}15`, color: olive }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center text-sm opacity-30">No projects yet</div>
        )}
      </section>

      {/* ── SKILLS / TOOLS ───────────────────────────────────── */}
      {portfolio.skills.length > 0 && (
        <section className="px-8 md:px-16 py-20 border-t" style={{ borderColor: `${dark}08` }}>
          <div className="flex items-center gap-4 mb-12">
            <div className="text-[10px] font-mono tracking-[0.4em] uppercase" style={{ color: olive }}>TOOLS & TECHNOLOGIES</div>
          </div>
          <div className="flex flex-wrap gap-3">
            {portfolio.skills.map((s: string) => (
              <button key={s}
                onMouseEnter={() => setActiveSkill(s)}
                onMouseLeave={() => setActiveSkill(null)}
                className="px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300"
                style={{
                  backgroundColor: activeSkill === s ? terracotta : `${dark}06`,
                  color: activeSkill === s ? "#fff" : dark,
                  transform: activeSkill === s ? "scale(1.08)" : "scale(1)",
                  border: `1px solid ${activeSkill === s ? terracotta : `${dark}12`}`
                }}>
                {s}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* ── ABOUT ────────────────────────────────────────────── */}
      {portfolio.about && (
        <section className="px-8 md:px-16 py-20" style={{ backgroundColor: `${sand}20` }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-[10px] font-mono tracking-[0.4em] uppercase mb-6" style={{ color: terracotta }}>ABOUT ME</div>
              <p className="text-xl leading-relaxed" style={{ color: `${dark}70` }}>{portfolio.about}</p>
              <div className="mt-8 italic font-black text-2xl" style={{ color: terracotta, fontFamily: "Georgia, serif" }}>Great design is good business.</div>
            </div>
            <div className="space-y-4">
              {portfolio.skills.slice(0, 4).map((s: string) => (
                <div key={s} className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: terracotta }} />
                  <div className="font-semibold text-sm">{s}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FOOTER / CTA ─────────────────────────────────────── */}
      <footer className="px-8 md:px-16 py-20">
        <div className="rounded-3xl p-12 md:p-16 relative overflow-hidden" style={{ backgroundColor: olive }}>
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-[80px] opacity-30" style={{ background: `radial-gradient(circle, ${terracotta}, transparent)` }} />
          <div className="relative z-10">
            <div className="text-3xl md:text-5xl font-black text-white mb-4">Let's Create Something<br/><span className="opacity-60">Beautiful Together</span></div>
            <p className="text-sm text-white/60 mb-8 max-w-md">Have a project in mind? I'd love to hear from you.</p>
            <div className="flex items-center gap-4 flex-wrap">
              <a href={`mailto:${portfolio.user?.email || ""}`} className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-black text-sm transition-all hover:opacity-90" style={{ backgroundColor: terracotta, color: "#fff" }}>
                <Mail size={14} /> Get in Touch
              </a>
              <div className="flex flex-col text-white/50 text-xs">
                {portfolio.user?.email && <span>{portfolio.user.email}</span>}
                {portfolio.location && <span className="flex items-center gap-1 mt-1"><MapPin size={10} />{portfolio.location}</span>}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 text-[10px] font-mono opacity-30 text-center uppercase tracking-widest">© {new Date().getFullYear()} {portfolio.displayName}</div>
      </footer>
    </main>
  )
}
