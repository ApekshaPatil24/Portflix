"use client"

import { useState, useEffect } from "react"
import { 
  Eye, 
  Users, 
  Download, 
  Clock, 
  TrendingUp, 
  Activity, 
  BarChart2, 
  ArrowUpRight, 
  Sparkles, 
  Zap, 
  Globe, 
  Building2,
  RefreshCw
} from "lucide-react"

export default function AnalyticsView() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState("7d")

  const fetchAnalytics = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/analytics")
      const result = await res.json()
      if (res.ok) {
        setData(result)
      }
    } catch (err) {
      console.error("Failed to load analytics", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAnalytics()
  }, [])

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center gap-3 text-cyan-400 font-mono text-xs">
        <RefreshCw size={24} className="animate-spin text-cyan-400" />
        <span>Loading Telemetry & Recruiter Analytics...</span>
      </div>
    )
  }

  const { overview, trafficSources, projectEngagement, weeklyViews, recruiterSignals } = data || {}

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* ── HEADER & CONTROLS ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-black text-white tracking-tight">Portfolio Analytics</h1>
            <span className="px-2.5 py-0.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 font-mono text-[10px] font-bold uppercase tracking-wider">
              REAL-TIME TELEMETRY
            </span>
          </div>
          <p className="text-zinc-400 text-sm">Track views, recruiter clicks, and engagement across your live showcase.</p>
        </div>

        <div className="flex items-center gap-2 bg-[#07071e]/60 border border-white/10 p-1.5 rounded-xl backdrop-blur-md">
          {["24h", "7d", "30d", "All"].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 rounded-lg font-mono text-xs font-bold uppercase transition-all ${
                timeRange === range
                  ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-[0_0_12px_rgba(34,211,238,0.2)]"
                  : "text-zinc-500 hover:text-white"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* ── KPI METRICS GRID ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-white/[0.06] bg-[#07071e]/40 p-5 backdrop-blur-xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider font-semibold">Total Portfolio Views</span>
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Eye size={18} />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-black font-mono text-white tracking-tight">{overview?.totalViews || 0}</span>
            <span className="inline-flex items-center text-xs font-mono font-bold text-emerald-400 gap-0.5">
              <TrendingUp size={12} /> +24%
            </span>
          </div>
          <p className="text-[11px] text-zinc-500 mt-2">Unique visitors from direct & referral links</p>
        </div>

        <div className="rounded-2xl border border-white/[0.06] bg-[#07071e]/40 p-5 backdrop-blur-xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider font-semibold">Recruiter Clicks</span>
            <div className="p-2 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400">
              <Users size={18} />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-black font-mono text-white tracking-tight">{overview?.recruiterClicks || 0}</span>
            <span className="inline-flex items-center text-xs font-mono font-bold text-emerald-400 gap-0.5">
              <TrendingUp size={12} /> +18%
            </span>
          </div>
          <p className="text-[11px] text-zinc-500 mt-2">Clicks on GitHub, LinkedIn & Hire Me</p>
        </div>

        <div className="rounded-2xl border border-white/[0.06] bg-[#07071e]/40 p-5 backdrop-blur-xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider font-semibold">Avg. Time On Site</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Clock size={18} />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-black font-mono text-white tracking-tight">{overview?.avgTimeOnPage || "0m"}</span>
            <span className="inline-flex items-center text-xs font-mono font-bold text-emerald-400 gap-0.5">
              High Intent
            </span>
          </div>
          <p className="text-[11px] text-zinc-500 mt-2">High engagement reading project details</p>
        </div>

        <div className="rounded-2xl border border-white/[0.06] bg-[#07071e]/40 p-5 backdrop-blur-xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider font-semibold">Showcase Health Score</span>
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Zap size={18} />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-black font-mono text-white tracking-tight">{overview?.showcaseScore || 0}/100</span>
            <span className="inline-flex items-center text-xs font-mono font-bold text-cyan-400">
              OPTIMAL
            </span>
          </div>
          <p className="text-[11px] text-zinc-500 mt-2">Curator AI optimization metric</p>
        </div>
      </div>

      {/* ── CHARTS & TRAFFIC BREAKDOWN ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Views Chart Bar Visualizer */}
        <div className="lg:col-span-2 rounded-2xl border border-white/[0.06] bg-[#07071e]/40 p-6 backdrop-blur-xl space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart2 className="text-cyan-400" size={18} />
              <h2 className="text-sm font-mono uppercase tracking-widest font-semibold text-zinc-300">Weekly Traffic Overview</h2>
            </div>
            <span className="text-[10px] font-mono text-zinc-500 uppercase">Daily Views</span>
          </div>

          <div className="h-48 flex items-end justify-between gap-3 pt-6 pb-2 px-4 border-b border-white/[0.06]">
            {weeklyViews?.map((item: any, idx: number) => {
              const maxViews = Math.max(...weeklyViews.map((w: any) => w.views), 1)
              const heightPercent = Math.max((item.views / maxViews) * 100, 15)
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <span className="text-[10px] font-mono font-bold text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.views}
                  </span>
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className="w-full rounded-t-lg bg-gradient-to-t from-cyan-500/20 via-cyan-500/60 to-cyan-400 group-hover:brightness-125 transition-all shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                  />
                  <span className="text-[10px] font-mono text-zinc-500 uppercase mt-2">{item.day}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="rounded-2xl border border-white/[0.06] bg-[#07071e]/40 p-6 backdrop-blur-xl space-y-6">
          <div className="flex items-center gap-2">
            <Globe className="text-violet-400" size={18} />
            <h2 className="text-sm font-mono uppercase tracking-widest font-semibold text-zinc-300">Traffic Sources</h2>
          </div>

          <div className="space-y-4">
            {trafficSources?.map((source: any, idx: number) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-zinc-300 font-semibold">{source.name}</span>
                  <span className="text-cyan-400 font-bold">{source.percentage}% ({source.count})</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                  <div
                    style={{ width: `${source.percentage}%` }}
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-violet-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── PROJECT ENGAGEMENT & RECRUITER SIGNALS ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Most Viewed Projects */}
        <div className="rounded-2xl border border-white/[0.06] bg-[#07071e]/40 p-6 backdrop-blur-xl space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="text-emerald-400" size={18} />
            <h2 className="text-sm font-mono uppercase tracking-widest font-semibold text-zinc-300">Top Engaged Projects</h2>
          </div>

          {projectEngagement && projectEngagement.length > 0 ? (
            <div className="space-y-3">
              {projectEngagement.map((project: any) => (
                <div key={project.id} className="p-4 rounded-xl border border-white/[0.04] bg-black/40 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white tracking-tight">{project.title}</h3>
                    <div className="flex gap-1.5 mt-1.5">
                      {project.techStack?.slice(0, 3).map((t: string) => (
                        <span key={t} className="px-2 py-0.5 text-[9px] font-mono rounded bg-white/5 text-zinc-400">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right font-mono">
                    <span className="text-sm font-bold text-cyan-400">{project.views} views</span>
                    <p className="text-[10px] text-zinc-500">{project.clicks} outbound clicks</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-zinc-500 font-mono py-6 text-center">Sync projects to see individual engagement telemetry.</p>
          )}
        </div>

        {/* Live Recruiter Signals Feed */}
        <div className="rounded-2xl border border-white/[0.06] bg-[#07071e]/40 p-6 backdrop-blur-xl space-y-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Building2 className="text-amber-400" size={18} />
              <h2 className="text-sm font-mono uppercase tracking-widest font-semibold text-zinc-300">Live Recruiter Signals</h2>
            </div>
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
          </div>

          <div className="space-y-3">
            {recruiterSignals?.map((sig: any, idx: number) => (
              <div key={idx} className="p-3.5 rounded-xl border border-amber-500/20 bg-amber-950/10 flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-white">{sig.title}</p>
                  <p className="text-[11px] text-amber-300/80 font-mono">{sig.action} • {sig.location}</p>
                </div>
                <span className="text-[10px] font-mono text-zinc-500 shrink-0">{sig.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
