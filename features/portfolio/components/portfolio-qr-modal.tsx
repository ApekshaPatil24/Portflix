"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { QrCode, X, Copy, Check, ExternalLink, ShieldCheck, Download } from "lucide-react"

interface PortfolioQRModalProps {
  username: string
  displayName?: string
}

export default function PortfolioQRModal({ username, displayName }: PortfolioQRModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [qrSvg, setQrSvg] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Construct absolute URL targeting the public portfolio
  const portfolioUrl = typeof window !== "undefined" 
    ? `${window.location.origin}/${username}`
    : `http://localhost:3000/${username}`

  useEffect(() => {
    // Generate QR code using reliable QR server API with crisp resolution
    const encodedUrl = encodeURIComponent(portfolioUrl)
    const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodedUrl}&color=020617&bgcolor=ffffff&margin=1`
    setQrSvg(qrImageUrl)
  }, [portfolioUrl])

  const handleCopyLink = () => {
    navigator.clipboard.writeText(portfolioUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownloadQR = async () => {
    if (!qrSvg) return
    try {
      const response = await fetch(qrSvg)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `${username}-portflix-qr.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (err) {
      console.error("QR Download Error:", err)
    }
  }

  const modalContent = isOpen ? (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div 
        className="
          relative w-full max-w-sm rounded-3xl p-5 sm:p-6
          border border-cyan-500/30 bg-[#07071e] text-white
          shadow-[0_0_80px_rgba(34,211,238,0.25)]
          flex flex-col items-center text-center space-y-3.5
          animate-in zoom-in-95 duration-200
        "
      >
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3.5 right-3.5 p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="space-y-1 pt-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-[10px] uppercase tracking-wider">
            <ShieldCheck size={12} />
            <span>Unique Portfolio Pass</span>
          </div>
          <h2 className="text-base font-bold font-mono tracking-tight text-white pt-1">
            {displayName ? `${displayName}'s QR Pass` : `@${username}`}
          </h2>
          <p className="text-[11px] text-zinc-400 leading-snug">
            Scan with any device camera to launch portfolio live.
          </p>
        </div>

        {/* High Contrast QR Frame */}
        <div className="p-3.5 rounded-2xl bg-white shadow-2xl border border-white/20 flex flex-col items-center shrink-0">
          {qrSvg ? (
            <img
              src={qrSvg}
              alt={`QR Code for ${username}'s Portflix Showcase`}
              className="w-44 h-44 object-contain rounded"
            />
          ) : (
            <div className="w-44 h-44 flex items-center justify-center text-slate-800 font-mono text-xs">
              Generating Pass...
            </div>
          )}
          <div className="mt-2 text-[9px] font-mono font-bold text-slate-900 tracking-widest uppercase">
            PORTFLIX SHOWCASE PASS
          </div>
        </div>

        {/* One-Click Direct Link Box */}
        <div className="w-full flex items-center gap-2 p-2 rounded-xl bg-black/50 border border-white/10 text-[11px] font-mono text-zinc-300">
          <span className="flex-1 truncate text-cyan-400 text-left px-2">{portfolioUrl}</span>
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 font-bold transition-all shrink-0 cursor-pointer"
          >
            {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
            <span>{copied ? "Copied" : "Copy"}</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="w-full flex items-center justify-center gap-2 pt-1">
          <button
            onClick={handleDownloadQR}
            className="
              flex-1 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider
              bg-cyan-400 text-slate-950 hover:bg-cyan-300
              transition-all cursor-pointer shadow-lg flex items-center justify-center gap-1.5
            "
          >
            <Download size={14} />
            <span>Save QR</span>
          </button>
          <a
            href={`/${username}`}
            target="_blank"
            rel="noreferrer"
            className="
              px-3.5 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider
              border border-white/20 text-zinc-200 hover:text-white hover:border-white/40
              flex items-center gap-1.5 transition-all
            "
          >
            <span>Launch</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </div>
  ) : null

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="
          flex items-center gap-2 px-3.5 py-1.5 rounded-xl
          bg-cyan-500/10 hover:bg-cyan-500/20
          border border-cyan-500/30 hover:border-cyan-400
          text-cyan-300 hover:text-white font-mono text-xs font-semibold uppercase tracking-wider
          shadow-[0_0_15px_rgba(34,211,238,0.15)] hover:shadow-[0_0_25px_rgba(34,211,238,0.35)]
          transition-all duration-300 cursor-pointer
        "
      >
        <QrCode size={15} className="text-cyan-400 animate-pulse" />
        <span>Generate QR Code</span>
      </button>

      {/* Render Modal via React Portal directly into document.body to avoid layout clipping */}
      {mounted && modalContent && createPortal(modalContent, document.body)}
    </>
  )
}
