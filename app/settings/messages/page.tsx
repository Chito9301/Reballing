"use client"

import { ArrowLeft, MessageCircle, Shield, Clock } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import ProtectedRoute from "@/components/protected-route"
import { useState } from "react"

export default function MessagesPage() {
  const [allowMessages, setAllowMessages] = useState(true)
  const [readReceipts, setReadReceipts] = useState(true)
  const [onlineStatus, setOnlineStatus] = useState(false)
  const [messageFrom, setMessageFrom] = useState("everyone")

  return (
    <ProtectedRoute>
      <div className="flex flex-col min-h-screen bg-black text-white">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-black/80 backdrop-blur-md border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <Link href="/profile/edit">
              <Button variant="ghost" size="icon" className="text-zinc-400">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-lg font-semibold">Mensajes Directos</h1>
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
                Configuración de Mensajes
              </h2>
              <p className="mt-2 text-zinc-400">Controla quién puede enviarte mensajes directos</p>
            </div>

            {/* Message Permissions */}
            <Card className="mb-6 bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Shield className="h-5 w-5 text-purple-500" />
                  ¿Quién puede enviarte mensajes?
                </CardTitle>
                <CardDescription className="text-zinc-400">
                  Controla quién puede iniciar conversaciones contigo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup value={messageFrom} onValueChange={setMessageFrom} className="space-y-4">
                  <div className="flex items-center space-x-3 rounded-md border border-zinc-700 p-3">
                    <RadioGroupItem value="everyone" id="everyone" />
                    <Label htmlFor="everyone" className="flex-1 cursor-pointer">
                      <div>
                        <p className="font-medium text-white">Todos</p>
                        <p className="text-sm text-zinc-400">Cualquier usuario puede enviarte mensajes</p>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 rounded-md border border-zinc-700 p-3">
                    <RadioGroupItem value="followers" id="msg-followers" />
                    <Label htmlFor="msg-followers" className="flex-1 cursor-pointer">
                      <div>
                        <p className="font-medium text-white">Solo seguidores</p>
                        <p className="text-sm text-zinc-400">Solo usuarios que sigues pueden enviarte mensajes</p>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 rounded-md border border-zinc-700 p-3">
                    <RadioGroupItem value="none" id="none" />
                    <Label htmlFor="none" className="flex-1 cursor-pointer">
                      <div>
                        <p className="font-medium text-white">Nadie</p>
                        <p className="text-sm text-zinc-400">Desactivar mensajes directos completamente</p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Message Settings */}
            <Card className="mb-6 bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <MessageCircle className="h-5 w-5 text-purple-500" />
                  Configuración de Mensajes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-white">Permitir mensajes directos</h4>
                      <p className="text-sm text-zinc-400">Habilitar o deshabilitar mensajes directos</p>
                    </div>
                    <Switch checked={allowMessages} onCheckedChange={setAllowMessages} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-white">Confirmaciones de lectura</h4>
                      <p className="text-sm text-zinc-400">Mostrar cuando has leído un mensaje</p>
                    </div>
                    <Switch checked={readReceipts} onCheckedChange={setReadReceipts} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-white">Estado en línea</h4>
                      <p className="text-sm text-zinc-400">Mostrar cuando estás activo en la app</p>
                    </div>
                    <Switch checked={onlineStatus} onCheckedChange={setOnlineStatus} />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Info Card */}
            <Card className="mb-6 bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Clock className="h-5 w-5 text-purple-500" />
                  Información Importante
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-zinc-300">
                  <p>• Los mensajes se eliminan automáticamente después de 30 días de inactividad</p>
                  <p>• Puedes reportar mensajes inapropiados en cualquier momento</p>
                  <p>• Los usuarios bloqueados no pueden enviarte mensajes</p>
                  <p>• Siempre puedes cambiar estas configuraciones más tarde</p>
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              Guardar Configuración
            </Button>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
