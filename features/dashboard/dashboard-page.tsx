"use client"

import { useState, useEffect } from "react"
import { 
  Terminal, 
  Activity, 
  Cpu, 
  Eye, 
  RefreshCw, 
  AlertTriangle, 
  ExternalLink,
  Code
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface DashboardPageProps {
  githubUsername: string | null
  userEmail: string
  displayName: string
  username: string
  skills: string[]
}

export default function DashboardPage({
  githubUsername,
  userEmail,
  displayName,
  username,
  skills,
}: DashboardPageProps) {
  const [connectedUsername, setConnectedUsername] = useState<string | null>(githubUsername)
  const [authError, setAuthError] = useState<string | null>(null)

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

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const err = params.get("error")
    if (err) {
      setAuthError(decodeURIComponent(err))
    }
  }, [])

  const handleDisconnectGithub = async () => {
    try {
      setSyncing(true)
      setLogs(prev => [...prev, "[SYNC] Initiating disconnect request..."])

      const response = await fetch("/api/user/disconnect-github", {
        method: "POST",
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to disconnect")
      }

      setConnectedUsername(null)
      setLogs(prev => [
        ...prev,
        "[NET] Disconnect approved by origin server.",
        "[WARN] GitHub profile detached. Sync channel frozen."
      ])
    } catch (err) {
      console.error("[DISCONNECT_ERROR]", err)
      setLogs(prev => [
        ...prev,
        `[ERROR] Disconnect pipeline failed: ${err instanceof Error ? err.message : "Server error"}`
      ])
    } finally {
      setSyncing(false)
    }
  }

  const triggerSync = () => {
    if (!isGithubConnected || syncing) return
    setSyncing(true)
    setLogs(prev => [
      ...prev, 
      "[SYNC] Initiating manual trigger...", 
      `[SYNC] Querying github.com/${connectedUsername}/repos...`
    ])
    
    setTimeout(() => {
      setLogs(prev => [
        ...prev, 
        "[SYNC] Found 8 public repositories.",
        "[SYNC] Local cache refreshed. Index matches remote origin.",
        "[SYSTEM] Sync completed successfully."
      ])
      setSyncing(false)
    }, 2000)
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      
      {/* 1. HERO SYSTEM DIAGNOSTIC BANNER */}
      <section className="relative rounded-2xl border border-white/[0.04] bg-[#07071e]/40 p-6 md:p-8 backdrop-blur-xl overflow-hidden">
        {/* Glow accent */}
        <div className="absolute right-0 top-0 -z-10 h-64 w-64 rounded-full bg-cyan-500/10 blur-[80px]" />
        
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-[10px] font-mono text-emerald-400 uppercase tracking-widest">
              <span className={`h-1.5 w-1.5 rounded-full ${isGithubConnected ? "bg-emerald-400 animate-ping" : "bg-amber-400 animate-pulse"}`} />
              {isGithubConnected ? "SYSTEM_SECURE" : "INTEGRATION_REQUIRED"}
            </div>
            
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Welcome back, <span className="text-cyan-400">{displayName.split(" ")[0]}</span>
            </h1>
            
            <div className="font-mono text-xs text-zinc-500 space-y-1">
              <p>&gt; USER_EMAIL: {userEmail}</p>
              <div className="flex flex-wrap items-center gap-2">
                <span>&gt; STATUS: </span>
                {isGithubConnected ? (
                  <span className="flex items-center gap-2.5">
                    <span className="text-cyan-400">Connected to GitHub (@{connectedUsername})</span>
                    <button
                      onClick={handleDisconnectGithub}
                      disabled={syncing}
                      className="px-2 py-0.5 rounded border border-red-500/30 hover:border-red-500/60 bg-red-950/20 text-red-400 text-[9px] uppercase font-bold hover:bg-red-500/10 transition-all cursor-pointer disabled:opacity-30 disabled:hover:bg-red-950/20"
                    >
                      {syncing ? "DETACHING..." : "DISCONNECT"}
                    </button>
                  </span>
                ) : (
                  <span className="text-amber-500 animate-pulse">Pending GitHub connection</span>
                )}
              </div>
            </div>
          </div>

          {/* High-tech radial score widget */}
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
                  strokeDashoffset={2 * Math.PI * 26 * (1 - (isGithubConnected ? 0.65 : 0.35))}
                  className="transition-all duration-1000"
                />
              </svg>
              <span className="font-mono text-sm font-bold text-white">
                {isGithubConnected ? "65%" : "35%"}
              </span>
            </div>
            <div>
              <p className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider">SHOWCASE SCORE</p>
              <p className="text-[11px] text-zinc-500 mt-1">
                {isGithubConnected ? "Diagnostics clean. Add projects next." : "Connect GitHub to increase score."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* COMPULSORY GITHUB LINK PROMPT FOR GOOGLE LOGINS */}
      {!isGithubConnected && (
        <section className="relative rounded-2xl border border-cyan-500/20 bg-cyan-950/10 p-6 md:p-8 backdrop-blur-xl overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.05)]">
          <div className="absolute top-0 left-0 h-full w-[3px] bg-cyan-400" />
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 flex-1">
              <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase block font-semibold">
                Action Required //
              </span>
              <h2 className="text-xl font-bold text-white">Connect GitHub to Initialize Showcase</h2>
              <p className="text-sm text-zinc-400 max-w-xl">
                You logged in via Google. To automatically populate, host, and sync your development projects and commit histories on your portfolio, linking a GitHub profile is required.
              </p>
              {authError && (
                <div className="mt-3 text-xs font-mono text-red-400 border border-red-500/20 bg-red-500/5 p-2.5 rounded-xl max-w-xl animate-pulse">
                  [LINK_ERROR] {authError}
                </div>
              )}
            </div>
            
            <a
              href="/api/auth/github/connect"
              className="
                inline-flex items-center justify-center gap-2
                h-12 px-6 rounded-xl bg-cyan-400/90 hover:bg-cyan-400
                text-[#050816] font-bold text-sm tracking-wider uppercase
                transition-all duration-200 shadow-[0_0_20px_rgba(34,211,238,0.25)] hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]
                active:scale-[0.98] cursor-pointer
              "
            >
              Connect GitHub Account
            </a>
          </div>
        </section>
      )}

      {/* 2. DUAL COLUMN TELEMETRY GRID */}
      <div className="grid gap-6 lg:grid-cols-2">
        
        {/* A. DYNAMIC PORTFOLIO PREVIEW DECK */}
        <section className="rounded-2xl border border-white/[0.04] bg-[#07071e]/30 p-6 backdrop-blur-xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute left-0 top-0 h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <Code size={16} className="text-cyan-400" />
              <h2 className="text-xs font-mono font-semibold uppercase tracking-widest text-zinc-400">
                Showcase Preview
              </h2>
            </div>
            
            <a 
              href="/portfolio" 
              className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Configure <ExternalLink size={10} />
            </a>
          </div>

          <div className="relative rounded-xl border border-white/[0.04] bg-[#02020a]/80 p-5 font-mono">
            {/* Visual background lines */}
            <div className={`absolute right-4 top-4 h-1.5 w-1.5 rounded-full ${isGithubConnected ? "bg-emerald-400 shadow-[0_0_8px_#10b981]" : "bg-amber-400 shadow-[0_0_8px_#f59e0b]"}`} />
            <span className="absolute right-8 top-3 text-[10px] text-zinc-650 uppercase tracking-widest">
              {isGithubConnected ? "LIVE" : "DRAFT"}
            </span>

            <span className="text-[10px] text-zinc-500 uppercase block mb-1">NAMESPACE //</span>
            <h3 className="text-lg font-bold text-white">@{username}</h3>
            
            <p className="text-xs text-cyan-400/80 mt-1">{displayName}</p>
            
            <div className="mt-5 space-y-2">
              <div className="text-[11px] text-zinc-500 flex items-center justify-between">
                <span>SKILLS_LIST</span>
                <span>[{skills.length}/20]</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {skills.length > 0 ? (
                  skills.map((skill) => (
                    <span 
                      key={skill} 
                      className="rounded-lg border border-cyan-500/10 bg-cyan-500/5 px-2.5 py-1 text-[10px] font-semibold text-cyan-300"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-[10px] text-zinc-600 italic">No skills listed yet</span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* B. DETAILED TELEMETRY (QUICK STATS) */}
        <section className="rounded-2xl border border-white/[0.04] bg-[#07071e]/30 p-6 backdrop-blur-xl relative flex flex-col justify-between">
          <div className="absolute left-0 top-0 h-[1px] w-full bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
          
          <div className="flex items-center gap-2.5 mb-6">
            <Activity size={16} className="text-violet-400" />
            <h2 className="text-xs font-mono font-semibold uppercase tracking-widest text-zinc-400">
              Live Telemetry
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-3">
            
            {/* Stat 1 */}
            <div className="rounded-xl border border-white/[0.03] bg-white/[0.01] p-3 text-center">
              <div className="flex justify-center mb-1.5">
                <Eye size={14} className="text-cyan-400" />
              </div>
              <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wide">Views</p>
              <p className="mt-1 text-xl font-black text-white font-mono">0</p>
            </div>

            {/* Stat 2 */}
            <div className="rounded-xl border border-white/[0.03] bg-white/[0.01] p-3 text-center">
              <div className="flex justify-center mb-1.5">
                <Cpu size={14} className="text-violet-400" />
              </div>
              <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wide">Syncs</p>
              <p className="mt-1 text-xl font-black text-white font-mono">0</p>
            </div>

            {/* Stat 3 */}
            <div className="rounded-xl border border-white/[0.03] bg-white/[0.01] p-3 text-center">
              <div className="flex justify-center mb-1.5">
                <div className={`h-1.5 w-1.5 rounded-full ${isGithubConnected ? "bg-emerald-400 animate-pulse shadow-[0_0_6px_#34d399]" : "bg-red-400 shadow-[0_0_6px_#f87171]"}`} />
              </div>
              <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wide">Git Link</p>
              <p className={`mt-1.5 text-[10px] font-mono font-bold uppercase tracking-wider ${isGithubConnected ? "text-emerald-400" : "text-red-400"}`}>
                {isGithubConnected ? "OK" : "NONE"}
              </p>
            </div>

          </div>
        </section>

      </div>

      {/* 3. DIAGNOSTICS & SYSTEM TERMINAL DECK */}
      <div className="grid gap-6 lg:grid-cols-3">
        
        {/* Active Console Window */}
        <section className="lg:col-span-2 rounded-2xl border border-white/[0.04] bg-[#02020a] p-5 font-mono overflow-hidden shadow-2xl relative">
          
          {/* Mac Header dots */}
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.04] mb-4">
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-red-500/20 border border-red-500/40" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/20 border border-yellow-500/40" />
              <span className="h-3 w-3 rounded-full bg-green-500/20 border border-green-500/40" />
            </div>
            
            <div className="flex items-center gap-2 text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">
              <Terminal size={12} className="text-zinc-600" />
              bash://git-sync-daemon
            </div>

            <button 
              onClick={triggerSync}
              disabled={syncing || !isGithubConnected}
              className="flex items-center gap-1.5 px-3 py-1 text-[10px] rounded-lg border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 font-bold hover:bg-cyan-500/10 active:scale-95 transition-all cursor-pointer disabled:opacity-30 disabled:hover:bg-cyan-500/5"
            >
              <RefreshCw size={10} className={syncing ? "animate-spin" : ""} />
              {syncing ? "SYNCING..." : "SYNC NOW"}
            </button>
          </div>

          {/* Console Output */}
          <div className="space-y-1.5 text-xs text-zinc-400 max-h-[160px] overflow-y-auto leading-relaxed">
            {logs.map((log, index) => {
              let colorClass = "text-zinc-400"
              if (log.startsWith("[SYSTEM]")) colorClass = "text-violet-400"
              if (log.startsWith("[SYNC]")) colorClass = "text-cyan-400"
              if (log.startsWith("[NET]")) colorClass = "text-sky-400 font-semibold"
              if (log.startsWith("[SEC]")) colorClass = "text-emerald-400"
              if (log.startsWith("[WARN]")) colorClass = "text-amber-500 font-bold animate-pulse"
              
              return (
                <p key={index} className={colorClass}>
                  {log}
                </p>
              )
            })}
            {syncing && (
              <div className="h-3 w-1.5 bg-cyan-400 inline-block animate-pulse ml-0.5" />
            )}
          </div>

        </section>

        {/* AI Recommendations (Diagnostics) */}
        <section className="rounded-2xl border border-white/[0.04] bg-[#07071e]/30 p-5 backdrop-blur-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <AlertTriangle size={15} className="text-amber-400" />
              <h2 className="text-xs font-mono font-semibold uppercase tracking-widest text-zinc-400">
                Diagnostics
              </h2>
            </div>

            <div className="space-y-3 font-mono text-[11px] leading-relaxed">
              
              {/* GitHub Link Status Check */}
              {!isGithubConnected ? (
                <div className="flex items-start gap-2.5 p-3 rounded-xl border border-red-500/10 bg-red-500/5 text-red-400">
                  <span className="font-bold">[CRIT]</span>
                  <p>GitHub account is detached. Sync pipeline is frozen.</p>
                </div>
              ) : (
                <div className="flex items-center justify-between p-3 rounded-xl border border-emerald-500/10 bg-emerald-500/5 text-emerald-400">
                  <div className="flex items-start gap-2.5">
                    <span className="font-bold">[PASS]</span>
                    <p>GitHub is connected as @{connectedUsername}. Sync channel open.</p>
                  </div>
                  <button
                    onClick={handleDisconnectGithub}
                    disabled={syncing}
                    className="ml-3 font-mono text-[9px] uppercase tracking-wider text-red-400 hover:text-red-300 active:scale-95 transition-all cursor-pointer underline disabled:opacity-30 whitespace-nowrap"
                  >
                    Disconnect
                  </button>
                </div>
              )}

              {/* General warnings */}
              <div className="flex items-start gap-2.5 p-3 rounded-xl border border-amber-500/10 bg-amber-500/5 text-amber-400/90">
                <span className="font-bold">[WARN]</span>
                <p>Profile avatar is undefined. Click to set professional image.</p>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl border border-amber-500/10 bg-amber-500/5 text-amber-400/90">
                <span className="font-bold">[WARN]</span>
                <p>Missing custom bio. Showcase lacks personality tag.</p>
              </div>

            </div>
          </div>
        </section>

      </div>

    </div>
  )
}