"use client"

import type React from "react"

import { useState } from "react"
import { sendPasswordResetEmail } from "firebase/auth"
import { auth, isFirebaseConfigured } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AppIcon } from "@/components/app-icon"
import Link from "next/link"
import { ArrowLeft, Mail, CheckCircle, AlertCircle, Loader2 } from "lucide-react"

export default function RecuperarPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [emailSent, setEmailSent] = useState(false)

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email.trim()) {
      setError("Por favor ingresa tu correo electrónico")
      return
    }

    if (!validateEmail(email)) {
      setError("Por favor ingresa un correo electrónico válido")
      return
    }

    setIsLoading(true)
    setError("")
    setMessage("")

    try {
      if (!isFirebaseConfigured() || !auth) {
        // Demo mode - simulate success
        await new Promise((resolve) => setTimeout(resolve, 2000))
        setEmailSent(true)
        setMessage(`Se ha enviado un correo de recuperación a ${email}`)
      } else {
        // Real Firebase implementation
        await sendPasswordResetEmail(auth, email)
        setEmailSent(true)
        setMessage(`Se ha enviado un correo de recuperación a ${email}`)
      }
    } catch (error: any) {
      console.error("Error sending password reset email:", error)

      // Handle specific Firebase errors
      switch (error.code) {
        case "auth/user-not-found":
          setError("No existe una cuenta con este correo electrónico")
          break
        case "auth/invalid-email":
          setError("El correo electrónico no es válido")
          break
        case "auth/too-many-requests":
          setError("Demasiados intentos. Intenta de nuevo más tarde")
          break
        default:
          setError("Error al enviar el correo. Intenta de nuevo")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendAnother = () => {
    setEmailSent(false)
    setMessage("")
    setError("")
    setEmail("")
  }

  if (emailSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-black flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <AppIcon size={80} />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">¡Correo Enviado!</h1>
            <p className="text-purple-200">Revisa tu bandeja de entrada</p>
          </div>

          {/* Success Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>

              <Alert className="bg-green-500/10 border-green-500/20 mb-4">
                <Mail className="h-4 w-4 text-green-400" />
                <AlertDescription className="text-green-100">{message}</AlertDescription>
              </Alert>

              <div className="text-sm text-purple-200 space-y-2">
                <p>• Revisa tu bandeja de entrada y spam</p>
                <p>• El enlace expira en 1 hora</p>
                <p>• Si no lo recibes, puedes solicitar otro</p>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleSendAnother}
                variant="outline"
                className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <Mail className="w-4 h-4 mr-2" />
                Enviar a otro correo
              </Button>

              <Link href="/auth/login">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Volver al inicio de sesión
                </Button>
              </Link>
            </div>
          </div>

          {/* Help Info */}
          <div className="mt-6 text-center">
            <p className="text-purple-300 text-sm">
              ¿Problemas para recuperar tu cuenta?{" "}
              <Link href="/help" className="text-pink-400 hover:text-pink-300 underline">
                Contacta soporte
              </Link>
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <AppIcon size={80} />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Recuperar Contraseña</h1>
          <p className="text-purple-200">Ingresa tu correo para recibir un enlace de recuperación</p>
        </div>

        {/* Recovery Form */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                Correo Electrónico
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                className="bg-white/10 border-white/20 text-white placeholder:text-purple-300 focus:border-purple-400 focus:ring-purple-400"
                disabled={isLoading}
              />
            </div>

            {error && (
              <Alert className="bg-red-500/10 border-red-500/20">
                <AlertCircle className="h-4 w-4 text-red-400" />
                <AlertDescription className="text-red-100">{error}</AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Enviando correo...
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4 mr-2" />
                  Enviar enlace de recuperación
                </>
              )}
            </Button>
          </form>

          {/* Navigation Links */}
          <div className="mt-6 space-y-3">
            <Link href="/auth/login">
              <Button variant="outline" className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al inicio de sesión
              </Button>
            </Link>

            <div className="text-center">
              <p className="text-purple-300 text-sm">
                ¿No tienes cuenta?{" "}
                <Link href="/auth/register" className="text-pink-400 hover:text-pink-300 underline">
                  Regístrate aquí
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Help Info */}
        <div className="mt-6 text-center">
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <h3 className="text-white font-medium mb-2">💡 Información útil</h3>
            <div className="text-purple-300 text-sm space-y-1">
              <p>• El correo puede tardar unos minutos en llegar</p>
              <p>• Revisa tu carpeta de spam o correo no deseado</p>
              <p>• El enlace de recuperación expira en 1 hora</p>
              <p>• Solo funciona con cuentas registradas en Challz</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
