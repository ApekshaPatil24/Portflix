"use client"

import { useState } from "react"
import { ExternalLink, Mail, MapPin, Globe, ChevronRight } from "lucide-react"

export default function TemplateFullstack({ portfolio }: { portfolio: any }) {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <main className="min-h-screen font-sans" style={{ backgroundColor: "#060818", color: "#E8F0FE" }}>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-between overflow-hidden px-8 md:px-16 pt-10 pb-16">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(100,149,237,1) 1px,transparent 1px),linear-gradient(90deg,rgba(100,149,237,1) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        {/* Radial glow */}
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full blur-[160px] opacity-20 pointer-events-none" style={{ background: "radial-gradient(circle, #4F8EF7, transparent 70%)" }} />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[160px] opacity-10 pointer-events-none" style={{ background: "radial-gradient(circle, #7C3AED, transparent 70%)" }} />

        {/* Nav */}
        <nav className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-blue-400/70">{portfolio.username}</span>
          </div>
          <div className="flex items-center gap-6">
            {portfolio.githubUrl && <a href={portfolio.githubUrl} target="_blank" rel="noreferrer" className="text-xs font-mono tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity">GitHub</a>}
            {portfolio.linkedinUrl && <a href={portfolio.linkedinUrl} target="_blank" rel="noreferrer" className="text-xs font-mono tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity">LinkedIn</a>}
            {portfolio.websiteUrl && <a href={portfolio.websiteUrl} target="_blank" rel="noreferrer" className="text-xs font-mono tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity">Website</a>}
            <a href={`mailto:${portfolio.user?.email || ""}`} className="px-5 py-2 rounded-full border border-blue-400/30 text-xs font-mono font-bold tracking-widest text-blue-400 hover:bg-blue-400 hover:text-black transition-all duration-300">CONTACT</a>
          </div>
        </nav>

        {/* Big type hero */}
        <div className="relative z-10 flex-1 flex flex-col justify-center pt-16">
          <div className="text-[10px] font-mono tracking-[0.4em] text-blue-400/60 uppercase mb-6">I'm a</div>
          <h1 className="text-6xl md:text-[8vw] lg:text-[9vw] font-black tracking-[-0.03em] leading-[0.9] uppercase mb-10" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.15)", color: "#fff" }}>
            {(portfolio.professionalTitle || "Full Stack Developer").split(" ").map((word: string, i: number) => (
              <span key={i} className="block" style={i % 2 === 1 ? { color: "#4F8EF7" } : {}}>{word}</span>
            ))}
          </h1>
          <div className="flex items-center gap-8 flex-wrap">
            <a href="#projects" className="inline-flex items-center gap-3 px-7 py-3 rounded-full font-bold text-sm" style={{ backgroundColor: "#4F8EF7", color: "#fff" }}>
              View Projects <ChevronRight size={16} />
            </a>
            {portfolio.location && <span className="flex items-center gap-2 text-xs font-mono opacity-40"><MapPin size={12} />{portfolio.location}</span>}
            {portfolio.isAvailable && <span className="flex items-center gap-2 text-xs font-mono text-emerald-400"><span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Open to work</span>}
          </div>
        </div>

        {/* Bottom info bar */}
        <div className="relative z-10 flex items-end justify-between mt-16 pt-8 border-t border-white/[0.06]">
          <div>
            <div className="text-3xl font-black text-white">{portfolio.displayName}</div>
            <div className="text-xs font-mono text-blue-400/60 tracking-widest uppercase mt-1">{portfolio.professionalTitle}</div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center"><div className="text-2xl font-black text-white">{portfolio.projects?.length || 0}+</div><div className="text-[10px] font-mono opacity-30 uppercase tracking-widest">Projects</div></div>
            <div className="w-px h-12 bg-white/10" />
            <div className="text-center"><div className="text-2xl font-black text-white">{portfolio.skills?.length || 0}+</div><div className="text-[10px] font-mono opacity-30 uppercase tracking-widest">Skills</div></div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ─────────────────────────────────────────────── */}
      <section className="px-8 md:px-16 py-24 grid grid-cols-1 md:grid-cols-2 gap-16 border-t border-white/[0.05]">
        <div>
          <div className="text-[10px] font-mono tracking-[0.4em] text-blue-400/60 uppercase mb-6">// About</div>
          <p className="text-xl leading-relaxed font-light" style={{ color: "rgba(232,240,254,0.7)" }}>
            {portfolio.about || `Dedicated ${portfolio.professionalTitle} passionate about building high-performance digital systems and solving complex technical challenges at scale.`}
          </p>
          <div className="flex flex-wrap gap-2 mt-10">
            {portfolio.skills.slice(0, 8).map((s: string) => (
              <span key={s} className="px-4 py-2 rounded-full text-xs font-mono font-bold border border-blue-400/20 text-blue-400/70 hover:border-blue-400/60 hover:text-blue-400 transition-all">{s}</span>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <div className="grid grid-cols-2 gap-4">
            {[{label: "Available", val: portfolio.isAvailable ? "Yes" : "No"}, {label: "Location", val: portfolio.location || "Remote"}, {label: "Projects", val: `${portfolio.projects?.length || 0}+`}, {label: "Skills", val: `${portfolio.skills?.length || 0}+`}].map(item => (
              <div key={item.label} className="p-6 rounded-2xl border border-white/[0.06]" style={{ backgroundColor: "rgba(79,142,247,0.05)" }}>
                <div className="text-[10px] font-mono text-blue-400/40 uppercase tracking-widest mb-2">{item.label}</div>
                <div className="text-xl font-black text-white">{item.val}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ─────────────────────────────────────────── */}
      <section id="projects" className="px-8 md:px-16 py-24 border-t border-white/[0.05]">
        <div className="flex items-center justify-between mb-16">
          <div>
            <div className="text-[10px] font-mono tracking-[0.4em] text-blue-400/60 uppercase mb-3">// Selected Work</div>
            <h2 className="text-4xl font-black text-white">Projects</h2>
          </div>
        </div>
        <div className="space-y-0">
          {portfolio.projects.length > 0 ? portfolio.projects.map((project: any, i: number) => (
            <div key={project.id}
              className="group py-10 border-t border-white/[0.05] flex flex-col md:flex-row md:items-center gap-8 cursor-pointer transition-all duration-500"
              style={{ backgroundColor: hovered === project.id ? "rgba(79,142,247,0.04)" : "transparent" }}
              onMouseEnter={() => setHovered(project.id)}
              onMouseLeave={() => setHovered(null)}>
              <div className="text-5xl font-black tabular-nums opacity-10 select-none w-16 shrink-0 group-hover:opacity-30 transition-opacity" style={{ color: "#4F8EF7" }}>{String(i+1).padStart(2,"0")}</div>
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-3 flex-wrap">
                  <h3 className="text-2xl font-black text-white group-hover:text-blue-400 transition-colors">{project.title}</h3>
                  <div className="flex gap-2 flex-wrap">
                    {project.techStack.slice(0, 3).map((t: string) => <span key={t} className="text-[10px] px-2.5 py-1 rounded font-mono" style={{ backgroundColor: "rgba(79,142,247,0.12)", color: "#4F8EF7" }}>{t}</span>)}
                  </div>
                </div>
                <p className="text-sm leading-relaxed opacity-50">{project.description}</p>
              </div>
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noreferrer" className="shrink-0 p-3 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-all hover:border-blue-400/50 hover:bg-blue-400/10">
                  <ExternalLink size={16} style={{ color: "#4F8EF7" }} />
                </a>
              )}
            </div>
          )) : (
            <div className="py-32 text-center opacity-20 font-mono text-sm uppercase tracking-widest">No projects synchronized</div>
          )}
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────── */}
      <footer className="px-8 md:px-16 py-16 border-t border-white/[0.05]">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <div className="text-[10px] font-mono tracking-[0.4em] text-blue-400/60 uppercase mb-2">Let's build something</div>
            <div className="text-3xl font-black text-white">{portfolio.displayName}</div>
          </div>
          <div className="flex items-center gap-6 flex-wrap">
            {portfolio.user?.email && <a href={`mailto:${portfolio.user.email}`} className="flex items-center gap-2 text-sm font-mono opacity-50 hover:opacity-100 hover:text-blue-400 transition-all"><Mail size={14} />{portfolio.user.email}</a>}
            {portfolio.githubUrl && <a href={portfolio.githubUrl} target="_blank" rel="noreferrer" className="text-sm font-mono opacity-50 hover:opacity-100 hover:text-blue-400 transition-all">GitHub ↗</a>}
            {portfolio.linkedinUrl && <a href={portfolio.linkedinUrl} target="_blank" rel="noreferrer" className="text-sm font-mono opacity-50 hover:opacity-100 hover:text-blue-400 transition-all">LinkedIn ↗</a>}
          </div>
        </div>
        <div className="mt-8 text-[10px] font-mono opacity-20 uppercase tracking-widest">© {new Date().getFullYear()} {portfolio.displayName} — Built with Portflix</div>
      </footer>
    </main>
  )
}
