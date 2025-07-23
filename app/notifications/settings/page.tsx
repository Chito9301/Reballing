"use client"

import { useState } from "react"
import { ArrowLeft, Bell, Mail, Smartphone, Volume2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle } from "lucide-react"

export default function NotificationSettingsPage() {
  const [pushNotifications, setPushNotifications] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [newChallenges, setNewChallenges] = useState(true)
  const [likes, setLikes] = useState(true)
  const [comments, setComments] = useState(true)
  const [followers, setFollowers] = useState(true)
  const [mentions, setMentions] = useState(true)
  const [trending, setTrending] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSave = () => {
    // Simulate saving settings
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-black/80 backdrop-blur-md border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <Link href="/alertas">
            <Button variant="ghost" size="icon" className="text-zinc-400">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold">Configuración de notificaciones</h1>
        </div>
        <Button
          size="sm"
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          onClick={handleSave}
        >
          Guardar
        </Button>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-16 pb-4">
        <div className="p-4 max-w-xl mx-auto space-y-6">
          {success && (
            <Alert className="bg-green-900/20 border-green-900 text-green-300">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>Configuración guardada exitosamente</AlertDescription>
            </Alert>
          )}

          {/* General Settings */}
          <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Bell className="h-5 w-5 mr-2 text-purple-400" />
              Configuración general
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Smartphone className="h-5 w-5 text-purple-400" />
                  <div>
                    <p className="font-medium">Notificaciones push</p>
                    <p className="text-sm text-zinc-400">Recibir notificaciones en tu dispositivo</p>
                  </div>
                </div>
                <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-purple-400" />
                  <div>
                    <p className="font-medium">Notificaciones por email</p>
                    <p className="text-sm text-zinc-400">Recibir resúmenes por correo electrónico</p>
                  </div>
                </div>
                <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Volume2 className="h-5 w-5 text-purple-400" />
                  <div>
                    <p className="font-medium">Sonido</p>
                    <p className="text-sm text-zinc-400">Reproducir sonido con las notificaciones</p>
                  </div>
                </div>
                <Switch checked={soundEnabled} onCheckedChange={setSoundEnabled} />
              </div>
            </div>
          </div>

          {/* Activity Notifications */}
          <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
            <h2 className="text-xl font-bold mb-4">Actividad</h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Nuevos retos</p>
                  <p className="text-sm text-zinc-400">Cuando hay retos diarios disponibles</p>
                </div>
                <Switch checked={newChallenges} onCheckedChange={setNewChallenges} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Me gusta</p>
                  <p className="text-sm text-zinc-400">Cuando alguien le da me gusta a tu contenido</p>
                </div>
                <Switch checked={likes} onCheckedChange={setLikes} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Comentarios</p>
                  <p className="text-sm text-zinc-400">Cuando alguien comenta tu contenido</p>
                </div>
                <Switch checked={comments} onCheckedChange={setComments} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Nuevos seguidores</p>
                  <p className="text-sm text-zinc-400">Cuando alguien comienza a seguirte</p>
                </div>
                <Switch checked={followers} onCheckedChange={setFollowers} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Menciones</p>
                  <p className="text-sm text-zinc-400">Cuando alguien te menciona</p>
                </div>
                <Switch checked={mentions} onCheckedChange={setMentions} />
              </div>
            </div>
          </div>

          {/* Discovery Notifications */}
          <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
            <h2 className="text-xl font-bold mb-4">Descubrimiento</h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Contenido en tendencia</p>
                  <p className="text-sm text-zinc-400">Retos y contenido popular que podría interesarte</p>
                </div>
                <Switch checked={trending} onCheckedChange={setTrending} />
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
            <p className="text-sm text-zinc-400">
              💡 <strong>Tip:</strong> Puedes desactivar las notificaciones desde la configuración de tu dispositivo en
              cualquier momento.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
