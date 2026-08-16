"use client"

import { useState, useRef, useEffect } from "react"
import { Sparkles, X, Send, Bot, User, Minimize2, Maximize2, RefreshCw } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm **Curator AI Assistant**. Ask me anything about Portflix workflow, syncing repositories, customizing templates, or viewing analytics telemetry.",
    },
  ])

  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
    }
  }, [messages, isOpen])

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!input.trim() || loading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    }

    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput("")
    setLoading(true)

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      })

      const data = await res.json()
      if (res.ok && data.reply) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.reply,
        }
        setMessages((prev) => [...prev, assistantMessage])
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: `⚠️ ${data.error || "Failed to reach Curator AI. Please verify your GEMINI_API_KEY."}`,
          },
        ])
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "⚠️ Error connecting to server. Please try again.",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="
            fixed bottom-6 right-6 z-50
            flex items-center gap-2.5
            px-4 py-3
            rounded-full
            bg-gradient-to-r from-violet-600 via-cyan-500 to-sky-400
            text-[#03030d] font-bold font-mono text-xs uppercase tracking-wider
            shadow-[0_0_25px_rgba(34,211,238,0.4)]
            hover:shadow-[0_0_35px_rgba(34,211,238,0.6)]
            hover:scale-105
            active:scale-95
            transition-all duration-300
            cursor-pointer
          "
        >
          <Sparkles size={18} className="animate-spin text-[#03030d]" style={{ animationDuration: "4s" }} />
          <span>Ask Curator AI</span>
        </button>
      )}

      {/* Floating Chat Widget Window */}
      {isOpen && (
        <div
          className="
            fixed bottom-6 right-6 z-50
            w-[90vw] max-w-[420px] h-[580px] max-h-[80vh]
            flex flex-col
            rounded-2xl
            border border-cyan-500/30
            bg-[#07071e]/95 backdrop-blur-2xl
            shadow-[0_10px_50px_rgba(0,0,0,0.8)]
            overflow-hidden
            transition-all duration-300
          "
        >
          {/* Header */}
          <div className="px-4 py-3.5 border-b border-white/10 bg-[#050518] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                <Bot size={18} />
              </div>
              <div>
                <h3 className="text-xs font-bold font-mono text-white uppercase tracking-wider">Curator AI Assistant</h3>
                <p className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" /> ONLINE // SYSTEM GUIDE
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 font-sans text-xs leading-relaxed">
            {messages.map((msg) => {
              const isUser = msg.role === "user"
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${isUser ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`h-7 w-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                      isUser
                        ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                        : "bg-violet-500/20 text-violet-400 border border-violet-500/30"
                    }`}
                  >
                    {isUser ? <User size={14} /> : <Bot size={14} />}
                  </div>

                  <div
                    className={`max-w-[80%] rounded-2xl p-3.5 border ${
                      isUser
                        ? "bg-cyan-500/10 border-cyan-500/30 text-zinc-100 rounded-tr-none"
                        : "bg-white/[0.04] border-white/10 text-zinc-200 rounded-tl-none whitespace-pre-wrap"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              )
            })}

            {/* Quick Action Chips */}
            {messages.length === 1 && (
              <div className="space-y-1.5 pt-2">
                <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Quick Prompts:</p>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "How do I sync GitHub repos?",
                    "How to change my portfolio template?",
                    "Where do I see my visitor analytics?",
                    "How do I toggle Light Mode?"
                  ].map((chip) => (
                    <button
                      key={chip}
                      onClick={() => {
                        setInput(chip)
                        setTimeout(() => handleSend(), 50)
                      }}
                      className="px-2.5 py-1 rounded-xl border border-white/10 bg-white/5 text-[11px] text-zinc-300 hover:text-cyan-300 hover:border-cyan-500/40 hover:bg-cyan-500/10 transition-all text-left cursor-pointer"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {loading && (
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-[11px] p-2">
                <RefreshCw size={14} className="animate-spin text-cyan-400" />
                <span>Curator AI is thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-3 border-t border-white/10 bg-[#050518] flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask how Portflix works or how to use a feature..."
              className="flex-1 bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500/50"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="p-2 rounded-xl bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition-all disabled:opacity-40 cursor-pointer shrink-0 font-bold"
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      )}
    </>
  )
}
