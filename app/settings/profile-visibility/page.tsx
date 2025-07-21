"use client"

import { ArrowLeft, Eye, Users, Globe } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import ProtectedRoute from "@/components/protected-route"
import { useState } from "react"

export default function ProfileVisibilityPage() {
  const [profilePublic, setProfilePublic] = useState(true)
  const [searchable, setSearchable] = useState(true)
  const [showFollowers, setShowFollowers] = useState(true)
  const [showFollowing, setShowFollowing] = useState(true)
  const [visibility, setVisibility] = useState("public")

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
              <p className="mt-2 text-zinc-400">Decide quién puede ver tu perfil y tu contenido</p>
            </div>

            {/* Profile Visibility */}
            <Card className="mb-6 bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Globe className="h-5 w-5 text-purple-500" />
                  Visibilidad del Perfil
                </CardTitle>
                <CardDescription className="text-zinc-400">
                  Controla quién puede encontrar y ver tu perfil
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup value={visibility} onValueChange={setVisibility} className="space-y-4">
                  <div className="flex items-center space-x-3 rounded-md border border-zinc-700 p-3">
                    <RadioGroupItem value="public" id="public" />
                    <Label htmlFor="public" className="flex-1 cursor-pointer">
                      <div>
                        <p className="font-medium text-white">Público</p>
                        <p className="text-sm text-zinc-400">Cualquiera puede ver tu perfil y contenido</p>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 rounded-md border border-zinc-700 p-3">
                    <RadioGroupItem value="followers" id="followers" />
                    <Label htmlFor="followers" className="flex-1 cursor-pointer">
                      <div>
                        <p className="font-medium text-white">Solo seguidores</p>
                        <p className="text-sm text-zinc-400">Solo tus seguidores pueden ver tu contenido</p>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 rounded-md border border-zinc-700 p-3">
                    <RadioGroupItem value="private" id="private" />
                    <Label htmlFor="private" className="flex-1 cursor-pointer">
                      <div>
                        <p className="font-medium text-white">Privado</p>
                        <p className="text-sm text-zinc-400">Solo tú puedes ver tu perfil</p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Detailed Settings */}
            <Card className="mb-6 bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Users className="h-5 w-5 text-purple-500" />
                  Configuración Detallada
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-white">Perfil público</h4>
                      <p className="text-sm text-zinc-400">Permite que otros usuarios encuentren tu perfil</p>
                    </div>
                    <Switch checked={profilePublic} onCheckedChange={setProfilePublic} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-white">Aparecer en búsquedas</h4>
                      <p className="text-sm text-zinc-400">Tu perfil aparece en los resultados de búsqueda</p>
                    </div>
                    <Switch checked={searchable} onCheckedChange={setSearchable} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-white">Mostrar seguidores</h4>
                      <p className="text-sm text-zinc-400">Otros pueden ver tu lista de seguidores</p>
                    </div>
                    <Switch checked={showFollowers} onCheckedChange={setShowFollowers} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-white">Mostrar seguidos</h4>
                      <p className="text-sm text-zinc-400">Otros pueden ver a quién sigues</p>
                    </div>
                    <Switch checked={showFollowing} onCheckedChange={setShowFollowing} />
                  </div>
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
