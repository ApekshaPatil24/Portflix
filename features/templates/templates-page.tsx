"use client"

import { useState, useEffect } from "react"
import { TEMPLATES, TemplateConfig } from "@/lib/templates/registry"
import { Check, Sparkles, ExternalLink, Loader2 } from "lucide-react"

// Mini animated preview for each template card
function TemplatePreview({ template }: { template: TemplateConfig }) {
  return (
    <div
      className="w-full h-44 rounded-xl overflow-hidden relative flex flex-col"
      style={{ backgroundColor: template.previewBg }}
    >
      {/* Simulated nav bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b" style={{ borderColor: template.isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)", backgroundColor: template.isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.7)" }}>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: template.accent }} />
          <div className="w-16 h-1.5 rounded-full opacity-40" style={{ backgroundColor: template.isDark ? "#fff" : "#000" }} />
        </div>
        <div className="w-12 h-4 rounded-full" style={{ backgroundColor: template.accent, opacity: 0.8 }} />
      </div>
      {/* Body simulation */}
      <div className="flex-1 p-4 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full blur-[30px] opacity-30" style={{ backgroundColor: template.accent }} />
        {/* Hero title lines */}
        <div className="w-3/4 h-3 rounded-full mb-2" style={{ backgroundColor: template.isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)" }} />
        <div className="w-1/2 h-2 rounded-full mb-4 opacity-50" style={{ backgroundColor: template.accent }} />
        {/* Card row */}
        <div className="flex gap-2">
          {[60, 40, 50].map((w, i) => (
            <div key={i} className="h-10 rounded-lg flex-shrink-0" style={{ width: `${w}%`, backgroundColor: template.isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)", border: `1px solid ${template.isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}` }}>
              <div className="h-1.5 w-8 rounded-full m-2" style={{ backgroundColor: template.accent, opacity: 0.7 }} />
            </div>
          ))}
        </div>
      </div>
      {/* Gradient overlay at bottom */}
      <div className="absolute bottom-0 left-0 w-full h-8 pointer-events-none" style={{ background: `linear-gradient(to top, ${template.previewBg}, transparent)` }} />
    </div>
  )
}

export default function TemplatesPage({ username }: { username: string }) {
  const [currentKey, setCurrentKey] = useState<string>("fullstack")
  const [applying, setApplying] = useState<string | null>(null)
  const [applied, setApplied] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Fetch current template on mount
  useEffect(() => {
    fetch("/api/user/portfolio")
      .then(r => r.json())
      .then(data => {
        if (data.portfolio?.templateKey) setCurrentKey(data.portfolio.templateKey)
      })
      .catch(() => {})
  }, [])

  async function applyTemplate(key: string) {
    if (applying) return
    setApplying(key)
    setError(null)
    try {
      const res = await fetch("/api/user/portfolio/template", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ templateKey: key }),
      })
      if (!res.ok) throw new Error("Failed")
      setCurrentKey(key)
      setApplied(key)
      setTimeout(() => setApplied(null), 3000)
    } catch {
      setError("Could not apply template. Please try again.")
    } finally {
      setApplying(null)
    }
  }

  return (
    <div className="min-h-screen bg-[#03030d] text-zinc-200 px-6 py-8 md:py-12 font-sans">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-3">
          <Sparkles size={22} className="text-cyan-400" />
          <h1 className="text-3xl font-black tracking-tight text-white">Portfolio Templates</h1>
        </div>
        <p className="text-sm text-zinc-500 max-w-2xl leading-relaxed">
          Choose a template that matches your role and personality. All templates display your real data — projects, skills, bio, and GitHub repos — automatically.
        </p>
        {error && (
          <div className="mt-4 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium">{error}</div>
        )}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl">
        {TEMPLATES.map((template) => {
          const isActive = currentKey === template.key
          const isApplying = applying === template.key
          const justApplied = applied === template.key

          return (
            <div
              key={template.key}
              className="group relative flex flex-col rounded-2xl border overflow-hidden transition-all duration-500 hover:-translate-y-1"
              style={{
                backgroundColor: "rgba(255,255,255,0.02)",
                borderColor: isActive ? template.accent : "rgba(255,255,255,0.06)",
                boxShadow: isActive ? `0 0 0 1px ${template.accent}40, 0 20px 60px -10px ${template.accent}20` : "none",
              }}
            >
              {/* Active badge */}
              {isActive && (
                <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg" style={{ backgroundColor: template.accent, color: "#000" }}>
                  <Check size={10} strokeWidth={3} /> Active
                </div>
              )}

              {/* Preview */}
              <div className="p-4 pb-0">
                <TemplatePreview template={template} />
              </div>

              {/* Info */}
              <div className="p-6 flex flex-col gap-4 flex-1">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-lg font-black text-white">{template.name}</h3>
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full" style={{ backgroundColor: `${template.accent}20`, color: template.accent }}>
                      {template.role}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-500 leading-relaxed mt-2">{template.description}</p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {template.tags.map(tag => (
                    <span key={tag} className="text-[10px] px-2.5 py-1 rounded-lg font-semibold text-zinc-400 bg-white/[0.04] border border-white/[0.06]">{tag}</span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-auto pt-2">
                  <button
                    onClick={() => applyTemplate(template.key)}
                    disabled={isActive || isApplying}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-black transition-all duration-300 disabled:opacity-50"
                    style={{
                      backgroundColor: isActive ? `${template.accent}20` : template.accent,
                      color: isActive ? template.accent : (template.isDark ? "#000" : "#fff"),
                    }}
                  >
                    {isApplying ? (
                      <><Loader2 size={14} className="animate-spin" /> Applying…</>
                    ) : justApplied ? (
                      <><Check size={14} strokeWidth={3} /> Applied!</>
                    ) : isActive ? (
                      <><Check size={14} strokeWidth={3} /> Current Template</>
                    ) : (
                      "Apply Template"
                    )}
                  </button>
                  <a
                    href={`/${username}`}
                    target="_blank"
                    rel="noreferrer"
                    title="Preview live portfolio"
                    className="p-2.5 rounded-xl border flex items-center justify-center hover:scale-110 transition-transform"
                    style={{ borderColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)" }}
                  >
                    <ExternalLink size={15} />
                  </a>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Info note */}
      <div className="mt-12 max-w-2xl flex items-start gap-3 px-5 py-4 rounded-2xl border border-white/[0.05] bg-white/[0.02] text-zinc-500 text-xs leading-relaxed">
        <Sparkles size={16} className="text-cyan-400 mt-0.5 shrink-0" />
        <span>Applying a template only changes the <strong className="text-zinc-300">visual style</strong> of your public portfolio. Your projects, skills, bio, GitHub data, and Curator AI suggestions remain completely untouched.</span>
      </div>
    </div>
  )
}
