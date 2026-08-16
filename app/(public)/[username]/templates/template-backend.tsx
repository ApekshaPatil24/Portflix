"use client"

import { useState } from "react"
import { ExternalLink, Mail, MapPin, Globe } from "lucide-react"

export default function TemplateBackend({ portfolio }: { portfolio: any }) {
  const [dark, setDark] = useState(true)

  const bg    = dark ? "#0A0A0A" : "#F5F0E8"
  const text  = dark ? "#F5F0E8" : "#0A0A0A"
  const muted = dark ? "rgba(245,240,232,0.4)" : "rgba(10,10,10,0.45)"
  const gold  = "#C9A84C"
  const cardBg= dark ? "rgba(245,240,232,0.04)" : "rgba(10,10,10,0.04)"
  const border= dark ? "rgba(201,168,76,0.18)" : "rgba(10,10,10,0.12)"

  return (
    <main style={{ backgroundColor: bg, color: text }} className="min-h-screen font-sans transition-colors duration-700">

      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between px-8 md:px-16 py-6 border-b" style={{ borderColor: border }}>
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase" style={{ color: gold }}>WEB & BACKEND ENGINEER</span>
          <div className="flex items-center gap-6">
            <button onClick={() => setDark(!dark)} className="text-[10px] font-mono uppercase tracking-widest opacity-40 hover:opacity-80 transition-opacity">{dark ? "◐ LIGHT" : "● DARK"}</button>
            <span className="text-[10px] font-mono tracking-[0.2em] opacity-30 uppercase">◆ {new Date().getFullYear()}</span>
          </div>
        </div>

        {/* Giant headline */}
        <div className="px-8 md:px-16 pt-16 pb-0 relative">
          <div className="relative">
            <h1 className="font-black leading-none select-none text-[15vw] md:text-[13vw] tracking-[-0.04em] uppercase" style={{ color: text, opacity: 0.95 }}>PORTFL<span style={{ color: gold }}>IO</span></h1>
          </div>
        </div>

        {/* Info row below giant text */}
        <div className="px-8 md:px-16 py-10 flex flex-col md:flex-row md:items-end justify-between gap-10 border-b" style={{ borderColor: border }}>
          <div className="max-w-sm">
            <div className="text-xs tracking-[0.15em] uppercase mb-4 font-semibold" style={{ color: gold }}>CREATIVE<br/>{portfolio.professionalTitle?.toUpperCase() || "BACKEND ENGINEER"}</div>
            <div className="w-12 h-px mb-4" style={{ backgroundColor: gold }} />
            <p className="text-sm leading-relaxed" style={{ color: muted }}>
              {portfolio.headline || `Building scalable, high-performance systems and APIs with precision and purpose.`}
            </p>
          </div>
          <div>
            <div className="text-4xl md:text-6xl font-black uppercase tracking-[-0.02em]" style={{ color: text }}>{portfolio.displayName?.split(" ")[0]}<br/><span style={{ color: gold }}>{portfolio.displayName?.split(" ").slice(1).join(" ")}</span></div>
          </div>
        </div>
      </section>

      {/* ── SELECTED WORKS ──────────────────────────────────── */}
      <section className="px-8 md:px-16 py-20 border-b" style={{ borderColor: border }}>
        <div className="flex items-center justify-between mb-12">
          <div className="text-[10px] font-mono tracking-[0.4em] uppercase" style={{ color: gold }}>SELECTED WORKS</div>
          <div className="h-px flex-1 mx-8" style={{ backgroundColor: border }} />
          {portfolio.githubUrl && <a href={portfolio.githubUrl} target="_blank" rel="noreferrer" className="text-[10px] font-mono tracking-widest uppercase opacity-40 hover:opacity-80 transition-opacity flex items-center gap-1">VIEW ALL ↗</a>}
        </div>

        {portfolio.projects.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {portfolio.projects.slice(0, 4).map((project: any) => (
              <div key={project.id} className="group relative aspect-[3/4] rounded-2xl overflow-hidden border flex flex-col justify-between p-6 cursor-pointer transition-all duration-500 hover:scale-[1.02]" style={{ backgroundColor: cardBg, borderColor: border }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: `linear-gradient(135deg, ${gold}10, transparent)` }} />
                <div className="relative z-10">
                  <div className="text-[10px] font-mono uppercase tracking-widest mb-3" style={{ color: gold }}>{project.techStack[0]}</div>
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noreferrer" className="p-2 rounded-full border inline-flex opacity-0 group-hover:opacity-100 transition-all" style={{ borderColor: gold, color: gold }}>
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>
                <div className="relative z-10">
                  <h3 className="font-black text-sm uppercase leading-tight mb-2" style={{ color: text }}>{project.title}</h3>
                  <div className="text-[10px] uppercase tracking-widest" style={{ color: muted }}>{project.techStack.slice(0, 2).join(" / ")}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center text-xs font-mono uppercase tracking-widest" style={{ color: muted }}>No projects yet</div>
        )}
      </section>

      {/* ── SERVICES + PROCESS ──────────────────────────────── */}
      <section className="px-8 md:px-16 py-20 grid grid-cols-1 md:grid-cols-2 gap-16 border-b" style={{ borderColor: border }}>
        {/* Skills / Services */}
        <div>
          <div className="text-[10px] font-mono tracking-[0.4em] uppercase mb-10" style={{ color: gold }}>SERVICES</div>
          <div className="space-y-6">
            {(portfolio.skills.length > 0 ? portfolio.skills.slice(0, 4) : ["API Design", "Database Architecture", "System Design", "DevOps"]).map((s: string, i: number) => (
              <div key={s} className="flex items-start gap-4 pb-6 border-b" style={{ borderColor: border }}>
                <div className="text-2xl font-black tabular-nums opacity-20 w-8" style={{ color: gold }}>◆</div>
                <div>
                  <div className="font-bold text-sm uppercase tracking-wider mb-1" style={{ color: text }}>{s}</div>
                  <div className="text-xs leading-relaxed" style={{ color: muted }}>Building systems that scale with precision and care.</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Process */}
        <div>
          <div className="text-[10px] font-mono tracking-[0.4em] uppercase mb-10" style={{ color: gold }}>MY PROCESS</div>
          <div className="space-y-8">
            {["DISCOVER", "DESIGN", "DEVELOP", "DELIVER"].map((step, i) => (
              <div key={step} className="flex items-start gap-6">
                <div className="text-4xl font-black tabular-nums" style={{ color: gold, opacity: 0.3 }}>{String(i+1).padStart(2,"0")}</div>
                <div>
                  <div className="w-4 h-px mt-3 mb-2" style={{ backgroundColor: gold }} />
                  <div className="font-bold text-sm uppercase tracking-wider" style={{ color: text }}>{step}</div>
                  <div className="text-xs mt-1 leading-relaxed" style={{ color: muted }}>
                    {["Understanding requirements, architecture, and scope.", "Planning system design and technical stack.", "Building robust, tested, production-ready code.", "Deploying, monitoring, and iterating for excellence."][i]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT + QUOTE ───────────────────────────────────── */}
      <section className="px-8 md:px-16 py-20 grid grid-cols-1 md:grid-cols-3 gap-12 border-b" style={{ borderColor: border }}>
        <div className="md:col-span-2">
          <div className="text-[10px] font-mono tracking-[0.4em] uppercase mb-8" style={{ color: gold }}>ABOUT</div>
          {portfolio.avatarUrl && <img src={portfolio.avatarUrl} alt={portfolio.displayName} className="w-24 h-24 rounded-full object-cover mb-8 border-2" style={{ borderColor: gold }} />}
          <p className="text-lg leading-relaxed mb-6" style={{ color: muted }}>{portfolio.about || `Experienced ${portfolio.professionalTitle} who lives and breathes clean architecture. I write code that lasts.`}</p>
          <div className="font-black text-xl italic" style={{ color: gold }}>// {portfolio.displayName}</div>
        </div>
        <div className="flex flex-col justify-center">
          <div className="text-6xl font-black mb-4 opacity-20" style={{ color: gold }}>"</div>
          <p className="text-sm leading-relaxed italic" style={{ color: muted }}>Good design is not just how it looks — it's how it works, and how well it scales.</p>
          <div className="mt-6 pt-6 border-t text-[10px] font-mono uppercase tracking-widest" style={{ borderColor: border, color: gold }}>— {portfolio.displayName}</div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <footer className="px-8 md:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="text-2xl font-black uppercase mb-2" style={{ color: gold }}>LET'S CREATE<br/>SOMETHING<br/>BEAUTIFUL</div>
          </div>
          <div>
            <div className="text-[10px] font-mono tracking-[0.3em] uppercase mb-4" style={{ color: gold }}>LET'S CONNECT</div>
            <div className="space-y-2 text-sm" style={{ color: muted }}>
              {portfolio.user?.email && <div className="flex items-center gap-2"><Mail size={12} />{portfolio.user.email}</div>}
              {portfolio.location && <div className="flex items-center gap-2"><MapPin size={12} />{portfolio.location}</div>}
              {portfolio.websiteUrl && <div className="flex items-center gap-2"><Globe size={12} />{portfolio.websiteUrl}</div>}
            </div>
          </div>
          <div>
            <div className="text-[10px] font-mono tracking-[0.3em] uppercase mb-4" style={{ color: gold }}>FOLLOW</div>
            <div className="space-y-2">
              {portfolio.githubUrl && <a href={portfolio.githubUrl} target="_blank" rel="noreferrer" className="block text-sm hover:opacity-100 transition-opacity" style={{ color: muted }}>GitHub ↗</a>}
              {portfolio.linkedinUrl && <a href={portfolio.linkedinUrl} target="_blank" rel="noreferrer" className="block text-sm hover:opacity-100 transition-opacity" style={{ color: muted }}>LinkedIn ↗</a>}
            </div>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t flex items-center justify-between flex-wrap gap-4" style={{ borderColor: border }}>
          <div className="text-xs font-mono uppercase tracking-widest" style={{ color: muted }}>© {new Date().getFullYear()} {portfolio.displayName}</div>
          <div className="text-4xl font-black tracking-[-0.05em] opacity-10" style={{ color: gold }}>{portfolio.displayName?.split(" ").map((w: string) => w[0]).join("").slice(0,2)}</div>
        </div>
      </footer>
    </main>
  )
}
