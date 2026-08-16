"use client"

import { useState, useEffect } from "react"
import { 
  Settings, 
  User, 
  ShieldCheck, 
  Sun, 
  Moon, 
  Save, 
  Globe, 
  RefreshCw, 
  CheckCircle2, 
  Lock, 
  Sparkles,
  Zap
} from "lucide-react"
import { useTheme } from "@/features/dashboard/components/theme-provider"

export default function SettingsView() {
  const { theme, toggleTheme } = useTheme()

  const [form, setForm] = useState({
    displayName: "",
    username: "",
    email: "",
    professionalTitle: "",
    headline: "",
    location: "",
    isAvailable: true,
    visibility: "PUBLIC",
    githubUsername: "",
    plan: "FREE",
  })

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch("/api/user/settings")
        const data = await res.json()
        if (res.ok && data.settings) {
          setForm(data.settings)
        }
      } catch (err) {
        console.error("Failed to load settings", err)
      } finally {
        setLoading(false)
      }
    }
    loadSettings()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked
      setForm((prev) => ({ ...prev, [name]: checked }))
    } else {
      setForm((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage("")
    try {
      const res = await fetch("/api/user/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setMessage("Settings updated successfully!")
      } else {
        const data = await res.json()
        setMessage(data.error || "Failed to update settings.")
      }
    } catch (err) {
      setMessage("Failed to update settings.")
    } finally {
      setSaving(false)
      setTimeout(() => setMessage(""), 4000)
    }
  }

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center gap-3 text-cyan-400 font-mono text-xs">
        <RefreshCw size={24} className="animate-spin text-cyan-400" />
        <span>Loading Account & System Settings...</span>
      </div>
    )
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* ── HEADER ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-black text-white tracking-tight">System Settings</h1>
            <span className="px-2.5 py-0.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 font-mono text-[10px] font-bold uppercase tracking-wider">
              CONFIG PANEL
            </span>
          </div>
          <p className="text-zinc-400 text-sm">Manage profile details, theme appearance, visibility, and security preferences.</p>
        </div>

        {message && (
          <div className="px-4 py-2 rounded-xl border border-emerald-500/30 bg-emerald-950/20 text-emerald-300 font-mono text-xs font-bold animate-pulse">
            {message}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Form Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Identity Settings */}
          <section className="rounded-2xl border border-white/[0.06] bg-[#07071e]/50 p-6 md:p-8 backdrop-blur-xl space-y-6">
            <div className="flex items-center gap-2.5 border-b border-white/10 pb-4">
              <User size={18} className="text-cyan-400" />
              <h2 className="text-sm font-mono font-semibold uppercase tracking-widest text-zinc-300">Profile & Identity</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase text-zinc-400 tracking-wider">Display Name</label>
                <input
                  name="displayName"
                  value={form.displayName}
                  onChange={handleChange}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono uppercase text-zinc-400 tracking-wider">Username (Handle)</label>
                <input
                  name="username"
                  value={form.username}
                  disabled
                  className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-2.5 text-sm text-zinc-500 cursor-not-allowed font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase text-zinc-400 tracking-wider">Professional Title</label>
                <input
                  name="professionalTitle"
                  value={form.professionalTitle}
                  onChange={handleChange}
                  placeholder="e.g. Full Stack Engineer"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono uppercase text-zinc-400 tracking-wider">Location</label>
                <input
                  name="location"
                  value={form.location || ""}
                  onChange={handleChange}
                  placeholder="e.g. San Francisco, CA"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase text-zinc-400 tracking-wider">Headline / Intro Bio</label>
              <input
                name="headline"
                value={form.headline || ""}
                onChange={handleChange}
                placeholder="Brief high-impact tag line"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          </section>

          {/* Visibility & Availability */}
          <section className="rounded-2xl border border-white/[0.06] bg-[#07071e]/50 p-6 md:p-8 backdrop-blur-xl space-y-6">
            <div className="flex items-center gap-2.5 border-b border-white/10 pb-4">
              <Globe size={18} className="text-emerald-400" />
              <h2 className="text-sm font-mono font-semibold uppercase tracking-widest text-zinc-300">Visibility & Status</h2>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-black/40">
              <div>
                <h4 className="text-sm font-bold text-white">Available for Hire</h4>
                <p className="text-xs text-zinc-400 mt-0.5">Show green "Available for Hire" status badge on your live portfolio.</p>
              </div>
              <input
                type="checkbox"
                name="isAvailable"
                checked={form.isAvailable}
                onChange={handleChange}
                className="h-5 w-5 rounded border-white/20 bg-black text-cyan-400 focus:ring-cyan-400 cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase text-zinc-400 tracking-wider">Portfolio Visibility</label>
              <select
                name="visibility"
                value={form.visibility}
                onChange={handleChange}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
              >
                <option value="PUBLIC">Public (Indexed & Discoverable)</option>
                <option value="UNLISTED">Unlisted (Link Access Only)</option>
                <option value="PRIVATE">Private (Draft Mode)</option>
              </select>
            </div>
          </section>

          <div className="flex justify-end">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-[#050816] font-bold text-xs uppercase tracking-wider font-mono flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)] disabled:opacity-50 cursor-pointer"
            >
              <Save size={14} />
              {saving ? "SAVING..." : "SAVE ALL CHANGES"}
            </button>
          </div>
        </div>

        {/* Right Column: Theme & Account Info */}
        <div className="space-y-6">
          {/* Light / Dark Mode Controls */}
          <section className="rounded-2xl border border-cyan-500/30 bg-[#07071e]/50 p-6 backdrop-blur-xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Sun size={18} className="text-amber-400" />
                <h2 className="text-xs font-mono font-semibold uppercase tracking-widest text-zinc-300">Appearance Theme</h2>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-cyan-500/20 text-cyan-400">
                {theme.toUpperCase()} MODE
              </span>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed">
              Switch between Dark Mode and high-contrast Light Mode theme across the entire system.
            </p>

            <button
              onClick={toggleTheme}
              className="w-full py-3 rounded-xl border border-cyan-500/40 bg-cyan-500/10 text-cyan-300 font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cyan-500/20 transition-all shadow-[0_0_15px_rgba(34,211,238,0.15)] cursor-pointer"
            >
              {theme === "dark" ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} className="text-indigo-400" />}
              <span>TOGGLE TO {theme === "dark" ? "LIGHT MODE" : "DARK MODE"}</span>
            </button>
          </section>

          {/* Account Overview */}
          <section className="rounded-2xl border border-white/[0.06] bg-[#07071e]/50 p-6 backdrop-blur-xl space-y-4">
            <div className="flex items-center gap-2 border-b border-white/10 pb-4">
              <ShieldCheck size={18} className="text-emerald-400" />
              <h2 className="text-xs font-mono font-semibold uppercase tracking-widest text-zinc-300">Account Subscription</h2>
            </div>

            <div className="space-y-3 text-xs font-mono text-zinc-400">
              <div className="flex justify-between p-2.5 rounded-lg border border-white/5 bg-black/40">
                <span>Account Plan</span>
                <span className="font-bold text-emerald-400">DEV_{form.plan}</span>
              </div>

              <div className="flex justify-between p-2.5 rounded-lg border border-white/5 bg-black/40">
                <span>GitHub Token</span>
                <span className="font-bold text-cyan-400">
                  {form.githubUsername ? `@${form.githubUsername}` : "Not Linked"}
                </span>
              </div>

              <div className="flex justify-between p-2.5 rounded-lg border border-white/5 bg-black/40">
                <span>Email Address</span>
                <span className="text-zinc-300 truncate max-w-[140px]">{form.email}</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
