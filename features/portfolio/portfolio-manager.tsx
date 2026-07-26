"use client"

import { useState, useEffect } from "react"
import { Sparkles, Save, Code2, AlertTriangle, ExternalLink, RefreshCw, Pencil } from "lucide-react"

interface Project {
  id: string
  title: string
  description: string
  techStack: string[]
  updatedAt: string
}

interface PortfolioData {
  displayName: string
  professionalTitle: string
  headline: string
  about: string | null
  location: string | null
  skills: string[]
  githubUrl: string | null
  linkedinUrl: string | null
  twitterUrl: string | null
  websiteUrl: string | null
}

interface PortfolioAuditSuggestion {
  id: string
  type: string
  message: string
  canAutoFix: boolean
}

export default function PortfolioManager() {
  const [projects, setProjects] = useState<Project[]>([])
  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null)
  const [suggestions, setSuggestions] = useState<PortfolioAuditSuggestion[]>([])
  
  const [loading, setLoading] = useState(true)
  const [showWizard, setShowWizard] = useState(false)
  const [auditing, setAuditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [enhancingId, setEnhancingId] = useState<string | null>(null)
  const [fixingSection, setFixingSection] = useState<string | null>(null)
  const [message, setMessage] = useState("")

  const theme = {
    bg: "#03030d",
    cardBg: "#07071e",
    border: "rgba(255, 255, 255, 0.06)",
    text: "#f4f4f5",
    mutedText: "#a1a1aa",
    accent: "#22d3ee",
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/user/portfolio")
        const data = await res.json()
        if (data.portfolio) {
          setPortfolio(data.portfolio)
          setProjects(data.projects || [])
        }
      } catch (err) {
        console.error("Failed to load portfolio", err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleStartWizard = async () => {
    setShowWizard(true)
    setAuditing(true)
    setSuggestions([])
    try {
      const res = await fetch("/api/user/portfolio/audit")
      const data = await res.json()
      if (data.suggestions) {
        setSuggestions(data.suggestions)
      }
    } catch (err) {
      console.error("Failed to run audit", err)
    } finally {
      setAuditing(false)
    }
  }

  const handleSkip = (id: string) => {
    setSuggestions(prev => prev.filter(s => s.id !== id))
  }

  const handleAutoFix = async (type: string, id: string) => {
    setFixingSection(type)
    try {
      const res = await fetch("/api/user/portfolio/autofix", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sectionType: type })
      })
      const data = await res.json()
      if (data.generatedText && portfolio) {
        if (type === "skills") {
          const newSkills = data.generatedText.split(",").map((s: string) => s.trim())
          setPortfolio({ ...portfolio, skills: newSkills })
        } else {
          setPortfolio({ ...portfolio, [type]: data.generatedText })
        }
        setSuggestions(prev => prev.filter(s => s.id !== id))
        setMessage("Curator AI drafted a new section! Review it and click Save.")
        setTimeout(() => setMessage(""), 5000)
      }
    } catch (err) {
      console.error("Autofix failed", err)
    } finally {
      setFixingSection(null)
    }
  }

  const handleSaveInfo = async () => {
    if (!portfolio) return
    setSaving(true)
    setMessage("")
    try {
      const res = await fetch("/api/user/portfolio", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(portfolio)
      })
      if (!res.ok) throw new Error("Save failed")
      setMessage("Portfolio information saved successfully!")
      setTimeout(() => setMessage(""), 3000)
    } catch (error) {
      setMessage("Failed to save changes.")
    } finally {
      setSaving(false)
    }
  }

  const handleEnhanceProject = async (projectId: string) => {
    setEnhancingId(projectId)
    try {
      const res = await fetch(`/api/projects/${projectId}/enhance`, { method: "POST" })
      const data = await res.json()
      if (res.ok && data.project) {
        setProjects(prev => prev.map(p => p.id === projectId ? data.project : p))
      }
    } catch (error) {
      console.error("Enhance failed", error)
    } finally {
      setEnhancingId(null)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!portfolio) return
    const { name, value } = e.target
    setPortfolio({ ...portfolio, [name]: value })
  }

  if (loading) return <div className="p-8 text-cyan-400 font-mono animate-pulse">Loading System Data...</div>

  return (
    <div className="space-y-8 pb-12">
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <h1 className="text-3xl font-bold tracking-tight text-white">Portfolio Manager</h1>
            <button
              onClick={handleStartWizard}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-violet-500/20 to-cyan-500/20 border border-cyan-500/30 text-cyan-400 font-bold font-mono text-[11px] uppercase tracking-wider hover:brightness-125 transition-all"
            >
              <Sparkles size={14} />
              ✨ Ask Curator AI
            </button>
          </div>
          <p className="text-zinc-400">Manage your profile sections and Curator AI projects.</p>
        </div>
      </div>

      {showWizard && (
        <section className="rounded-2xl border p-6 flex flex-col gap-4 shadow-2xl bg-[#07071e]/90 backdrop-blur-xl relative overflow-hidden" style={{ borderColor: theme.border }}>
          <div className="absolute left-0 top-0 h-[1px] w-full bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-50" />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles size={20} className="text-violet-400" />
              <h2 className="text-sm font-mono uppercase tracking-widest font-bold text-white">Curator AI Setup Wizard</h2>
            </div>
            {auditing && <span className="text-[10px] font-mono uppercase text-cyan-400 animate-pulse font-bold">Scanning Portfolio...</span>}
            {!auditing && (
              <button onClick={() => setShowWizard(false)} className="text-[10px] uppercase font-mono text-zinc-500 hover:text-white transition-colors">
                Close [X]
              </button>
            )}
          </div>
          
          <div className="mt-2 min-h-[120px] flex items-center justify-center border border-white/[0.04] bg-black/40 rounded-xl p-6 relative">
            {auditing ? (
              <div className="flex flex-col items-center gap-3">
                <div className="h-5 w-5 border-2 border-violet-500/20 border-t-violet-400 rounded-full animate-spin" />
                <p className="text-xs text-zinc-400 font-mono">Curator is analyzing your projects...</p>
              </div>
            ) : suggestions.length > 0 ? (
              <div className="w-full flex flex-col gap-5">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5"><AlertTriangle size={16} className="text-amber-400" /></div>
                  <p className="text-sm leading-relaxed text-zinc-200">
                    {suggestions[0].message}
                  </p>
                </div>
                
                <div className="flex items-center gap-3 pt-2">
                  {suggestions[0].canAutoFix && (
                    <button
                      onClick={() => handleAutoFix(suggestions[0].type, suggestions[0].id)}
                      disabled={fixingSection === suggestions[0].type}
                      className="text-[11px] uppercase font-bold font-mono tracking-wider flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-violet-500/20 text-violet-400 border border-violet-500/30 hover:bg-violet-500/30 transition-all disabled:opacity-50 min-w-[140px]"
                    >
                      {fixingSection === suggestions[0].type ? (
                        "WRITING..."
                      ) : (
                        <>
                          <Sparkles size={12} /> Yes, Apply Fix
                        </>
                      )}
                    </button>
                  )}
                  <button
                    onClick={() => handleSkip(suggestions[0].id)}
                    className="text-[11px] uppercase font-bold font-mono tracking-wider px-4 py-2 rounded-lg bg-white/5 text-zinc-400 border border-white/10 hover:bg-white/10 hover:text-white transition-all"
                  >
                    No, Skip
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 text-emerald-400">
                <Sparkles size={24} className="mb-1" />
                <p className="text-sm font-bold tracking-wide">You are all caught up!</p>
                <p className="text-xs text-zinc-400 text-center max-w-sm">Curator AI has no further suggestions. Your portfolio is fully optimized.</p>
              </div>
            )}
          </div>
        </section>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        {/* Left Col: Profile Editor */}
        <section className="space-y-6">
          <div className="rounded-2xl border p-6 flex flex-col gap-5 shadow-lg" style={{ backgroundColor: theme.cardBg, borderColor: theme.border }}>
            <div className="flex items-center gap-2 mb-2 border-b pb-4" style={{ borderColor: theme.border }}>
              <Pencil size={18} className="text-cyan-400" />
              <h2 className="text-sm font-mono uppercase tracking-widest font-semibold text-zinc-300">Section Editor</h2>
            </div>

            {portfolio && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase text-zinc-500 tracking-wider">Display Name</label>
                    <input name="displayName" value={portfolio.displayName || ""} onChange={handleChange} className="w-full bg-black/40 border rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500/50" style={{ borderColor: theme.border }} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase text-zinc-500 tracking-wider">Professional Title</label>
                    <input name="professionalTitle" value={portfolio.professionalTitle || ""} onChange={handleChange} className="w-full bg-black/40 border rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500/50" style={{ borderColor: theme.border }} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase text-zinc-500 tracking-wider">Headline / Intro</label>
                  <input name="headline" value={portfolio.headline || ""} onChange={handleChange} className="w-full bg-black/40 border rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500/50" style={{ borderColor: theme.border }} />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase text-zinc-500 tracking-wider">About Me Section</label>
                  <textarea name="about" value={portfolio.about || ""} onChange={handleChange} rows={5} className="w-full bg-black/40 border rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500/50" style={{ borderColor: theme.border }} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase text-zinc-500 tracking-wider">Location</label>
                    <input name="location" value={portfolio.location || ""} onChange={handleChange} className="w-full bg-black/40 border rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500/50" style={{ borderColor: theme.border }} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase text-zinc-500 tracking-wider">GitHub URL</label>
                    <input name="githubUrl" value={portfolio.githubUrl || ""} onChange={handleChange} className="w-full bg-black/40 border rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500/50" style={{ borderColor: theme.border }} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase text-zinc-500 tracking-wider">LinkedIn URL</label>
                    <input name="linkedinUrl" value={portfolio.linkedinUrl || ""} onChange={handleChange} className="w-full bg-black/40 border rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500/50" style={{ borderColor: theme.border }} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase text-zinc-500 tracking-wider">Twitter URL</label>
                    <input name="twitterUrl" value={portfolio.twitterUrl || ""} onChange={handleChange} className="w-full bg-black/40 border rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500/50" style={{ borderColor: theme.border }} />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: theme.border }}>
                  <span className="text-xs text-emerald-400 font-mono">{message}</span>
                  <button 
                    onClick={handleSaveInfo}
                    disabled={saving}
                    className="flex items-center gap-2 bg-white text-black px-5 py-2 rounded font-bold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-colors disabled:opacity-50"
                  >
                    <Save size={14} />
                    {saving ? "SAVING..." : "SAVE SECTIONS"}
                  </button>
                </div>
              </>
            )}
          </div>
        </section>

        {/* Right Col: Curator AI Projects */}
        <section className="space-y-6">
          <div className="rounded-2xl border p-6 shadow-lg" style={{ backgroundColor: theme.cardBg, borderColor: theme.border }}>
            <div className="flex items-center gap-2 mb-6 border-b pb-4" style={{ borderColor: theme.border }}>
              <Code2 size={18} className="text-violet-400" />
              <h2 className="text-sm font-mono uppercase tracking-widest font-semibold text-zinc-300">Curator AI Project List</h2>
            </div>

            <div className="space-y-4">
              {projects.length === 0 ? (
                <div className="text-center p-8 border border-dashed rounded-xl" style={{ borderColor: theme.border }}>
                  <p className="text-sm text-zinc-500">No projects synced yet. Go to your Dashboard to sync with GitHub.</p>
                </div>
              ) : (
                projects.map(project => (
                  <div key={project.id} className="p-5 rounded-xl border flex flex-col gap-3 transition-all hover:border-cyan-500/30" style={{ backgroundColor: "#02030d", borderColor: theme.border }}>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm tracking-tight text-white">{project.title}</span>
                      <span className="text-[10px] uppercase opacity-50 font-mono tracking-widest">
                        {new Date(project.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <p className="text-xs leading-relaxed text-zinc-400">
                      {project.description || "No description provided."}
                    </p>
                    
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {project.techStack.map(tech => (
                        <span key={tech} className="px-2 py-0.5 text-[9px] uppercase font-mono font-bold rounded shadow-sm border opacity-80" style={{ borderColor: theme.border, color: theme.text }}>
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length === 0 && (
                        <span className="text-[9px] uppercase font-mono opacity-40">No Tech Stack</span>
                      )}
                    </div>

                    <div className="pt-3 border-t flex justify-end" style={{ borderColor: theme.border }}>
                      <button
                        onClick={() => handleEnhanceProject(project.id)}
                        disabled={enhancingId === project.id}
                        className="text-[10px] uppercase font-bold font-mono tracking-wider flex items-center gap-1 hover:brightness-125 transition-all disabled:opacity-50"
                        style={{ color: theme.accent }}
                      >
                        <Sparkles size={12} />
                        {enhancingId === project.id ? "CURATOR AI IS REWRITING..." : "REWRITE WITH CURATOR AI"}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
