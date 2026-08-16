"use client"

import { useState, useEffect } from "react"
import { 
  Plug, 
  CheckCircle2, 
  XCircle, 
  ExternalLink, 
  RefreshCw, 
  ShieldCheck, 
  Cpu, 
  Database, 
  AlertCircle,
  Zap,
  Globe
} from "lucide-react"

export default function IntegrationsView() {
  const [integrations, setIntegrations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [statusMessage, setStatusMessage] = useState("")

  const fetchIntegrations = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/user/integrations")
      const data = await res.json()
      if (res.ok) {
        setIntegrations(data.integrations || [])
      }
    } catch (err) {
      console.error("Failed to load integrations", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchIntegrations()
  }, [])

  const handleDisconnectGithub = async () => {
    if (!confirm("Are you sure you want to disconnect GitHub? Syncing will be frozen.")) return
    setActionLoading("github")
    try {
      const res = await fetch("/api/user/disconnect-github", { method: "POST" })
      if (res.ok) {
        setStatusMessage("GitHub disconnected successfully.")
        fetchIntegrations()
      } else {
        const data = await res.json()
        setStatusMessage(data.error || "Failed to disconnect.")
      }
    } catch (err) {
      setStatusMessage("Error disconnecting GitHub.")
    } finally {
      setActionLoading(null)
      setTimeout(() => setStatusMessage(""), 4000)
    }
  }

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center gap-3 text-cyan-400 font-mono text-xs">
        <RefreshCw size={24} className="animate-spin text-cyan-400" />
        <span>Loading System Integration Nodes...</span>
      </div>
    )
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* ── HEADER ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-black text-white tracking-tight">System Integrations</h1>
            <span className="px-2.5 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" /> PIPELINES ACTIVE
            </span>
          </div>
          <p className="text-zinc-400 text-sm">Manage OAuth connections, AI intelligence engines, and data pipeline integrations.</p>
        </div>

        {statusMessage && (
          <div className="px-4 py-2 rounded-xl border border-cyan-500/30 bg-cyan-950/20 text-cyan-300 font-mono text-xs font-bold animate-pulse">
            {statusMessage}
          </div>
        )}
      </div>

      {/* ── INTEGRATION CARDS GRID ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {integrations.map((item) => {
          const isGithub = item.id === "github"
          const isLinkedin = item.id === "linkedin"

          return (
            <div
              key={item.id}
              className={`rounded-2xl border p-6 backdrop-blur-xl transition-all duration-300 relative flex flex-col justify-between ${
                item.connected
                  ? "border-white/[0.08] bg-[#07071e]/50 hover:border-cyan-500/30"
                  : "border-amber-500/20 bg-amber-950/10"
              }`}
            >
              <div>
                {/* Header info */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 text-cyan-400">
                      {isGithub && (
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                        </svg>
                      )}
                      {isLinkedin && (
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.762-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      )}
                      {item.icon === "cpu" && <Cpu size={22} className="text-fuchsia-400" />}
                      {item.icon === "database" && <Database size={22} className="text-emerald-400" />}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white tracking-tight">{item.name}</h3>
                      <p className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider">{item.category}</p>
                    </div>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                      item.connected
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                        : "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                    }`}
                  >
                    {item.connected ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                    {item.connected ? "CONNECTED" : "NOT LINKED"}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-zinc-400 leading-relaxed mb-6">{item.description}</p>
              </div>

              {/* Status & Action */}
              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <div className="font-mono text-[11px] text-zinc-500 space-y-0.5">
                  <p>Status: <span className="text-zinc-300 font-semibold">{item.username || "Inactive"}</span></p>
                  <p>Sync: <span className="text-zinc-400">{item.syncFreq}</span></p>
                </div>

                <div>
                  {isGithub && (
                    item.connected ? (
                      <button
                        onClick={handleDisconnectGithub}
                        disabled={actionLoading === "github"}
                        className="px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-all disabled:opacity-50 cursor-pointer"
                      >
                        {actionLoading === "github" ? "DISCONNECTING..." : "DISCONNECT"}
                      </button>
                    ) : (
                      <a
                        href="/api/auth/github/connect"
                        className="px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 hover:bg-cyan-500/30 transition-all inline-flex items-center gap-1.5 shadow-[0_0_15px_rgba(34,211,238,0.2)] cursor-pointer"
                      >
                        CONNECT <ExternalLink size={12} />
                      </a>
                    )
                  )}

                  {isLinkedin && (
                    <a
                      href="/portfolio"
                      className="px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-white/5 text-zinc-300 border border-white/10 hover:bg-white/10 transition-all inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      CONFIGURE <ExternalLink size={12} />
                    </a>
                  )}

                  {!isGithub && !isLinkedin && (
                    <span className="px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase bg-white/5 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                      <ShieldCheck size={12} /> SYSTEM NODE ACTIVE
                    </span>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* ── SECURITY & ENCRYPTION BANNER ── */}
      <div className="rounded-2xl border border-cyan-500/20 bg-cyan-950/10 p-6 backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shrink-0">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight">AES-256-CBC Token Encryption Standard</h3>
            <p className="text-xs text-zinc-400 mt-1 max-w-2xl leading-relaxed">
              All GitHub OAuth tokens are encrypted at rest using AES-256-CBC before database storage. Your credentials and code repositories are read strictly with user consent.
            </p>
          </div>
        </div>

        <div className="px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-cyan-400 font-bold tracking-wider shrink-0">
          SECURITY_VERIFIED // 100%
        </div>
      </div>
    </div>
  )
}
