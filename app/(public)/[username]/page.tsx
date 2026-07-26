import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Metadata } from "next"
import { ExternalLink, Terminal, Cpu, Blocks, Mail, MapPin, Code2 } from "lucide-react"

interface Props {
  params: { username: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params
  const portfolio = await prisma.portfolio.findUnique({
    where: { username },
  })

  if (!portfolio) {
    return { title: "Portfolio Not Found" }
  }

  return {
    title: `${portfolio.displayName} | ${portfolio.professionalTitle}`,
    description: `Professional portfolio of ${portfolio.displayName}.`,
  }
}

import PortfolioClient from "./portfolio-client"

function getTechThemeIndex(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % 4
}

export default async function PublicPortfolioPage({ params }: Props) {
  const { username } = await params
  const portfolio = await prisma.portfolio.findUnique({
    where: { username },
    include: {
      user: true,
      projects: {
        orderBy: { updatedAt: 'desc' }
      }
    }
  })

  if (!portfolio) {
    notFound()
  }

  const initialThemeIndex = getTechThemeIndex(portfolio.username)

  return (
    <PortfolioClient 
      portfolio={portfolio} 
      initialThemeIndex={initialThemeIndex} 
    />
  )
}
