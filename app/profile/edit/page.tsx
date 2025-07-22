"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Camera, Loader2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import ProtectedRoute from "@/components/protected-route"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle } from "lucide-react"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

interface UserProfile {
  name: string
  username: string
  bio: string
  age: number
  gender: string
}

export default function EditProfilePage() {
  const { user } = useAuth()
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    username: "",
    bio: "",
    age: 18,
    gender: "",
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    async function loadProfile() {
      if (!user) return

      try {
        setLoading(true)
        const userDoc = await getDoc(doc(db, "users", user.email!))

        if (userDoc.exists()) {
          const userData = userDoc.data()
          setProfile({
            name: userData.name || user.displayName || "",
            username: userData.username || "",
            bio: userData.bio || "",
            age: userData.age || 18,
            gender: userData.gender || "",
          })
        } else {
          // Set defaults from Firebase Auth
          setProfile({
            name: user.displayName || "",
            username: "",
            bio: "",
            age: 18,
            gender: "",
          })
        }
      } catch (error) {
        console.error("Error loading profile:", error)
        setError("Error al cargar el perfil")
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [user])

  const handleSave = async () => {
    if (!user) return

    try {
      setSaving(true)
      setError("")
      setSuccess("")

      // Validate required fields
      if (!profile.name.trim() || !profile.username.trim()) {
        setError("El nombre y nombre de usuario son requeridos")
        return
      }

      if (profile.age < 13 || profile.age > 120) {
        setError("La edad debe estar entre 13 y 120 años")
        return
      }

      // Update Firestore document
      const userRef = doc(db, "users", user.email!)
      await updateDoc(userRef, {
        name: profile.name.trim(),
        username: profile.username.trim(),
        bio: profile.bio.trim(),
        age: profile.age,
        gender: profile.gender,
        updatedAt: new Date().toISOString(),
      })

      setSuccess("Perfil actualizado correctamente")

      // Redirect after a short delay
      setTimeout(() => {
        router.push("/profile")
      }, 1500)
    } catch (error: any) {
      console.error("Error updating profile:", error)
      setError("Error al actualizar el perfil. Por favor intenta de nuevo.")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="flex items-center justify-center min-h-screen bg-black">
          <Loader2 className="h-8 w-8 text-purple-500 animate-spin" />
        </div>
      </ProtectedRoute>
    )
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
            onClick={handleSave}
            disabled={saving}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Guardar"}
          </Button>
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

            {success && (
              <Alert className="bg-green-900/20 border-green-900 text-green-300 mb-4">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-6">
              {/* Profile Photo */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <Avatar className="h-24 w-24 border-4 border-purple-500">
                    <AvatarImage
                      src={user?.photoURL || "/placeholder.svg?height=96&width=96"}
                      alt={profile.name || "Usuario"}
                    />
                    <AvatarFallback className="text-2xl">{profile.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    className="absolute -bottom-2 -right-2 rounded-full bg-purple-600 hover:bg-purple-700 h-8 w-8"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-zinc-400 mt-2">Cambiar foto de perfil</p>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm text-zinc-400">
                    Nombre completo *
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Tu nombre completo"
                    className="bg-zinc-900 border-zinc-700"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username" className="text-sm text-zinc-400">
                    Nombre de usuario *
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="@username"
                    className="bg-zinc-900 border-zinc-700"
                    value={profile.username}
                    onChange={(e) => {
                      const value = e.target.value.startsWith("@") ? e.target.value : "@" + e.target.value
                      setProfile({ ...profile, username: value })
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-sm text-zinc-400">
                    Biografía
                  </Label>
                  <Textarea
                    id="bio"
                    placeholder="Cuéntanos sobre ti..."
                    className="bg-zinc-900 border-zinc-700 resize-none min-h-[80px]"
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    maxLength={150}
                  />
                  <p className="text-xs text-zinc-500">{profile.bio.length}/150 caracteres</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age" className="text-sm text-zinc-400">
                      Edad *
                    </Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="18"
                      min="13"
                      max="120"
                      className="bg-zinc-900 border-zinc-700"
                      value={profile.age}
                      onChange={(e) => setProfile({ ...profile, age: Number.parseInt(e.target.value) || 18 })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender" className="text-sm text-zinc-400">
                      Sexo *
                    </Label>
                    <Select value={profile.gender} onValueChange={(value) => setProfile({ ...profile, gender: value })}>
                      <SelectTrigger className="bg-zinc-900 border-zinc-700">
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="masculino">Masculino</SelectItem>
                        <SelectItem value="femenino">Femenino</SelectItem>
                        <SelectItem value="otro">Otro</SelectItem>
                        <SelectItem value="prefiero-no-decir">Prefiero no decir</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-zinc-400">Correo electrónico</Label>
                  <Input type="email" className="bg-zinc-900 border-zinc-700" value={user?.email || ""} disabled />
                  <p className="text-xs text-zinc-500">El correo electrónico no se puede cambiar</p>
                </div>
              </div>

              {/* Additional Options */}
              <div className="pt-4 border-t border-zinc-800">
                <h3 className="text-sm font-medium text-zinc-400 mb-3">Configuración de privacidad</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Perfil público</span>
                    <Link href="/settings/profile-visibility">
                      <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-300 bg-transparent">
                        Configurar
                      </Button>
                    </Link>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Permitir mensajes directos</span>
                    <Link href="/settings/messages">
                      <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-300 bg-transparent">
                        Configurar
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
