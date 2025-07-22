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
import { AlertCircle, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { doc, setDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { signUp } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      // Create the user with Firebase Authentication
      await signUp(email, password, username)

      // Create a user document in Firestore
      const userDoc = doc(db, "users", email)
      await setDoc(userDoc, {
        name,
        username,
        email,
        createdAt: new Date().toISOString(),
        bio: "",
        photoURL: "",
      })

      router.push("/")
    } catch (error: any) {
      console.error("Registration error:", error)
      if (error.code === "auth/email-already-in-use") {
        setError("Este correo electrónico ya está en uso. Por favor utiliza otro o inicia sesión.")
      } else if (error.code === "auth/weak-password") {
        setError("La contraseña es demasiado débil. Debe tener al menos 6 caracteres.")
      } else {
        setError("Ocurrió un error al registrarte. Por favor intenta de nuevo.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-900 to-black text-white">
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center text-center">
            <AppIcon size={80} />
            <h1 className="mt-4 text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Challz
            </h1>
            <p className="mt-2 text-zinc-400">Desafía tu rutina. Reta tu mundo.</p>
          </div>

          {error && (
            <Alert variant="destructive" className="bg-red-900/20 border-red-900 text-red-300">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm text-zinc-400">
                Nombre
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Tu nombre"
                className="bg-zinc-900 border-zinc-700"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm text-zinc-400">
                Nombre de usuario
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="@username"
                className="bg-zinc-900 border-zinc-700"
                value={username}
                onChange={(e) => setUsername(e.target.value.startsWith("@") ? e.target.value : "@" + e.target.value)}
                required
              />
            </div>
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
                minLength={6}
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
                  Creando cuenta...
                </>
              ) : (
                "Crear Cuenta"
              )}
            </Button>
          </form>

          <div className="relative my-6">
            <Separator className="bg-zinc-800" />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-black px-2 text-xs text-zinc-500">
              O regístrate con
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="border-zinc-700 hover:bg-zinc-900">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 mr-2" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                <path d="M1 1h22v22H1z" fill="none" />
              </svg>
              Google
            </Button>
            <Button variant="outline" className="border-zinc-700 hover:bg-zinc-900">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 mr-2" fill="currentColor">
                <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45z" />
              </svg>
              Apple
            </Button>
          </div>

          <p className="text-center text-sm mt-6">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/auth/login" className="text-purple-400 hover:text-purple-300 font-medium">
              Inicia sesión
            </Link>
          </p>

          <p className="text-center text-xs text-zinc-500">
            Al continuar, aceptas nuestros{" "}
            <Link href="/terminos" className="text-purple-400 hover:text-purple-300">
              Términos de Servicio
            </Link>{" "}
            y{" "}
            <Link href="/privacidad" className="text-purple-400 hover:text-purple-300">
              Política de Privacidad
            </Link>
            .
          </p>
        </div>
      </main>
    </div>
  )
}
