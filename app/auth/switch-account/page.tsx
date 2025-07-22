"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AppIcon } from "@/components/app-icon"
import { Separator } from "@/components/ui/separator"
import { AlertCircle, Loader2, ArrowLeft, UserPlus } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function SwitchAccountPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { signIn, logout, user, isConfigured } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    if (!isConfigured) {
      setError("Firebase no está configurado. Por favor configura las variables de entorno.")
      setIsLoading(false)
      return
    }

    try {
      // First logout current user
      await logout()
      // Then sign in with new credentials
      await signIn(email, password)
      router.push("/")
    } catch (error: any) {
      console.error("Switch account error:", error)
      if (error.code === "auth/invalid-credential") {
        setError("Credenciales inválidas. Por favor verifica tu email y contraseña.")
      } else {
        setError("Ocurrió un error al cambiar de cuenta. Por favor intenta de nuevo.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogoutOnly = async () => {
    try {
      setIsLoading(true)
      await logout()
      router.push("/auth/login")
    } catch (error) {
      console.error("Logout error:", error)
      setError("Error al cerrar sesión.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-900 to-black text-white">
      {/* Header */}
      <header className="flex items-center justify-between p-4">
        <Link href="/settings">
          <Button variant="ghost" size="icon" className="text-zinc-400">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-lg font-semibold">Cambiar de cuenta</h1>
        <div className="w-10" /> {/* Spacer */}
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center text-center">
            <AppIcon size={80} />
            <h2 className="mt-4 text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Cambiar de cuenta
            </h2>
            <p className="mt-2 text-zinc-400">Inicia sesión con una cuenta diferente</p>
          </div>

          {/* Current User */}
          {user && (
            <div className="bg-zinc-900 rounded-lg p-4 border border-zinc-800">
              <p className="text-sm text-zinc-400 mb-2">Cuenta actual:</p>
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={user.photoURL || "/placeholder.svg?height=40&width=40"}
                    alt={user.displayName || "Usuario"}
                  />
                  <AvatarFallback>{user.displayName?.charAt(0) || user.email?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{user.displayName || "Usuario"}</p>
                  <p className="text-sm text-zinc-400">{user.email}</p>
                </div>
              </div>
            </div>
          )}

          {error && (
            <Alert variant="destructive" className="bg-red-900/20 border-red-900 text-red-300">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm text-zinc-400">
                Correo Electrónico
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                className="bg-zinc-900 border-zinc-700"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm text-zinc-400">
                Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="bg-zinc-900 border-zinc-700"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Cambiando cuenta...
                </>
              ) : (
                "Cambiar cuenta"
              )}
            </Button>
          </form>

          <div className="relative my-6">
            <Separator className="bg-zinc-800" />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-black px-2 text-xs text-zinc-500">
              O
            </span>
          </div>

          <div className="space-y-3">
            <Link href="/auth/register">
              <Button variant="outline" className="w-full border-zinc-700 hover:bg-zinc-900 bg-transparent">
                <UserPlus className="mr-2 h-4 w-4" />
                Crear nueva cuenta
              </Button>
            </Link>

            <Button
              variant="outline"
              className="w-full border-red-700 text-red-400 hover:bg-red-900/20 bg-transparent"
              onClick={handleLogoutOnly}
              disabled={isLoading}
            >
              Solo cerrar sesión
            </Button>
          </div>

          <p className="text-center text-xs text-zinc-500">
            Al cambiar de cuenta, cerrarás la sesión actual y accederás con las nuevas credenciales.
          </p>
        </div>
      </main>
    </div>
  )
}
