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
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="flex items-center gap-2">
          <Link href="/settings">
            <Button variant="ghost" size="icon" className="text-muted-foreground">
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
            <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mb-4">
              <Shield className="h-8 w-8 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Tu Privacidad es Importante
            </h2>
            <p className="mt-2 text-muted-foreground">
              Challz respeta y protege todos tus datos. Controla cómo se usa tu información.
            </p>
          </div>

          {/* Privacy Policy Summary */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-purple-500" />
                Política de Privacidad
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Challz respeta y protege todos tus datos. Recolectamos solo la información necesaria (correo, edad,
                  género) para crear tu cuenta y nunca la compartimos sin tu permiso.
                </p>
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Información que recolectamos:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Correo electrónico (para tu cuenta)</li>
                    <li>• Edad y género (para personalización)</li>
                    <li>• Contenido que publicas (retos y respuestas)</li>
                    <li>• Interacciones básicas (likes, comentarios)</li>
                  </ul>
                </div>
                <p className="text-sm text-muted-foreground">
                  Lee la política completa o contáctanos para cualquier inquietud sobre tu privacidad.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-purple-500" />
                Configuración de Privacidad
              </CardTitle>
              <CardDescription>Controla quién puede ver tu información y contenido</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Perfil público</h4>
                    <p className="text-sm text-muted-foreground">Permite que otros usuarios encuentren tu perfil</p>
                  </div>
                  <Switch checked={publicProfile} onCheckedChange={setPublicProfile} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Permitir mensajes directos</h4>
                    <p className="text-sm text-muted-foreground">Otros usuarios pueden enviarte mensajes privados</p>
                  </div>
                  <Switch checked={allowMessages} onCheckedChange={setAllowMessages} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Mostrar actividad</h4>
                    <p className="text-sm text-muted-foreground">Mostrar cuándo estás en línea</p>
                  </div>
                  <Switch checked={showActivity} onCheckedChange={setShowActivity} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Recolección de datos</h4>
                    <p className="text-sm text-muted-foreground">Permitir análisis para mejorar la experiencia</p>
                  </div>
                  <Switch checked={dataCollection} onCheckedChange={setDataCollection} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Rights */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-purple-500" />
                Tus Derechos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-2"></div>
                  <div>
                    <h4 className="font-medium">Acceso a tus datos</h4>
                    <p className="text-sm text-muted-foreground">
                      Puedes solicitar una copia de toda la información que tenemos sobre ti.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-2"></div>
                  <div>
                    <h4 className="font-medium">Corrección de datos</h4>
                    <p className="text-sm text-muted-foreground">
                      Puedes actualizar o corregir tu información personal en cualquier momento.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-2"></div>
                  <div>
                    <h4 className="font-medium">Eliminación de cuenta</h4>
                    <p className="text-sm text-muted-foreground">
                      Puedes eliminar tu cuenta y todos tus datos permanentemente.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-2"></div>
                  <div>
                    <h4 className="font-medium">Portabilidad</h4>
                    <p className="text-sm text-muted-foreground">
                      Puedes exportar tus datos para usarlos en otras plataformas.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-purple-500" />
                ¿Preguntas sobre Privacidad?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-muted-foreground">
                  Si tienes preguntas sobre cómo manejamos tu privacidad o quieres ejercer tus derechos, contáctanos:
                </p>
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <Mail className="h-5 w-5 text-purple-500" />
                  <div>
                    <p className="font-medium">Email de Privacidad</p>
                    <p className="text-sm text-muted-foreground">challzchito@gmail.com</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
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
