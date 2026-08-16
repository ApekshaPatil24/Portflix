"use client"

import { useState } from "react"
import { Briefcase, Send, X, Check, Building, Mail, User, ShieldCheck } from "lucide-react"

interface RecruiterContactModalProps {
  username: string
  displayName?: string
}

export default function RecruiterContactModal({ username, displayName }: RecruiterContactModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [recruiterName, setRecruiterName] = useState("")
  const [company, setCompany] = useState("")
  const [email, setEmail] = useState("")
  const [roleType, setRoleType] = useState("Full-time")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !message) return

    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          recruiterName: recruiterName || "Hiring Manager",
          company,
          email,
          roleType,
          message,
        }),
      })

      const data = await res.json()

      if (res.ok) {
        setSent(true)
        setTimeout(() => {
          setIsOpen(false)
          setSent(false)
          setMessage("")
        }, 2500)
      } else {
        setError(data.error || "Failed to send inquiry.")
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Sleek Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="
          fixed bottom-6 left-6 z-40
          flex items-center gap-2.5
          px-4 py-3
          rounded-full
          bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500
          text-slate-950 font-bold font-mono text-xs uppercase tracking-wider
          shadow-[0_0_25px_rgba(16,185,129,0.35)]
          hover:shadow-[0_0_35px_rgba(16,185,129,0.55)]
          hover:scale-105 active:scale-95
          transition-all duration-300
          cursor-pointer
        "
      >
        <Briefcase size={17} className="text-slate-950" />
        <span>Hire Candidate</span>
      </button>

      {/* Recruiter Inquiry Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div 
            className="
              relative w-full max-w-md rounded-3xl p-6 sm:p-7
              border border-emerald-500/30 bg-[#07071e] text-white
              shadow-[0_0_80px_rgba(0,0,0,0.9)]
              flex flex-col space-y-4
            "
          >
            {/* Close */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X size={18} />
            </button>

            {/* Header */}
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] uppercase tracking-wider">
                <ShieldCheck size={12} />
                <span>Verified Candidate Channel</span>
              </div>
              <h2 className="text-lg font-bold font-mono tracking-tight text-white pt-1">
                Direct Recruiter Inquiry
              </h2>
              <p className="text-xs text-zinc-400">
                Send an official interview or job inquiry directly to {displayName || `@${username}`}.
              </p>
            </div>

            {sent ? (
              <div className="py-8 flex flex-col items-center justify-center space-y-3 text-center">
                <div className="h-12 w-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40 animate-bounce">
                  <Check size={24} />
                </div>
                <h3 className="text-sm font-bold font-mono text-white">Inquiry Delivered!</h3>
                <p className="text-xs text-zinc-400 max-w-xs">
                  Your inquiry has been sent directly to {displayName || username}'s inbox and logged in their telemetry feed.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 pt-1">
                {error && (
                  <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1">
                      <User size={11} /> Name
                    </label>
                    <input
                      type="text"
                      value={recruiterName}
                      onChange={(e) => setRecruiterName(e.target.value)}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1">
                      <Building size={11} /> Company
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. Stripe / Vercel"
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1">
                    <Mail size={11} /> Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="recruiter@company.com"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Role Type</label>
                  <select
                    value={roleType}
                    onChange={(e) => setRoleType(e.target.value)}
                    className="w-full bg-[#050515] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500/50"
                  >
                    <option value="Full-time">Full-time Engineering Role</option>
                    <option value="Contract">Contract / Project Role</option>
                    <option value="Remote">Remote Role</option>
                    <option value="Interview Request">Schedule Technical Interview</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Message / Job Description *</label>
                  <textarea
                    required
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Hi! We saw your Portflix portfolio and would love to discuss a Senior Developer role..."
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || !email || !message}
                  className="
                    w-full py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider
                    bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950
                    hover:opacity-90 transition-all cursor-pointer shadow-lg
                    disabled:opacity-40 flex items-center justify-center gap-2 pt-2.5
                  "
                >
                  <Send size={14} />
                  <span>{loading ? "Delivering..." : "Send Direct Inquiry"}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}
