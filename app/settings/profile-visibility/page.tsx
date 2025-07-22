"use client"

import { ArrowLeft, Eye, Users, Lock } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"

export default function ProfileVisibilityPage() {
  const [publicProfile, setPublicProfile] = useState(true)
  const [searchable, setSearchable] = useState(true)
  const [showFollowers, setShowFollowers] = useState(true)
  const [showFollowing, setShowFollowing] = useState(true)
  const [showActivity, setShowActivity] = useState(false)

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
          <h1 className="text-lg font-semibold">Visibilidad del Perfil</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-16 pb-4">
        <div className="p-4 max-w-2xl mx-auto">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
              <Eye className="h-8 w-8 text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Controla tu Visibilidad
            </h2>
            <p className="mt-2 text-zinc-400">Decide quién puede ver tu perfil y tu actividad en Challz.</p>
          </div>

          {/* Profile Visibility Settings */}
          <Card className="mb-6 bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Users className="h-5 w-5 text-purple-500" />
                Visibilidad del Perfil
              </CardTitle>
              <CardDescription className="text-zinc-400">
                Controla quién puede ver tu perfil y contenido
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-white">Perfil público</h4>
                    <p className="text-sm text-zinc-400">Permite que cualquier usuario vea tu perfil y contenido</p>
                  </div>
                  <Switch checked={publicProfile} onCheckedChange={setPublicProfile} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-white">Aparecer en búsquedas</h4>
                    <p className="text-sm text-zinc-400">Otros usuarios pueden encontrarte cuando busquen tu nombre</p>
                  </div>
                  <Switch checked={searchable} onCheckedChange={setSearchable} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-white">Mostrar seguidores</h4>
                    <p className="text-sm text-zinc-400">Otros pueden ver quién te sigue</p>
                  </div>
                  <Switch checked={showFollowers} onCheckedChange={setShowFollowers} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-white">Mostrar siguiendo</h4>
                    <p className="text-sm text-zinc-400">Otros pueden ver a quién sigues</p>
                  </div>
                  <Switch checked={showFollowing} onCheckedChange={setShowFollowing} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-white">Mostrar actividad reciente</h4>
                    <p className="text-sm text-zinc-400">Mostrar tus retos y respuestas recientes</p>
                  </div>
                  <Switch checked={showActivity} onCheckedChange={setShowActivity} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Tips */}
          <Card className="mb-6 bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Lock className="h-5 w-5 text-purple-500" />
                Consejos de Privacidad
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-2"></div>
                  <div>
                    <h4 className="font-medium text-white">Perfil privado</h4>
                    <p className="text-sm text-zinc-300">
                      Si desactivas "Perfil público", solo tus seguidores aprobados podrán ver tu contenido.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-2"></div>
                  <div>
                    <h4 className="font-medium text-white">Control de búsqueda</h4>
                    <p className="text-sm text-zinc-300">
                      Desactivar "Aparecer en búsquedas" te hace menos visible pero no completamente invisible.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-2"></div>
                  <div>
                    <h4 className="font-medium text-white">Actividad selectiva</h4>
                    <p className="text-sm text-zinc-300">
                      Puedes ocultar tu actividad reciente manteniendo visible el resto de tu perfil.
                    </p>
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
