
import type { Metadata } from "next"
import {
  Syne,
  Plus_Jakarta_Sans,
  JetBrains_Mono,
} from "next/font/google"

import "./globals.css"

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
})

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Portlix",
  description: "Developer identity platform",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`
        ${syne.variable}
        ${jakarta.variable}
        ${mono.variable}
      `}
    >
      <body className="bg-[#02030d] text-white font-sans antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}