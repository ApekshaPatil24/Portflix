"use client"

import { useState } from "react"
import { ExternalLink, Terminal, Cpu, Blocks, Mail, MapPin, Code2, Palette } from "lucide-react"

export const TECH_PALETTES = [
  {
    name: "Cyber",
    bg: "#0A0A0A",
    cardBg: "rgba(18, 18, 18, 0.7)",
    border: "rgba(255, 255, 255, 0.05)",
    text: "#FAFAFA",
    textMuted: "#A3A3A3",
    accent: "#06B6D4", // Cyan
    accentGlow: "rgba(6, 182, 212, 0.25)",
    isDark: true
  },
  {
    name: "Nebula",
    bg: "#09090B",
    cardBg: "rgba(17, 17, 21, 0.7)",
    border: "rgba(255, 255, 255, 0.05)",
    text: "#FAFAFA",
    textMuted: "#A1A1AA",
    accent: "#A855F7", // Purple
    accentGlow: "rgba(168, 85, 247, 0.25)",
    isDark: true
  },
  {
    name: "Terminal",
    bg: "#000000",
    cardBg: "rgba(10, 10, 10, 0.7)",
    border: "rgba(31, 41, 55, 0.5)",
    text: "#F3F4F6",
    textMuted: "#9CA3AF",
    accent: "#10B981", // Emerald
    accentGlow: "rgba(16, 185, 129, 0.2)",
    isDark: true
  },
  {
    name: "Clean Slate",
    bg: "#FAFAFA",
    cardBg: "rgba(255, 255, 255, 0.8)",
    border: "rgba(0, 0, 0, 0.08)",
    text: "#030712",
    textMuted: "#4B5563",
    accent: "#4F46E5", // Indigo
    accentGlow: "rgba(79, 70, 229, 0.15)",
    isDark: false
  }
]

