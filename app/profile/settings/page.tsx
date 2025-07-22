"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Shield, Key, Trash2, Eye, EyeOff, Loader2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle } from "lucide-react"
import ProtectedRoute from "@/components/protected-route"

export default function ProfileSettingsPage() {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPasswords, setShowPasswords] = useState(false)
  const [isPrivateAccount, setIsPrivateAccount] = useState(false)
  const [allowComments, setAllowComments] = useState(true)
  const [allowMentions, setAllowMentions] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden")
      return
    }

    if (newPassword.length < 6) {
      setError("La nueva contraseña debe tener al menos 6 caracteres")
      return
    }

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setSuccess("Contraseña actualizada exitosamente")
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } catch (error) {
      setError("Error al cambiar la contraseña")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteAccount = () => {
    // Show confirmation dialog
    if (window.confirm("¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.")) {
      alert("Funcionalidad de eliminación de cuenta - Por implementar")
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
            <h1 className="text-lg font-semibold">Configuración de perfil</h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 pt-16 pb-4">
          <div className="p-4 max-w-xl mx-auto space-y-6">
            {error && (
              <Alert variant="destructive" className="bg-red-900/20 border-red-900 text-red-300">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="bg-green-900/20 border-green-900 text-green-300">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            {/* Change Password Section */}
            <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <Key className="h-5 w-5 mr-2 text-purple-400" />
                Cambiar contraseña
              </h2>

              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword" className="text-sm text-zinc-400">
                    Contraseña actual
                  </Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showPasswords ? "text" : "password"}
                      placeholder="••••••••"
                      className="bg-zinc-800 border-zinc-700 pr-10"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords(!showPasswords)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-zinc-300"
                    >
                      {showPasswords ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword" className="text-sm text-zinc-400">
                    Nueva contraseña
                  </Label>
                  <Input
                    id="newPassword"
                    type={showPasswords ? "text" : "password"}
                    placeholder="••••••••"
                    className="bg-zinc-800 border-zinc-700"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm text-zinc-400">
                    Confirmar nueva contraseña
                  </Label>
                  <Input
                    id="confirmPassword"
                    type={showPasswords ? "text" : "password"}
                    placeholder="••••••••"
                    className="bg-zinc-800 border-zinc-700"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                      Cambiando contraseña...
                    </>
                  ) : (
                    "Cambiar contraseña"
                  )}
                </Button>
              </form>
            </div>

            {/* Privacy Settings */}
            <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <Shield className="h-5 w-5 mr-2 text-purple-400" />
                Privacidad
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Cuenta privada</p>
                    <p className="text-sm text-zinc-400">Solo tus seguidores pueden ver tu contenido</p>
                  </div>
                  <Switch checked={isPrivateAccount} onCheckedChange={setIsPrivateAccount} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Permitir comentarios</p>
                    <p className="text-sm text-zinc-400">Otros usuarios pueden comentar tus publicaciones</p>
                  </div>
                  <Switch checked={allowComments} onCheckedChange={setAllowComments} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Permitir menciones</p>
                    <p className="text-sm text-zinc-400">Otros usuarios pueden mencionarte</p>
                  </div>
                  <Switch checked={allowMentions} onCheckedChange={setAllowMentions} />
                </div>
              </div>
            </div>

            {/* Account Management */}
            <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
              <h2 className="text-xl font-bold mb-4">Gestión de cuenta</h2>

              <div className="space-y-4">
                <Button
                  variant="outline"
                  className="w-full border-zinc-700 text-zinc-300 hover:bg-zinc-800 bg-transparent"
                  onClick={() => alert("Funcionalidad de descarga de datos - Por implementar")}
                >
                  Descargar mis datos
                </Button>

                <Button
                  variant="outline"
                  className="w-full border-zinc-700 text-zinc-300 hover:bg-zinc-800 bg-transparent"
                  onClick={() => alert("Funcionalidad de desactivar cuenta - Por implementar")}
                >
                  Desactivar cuenta temporalmente
                </Button>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-red-900/20 rounded-lg p-6 border border-red-900">
              <h2 className="text-xl font-bold mb-4 flex items-center text-red-300">
                <Trash2 className="h-5 w-5 mr-2" />
                Zona de peligro
              </h2>

              <p className="text-sm text-zinc-400 mb-4">
                Una vez que elimines tu cuenta, no hay vuelta atrás. Por favor, ten cuidado.
              </p>

              <Button
                variant="destructive"
                className="w-full bg-red-600 hover:bg-red-700 text-white"
                onClick={handleDeleteAccount}
              >
                Eliminar cuenta permanentemente
              </Button>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
