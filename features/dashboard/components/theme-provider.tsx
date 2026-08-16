"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light"

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark")

  useEffect(() => {
    const savedTheme = localStorage.getItem("portflix-theme") as Theme
    if (savedTheme) {
      setTheme(savedTheme)
      if (savedTheme === "light") {
        document.documentElement.classList.add("light-mode")
      } else {
        document.documentElement.classList.remove("light-mode")
      }
    }
  }, [])

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark"
    setTheme(nextTheme)
    localStorage.setItem("portflix-theme", nextTheme)

    if (nextTheme === "light") {
      document.documentElement.classList.add("light-mode")
    } else {
      document.documentElement.classList.remove("light-mode")
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
