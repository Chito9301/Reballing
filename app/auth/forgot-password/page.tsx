"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { sendPasswordResetEmail } from "firebase/auth"
import { auth, isFirebaseConfigured } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AppIcon } from "@/components/app-icon"
import { AlertCircle, Loader2, CheckCircle, ArrowLeft } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (!isFirebaseConfigured()) {
      router.push("/env-setup")
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)
    setIsLoading(true)

    if (!isFirebaseConfigured() || !auth) {
      setError("Firebase no está configurado. Por favor configura las variables de entorno.")
      setIsLoading(false)
      return
    }

    if (!email.trim()) {
      setError("Por favor ingresa tu correo electrónico.")
      setIsLoading(false)
      return
    }

    try {
      await sendPasswordResetEmail(auth, email)
      setSuccess(true)
    } catch (error: any) {
      console.error("Password reset error:", error)
      if (error.code === "auth/user-not-found") {
        setError("No existe una cuenta con este correo electrónico.")
      } else if (error.code === "auth/invalid-email") {
        setError("Por favor ingresa un correo electrónico válido.")
      } else if (error.code === "auth/too-many-requests") {
        setError("Demasiados intentos. Por favor espera un momento antes de intentar de nuevo.")
      } else {
        setError("Hubo un problema, intenta nuevamente.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (!isFirebaseConfigured()) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-center">
          <Loader2 className="h-8 w-8 text-purple-500 animate-spin mx-auto mb-4" />
          <p className="text-white">Redirigiendo a configuración...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-900 to-black text-white">
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center text-center">
            <AppIcon size={80} />
            <h1 className="mt-4 text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Recupera tu contraseña
            </h1>
            <p className="mt-2 text-zinc-400">Te ayudamos a recuperar el acceso a tu cuenta</p>
          </div>

          {error && (
            <Alert variant="destructive" className="bg-red-900/20 border-red-900 text-red-300">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="bg-green-900/20 border-green-900 text-green-300">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Te enviaremos un enlace para restablecer tu contraseña si el correo está registrado.
              </AlertDescription>
            </Alert>
          )}

          {!success ? (
            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm text-zinc-400">
                  Correo Electrónico
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Correo electrónico"
                  className="bg-zinc-900 border-zinc-700"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                    Enviando enlace...
                  </>
                ) : (
                  "Enviar enlace de recuperación"
                )}
              </Button>

              <div className="text-center text-sm text-zinc-400">
                <p>Te enviaremos un enlace para restablecer tu contraseña si el correo está registrado.</p>
              </div>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
                <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">¡Enlace enviado!</h3>
                <p className="text-sm text-zinc-400 mb-4">
                  Revisa tu correo electrónico y sigue las instrucciones para restablecer tu contraseña.
                </p>
                <p className="text-xs text-zinc-500">
                  Si no ves el correo, revisa tu carpeta de spam o correo no deseado.
                </p>
              </div>

              <Button
                onClick={() => {
                  setSuccess(false)
                  setEmail("")
                }}
                variant="outline"
                className="w-full border-zinc-700 text-zinc-300 hover:bg-zinc-800"
              >
                Enviar otro enlace
              </Button>
            </div>
          )}

          <div className="text-center">
            <Link
              href="/auth/login"
              className="inline-flex items-center text-purple-400 hover:text-purple-300 font-medium"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al inicio de sesión
            </Link>
          </div>

          <p className="text-center text-xs text-zinc-500">
            ¿No tienes una cuenta?{" "}
            <Link href="/auth/register" className="text-purple-400 hover:text-purple-300 font-medium">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}
