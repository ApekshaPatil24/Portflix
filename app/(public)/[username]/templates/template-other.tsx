"use client"

import { useState } from "react"
import { ExternalLink, Mail, MapPin, Globe, Briefcase, User, Layers, ArrowUpRight } from "lucide-react"

export default function TemplateOther({ portfolio }: { portfolio: any }) {
  const [dark, setDark] = useState(true)

  const p = dark
    ? { bg: "#100C08", cardBg: "rgba(22,16,12,0.9)", border: "rgba(249,115,22,0.18)", text: "#FFF7ED", textMuted: "#D6A47A", accent: "#F97316", accentSoft: "rgba(249,115,22,0.12)", nav: "rgba(16,12,8,0.95)" }
    : { bg: "#FFFBF5", cardBg: "#FFFFFF", border: "#E7E0D8", text: "#1C1008", textMuted: "#78716C", accent: "#EA580C", accentSoft: "#FFF1E0", nav: "#FFFBF5" }

  return (
    <main style={{ backgroundColor: p.bg, color: p.text }} className="min-h-screen font-sans pb-32 transition-colors duration-700">
      {/* Subtle warm grain */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, ${p.accent} 1px, transparent 0)`, backgroundSize: "48px 48px" }} />
      <div className="fixed top-0 right-0 w-[500px] h-[500px] rounded-full blur-[150px] opacity-[0.07] pointer-events-none" style={{ backgroundColor: p.accent }} />

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl border-b" style={{ backgroundColor: `${p.nav}E6`, borderColor: p.border }}>
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <div className="font-black text-lg tracking-tight">{portfolio.displayName}</div>
            <div className="text-xs font-medium mt-0.5" style={{ color: p.accent }}>{portfolio.professionalTitle}</div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setDark(!dark)} className="px-3 py-1.5 rounded-full border text-xs font-bold hover:scale-105 transition-all" style={{ borderColor: p.border, color: p.textMuted }}>
              {dark ? "☀ Light" : "🌙 Dark"}
            </button>
            <a href={`mailto:${portfolio.user?.email || ""}`} className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold shadow-md hover:opacity-80 transition-opacity" style={{ backgroundColor: p.accent, color: "#fff" }}>
              <Mail size={14} /> Hire Me
            </a>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6">
        {/* Hero */}
        <section className="pt-24 pb-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center border-b" style={{ borderColor: p.border }}>
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.15em] mb-6" style={{ color: p.accent }}>👋 Hello, I'm</div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-tight mb-6">{portfolio.displayName}</h1>
            <p className="text-xl font-medium mb-8" style={{ color: p.textMuted }}>{portfolio.headline || `${portfolio.professionalTitle} with a passion for creating meaningful work.`}</p>
            <div className="flex flex-wrap gap-3">
              {portfolio.githubUrl && <a href={portfolio.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-xl border font-semibold text-sm hover:scale-105 transition-transform" style={{ borderColor: p.border, backgroundColor: p.cardBg }}>GitHub</a>}
              {portfolio.linkedinUrl && <a href={portfolio.linkedinUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-xl border font-semibold text-sm hover:scale-105 transition-transform" style={{ borderColor: p.border, backgroundColor: p.cardBg }}>LinkedIn</a>}
              {portfolio.twitterUrl && <a href={portfolio.twitterUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-xl border font-semibold text-sm hover:scale-105 transition-transform" style={{ borderColor: p.border, backgroundColor: p.cardBg }}>Twitter</a>}
              {portfolio.websiteUrl && <a href={portfolio.websiteUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-xl border font-semibold text-sm hover:scale-105 transition-transform" style={{ borderColor: p.border, backgroundColor: p.cardBg }}><Globe size={16} style={{ color: p.accent }} />Website</a>}
            </div>
          </div>
          <div className="flex flex-col items-center md:items-end gap-6">
            <div className="relative w-56 h-56 rounded-3xl overflow-hidden border-2 shadow-2xl" style={{ borderColor: p.border }}>
              {portfolio.avatarUrl ? <img src={portfolio.avatarUrl} alt={portfolio.displayName} className="w-full h-full object-cover" /> : (
                <div className="w-full h-full flex items-center justify-center text-5xl font-black" style={{ backgroundColor: p.accentSoft, color: p.accent }}>
                  {portfolio.displayName?.charAt(0) || "?"}
                </div>
              )}
            </div>
            {portfolio.location && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium" style={{ borderColor: p.border, backgroundColor: p.cardBg, color: p.textMuted }}>
                <MapPin size={14} style={{ color: p.accent }} />{portfolio.location}
              </div>
            )}
            {portfolio.isAvailable && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider" style={{ backgroundColor: p.accentSoft, color: p.accent }}>
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: p.accent }} /> Available for work
              </div>
            )}
          </div>
        </section>

        {/* About */}
        {portfolio.about && (
          <section className="py-16 border-b" style={{ borderColor: p.border }}>
            <div className="flex items-center gap-3 mb-8"><User size={20} style={{ color: p.accent }} /><h2 className="text-2xl font-black">About Me</h2></div>
            <p className="text-lg leading-relaxed max-w-3xl" style={{ color: p.textMuted }}>{portfolio.about}</p>
          </section>
        )}

        {/* Skills */}
        {portfolio.skills.length > 0 && (
          <section className="py-16 border-b" style={{ borderColor: p.border }}>
            <div className="flex items-center gap-3 mb-8"><Layers size={20} style={{ color: p.accent }} /><h2 className="text-2xl font-black">Skills & Expertise</h2></div>
            <div className="flex flex-wrap gap-3">
              {portfolio.skills.map((s: string) => (
                <span key={s} className="px-5 py-2.5 rounded-xl border text-sm font-semibold hover:scale-105 transition-all shadow-sm" style={{ borderColor: p.border, backgroundColor: p.cardBg }}>{s}</span>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {portfolio.projects.length > 0 && (
          <section className="py-16">
            <div className="flex items-center gap-3 mb-10"><Briefcase size={20} style={{ color: p.accent }} /><h2 className="text-2xl font-black">Projects</h2></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {portfolio.projects.map((project: any) => (
                <div key={project.id} className="group p-7 rounded-2xl border transition-all duration-400 hover:-translate-y-1 hover:shadow-xl flex flex-col" style={{ backgroundColor: p.cardBg, borderColor: p.border }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = p.accent }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = p.border }}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: p.accentSoft }}>
                      <Briefcase size={18} style={{ color: p.accent }} />
                    </div>
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noreferrer" className="p-2 rounded-xl border opacity-40 hover:opacity-100 transition-opacity group-hover:border-orange-400" style={{ borderColor: p.border }}>
                        <ArrowUpRight size={16} style={{ color: p.accent }} />
                      </a>
                    )}
                  </div>
                  <h3 className="font-black text-lg mb-3" style={{ color: p.text }}>{project.title}</h3>
                  <p className="text-sm leading-relaxed mb-6 flex-1" style={{ color: p.textMuted }}>{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((t: string) => <span key={t} className="text-xs px-3 py-1 rounded-lg font-semibold" style={{ backgroundColor: p.accentSoft, color: p.accent }}>{t}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="mt-8 pt-8 pb-8 border-t flex items-center justify-between flex-wrap gap-4" style={{ borderColor: p.border, color: p.textMuted }}>
          <span className="text-sm font-medium">© {new Date().getFullYear()} {portfolio.displayName}</span>
          <a href={`mailto:${portfolio.user?.email || ""}`} className="flex items-center gap-2 text-sm font-bold hover:opacity-80 transition-opacity" style={{ color: p.accent }}>
            <Mail size={14} /> Get in touch
          </a>
        </footer>
      </div>
    </main>
  )
}
