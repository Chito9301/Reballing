"use client"

import { ArrowLeft, LogOut, User, Bell, Shield, HelpCircle, Smartphone, Moon, Sun } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import ProtectedRoute from "@/components/protected-route"
import { useState } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function SettingsPage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [error, setError] = useState("")
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(true)
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

  return (
    <ProtectedRoute>
      <div className="flex flex-col min-h-screen bg-black text-white">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-black/80 backdrop-blur-md border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <Link href="/profile">
              <Button variant="ghost" size="icon" className="text-zinc-400">
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
              <Alert variant="destructive" className="bg-red-900/20 border-red-900 text-red-300 mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Account Section */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4 text-purple-400">Cuenta</h2>
              <div className="space-y-2">
                <Link href="/profile/edit">
                  <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg hover:bg-zinc-800 transition-colors">
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-zinc-400" />
                      <span>Editar perfil</span>
                    </div>
                    <span className="text-zinc-400">›</span>
                  </div>
                </Link>

                <div
                  className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
                  onClick={handleSwitchAccount}
                >
                  <div className="flex items-center gap-3">
                    <Smartphone className="h-5 w-5 text-zinc-400" />
                    <span>Cambiar de cuenta</span>
                  </div>
                  <span className="text-zinc-400">›</span>
                </div>
              </div>
            </div>

            {/* Preferences Section */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4 text-purple-400">Preferencias</h2>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Bell className="h-5 w-5 text-zinc-400" />
                    <span>Notificaciones</span>
                  </div>
                  <Switch checked={notifications} onCheckedChange={setNotifications} />
                </div>

                <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
                  <div className="flex items-center gap-3">
                    {darkMode ? <Moon className="h-5 w-5 text-zinc-400" /> : <Sun className="h-5 w-5 text-zinc-400" />}
                    <span>Modo oscuro</span>
                  </div>
                  <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                </div>

                <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
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
                      className="text-zinc-400"
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
                  <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg hover:bg-zinc-800 transition-colors">
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-zinc-400" />
                      <span>Privacidad</span>
                    </div>
                    <span className="text-zinc-400">›</span>
                  </div>
                </Link>

                <Link href="/settings/blocked">
                  <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg hover:bg-zinc-800 transition-colors">
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
                        className="text-zinc-400"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="m4.9 4.9 14.2 14.2" />
                      </svg>
                      <span>Usuarios bloqueados</span>
                    </div>
                    <span className="text-zinc-400">›</span>
                  </div>
                </Link>
              </div>
            </div>

            {/* Support Section */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4 text-purple-400">Soporte</h2>
              <div className="space-y-2">
                <Link href="/help">
                  <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg hover:bg-zinc-800 transition-colors">
                    <div className="flex items-center gap-3">
                      <HelpCircle className="h-5 w-5 text-zinc-400" />
                      <span>Centro de ayuda</span>
                    </div>
                    <span className="text-zinc-400">›</span>
                  </div>
                </Link>

                <Link href="/about">
                  <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg hover:bg-zinc-800 transition-colors">
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
                        className="text-zinc-400"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                        <path d="M12 17h.01" />
                      </svg>
                      <span>Acerca de Challz</span>
                    </div>
                    <span className="text-zinc-400">›</span>
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

              <p className="text-center text-xs text-zinc-500">Versión 1.0.0 • {user?.email}</p>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
