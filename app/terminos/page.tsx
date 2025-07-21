"use client"

import { ArrowLeft, FileText, Shield, Users, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AppIcon } from "@/components/app-icon"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-black/80 backdrop-blur-md border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <Link href="/auth/login">
            <Button variant="ghost" size="icon" className="text-zinc-400">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold">Términos de Servicio</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-16 pb-4">
        <div className="p-4 max-w-2xl mx-auto">
          <div className="flex flex-col items-center text-center mb-8">
            <AppIcon size={64} />
            <h2 className="mt-4 text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Términos de Servicio
            </h2>
            <p className="mt-2 text-zinc-400">Última actualización: Enero 2024</p>
          </div>

          {/* Introduction */}
          <Card className="mb-6 bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <FileText className="h-5 w-5 text-purple-500" />
                Bienvenido a Challz
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-zinc-300 leading-relaxed">
                Al usar Challz, aceptas estos términos de servicio. Por favor, léelos cuidadosamente antes de usar
                nuestra aplicación. Challz es una plataforma para crear, compartir y participar en desafíos creativos de
                manera segura y divertida.
              </p>
            </CardContent>
          </Card>

          {/* User Responsibilities */}
          <Card className="mb-6 bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Users className="h-5 w-5 text-purple-500" />
                Responsabilidades del Usuario
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-2"></div>
                  <div>
                    <h4 className="font-medium text-white">Edad Mínima</h4>
                    <p className="text-sm text-zinc-300">
                      Debes tener al menos 13 años para usar Challz. Si eres menor de 18, necesitas permiso de tus
                      padres.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-2"></div>
                  <div>
                    <h4 className="font-medium text-white">Contenido Apropiado</h4>
                    <p className="text-sm text-zinc-300">
                      Todo el contenido debe ser apropiado, respetuoso y seguir nuestras pautas de comunidad.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-2"></div>
                  <div>
                    <h4 className="font-medium text-white">Información Veraz</h4>
                    <p className="text-sm text-zinc-300">
                      Debes proporcionar información precisa y mantener tu cuenta segura.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-2"></div>
                  <div>
                    <h4 className="font-medium text-white">Respeto a Otros</h4>
                    <p className="text-sm text-zinc-300">
                      Trata a todos los usuarios con respeto. No se tolera el acoso, bullying o discriminación.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Prohibited Content */}
          <Card className="mb-6 bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Contenido Prohibido
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-zinc-300">No está permitido publicar contenido que incluya:</p>
                <ul className="text-sm text-zinc-300 space-y-2 ml-4">
                  <li>• Violencia, amenazas o contenido que promueva daño</li>
                  <li>• Contenido sexual explícito o inapropiado</li>
                  <li>• Discurso de odio, discriminación o acoso</li>
                  <li>• Información falsa o engañosa</li>
                  <li>• Contenido que viole derechos de autor</li>
                  <li>• Spam o contenido comercial no autorizado</li>
                  <li>• Actividades ilegales o peligrosas</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Privacy and Data */}
          <Card className="mb-6 bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Shield className="h-5 w-5 text-purple-500" />
                Privacidad y Datos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-zinc-300">
                  Tu privacidad es importante para nosotros. Recolectamos solo la información necesaria para
                  proporcionar nuestros servicios y nunca la compartimos sin tu consentimiento.
                </p>
                <div className="bg-zinc-800 p-4 rounded-lg">
                  <h4 className="font-medium mb-2 text-white">Datos que recolectamos:</h4>
                  <ul className="text-sm text-zinc-300 space-y-1">
                    <li>• Información de registro (email, edad, género)</li>
                    <li>• Contenido que publicas (retos, respuestas, comentarios)</li>
                    <li>• Interacciones (likes, follows, mensajes)</li>
                    <li>• Datos de uso para mejorar la experiencia</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card className="mb-6 bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white">Propiedad Intelectual</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-zinc-300">
                <p>
                  • Mantienes los derechos de tu contenido, pero nos otorgas licencia para mostrarlo en la plataforma
                </p>
                <p>• Respeta los derechos de autor de otros usuarios y terceros</p>
                <p>• Challz y su logo son marcas registradas de nuestra empresa</p>
              </div>
            </CardContent>
          </Card>

          {/* Termination */}
          <Card className="mb-6 bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white">Terminación del Servicio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-zinc-300">
                <p>
                  Nos reservamos el derecho de suspender o terminar cuentas que violen estos términos. Puedes eliminar
                  tu cuenta en cualquier momento desde la configuración.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white">Contacto</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-zinc-300">Si tienes preguntas sobre estos términos, contáctanos:</p>
                <div className="flex items-center gap-3 p-3 bg-zinc-800 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <span className="text-purple-400 font-bold text-sm">@</span>
                  </div>
                  <div>
                    <p className="font-medium text-white">Email Legal</p>
                    <p className="text-sm text-zinc-400">challzchito@gmail.com</p>
                  </div>
                </div>
                <p className="text-xs text-zinc-500">
                  Estos términos pueden actualizarse ocasionalmente. Te notificaremos de cambios importantes.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
