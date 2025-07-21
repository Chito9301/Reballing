"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type Theme = "light" | "dark" | "system"

type ThemeContextType = {
  theme: Theme
  setTheme: (theme: Theme) => void
  actualTheme: "light" | "dark"
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  setTheme: () => {},
  actualTheme: "dark",
})

export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("dark")
  const [actualTheme, setActualTheme] = useState<"light" | "dark">("dark")

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem("challz-theme") as Theme
    if (savedTheme) {
      setTheme(savedTheme)
    } else {
      setTheme("dark") // Default to dark theme for Challz
    }
  }, [])

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")

    let effectiveTheme: "light" | "dark"

    if (theme === "system") {
      effectiveTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    } else {
      effectiveTheme = theme
    }

    root.classList.add(effectiveTheme)
    setActualTheme(effectiveTheme)

    // Save to localStorage
    localStorage.setItem("challz-theme", theme)
  }, [theme])

  // Listen for system theme changes
  useEffect(() => {
    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
      const handleChange = () => {
        const root = window.document.documentElement
        root.classList.remove("light", "dark")
        const newTheme = mediaQuery.matches ? "dark" : "light"
        root.classList.add(newTheme)
        setActualTheme(newTheme)
      }

      mediaQuery.addEventListener("change", handleChange)
      return () => mediaQuery.removeEventListener("change", handleChange)
    }
  }, [theme])

  return <ThemeContext.Provider value={{ theme, setTheme, actualTheme }}>{children}</ThemeContext.Provider>
}
