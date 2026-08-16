"use client"

import { useState } from "react"
import { ExternalLink, Mail, MapPin, Palette, Globe, Star, ArrowRight } from "lucide-react"

export default function TemplateUIUX({ portfolio }: { portfolio: any }) {
  const [mode, setMode] = useState<"light" | "dark">("light")

  const p = mode === "light"
    ? { bg: "#FAFAFA",      cardBg: "#FFFFFF",          border: "#E5E7EB",        text: "#111827",    textMuted: "#6B7280", accent: "#8B5CF6",         accentSoft: "#EDE9FE", accentText: "#7C3AED",      nav: "#FFFFFF" }
    : { bg: "#0D0A14",      cardBg: "rgba(25,18,40,0.9)", border: "rgba(139,92,246,0.2)", text: "#F5F3FF", textMuted: "#A78BFA", accent: "#A78BFA",   accentSoft: "rgba(139,92,246,0.15)", accentText: "#C4B5FD", nav: "rgba(25,18,40,0.9)" }

  return (
    <main style={{ backgroundColor: p.bg, color: p.text }} className="min-h-screen font-sans pb-32 transition-colors duration-700">
      {mode === "light" && (
        <>
          <div className="fixed top-0 right-0 w-[800px] h-[800px] rounded-full blur-[200px] opacity-10 pointer-events-none" style={{ background: "radial-gradient(circle, #8B5CF6, transparent 70%)" }} />
          <div className="fixed bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-[150px] opacity-8 pointer-events-none" style={{ background: "radial-gradient(circle, #A78BFA, transparent 70%)" }} />
        </>
      )}

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl border-b" style={{ backgroundColor: `${p.nav}CC`, borderColor: p.border }}>
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-black text-lg tracking-tight">{portfolio.displayName}</span>
          <div className="flex items-center gap-4">
            <button onClick={() => setMode(mode === "light" ? "dark" : "light")} className="p-2 rounded-full border hover:scale-110 transition-transform" style={{ borderColor: p.border }}>
              <Palette size={16} style={{ color: p.accent }} />
            </button>
            <a href={`mailto:${portfolio.user?.email || ""}`} className="px-5 py-2 rounded-full text-sm font-bold hover:opacity-80 transition-opacity shadow-md flex items-center gap-2" style={{ backgroundColor: p.accent, color: "#fff" }}>
              <Mail size={14} /> Contact
            </a>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6">
        {/* Hero — Magazine style */}
        <section className="pt-24 pb-20 grid grid-cols-1 md:grid-cols-2 gap-16 items-center border-b" style={{ borderColor: p.border }}>
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] mb-8 px-4 py-2 rounded-full" style={{ backgroundColor: p.accentSoft, color: p.accentText }}>
              <Star size={12} fill="currentColor" /> {portfolio.professionalTitle}
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-8" style={{ color: p.text }}>
              {portfolio.displayName?.split(" ").map((word: string, i: number) => (
                <span key={i} className={i % 2 !== 0 ? "block" : "block"} style={i % 2 !== 0 ? { color: p.accent } : {}}>{word}</span>
              ))}
            </h1>
            {portfolio.headline && <p className="text-lg leading-relaxed mb-10" style={{ color: p.textMuted }}>{portfolio.headline}</p>}
            <div className="flex flex-wrap gap-3">
              {portfolio.githubUrl && <a href={portfolio.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-full border font-semibold text-sm hover:scale-105 transition-transform shadow-sm" style={{ borderColor: p.border }}>GitHub</a>}
              {portfolio.linkedinUrl && <a href={portfolio.linkedinUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-full border font-semibold text-sm hover:scale-105 transition-transform shadow-sm" style={{ borderColor: p.border }}>LinkedIn</a>}
              {portfolio.twitterUrl && <a href={portfolio.twitterUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-full border font-semibold text-sm hover:scale-105 transition-transform shadow-sm" style={{ borderColor: p.border }}>Twitter</a>}
            </div>
          </div>
          <div className="relative flex justify-center">
            <div className="absolute inset-0 rounded-full blur-[80px] opacity-20" style={{ background: `radial-gradient(circle, ${p.accent}, transparent 70%)` }} />
            <div className="relative w-64 h-64 rounded-[3rem] border-2 overflow-hidden shadow-2xl" style={{ borderColor: p.border }}>
              {portfolio.avatarUrl ? <img src={portfolio.avatarUrl} alt={portfolio.displayName} className="w-full h-full object-cover" /> : (
                <div className="w-full h-full flex items-center justify-center text-5xl font-black" style={{ backgroundColor: p.accentSoft, color: p.accent }}>
                  {portfolio.displayName?.charAt(0) || "?"}
                </div>
              )}
            </div>
            {portfolio.location && (
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold shadow-lg backdrop-blur-md whitespace-nowrap" style={{ backgroundColor: p.cardBg, borderColor: p.border, color: p.textMuted }}>
                <MapPin size={12} style={{ color: p.accent }} />{portfolio.location}
              </div>
            )}
          </div>
        </section>

        {/* About */}
        {portfolio.about && (
          <section className="py-20 border-b grid grid-cols-1 md:grid-cols-3 gap-12" style={{ borderColor: p.border }}>
            <div>
              <h2 className="text-xs font-black uppercase tracking-[0.2em] mb-6" style={{ color: p.accent }}>About</h2>
              <div className="w-8 h-1 rounded-full" style={{ backgroundColor: p.accent }} />
            </div>
            <div className="md:col-span-2">
              <p className="text-xl leading-relaxed font-medium" style={{ color: p.textMuted }}>{portfolio.about}</p>
            </div>
          </section>
        )}

        {/* Skills */}
        {portfolio.skills.length > 0 && (
          <section className="py-20 border-b" style={{ borderColor: p.border }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div>
                <h2 className="text-xs font-black uppercase tracking-[0.2em] mb-6" style={{ color: p.accent }}>Skills</h2>
                <div className="w-8 h-1 rounded-full" style={{ backgroundColor: p.accent }} />
              </div>
              <div className="md:col-span-2 flex flex-wrap gap-3">
                {portfolio.skills.map((s: string) => (
                  <span key={s} className="px-5 py-2.5 rounded-full text-sm font-semibold border hover:scale-105 transition-all" style={{ borderColor: p.border, backgroundColor: p.cardBg, color: p.text }}>{s}</span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Projects — Editorial cards */}
        {portfolio.projects.length > 0 && (
          <section className="py-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
              <div>
                <h2 className="text-xs font-black uppercase tracking-[0.2em] mb-6" style={{ color: p.accent }}>Work</h2>
                <div className="w-8 h-1 rounded-full" style={{ backgroundColor: p.accent }} />
              </div>
              <div className="md:col-span-2">
                <p className="text-sm leading-relaxed" style={{ color: p.textMuted }}>A selection of projects I've designed and built.</p>
              </div>
            </div>
            <div className="space-y-6">
              {portfolio.projects.map((project: any) => (
                <div key={project.id} className="group p-8 rounded-3xl border transition-all duration-500 hover:shadow-xl hover:-translate-y-1 flex flex-col md:flex-row md:items-center gap-8" style={{ backgroundColor: p.cardBg, borderColor: p.border }}>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      <h3 className="text-xl font-black" style={{ color: p.text }}>{project.title}</h3>
                      <div className="flex flex-wrap gap-1.5">
                        {project.techStack.slice(0, 3).map((t: string) => <span key={t} className="text-xs px-2.5 py-1 rounded-full font-semibold" style={{ backgroundColor: p.accentSoft, color: p.accentText }}>{t}</span>)}
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: p.textMuted }}>{project.description}</p>
                  </div>
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noreferrer" className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full border font-bold text-sm hover:scale-105 transition-transform shadow-sm group-hover:border-violet-400" style={{ borderColor: p.border, color: p.accent }}>
                      View <ArrowRight size={14} />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="pt-8 pb-8 border-t flex items-center justify-between flex-wrap gap-4" style={{ borderColor: p.border, color: p.textMuted }}>
          <span className="text-sm font-medium">© {new Date().getFullYear()} {portfolio.displayName}</span>
          <span className="text-xs">Designed & built with care.</span>
        </footer>
      </div>
    </main>
  )
}
