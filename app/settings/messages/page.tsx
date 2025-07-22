"use client"

import { ArrowLeft, MessageCircle, Shield, Bell } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"

export default function MessagesPage() {
  const [allowMessages, setAllowMessages] = useState(true)
  const [allowFromFollowers, setAllowFromFollowers] = useState(true)
  const [readReceipts, setReadReceipts] = useState(true)
  const [messageNotifications, setMessageNotifications] = useState(true)
  const [showOnlineStatus, setShowOnlineStatus] = useState(false)

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-black/80 backdrop-blur-md border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <Link href="/profile/edit">
            <Button variant="ghost" size="icon" className="text-zinc-400">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold">Configuración de Mensajes</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-16 pb-4">
        <div className="p-4 max-w-2xl mx-auto">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
              <MessageCircle className="h-8 w-8 text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Controla tus Mensajes
            </h2>
            <p className="mt-2 text-zinc-400">Configura quién puede enviarte mensajes y cómo recibes notificaciones.</p>
          </div>

          {/* Message Settings */}
          <Card className="mb-6 bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <MessageCircle className="h-5 w-5 text-purple-500" />
                Mensajes Directos
              </CardTitle>
              <CardDescription className="text-zinc-400">
                Controla quién puede enviarte mensajes privados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-white">Permitir mensajes directos</h4>
                    <p className="text-sm text-zinc-400">Permite que otros usuarios te envíen mensajes privados</p>
                  </div>
                  <Switch checked={allowMessages} onCheckedChange={setAllowMessages} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-white">Solo de seguidores</h4>
                    <p className="text-sm text-zinc-400">Limitar mensajes solo a usuarios que sigues o te siguen</p>
                  </div>
                  <Switch
                    checked={allowFromFollowers}
                    onCheckedChange={setAllowFromFollowers}
                    disabled={!allowMessages}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-white">Confirmaciones de lectura</h4>
                    <p className="text-sm text-zinc-400">Mostrar cuando has leído los mensajes</p>
                  </div>
                  <Switch checked={readReceipts} onCheckedChange={setReadReceipts} disabled={!allowMessages} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="mb-6 bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Bell className="h-5 w-5 text-purple-500" />
                Notificaciones de Mensajes
              </CardTitle>
              <CardDescription className="text-zinc-400">
                Configura cómo recibes notificaciones de mensajes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-white">Notificaciones push</h4>
                    <p className="text-sm text-zinc-400">Recibir notificaciones cuando lleguen nuevos mensajes</p>
                  </div>
                  <Switch
                    checked={messageNotifications}
                    onCheckedChange={setMessageNotifications}
                    disabled={!allowMessages}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-white">Mostrar estado en línea</h4>
                    <p className="text-sm text-zinc-400">Otros usuarios pueden ver cuándo estás activo</p>
                  </div>
                  <Switch checked={showOnlineStatus} onCheckedChange={setShowOnlineStatus} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Information */}
          <Card className="mb-6 bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Shield className="h-5 w-5 text-purple-500" />
                Información de Privacidad
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-2"></div>
                  <div>
                    <h4 className="font-medium text-white">Mensajes seguros</h4>
                    <p className="text-sm text-zinc-300">
                      Todos los mensajes están cifrados y solo tú y el destinatario pueden leerlos.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-2"></div>
                  <div>
                    <h4 className="font-medium text-white">Bloquear usuarios</h4>
                    <p className="text-sm text-zinc-300">
                      Puedes bloquear a cualquier usuario para evitar que te envíe mensajes.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-2"></div>
                  <div>
                    <h4 className="font-medium text-white">Reportar contenido</h4>
                    <p className="text-sm text-zinc-300">Siempre puedes reportar mensajes inapropiados o spam.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex gap-3">
            <Button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white">Guardar cambios</Button>
            <Link href="/profile/edit">
              <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 bg-transparent">
                Cancelar
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