export default function PortfolioClient({ portfolio, initialThemeIndex }: { portfolio: any, initialThemeIndex: number }) {
  const [themeIndex, setThemeIndex] = useState(initialThemeIndex)
  const theme = TECH_PALETTES[themeIndex]

  const handleNextTheme = () => {
    setThemeIndex((prev) => (prev + 1) % TECH_PALETTES.length)
  }

  return (
    <main 
      style={{ backgroundColor: theme.bg, color: theme.text }} 
      className="min-h-screen font-sans selection:bg-black selection:text-white pb-24 transition-colors duration-500 ease-in-out relative overflow-hidden"
    >
      {/* Dynamic Animated Background Gradients */}
      <div 
        className="fixed top-0 left-0 w-full h-[500px] opacity-20 pointer-events-none transition-all duration-1000 ease-in-out blur-[120px]"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${theme.accent}, transparent 70%)`
        }}
      />
      
      {/* Subtle Background Grid for Tech Aesthetic */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{ 
          backgroundImage: `linear-gradient(${theme.text} 1px, transparent 1px), linear-gradient(90deg, ${theme.text} 1px, transparent 1px)`,
          backgroundSize: '3rem 3rem'
        }}
      />

      <div className="max-w-6xl mx-auto px-6 pt-12 relative z-10">
        
        {/* Navigation / Header */}
        <nav className="flex items-center justify-between mb-24 backdrop-blur-md py-4 px-6 rounded-2xl border transition-all duration-500" style={{ backgroundColor: theme.cardBg, borderColor: theme.border }}>
          <div className="flex items-center gap-3">
            <Terminal size={20} style={{ color: theme.accent }} />
            <span className="font-mono text-sm font-semibold tracking-tight">{portfolio.username}</span>
          </div>
          <div className="flex items-center gap-4">
             <button 
                onClick={handleNextTheme}
                className="p-2 rounded-full border hover:scale-110 transition-transform flex items-center justify-center cursor-pointer shadow-lg"
                style={{ backgroundColor: theme.bg, borderColor: theme.border }}
                title="Toggle Theme"
             >
                <Palette size={16} style={{ color: theme.accent }} />
             </button>
             <a 
                href={`mailto:${portfolio.user?.email || "hello@example.com"}`}
                style={{ backgroundColor: theme.accent, color: theme.isDark ? '#000' : '#fff' }}
                className="px-5 py-2 rounded-full text-xs font-mono font-bold hover:opacity-90 transition-opacity flex items-center gap-2 shadow-xl hover:shadow-2xl"
              >
                <Mail size={14} /> CONNECT
             </a>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-start md:items-center justify-between gap-12 mb-32 relative">
          <div className="flex-1 space-y-6">
            <div 
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-mono mb-4 shadow-sm backdrop-blur-md transition-all duration-500"
              style={{ borderColor: theme.border, backgroundColor: theme.cardBg, color: theme.textMuted }}
            >
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: theme.accent, boxShadow: `0 0 8px ${theme.accent}` }} />
              Available for opportunities
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
              Hi, I'm <span style={{ color: theme.text }}>{portfolio.displayName.split(" ")[0]}</span>
            </h1>
            
            <h2 className="text-xl md:text-3xl font-medium tracking-tight leading-relaxed max-w-2xl" style={{ color: theme.textMuted }}>
              I'm a <span style={{ color: theme.accent, textShadow: `0 0 20px ${theme.accentGlow}` }}>{portfolio.professionalTitle}</span> building digital products and crafting exceptional user experiences.
            </h2>
          </div>

          <div className="relative w-48 h-48 md:w-72 md:h-72 flex-shrink-0 group">
             <div 
               className="absolute inset-0 rounded-full blur-[60px] opacity-40 group-hover:opacity-60 transition-opacity duration-700"
               style={{ backgroundColor: theme.accent }}
             />
             <div 
               className="relative w-full h-full rounded-full border-4 flex items-center justify-center overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-105"
               style={{ backgroundColor: theme.cardBg, borderColor: theme.border }}
             >
               {portfolio.avatarUrl ? (
                 <img src={portfolio.avatarUrl} alt={portfolio.displayName} className="w-full h-full object-cover" />
               ) : (
                 <Cpu size={64} style={{ color: theme.textMuted }} className="group-hover:text-white transition-colors duration-300" />
               )}
             </div>
          </div>
        </section>

        {/* Bento Box Layout */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
           
           {/* About Card */}
           <div 
             className="md:col-span-2 p-10 rounded-[2rem] border shadow-xl flex flex-col justify-between backdrop-blur-md hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden group"
             style={{ backgroundColor: theme.cardBg, borderColor: theme.border }}
           >
             <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/5 to-transparent rounded-bl-full pointer-events-none" />
             <div>
               <div className="flex items-center gap-2 mb-6 opacity-70">
                 <Terminal size={18} />
                 <span className="font-mono text-xs uppercase tracking-wider font-bold">About</span>
               </div>
               <p className="text-lg leading-relaxed font-medium" style={{ color: theme.textMuted }}>
                 {portfolio.about || `I am a dedicated ${portfolio.professionalTitle} passionate about writing clean, maintainable code and solving complex technical challenges. I thrive in environments that push the boundaries of modern architecture.`}
               </p>
             </div>
             
             {portfolio.location && (
               <div className="flex items-center gap-2 mt-8 font-mono text-xs font-bold" style={{ color: theme.textMuted }}>
                 <MapPin size={16} style={{ color: theme.accent }} />
                 {portfolio.location}
               </div>
             )}
           </div>

           {/* Skills Card */}
           <div 
             className="p-10 rounded-[2rem] border shadow-xl flex flex-col backdrop-blur-md hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden"
             style={{ backgroundColor: theme.cardBg, borderColor: theme.border }}
           >
             <div className="flex items-center gap-2 mb-6 opacity-70">
                 <Blocks size={18} />
                 <span className="font-mono text-xs uppercase tracking-wider font-bold">Stack</span>
             </div>
             
             <div className="flex flex-wrap gap-2 mt-auto">
               {portfolio.skills.map((skill: string) => (
                 <span 
                   key={skill}
                   className="px-4 py-2 rounded-lg border text-xs font-mono font-bold shadow-sm transition-all hover:scale-105"
                   style={{ backgroundColor: theme.bg, borderColor: theme.border, color: theme.text }}
                 >
                   {skill}
                 </span>
               ))}
               {portfolio.skills.length === 0 && (
                 <span className="text-sm font-medium" style={{ color: theme.textMuted }}>No skills listed yet.</span>
               )}
             </div>
           </div>

        </section>

        {/* Projects Grid */}
        <section>
          <div className="flex items-center gap-3 mb-10 opacity-90 pl-2">
              <Code2 size={28} style={{ color: theme.accent }} />
              <h2 className="font-mono text-2xl uppercase tracking-widest font-black">Selected Projects</h2>
          </div>

          {portfolio.projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {portfolio.projects.map((project: any) => (
                <div 
                  key={project.id}
                  className="group p-8 md:p-10 rounded-[2rem] border transition-all duration-500 flex flex-col justify-between backdrop-blur-md relative overflow-hidden"
                  style={{ 
                    backgroundColor: theme.cardBg, 
                    borderColor: theme.border,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'
                    e.currentTarget.style.boxShadow = `0 20px 40px -10px ${theme.accentGlow}`
                    e.currentTarget.style.borderColor = theme.accent
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'none'
                    e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                    e.currentTarget.style.borderColor = theme.border
                  }}
                >
                  {/* Neon Top Bar */}
                  <div className="absolute top-0 left-0 w-full h-1.5 opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-[0_0_10px_currentColor]" style={{ backgroundColor: theme.accent, color: theme.accent }} />
                  
                  {/* Subtle Background Glow on Hover */}
                  <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full blur-[80px] opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none" style={{ backgroundColor: theme.accent }} />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-8">
                      <div className="p-3 rounded-2xl border shadow-sm transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110 flex items-center justify-center bg-gradient-to-br from-white/10 to-transparent backdrop-blur-sm" style={{ borderColor: theme.border }}>
                         <Code2 size={24} style={{ color: theme.accent }} />
                      </div>
                      <a 
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-mono font-bold hover:underline opacity-60 hover:opacity-100 transition-opacity flex items-center gap-2 px-4 py-2 rounded-full border hover:bg-white/10"
                        style={{ borderColor: theme.border }}
                      >
                        Source <ExternalLink size={14} />
                      </a>
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-black mb-5 tracking-tight transition-colors duration-300" style={{ color: theme.text }}>
                      <span className="relative inline-block">
                        {project.title}
                        <span className="absolute left-0 bottom-0 w-0 h-[2px] transition-all duration-500 group-hover:w-full" style={{ backgroundColor: theme.accent }} />
                      </span>
                    </h3>
                    <p className="text-base font-medium leading-relaxed mb-10 opacity-80 transition-opacity duration-300 group-hover:opacity-100" style={{ color: theme.textMuted }}>
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2.5 relative z-10 mt-auto">
                    {project.techStack.map((tech: string) => (
                      <span 
                        key={tech} 
                        className="px-4 py-1.5 text-xs font-bold rounded-full shadow-sm backdrop-blur-sm transition-all duration-300 hover:scale-110"
                        style={{ backgroundColor: theme.accentGlow, color: theme.accent, border: `1px solid ${theme.accent}40` }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div 
              className="w-full py-32 rounded-[2rem] border text-center flex flex-col items-center justify-center gap-6 shadow-xl backdrop-blur-md" 
              style={{ backgroundColor: theme.cardBg, borderColor: theme.border }}
            >
              <Terminal size={48} style={{ color: theme.textMuted }} className="opacity-30" />
              <p className="text-sm font-mono font-bold opacity-50 uppercase tracking-widest">No Projects Synchronized</p>
            </div>
          )}
        </section>

        {/* Minimal Footer */}
        <footer className="mt-32 pt-8 pb-12 border-t flex flex-col md:flex-row items-center justify-between gap-6 transition-colors duration-500" style={{ borderColor: theme.border, color: theme.textMuted }}>
           <div className="font-mono text-sm font-bold">
             © {new Date().getFullYear()} {portfolio.displayName}.
           </div>
           <div className="font-mono text-xs flex items-center gap-3 font-bold px-4 py-2 rounded-full border backdrop-blur-sm shadow-sm" style={{ backgroundColor: theme.cardBg, borderColor: theme.border }}>
             <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: theme.accent, boxShadow: `0 0 8px ${theme.accent}` }} />
             Systems Operational
           </div>
        </footer>

      </div>
    </main>
  )
}
