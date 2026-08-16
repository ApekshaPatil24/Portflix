"use client"

import { useState, useEffect, useRef } from "react"
import { 
  Terminal, 
  Activity, 
  Cpu, 
  Eye, 
  RefreshCw, 
  AlertTriangle, 
  ExternalLink,
  Code,
  UserCircle,
  Sparkles,
  ArrowRight,
  GitBranch,
  Plus,
  Check,
  Trash2,
  X
} from "lucide-react"

interface Project {
  id: string
  title: string
  description: string
  techStack: string[]
  updatedAt?: string | Date
}

interface DashboardPageProps {
  githubUsername: string | null
  userEmail: string
  displayName: string
  username: string
  skills: string[]
  professionalTitle?: string
  templateKey?: string
  projects?: Project[]
  avatarUrl?: string | null
  needsSync?: boolean
}

function generateProceduralTheme(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const hue1 = Math.abs(hash % 360);
  const hue2 = (hue1 + 60 + Math.abs((hash >> 3) % 100)) % 360; 
  
  return {
    background: `linear-gradient(135deg, hsl(${hue1}, 80%, 8%), hsl(${hue2}, 70%, 5%))`,
    cardBg: `hsl(${hue1}, 40%, 10%)`,
    accent: `hsl(${hue1}, 80%, 60%)`,
    accentGlow: `0 0 20px hsl(${hue1}, 80%, 50%, 0.4)`,
    border: `hsl(${hue1}, 50%, 25%)`,
    text: `hsl(${hue1}, 80%, 85%)`,
    mutedText: `hsl(${hue1}, 30%, 60%)`,
  }
}

