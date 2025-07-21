"use client"

import { ArrowLeft, Shield, Eye, Lock, Database, Mail } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"

export default function PrivacyPage() {
  const [publicProfile, setPublicProfile] = useState(true)
  const [allowMessages, setAllowMessages] = useState(true)
  const [showActivity, setShowActivity] = useState(false)
  const [dataCollection, setDataCollection] = useState(true)

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-black/80 backdrop-blur-md border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <Link href="/settings">
            <Button variant="ghost" size="icon" className="text-zinc-400">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold">Privacidad</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-16 pb-4">
        <div className="p-4 max-w-2xl mx-auto">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
              <Shield className="h-8 w-8 text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Tu Privacidad es Importante
            </h2>
            <p className="mt-2 text-zinc-400">
              Challz respeta y protege todos tus datos. Controla cómo se usa tu información.
            </p>
          </div>

          {/* Privacy Policy Summary */}
          <Card className="mb-6 bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Database className="h-5 w-5 text-purple-500" />
                Política de Privacidad
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-zinc-300 leading-relaxed">
                  Challz respeta y protege todos tus datos. Recolectamos solo la información necesaria (correo, edad,
                  género) para crear tu cuenta y nunca la compartimos sin tu permiso.
                </p>
                <div className="bg-zinc-800 p-4 rounded-lg">
                  <h4 className="font-medium mb-2 text-white">Información que recolectamos:</h4>
                  <ul className="text-sm text-zinc-300 space-y-1">
                    <li>• Correo electrónico (para tu cuenta)</li>
                    <li>• Edad y género (para personalización)</li>
                    <li>• Contenido que publicas (retos y respuestas)</li>
                    <li>• Interacciones básicas (likes, comentarios)</li>
                  </ul>
                </div>
                <p className="text-sm text-zinc-400">
                  Lee la política completa o contáctanos para cualquier inquietud sobre tu privacidad.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card className="mb-6 bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Eye className="h-5 w-5 text-purple-500" />
                Configuración de Privacidad
              </CardTitle>
              <CardDescription className="text-zinc-400">
                Controla quién puede ver tu información y contenido
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-white">Perfil público</h4>
                    <p className="text-sm text-zinc-400">Permite que otros usuarios encuentren tu perfil</p>
                  </div>
                  <Switch checked={publicProfile} onCheckedChange={setPublicProfile} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-white">Permitir mensajes directos</h4>
                    <p className="text-sm text-zinc-400">Otros usuarios pueden enviarte mensajes privados</p>
                  </div>
                  <Switch checked={allowMessages} onCheckedChange={setAllowMessages} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-white">Mostrar actividad</h4>
                    <p className="text-sm text-zinc-400">Mostrar cuándo estás en línea</p>
                  </div>
                  <Switch checked={showActivity} onCheckedChange={setShowActivity} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-white">Recolección de datos</h4>
                    <p className="text-sm text-zinc-400">Permitir análisis para mejorar la experiencia</p>
                  </div>
                  <Switch checked={dataCollection} onCheckedChange={setDataCollection} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Rights */}
          <Card className="mb-6 bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Lock className="h-5 w-5 text-purple-500" />
                Tus Derechos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-2"></div>
                  <div>
                    <h4 className="font-medium text-white">Acceso a tus datos</h4>
                    <p className="text-sm text-zinc-300">
                      Puedes solicitar una copia de toda la información que tenemos sobre ti.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-2"></div>
                  <div>
                    <h4 className="font-medium text-white">Corrección de datos</h4>
                    <p className="text-sm text-zinc-300">
                      Puedes actualizar o corregir tu información personal en cualquier momento.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-2"></div>
                  <div>
                    <h4 className="font-medium text-white">Eliminación de cuenta</h4>
                    <p className="text-sm text-zinc-300">
                      Puedes eliminar tu cuenta y todos tus datos permanentemente.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-2"></div>
                  <div>
                    <h4 className="font-medium text-white">Portabilidad</h4>
                    <p className="text-sm text-zinc-300">
                      Puedes exportar tus datos para usarlos en otras plataformas.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Mail className="h-5 w-5 text-purple-500" />
                ¿Preguntas sobre Privacidad?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-zinc-300">
                  Si tienes preguntas sobre cómo manejamos tu privacidad o quieres ejercer tus derechos, contáctanos:
                </p>
                <div className="flex items-center gap-3 p-3 bg-zinc-800 rounded-lg">
                  <Mail className="h-5 w-5 text-purple-500" />
                  <div>
                    <p className="font-medium text-white">Email de Privacidad</p>
                    <p className="text-sm text-zinc-400">challzchito@gmail.com</p>
                  </div>
                </div>
                <p className="text-xs text-zinc-500">
                  Responderemos a tu consulta de privacidad en un plazo máximo de 72 horas.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
