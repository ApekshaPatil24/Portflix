export interface TemplateConfig {
  key: string
  name: string
  role: string
  description: string
  tags: string[]
  accent: string
  gradient: string
  previewBg: string
  isDark: boolean
}

export const TEMPLATES: TemplateConfig[] = [
  {
    key: "fullstack",
    name: "Cyber Bento",
    role: "Full Stack Developer",
    description: "Dark terminal-inspired bento grid layout with neon accents. Perfect for developers who ship full-stack products.",
    tags: ["Bento Grid", "Dark Mode", "Terminal", "Neon"],
    accent: "#06B6D4",
    gradient: "from-cyan-500/20 via-slate-900 to-cyan-900/20",
    previewBg: "#0A0A0F",
    isDark: true,
  },
  {
    key: "backend",
    name: "Matrix Grid",
    role: "Backend Developer",
    description: "Deep dark green matrix-inspired layout with hexagonal accents. Built for engineers who live in the terminal.",
    tags: ["Matrix", "Dark Mode", "Minimal", "Engineering"],
    accent: "#10B981",
    gradient: "from-emerald-500/20 via-slate-900 to-green-900/20",
    previewBg: "#020D07",
    isDark: true,
  },
  {
    key: "frontend",
    name: "Vivid Canvas",
    role: "Frontend Developer",
    description: "Vibrant gradient cards with playful micro-animations. Showcases creativity and an eye for beautiful UIs.",
    tags: ["Colorful", "Gradient", "Animated", "Creative"],
    accent: "#F59E0B",
    gradient: "from-amber-400/20 via-rose-500/20 to-violet-600/20",
    previewBg: "#0D0A14",
    isDark: true,
  },
  {
    key: "uiux",
    name: "Editorial",
    role: "UI/UX Designer",
    description: "Clean white editorial magazine layout with refined typography. Elegant, minimal, and conversion-focused.",
    tags: ["Editorial", "Light Mode", "Magazine", "Elegant"],
    accent: "#8B5CF6",
    gradient: "from-violet-100 to-slate-50",
    previewBg: "#FAFAFF",
    isDark: false,
  },
  {
    key: "other",
    name: "Professional",
    role: "Other Roles",
    description: "Warm neutral minimal card layout. Versatile and professional for any creative or business role.",
    tags: ["Minimal", "Warm", "Professional", "Versatile"],
    accent: "#F97316",
    gradient: "from-orange-500/20 via-stone-900 to-amber-900/20",
    previewBg: "#100C08",
    isDark: true,
  },
]

export function getTemplate(key: string): TemplateConfig {
  return TEMPLATES.find(t => t.key === key) ?? TEMPLATES[0]
}
