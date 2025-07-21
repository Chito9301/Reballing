import type React from "react"
import "@/app/globals.css"
import { ThemeProvider as NextThemeProvider } from "@/components/theme-provider"
import { ThemeProvider } from "@/contexts/theme-context"
import { AuthProvider } from "@/contexts/auth-context"

export const metadata = {
  title: "Challz - Desafía tu rutina. Reta tu mundo.",
  description: "Una aplicación de retos diarios para inspirar creatividad, conexión social y crecimiento personal.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider>
          <NextThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            <AuthProvider>{children}</AuthProvider>
          </NextThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
