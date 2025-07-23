"use client"

import type React from "react"

import { useState, useRef } from "react"
import { ArrowLeft, Camera, Loader2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/contexts/auth-context"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle } from "lucide-react"
import ProtectedRoute from "@/components/protected-route"

export default function EditProfilePage() {
  const { user } = useAuth()
  const [name, setName] = useState(user?.displayName || "")
  const [username, setUsername] = useState(user?.email?.split("@")[0] || "")
  const [bio, setBio] = useState("Amante de los retos y la creatividad 🚀")
  const [profileImage, setProfileImage] = useState<File | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(user?.photoURL || null)
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setProfileImage(file)

      // Create preview
      const reader = new FileReader()
      reader.onload = (event) => {
        setPreviewImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Here you would typically update the user profile
      // await updateUserProfile({ name, username, bio, profileImage })

      setSuccess(true)
      setTimeout(() => {
        // Redirect back to profile after success
        window.history.back()
      }, 1500)
    } catch (error) {
      setError("Error al actualizar el perfil. Intenta de nuevo.")
    } finally {
      setIsLoading(false)
    }
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
            <h1 className="text-lg font-semibold">Editar perfil</h1>
          </div>
          <Button
            type="submit"
            form="edit-profile-form"
            size="sm"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Guardando...
              </>
            ) : (
              "Guardar"
            )}
          </Button>
        </header>

        {/* Main Content */}
        <main className="flex-1 pt-16 pb-4">
          <div className="p-4 max-w-xl mx-auto">
            {error && (
              <Alert variant="destructive" className="bg-red-900/20 border-red-900 text-red-300 mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="bg-green-900/20 border-green-900 text-green-300 mb-4">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>¡Perfil actualizado exitosamente!</AlertDescription>
              </Alert>
            )}

            <form id="edit-profile-form" onSubmit={handleSubmit} className="space-y-6">
              {/* Profile Image */}
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Avatar className="h-24 w-24 border-4 border-purple-500">
                    <AvatarImage src={previewImage || "/placeholder.svg?height=96&width=96"} alt="Profile" />
                    <AvatarFallback>{name.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute -bottom-2 -right-2 bg-purple-600 hover:bg-purple-700 rounded-full p-2 transition-colors"
                  >
                    <Camera className="h-4 w-4 text-white" />
                  </button>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
                <p className="text-sm text-zinc-400 text-center">
                  Toca el ícono de cámara para cambiar tu foto de perfil
                </p>
              </div>

              {/* Name */}
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

              {/* Username */}
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

              {/* Bio */}
              <div className="space-y-2">
                <Label htmlFor="bio" className="text-sm text-zinc-400">
                  Biografía
                </Label>
                <Textarea
                  id="bio"
                  placeholder="Cuéntanos sobre ti..."
                  className="bg-zinc-900 border-zinc-700 resize-none min-h-[100px]"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  maxLength={150}
                />
                <p className="text-xs text-zinc-500 text-right">{bio.length}/150</p>
              </div>

              {/* Additional Info */}
              <div className="bg-zinc-900 rounded-lg p-4 border border-zinc-800">
                <h3 className="font-medium mb-3">Información adicional</h3>
                <div className="space-y-3 text-sm text-zinc-400">
                  <p>• Tu nombre de usuario debe ser único</p>
                  <p>• La biografía puede tener máximo 150 caracteres</p>
                  <p>• Los cambios se aplicarán inmediatamente</p>
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