export default function DashboardPage({
  githubUsername,
  userEmail,
  displayName,
  username,
  skills,
  professionalTitle = "Developer",
  templateKey = "minimal",
  projects = [],
  avatarUrl,
  needsSync = false,
}: DashboardPageProps) {
  const [connectedUsername, setConnectedUsername] = useState<string | null>(githubUsername)
  const [authError, setAuthError] = useState<string | null>(null)
  const [localProjects, setLocalProjects] = useState<Project[]>(projects)
  const [localAvatar, setLocalAvatar] = useState<string | null | undefined>(avatarUrl)
  const [generatingAvatar, setGeneratingAvatar] = useState(false)
  const [enhancingProjectId, setEnhancingProjectId] = useState<string | null>(null)

  // GitHub Repo Manager States
  const [pendingRepos, setPendingRepos] = useState<any[]>([])
  const [importedRepos, setImportedRepos] = useState<any[]>([])
  const [loadingRepos, setLoadingRepos] = useState(false)
  const [showRepoModal, setShowRepoModal] = useState(false)
  const [addingRepoName, setAddingRepoName] = useState<string | null>(null)
  const [deletingProjectId, setDeletingProjectId] = useState<string | null>(null)

  const fetchGithubRepos = async () => {
    if (!isGithubConnected) return
    setLoadingRepos(true)
    try {
      const res = await fetch("/api/projects")
      const data = await res.json()
      if (res.ok) {
        setPendingRepos(data.pendingRepos || [])
        setImportedRepos(data.importedRepos || [])
      }
    } catch (err) {
      console.error("Failed to fetch GitHub repos", err)
    } finally {
      setLoadingRepos(false)
    }
  }

  const handleImportSingleRepo = async (repoName: string) => {
    setAddingRepoName(repoName)
    setLogs(prev => [...prev, `[AI] Fetching repo details for "${repoName}"...`, `[AI] Curator AI analyzing code & README...`])
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repoName }),
      })
      const data = await res.json()
      if (res.ok && data.project) {
        setLocalProjects(prev => [data.project, ...prev])
        setPendingRepos(prev => prev.filter(r => r.name !== repoName))
        setLogs(prev => [...prev, `[SEC] Project "${repoName}" successfully added to portfolio!`, ">> LIVE PORTFOLIO UPDATED."])
      } else {
        setLogs(prev => [...prev, `[ERROR] Failed to add "${repoName}": ${data.error || "Unknown error"}`])
      }
    } catch (err: any) {
      setLogs(prev => [...prev, `[ERROR] Failed to add repository: ${err?.message || "Server error"}`])
    } finally {
      setAddingRepoName(null)
    }
  }

  const handleDeleteProject = async (projectId: string, projectTitle: string) => {
    if (!confirm(`Are you sure you want to remove "${projectTitle}" from your portfolio?`)) return
    setDeletingProjectId(projectId)
    try {
      const res = await fetch(`/api/projects/${projectId}`, { method: "DELETE" })
      if (res.ok) {
        setLocalProjects(prev => prev.filter(p => p.id !== projectId))
        setLogs(prev => [...prev, `[SYSTEM] Removed "${projectTitle}" from portfolio.`])
        // Refresh repos list if modal open
        fetchGithubRepos()
      } else {
        const data = await res.json()
        setLogs(prev => [...prev, `[ERROR] Failed to remove project: ${data.error || "Error"}`])
      }
    } catch (err) {
      setLogs(prev => [...prev, "[ERROR] Failed to remove project from portfolio."])
    } finally {
      setDeletingProjectId(null)
    }
  }

  const isGithubConnected = !!connectedUsername
  const [syncing, setSyncing] = useState(false)
  const [logs, setLogs] = useState<string[]>(
    isGithubConnected
      ? [
          "[SYSTEM] Node initialized. Portflix v0.1.0 online.",
          `[NET] Linked to GitHub account: github.com/${githubUsername}.`,
          "[SEC] Session verified. OAuth token loaded (encrypted).",
          "[DIAGNOSTIC] Ready for sync query."
        ]
      : [
          "[SYSTEM] Node initialized. Portflix v0.1.0 online.",
          "[WARN] GitHub integration is NOT connected!",
          "[WARN] Live synchronizations are suspended.",
          "[DIAGNOSTIC] Please attach GitHub account node."
        ]
  )

  const theme = generateProceduralTheme(username || "default")

  // ─── triggerSync must be defined BEFORE useEffect so the auto-sync closure works ───
  const triggerSync = async () => {
    setSyncing(true)
    setLogs([
      "> Curator AI initiated.",
      "> Establishing secure connection to GitHub...",
      "> Scanning 5 most recent repositories..."
    ])

    const aiSteps = [
      "> Curator AI is reading README files...",
      "> Synthesizing professional descriptions...",
      "> Extracting tech stacks and keywords...",
      "> Formatting for portfolio presentation..."
    ]

    let stepIndex = 0
    const interval = setInterval(() => {
      if (stepIndex < aiSteps.length) {
        setLogs(prev => [...prev, aiSteps[stepIndex]])
        stepIndex++
      } else {
        clearInterval(interval)
      }
    }, 2000)

    try {
      const res = await fetch("/api/projects/sync", { method: "POST" })
      const data = await res.json()

      clearInterval(interval)

      // GitHub token expired or revoked
      if (res.status === 401 && data.code === "GITHUB_TOKEN_EXPIRED") {
        setConnectedUsername(null)
        setLogs([
          "> [TOKEN_EXPIRED] GitHub access token has expired or was revoked.",
          "> ACTION REQUIRED: Click \"Connect GitHub Account\" to reconnect."
        ])
        setAuthError("Your GitHub token expired. Please reconnect your GitHub account.")
        return
      }

      if (!res.ok) throw new Error(data.error || "Sync failed")

      setLogs(prev => [...prev, "> Curator AI completed portfolio generation!", ">> ALL SYSTEMS GO."])

      if (data.projects) {
        setLocalProjects(data.projects)
      }
    } catch (error: any) {
      clearInterval(interval)
      setLogs(prev => [...prev, `> [ERROR] Curator AI failed: ${error?.message || "Unknown error"}`])
    } finally {
      setSyncing(false)
    }
  }

  // Use a ref so useEffect can call triggerSync without stale closure
  const triggerSyncRef = useRef<() => Promise<void>>(triggerSync)
  triggerSyncRef.current = triggerSync

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const err = params.get("error")
    if (err) {
      setAuthError(decodeURIComponent(err))
    }
    // Auto-sync on mount if GitHub connected but 0 projects in DB
    if (needsSync) {
      triggerSyncRef.current()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDisconnectGithub = async () => {
    try {
      setSyncing(true)
      setLogs(prev => [...prev, "[SYNC] Initiating disconnect request..."])
      const response = await fetch("/api/user/disconnect-github", { method: "POST" })
      const data = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(data?.error || "Failed to disconnect")
      setConnectedUsername(null)
      setLogs(prev => [...prev, "[NET] Disconnect approved by origin server.", "[WARN] GitHub profile detached. Sync channel frozen."])
    } catch (err) {
      setLogs(prev => [...prev, `[ERROR] Disconnect pipeline failed: ${err instanceof Error ? err.message : "Server error"}`])
    } finally {
      setSyncing(false)
    }
  }

  const handleGenerateAvatar = async (force: boolean = false) => {
    setGeneratingAvatar(true)
    setLogs(prev => [...prev, "[AI] Initializing 3D Avatar Generation Engine...", "[AI] Calling DALL-E 3 with optimized developer prompt..."])
    try {
      const res = await fetch("/api/user/avatar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ forceRegenerate: force }),
      })
      const data = await res.json()
      
      if (!res.ok) {
        if (data.code === "AVATAR_ALREADY_EXISTS") {
          setLogs(prev => [...prev, "[WARN] AI Avatar is already assigned to your profile."])
          if (confirm("You already have an AI Avatar assigned. Would you like Curator AI to regenerate a new one for you?")) {
            return handleGenerateAvatar(true)
          }
          return
        }
        throw new Error(data.error || "Failed to generate avatar")
      }
      
      setLocalAvatar(data.avatarUrl)
      setLogs(prev => [...prev, "[AI] Avatar generated successfully!", "[SYSTEM] Avatar linked to user profile."])
    } catch (error) {
      setLogs(prev => [...prev, `[ERROR] Avatar generation failed: ${error instanceof Error ? error.message : "Unknown"}`])
    } finally {
      setGeneratingAvatar(false)
    }
  }


  const handleEnhanceProject = async (projectId: string) => {
    setEnhancingProjectId(projectId)
    try {
      const res = await fetch(`/api/projects/${projectId}/enhance`, { method: "POST" })
      const data = await res.json()
      if (!res.ok) throw new Error("Enhance failed")
      
      if (data.project) {
        setLocalProjects(prev => prev.map(p => p.id === projectId ? data.project : p))
      }
    } catch (error) {
      console.error("Enhance error", error)
    } finally {
      setEnhancingProjectId(null)
    }
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      
      <section className="relative rounded-2xl border border-white/[0.04] bg-[#07071e]/40 p-6 md:p-8 backdrop-blur-xl overflow-hidden">
        <div className="absolute right-0 top-0 -z-10 h-64 w-64 rounded-full bg-cyan-500/10 blur-[80px]" />
        
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-4 flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-[10px] font-mono text-emerald-400 uppercase tracking-widest">
              <span className={`h-1.5 w-1.5 rounded-full ${isGithubConnected ? "bg-emerald-400 animate-ping" : "bg-amber-400 animate-pulse"}`} />
              {isGithubConnected ? "SYSTEM_SECURE" : "INTEGRATION_REQUIRED"}
            </div>
            
            <div className="flex items-start gap-5">
              <div className="relative group">
                {localAvatar ? (
                  <img src={localAvatar} alt="Avatar" className="w-20 h-20 rounded-2xl border border-white/10 object-cover shadow-2xl" />
                ) : (
                  <div className="w-20 h-20 rounded-2xl bg-white/5 border border-dashed border-white/20 flex flex-col items-center justify-center gap-1">
                    <UserCircle className="text-zinc-500 h-6 w-6" />
                    <span className="text-[9px] text-zinc-500 font-mono uppercase">Missing</span>
                  </div>
                )}
              </div>

              <div>
                <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                  Welcome back, <span className="text-cyan-400">{displayName.split(" ")[0]}</span>
                </h1>
                
                <div className="font-mono text-xs text-zinc-500 space-y-1 mt-1">
                  <p>&gt; USER_EMAIL: {userEmail}</p>
                  <div className="flex flex-wrap items-center gap-2">
                    <span>&gt; STATUS: </span>
                    {isGithubConnected ? (
                      <span className="flex items-center gap-2.5">
                        <span className="text-cyan-400">Connected to GitHub (@{connectedUsername})</span>
                        <button
                          onClick={handleDisconnectGithub}
                          disabled={syncing}
                          className="px-2 py-0.5 rounded border border-red-500/30 hover:border-red-500/60 bg-red-950/20 text-red-400 text-[9px] uppercase font-bold hover:bg-red-500/10 transition-all cursor-pointer disabled:opacity-30"
                        >
                          {syncing ? "DETACHING..." : "DISCONNECT"}
                        </button>
                      </span>
                    ) : (
                      <span className="text-amber-500 animate-pulse">Pending GitHub connection</span>
                    )}
                  </div>
                </div>

                <button 
                  onClick={() => handleGenerateAvatar(false)}
                  disabled={generatingAvatar}
                  className="mt-3 inline-flex items-center gap-1.5 text-[10px] text-cyan-400 font-mono uppercase font-bold border border-cyan-400/20 px-3 py-1.5 rounded-lg hover:bg-cyan-400/10 transition-all disabled:opacity-50 cursor-pointer"
                >
                  <UserCircle size={12} />
                  {generatingAvatar ? "GENERATING AI AVATAR..." : (localAvatar ? "REGENERATE AI AVATAR" : "GENERATE AI AVATAR")}
                </button>

              </div>
            </div>
          </div>

          <div className="flex items-center gap-5 bg-white/[0.02] border border-white/[0.04] p-4 rounded-xl backdrop-blur-md">
            <div className="relative h-16 w-16 flex items-center justify-center">
              <svg className="absolute transform -rotate-90 w-full h-full">
                <circle cx="32" cy="32" r="26" stroke="rgba(255,255,255,0.02)" strokeWidth="4" fill="transparent" />
                <circle 
                  cx="32" 
                  cy="32" 
                  r="26" 
                  stroke={isGithubConnected ? "#22d3ee" : "#f59e0b"} 
                  strokeWidth="4" 
                  fill="transparent" 
                  strokeDasharray={2 * Math.PI * 26}
                  strokeDashoffset={2 * Math.PI * 26 * (1 - (isGithubConnected ? (localProjects.length > 0 ? (localAvatar ? 1.0 : 0.8) : 0.65) : 0.35))}
                  className="transition-all duration-1000"
                />
              </svg>
              <span className="font-mono text-sm font-bold text-white">
                {isGithubConnected ? (localProjects.length > 0 ? (localAvatar ? "100%" : "80%") : "65%") : "35%"}
              </span>
            </div>
            <div>
              <p className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider">SHOWCASE SCORE</p>
              <p className="text-[11px] text-zinc-500 mt-1 max-w-[150px]">
                {isGithubConnected 
                  ? (localProjects.length > 0 ? (localAvatar ? "System optimal." : "Missing Avatar.") : "Diagnostics clean. Sync projects next.") 
                  : "Connect GitHub to increase score."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {!isGithubConnected && (
        <section className="relative rounded-2xl border border-cyan-500/20 bg-cyan-950/10 p-6 md:p-8 backdrop-blur-xl overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.05)]">
          <div className="absolute top-0 left-0 h-full w-[3px] bg-cyan-400" />
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 flex-1">
              <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase block font-semibold">Action Required //</span>
              <h2 className="text-xl font-bold text-white">Connect GitHub to Initialize Showcase</h2>
              <p className="text-sm text-zinc-400 max-w-xl">
                To automatically populate, host, and sync your development projects and commit histories on your unique portfolio, linking a GitHub profile is required.
              </p>
              {authError && (
                <div className="mt-3 text-xs font-mono text-red-400 border border-red-500/20 bg-red-500/5 p-2.5 rounded-xl max-w-xl animate-pulse">
                  [LINK_ERROR] {authError}
                </div>
              )}
            </div>
            <a
              href="/api/auth/github/connect"
              className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-cyan-400/90 hover:bg-cyan-400 text-[#050816] font-bold text-sm tracking-wider uppercase transition-all duration-200 shadow-[0_0_20px_rgba(34,211,238,0.25)] hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] active:scale-[0.98] cursor-pointer"
            >
              Connect GitHub Account
            </a>
          </div>
        </section>
      )}

      {/* 2. LIVE TELEMETRY STATS ROW */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3 mb-6">
        <div className="rounded-2xl border border-white/[0.04] bg-[#07071e]/30 backdrop-blur-xl p-5 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wide mb-1">Total Views</p>
            <p className="text-2xl font-black text-white font-mono">0</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
            <Eye size={18} className="text-cyan-400" />
          </div>
        </div>

        <div className="rounded-2xl border border-white/[0.04] bg-[#07071e]/30 backdrop-blur-xl p-5 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wide mb-1">AI Projects</p>
            <p className="text-2xl font-black text-white font-mono">{localProjects.length}</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
            <Cpu size={18} className="text-violet-400" />
          </div>
        </div>

        <div className="rounded-2xl border border-white/[0.04] bg-[#07071e]/30 backdrop-blur-xl p-5 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wide mb-1">Git Pipeline</p>
            <p className={`text-lg font-bold font-mono uppercase tracking-wider ${isGithubConnected ? "text-emerald-400" : "text-red-400"}`}>
              {isGithubConnected ? "CONNECTED" : "OFFLINE"}
            </p>
          </div>
          <div className={`h-10 w-10 rounded-full flex items-center justify-center border ${isGithubConnected ? "bg-emerald-500/10 border-emerald-500/20" : "bg-red-500/10 border-red-500/20"}`}>
            <div className={`h-2.5 w-2.5 rounded-full ${isGithubConnected ? "bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" : "bg-red-400 shadow-[0_0_8px_#f87171]"}`} />
          </div>
        </div>
      </div>

      {/* 3. MAIN DECK: PREVIEW, TERMINAL, DIAGNOSTICS */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column: Preview & Terminal */}
        <div className="lg:col-span-2 space-y-6">
          <section className="rounded-2xl border border-white/[0.04] bg-[#07071e]/30 p-6 backdrop-blur-xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute left-0 top-0 h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
            
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <Code size={16} className="text-cyan-400" />
                <h2 className="text-xs font-mono font-semibold uppercase tracking-widest text-zinc-400">Live Portfolio Preview</h2>
              </div>
              
              <div className="flex items-center gap-4">
                <a href="/portfolio" className="inline-flex items-center font-mono text-[10px] uppercase tracking-wider text-zinc-500 hover:text-white transition-colors">
                  Configure
                </a>
                <a 
                  href={`/${username}`} 
                  target="_blank"
                  className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  View Live <ExternalLink size={10} />
                </a>
              </div>
            </div>

            <div 
              style={{ background: theme.background, borderColor: theme.border }} 
              className="relative rounded-xl border p-5 font-mono shadow-2xl transition-all duration-500"
            >
              <div style={{ backgroundColor: theme.accent, boxShadow: theme.accentGlow }} className="absolute right-4 top-4 h-2 w-2 rounded-full" />
              <div style={{ background: theme.accent }} className="absolute left-0 top-0 h-full w-[2px] opacity-50" />

              <span className="absolute right-8 top-3 text-[10px] text-white/40 uppercase tracking-widest">{isGithubConnected ? "LIVE" : "DRAFT"}</span>

              <span style={{ color: theme.mutedText }} className="text-[10px] uppercase block mb-1">USER // {username}</span>
              <div className="flex items-center gap-3 mb-1">
                {localAvatar && <img src={localAvatar} alt="Mini Avatar" className="w-8 h-8 rounded-full border border-white/20 object-cover" />}
                <h3 style={{ color: theme.text }} className="text-xl font-bold">{displayName}</h3>
              </div>
              
              <p style={{ color: theme.accent }} className="text-xs mt-1 font-semibold tracking-wide uppercase">{professionalTitle}</p>
              
              <div className="mt-5 space-y-2">
                <div className="text-[11px] flex items-center justify-between" style={{ color: theme.mutedText }}>
                  <span>SKILLS_LIST</span>
                  <span>[{skills.length}]</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {skills.length > 0 ? (
                    skills.map((skill) => (
                      <span key={skill} style={{ borderColor: theme.border, backgroundColor: theme.cardBg, color: theme.text }} className="rounded-lg border px-2.5 py-1 text-[10px] font-semibold">{skill}</span>
                    ))
                  ) : (
                    <span className="text-[10px] italic opacity-50">No skills listed yet</span>
                  )}
                </div>
              </div>

              {localProjects.length > 0 && (
                <div className="mt-5 border-t pt-4" style={{ borderColor: theme.border }}>
                  <div className="text-[11px] flex items-center justify-between mb-3" style={{ color: theme.mutedText }}>
                    <span>AI_SYNCED_PROJECTS</span>
                    <span>[{localProjects.length}]</span>
                  </div>
                  <div className="space-y-2">
                    {localProjects.slice(0, 3).map(project => (
                      <div key={project.id} className="p-3 rounded-lg border flex flex-col gap-1 transition-all hover:bg-white/[0.02]" style={{ borderColor: theme.border }}>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm tracking-tight text-white">{project.title}</span>
                          <span className="text-[9px] uppercase opacity-50 font-mono">{project.updatedAt ? new Date(project.updatedAt).toLocaleDateString() : ""}</span>
                        </div>
                        <p className="text-[11px] text-white/50 truncate">
                          {project.description || "No description."}
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 flex justify-center">
                    <a 
                      href="/portfolio" 
                      className="text-[10px] uppercase font-bold font-mono tracking-wider flex items-center gap-1 transition-all hover:brightness-125"
                      style={{ color: theme.accent }}
                    >
                      Manage Portfolio Projects <ArrowRight size={12} />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </section>

          <section className="rounded-2xl border border-white/[0.04] bg-[#02020a] p-5 font-mono shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.04] mb-4">
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-red-500/20 border border-red-500/40" />
                <span className="h-3 w-3 rounded-full bg-yellow-500/20 border border-yellow-500/40" />
                <span className="h-3 w-3 rounded-full bg-green-500/20 border border-green-500/40" />
              </div>
              <div className="flex items-center gap-2 text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">
                <Terminal size={12} className="text-zinc-600" />
                bash://git-ai-sync-daemon
              </div>
              <button 
                onClick={triggerSync}
                disabled={syncing || !isGithubConnected}
                className="flex items-center gap-1.5 px-3 py-1 text-[10px] rounded-lg border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 font-bold hover:bg-cyan-500/10 active:scale-95 transition-all cursor-pointer disabled:opacity-30 disabled:hover:bg-cyan-500/5"
              >
                <RefreshCw size={10} className={syncing ? "animate-spin" : ""} />
                {syncing ? "AI SYNCING..." : "SYNC GITHUB NOW"}
              </button>
            </div>
            <div className="space-y-1.5 text-xs text-zinc-400 max-h-[160px] overflow-y-auto leading-relaxed">
              {logs.filter((log): log is string => typeof log === "string").map((log, index) => {
                let colorClass = "text-zinc-400"
                if (log.startsWith("[SYSTEM]")) colorClass = "text-violet-400"
                if (log.startsWith("[SYNC]")) colorClass = "text-cyan-400"
                if (log.startsWith("[NET]")) colorClass = "text-sky-400 font-semibold"
                if (log.startsWith("[SEC]")) colorClass = "text-emerald-400"
                if (log.startsWith("[AI]")) colorClass = "text-fuchsia-400 font-bold animate-pulse"
                if (log.startsWith("[WARN]")) colorClass = "text-amber-500 font-bold"
                if (log.startsWith("[ERROR]")) colorClass = "text-red-500 font-bold"
                return <p key={index} className={colorClass}>{log}</p>
              })}
              {(syncing || generatingAvatar) && (
                <div className="h-3 w-1.5 bg-cyan-400 inline-block animate-pulse ml-0.5" />
              )}
            </div>
          </section>
        </div>

        {/* Right Column: Diagnostics */}
        <div className="space-y-6">
          <section className="rounded-2xl border border-white/[0.04] bg-[#07071e]/30 p-5 backdrop-blur-xl">
            <div className="flex items-center gap-2.5 mb-4">
              <AlertTriangle size={15} className="text-amber-400" />
              <h2 className="text-xs font-mono font-semibold uppercase tracking-widest text-zinc-400">Diagnostics</h2>
            </div>
            <div className="space-y-3 font-mono text-[11px] leading-relaxed">
              {!isGithubConnected ? (
                <div className="flex items-start gap-2.5 p-3 rounded-xl border border-red-500/10 bg-red-500/5 text-red-400">
                  <span className="font-bold">[CRIT]</span>
                  <p>GitHub account is detached. AI Sync pipeline is frozen.</p>
                </div>
              ) : (
                <div className="flex items-center justify-between p-3 rounded-xl border border-emerald-500/10 bg-emerald-500/5 text-emerald-400">
                  <div className="flex items-start gap-2.5">
                    <span className="font-bold">[PASS]</span>
                    <p>GitHub connected (@{connectedUsername}). AI Sync channel open.</p>
                  </div>
                </div>
              )}
              {localProjects.length === 0 && isGithubConnected && (
                <div className="flex items-start gap-2.5 p-3 rounded-xl border border-amber-500/10 bg-amber-500/5 text-amber-400/90 animate-pulse">
                  <span className="font-bold">[WARN]</span>
                  <p>0 Projects detected. Run SYNC GITHUB NOW to populate your portfolio.</p>
                </div>
              )}
              {localProjects.length > 0 && (
                <div className="flex items-start gap-2.5 p-3 rounded-xl border border-emerald-500/10 bg-emerald-500/5 text-emerald-400/90">
                  <span className="font-bold">[PASS]</span>
                  <p>{localProjects.length} AI-generated projects synced successfully.</p>
                </div>
              )}
              {!localAvatar && (
                 <div className="flex items-start gap-2.5 p-3 rounded-xl border border-amber-500/10 bg-amber-500/5 text-amber-400/90">
                 <span className="font-bold">[WARN]</span>
                 <p>Missing AI Avatar. Click "GENERATE AI AVATAR" to enhance your showcase score.</p>
               </div>
              )}
            </div>
          </section>

          {/* GitHub Repositories Manager Card */}
          {isGithubConnected && (
            <section className="rounded-2xl border border-cyan-500/20 bg-[#07071e]/50 p-5 backdrop-blur-xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <GitBranch size={16} className="text-cyan-400" />
                  <h2 className="text-xs font-mono font-semibold uppercase tracking-widest text-zinc-300">GitHub Repositories</h2>
                </div>
                <button
                  onClick={() => {
                    setShowRepoModal(true)
                    fetchGithubRepos()
                  }}
                  className="px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/30 transition-all flex items-center gap-1 cursor-pointer"
                >
                  <Plus size={12} /> Manage Repos
                </button>
              </div>

              <p className="text-[11px] text-zinc-400 leading-relaxed mb-4">
                Control which GitHub projects appear in your public portfolio. Import new repositories or remove existing ones with one click.
              </p>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono p-2.5 rounded-xl border border-white/[0.04] bg-black/40 text-zinc-300">
                  <span>Portfolio Projects</span>
                  <span className="font-bold text-cyan-400">{localProjects.length} Active</span>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>

      {/* GitHub Repositories Modal */}
      {showRepoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl rounded-2xl border border-cyan-500/30 bg-[#07071e] p-6 md:p-8 shadow-2xl space-y-6 max-h-[85vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                  <GitBranch className="h-5 w-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">GitHub Repository Manager</h3>
                  <p className="text-xs text-zinc-400">Choose which GitHub repos to add or remove from your public portfolio.</p>
                </div>
              </div>
              <button
                onClick={() => setShowRepoModal(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {loadingRepos ? (
              <div className="py-12 flex flex-col items-center justify-center gap-3 text-cyan-400 font-mono text-xs">
                <RefreshCw size={24} className="animate-spin text-cyan-400" />
                <span>Scanning GitHub repositories for @{connectedUsername}...</span>
              </div>
            ) : (
              <div className="space-y-6">
                {/* 1. Pending Repositories (Not in Portfolio) */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-mono uppercase font-bold text-amber-400 flex items-center gap-1.5">
                      <Plus size={14} /> Available GitHub Repos ({pendingRepos.length})
                    </h4>
                    <span className="text-[10px] text-zinc-500 font-mono">Click + ADD to run Curator AI</span>
                  </div>

                  {pendingRepos.length === 0 ? (
                    <div className="p-4 rounded-xl border border-white/5 bg-black/40 text-center text-xs text-zinc-500">
                      All your public GitHub repositories are already added to your portfolio!
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {pendingRepos.map((repo) => (
                        <div
                          key={repo.name}
                          className="p-3.5 rounded-xl border border-white/10 bg-black/40 flex items-center justify-between gap-4 hover:border-cyan-500/30 transition-all"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-bold text-sm text-white truncate">{repo.name}</span>
                              {repo.language && (
                                <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-white/10 text-zinc-300">
                                  {repo.language}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-zinc-400 truncate">{repo.description || "No description provided on GitHub."}</p>
                          </div>

                          <button
                            onClick={() => handleImportSingleRepo(repo.name)}
                            disabled={addingRepoName === repo.name}
                            className="px-4 py-2 rounded-xl text-xs font-bold uppercase font-mono tracking-wider bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/30 transition-all flex items-center gap-1.5 shrink-0 disabled:opacity-50 cursor-pointer"
                          >
                            {addingRepoName === repo.name ? (
                              <>
                                <RefreshCw size={12} className="animate-spin" /> ADDING...
                              </>
                            ) : (
                              <>
                                <Plus size={12} /> ADD TO PORTFOLIO
                              </>
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 2. Currently Active Portfolio Projects */}
                <div>
                  <h4 className="text-xs font-mono uppercase font-bold text-emerald-400 flex items-center gap-1.5 mb-3">
                    <Check size={14} /> Active Portfolio Projects ({localProjects.length})
                  </h4>

                  {localProjects.length === 0 ? (
                    <div className="p-4 rounded-xl border border-white/5 bg-black/40 text-center text-xs text-zinc-500">
                      No active projects in portfolio. Add repos from above!
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {localProjects.map((project) => (
                        <div
                          key={project.id}
                          className="p-3.5 rounded-xl border border-emerald-500/20 bg-emerald-950/10 flex items-center justify-between gap-4"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-bold text-sm text-white truncate">{project.title}</span>
                              <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-emerald-500/20 text-emerald-300">
                                ACTIVE
                              </span>
                            </div>
                            <p className="text-xs text-zinc-400 truncate">{project.description}</p>
                          </div>

                          <button
                            onClick={() => handleDeleteProject(project.id, project.title)}
                            disabled={deletingProjectId === project.id}
                            className="px-3.5 py-2 rounded-xl text-xs font-bold uppercase font-mono tracking-wider bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-all flex items-center gap-1.5 shrink-0 disabled:opacity-50 cursor-pointer"
                          >
                            {deletingProjectId === project.id ? (
                              "REMOVING..."
                            ) : (
                              <>
                                <Trash2 size={12} /> REMOVE
                              </>
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}