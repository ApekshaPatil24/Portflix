import {
  Sparkles,
  FileText,
  Globe,
  Radar,
  Wand2,
  LayoutTemplate,
} from "lucide-react"

export const FEATURES = [
  {
    id: 1,
    title: "AI Portfolio Builder",
    description:
      "Paste your GitHub URL. Our AI reads every repo, commit, and README — then crafts a cinematic developer story recruiters can’t ignore.",
    tag: "✦ Powered by Claude",
    variant: "cyan",
    icon: Sparkles,
    large: true,
  },
  {
    id: 2,
    title: "JD-Tailored Resume",
    description:
      "Paste any job description. Get a resume tailored to it in seconds. ATS-optimized and always updated.",
    tag: "Always current",
    variant: "pink",
    icon: FileText,
  },
  {
    id: 3,
    title: "Live GitHub Sync",
    description:
      "Real-time contribution graphs, language breakdown, and repo highlights synced automatically.",
    tag: "Zero config",
    variant: "purple",
    icon: Globe,
  },
  {
    id: 4,
    title: "Recruiter Analytics",
    description:
      "See who viewed your portfolio and how recruiters interact with every section.",
    tag: "Real-time insights",
    variant: "cyan",
    icon: Radar,
  },
  {
    id: 5,
    title: "AI Storytelling",
    description:
      "Turn commits into compelling narratives that highlight your engineering impact.",
    tag: "Narrative AI",
    variant: "pink",
    icon: Wand2,
  },
  {
  id: 6,
  title: "Premium Templates",
  description:
    "Beautiful portfolio templates designed for modern developers and engineers.",
  tag: "50+ templates",
  variant: "purple",
  icon: LayoutTemplate,
  wide: true,
  showTerminal: false,
},
]