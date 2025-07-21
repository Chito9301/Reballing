"use client"

import { ArrowLeft, LogOut, User, Bell, Shield, HelpCircle, Smartphone, Moon, Sun, Monitor } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useAuth } from "@/contexts/auth-context"
import { useTheme } from "@/contexts/theme-context"
import { useRouter } from "next/navigation"
import ProtectedRoute from "@/components/protected-route"
import { useState } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SettingsPage() {
  const { user, logout } = useAuth()
  const { theme, setTheme, actualTheme } = useTheme()
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [error, setError] = useState("")
  const [notifications, setNotifications] = useState(true)
  const [autoPlay, setAutoPlay] = useState(true)

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true)
      setError("")
      await logout()
      router.push("/auth/login")
    } catch (error: any) {
      console.error("Logout error:", error)
      setError("Error al cerrar sesión. Por favor intenta de nuevo.")
    } finally {
      setIsLoggingOut(false)
    }
  }

  const handleSwitchAccount = () => {
    router.push("/auth/switch-account")
  }

  const getThemeIcon = () => {
    if (theme === "system") return <Monitor className="h-5 w-5 text-muted-foreground" />
    return actualTheme === "dark" ? (
      <Moon className="h-5 w-5 text-muted-foreground" />
    ) : (
      <Sun className="h-5 w-5 text-muted-foreground" />
    )
  }

  return (
    <ProtectedRoute>
      <div className="flex flex-col min-h-screen bg-background text-foreground">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="flex items-center gap-2">
            <Link href="/profile">
              <Button variant="ghost" size="icon" className="text-muted-foreground">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-lg font-semibold">Configuración</h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 pt-16 pb-4">
          <div className="p-4 max-w-md mx-auto">
            {error && (
              <Alert variant="destructive" className="bg-destructive/10 border-destructive/20 text-destructive mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Account Section */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4 text-purple-400">Cuenta</h2>
              <div className="space-y-2">
                <Link href="/profile/edit">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-muted-foreground" />
                      <span>Editar perfil</span>
                    </div>
                    <span className="text-muted-foreground">›</span>
                  </div>
                </Link>

                <div
                  className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors cursor-pointer"
                  onClick={handleSwitchAccount}
                >
                  <div className="flex items-center gap-3">
                    <Smartphone className="h-5 w-5 text-muted-foreground" />
                    <span>Cambiar de cuenta</span>
                  </div>
                  <span className="text-muted-foreground">›</span>
                </div>
              </div>
            </div>

            {/* Preferences Section */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4 text-purple-400">Preferencias</h2>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <Bell className="h-5 w-5 text-muted-foreground" />
                    <span>Notificaciones</span>
                  </div>
                  <Switch checked={notifications} onCheckedChange={setNotifications} />
                </div>

                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    {getThemeIcon()}
                    <span>Tema</span>
                  </div>
                  <Select value={theme} onValueChange={(value: "light" | "dark" | "system") => setTheme(value)}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Claro</SelectItem>
                      <SelectItem value="dark">Oscuro</SelectItem>
                      <SelectItem value="system">Sistema</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-muted-foreground"
                    >
                      <polygon points="5,3 19,12 5,21" />
                    </svg>
                    <span>Reproducción automática</span>
                  </div>
                  <Switch checked={autoPlay} onCheckedChange={setAutoPlay} />
                </div>
              </div>
            </div>

            {/* Privacy & Security Section */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4 text-purple-400">Privacidad y Seguridad</h2>
              <div className="space-y-2">
                <Link href="/settings/privacy">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-muted-foreground" />
                      <span>Privacidad</span>
                    </div>
                    <span className="text-muted-foreground">›</span>
                  </div>
                </Link>

                <Link href="/settings/blocked">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                    <div className="flex items-center gap-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-muted-foreground"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="m4.9 4.9 14.2 14.2" />
                      </svg>
                      <span>Usuarios bloqueados</span>
                    </div>
                    <span className="text-muted-foreground">›</span>
                  </div>
                </Link>
              </div>
            </div>

            {/* Support Section */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4 text-purple-400">Soporte</h2>
              <div className="space-y-2">
                <Link href="/help">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                    <div className="flex items-center gap-3">
                      <HelpCircle className="h-5 w-5 text-muted-foreground" />
                      <span>Centro de ayuda</span>
                    </div>
                    <span className="text-muted-foreground">›</span>
                  </div>
                </Link>

                <Link href="/about">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                    <div className="flex items-center gap-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-muted-foreground"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                        <path d="M12 17h.01" />
                      </svg>
                      <span>Acerca de Challz</span>
                    </div>
                    <span className="text-muted-foreground">›</span>
                  </div>
                </Link>
              </div>
            </div>

            {/* Logout Section */}
            <div className="space-y-3">
              <Button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="w-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                {isLoggingOut ? "Cerrando sesión..." : "Cerrar sesión"}
              </Button>

              <p className="text-center text-xs text-muted-foreground">Versión 1.0.0 • {user?.email}</p>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
