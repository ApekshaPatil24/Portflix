import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Metadata } from "next"

interface Props {
  params: { username: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params
  const portfolio = await prisma.portfolio.findUnique({ where: { username } })

  if (!portfolio) return { title: "Portfolio Not Found" }

  return {
    title: `${portfolio.displayName} | ${portfolio.professionalTitle}`,
    description: portfolio.headline || `Professional portfolio of ${portfolio.displayName}.`,
    openGraph: {
      title: `${portfolio.displayName} | ${portfolio.professionalTitle}`,
      description: portfolio.headline || `Professional portfolio of ${portfolio.displayName}.`,
      images: portfolio.avatarUrl ? [portfolio.avatarUrl] : [],
    },
  }
}

// Lazy-import all 5 templates — only the chosen one is server-rendered
import TemplateFullstack from "./templates/template-fullstack"
import TemplateBackend from "./templates/template-backend"
import TemplateFrontend from "./templates/template-frontend"
import TemplateUIUX from "./templates/template-uiux"
import TemplateOther from "./templates/template-other"
import RecruiterContactModal from "@/features/portfolio/components/recruiter-contact-modal"


function getTemplateComponent(key: string) {
  switch (key) {
    case "fullstack": return TemplateFullstack
    case "backend":   return TemplateBackend
    case "frontend":  return TemplateFrontend
    case "uiux":      return TemplateUIUX
    case "other":     return TemplateOther
    default:          return TemplateFullstack
  }
}

export default async function PublicPortfolioPage({ params }: Props) {
  const { username } = await params
  const portfolio = await prisma.portfolio.findUnique({
    where: { username },
    include: {
      user: true,
      projects: { orderBy: { updatedAt: "desc" } }
    }
  })

  if (!portfolio) notFound()

  const Template = getTemplateComponent(portfolio.templateKey ?? "fullstack")

  return (
    <>
      <Template portfolio={portfolio} />
      <RecruiterContactModal username={portfolio.username} displayName={portfolio.displayName} />
    </>
  )
}

