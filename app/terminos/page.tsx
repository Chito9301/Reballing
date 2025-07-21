"use client"

import { ArrowLeft, FileText, Shield, AlertTriangle, Scale } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
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
        <div className="p-4 max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
              <FileText className="h-8 w-8 text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Términos de Servicio de Challz
            </h2>
            <p className="mt-2 text-zinc-400">Última actualización: 21 de enero de 2025</p>
          </div>

          {/* Introduction */}
          <Card className="mb-6 bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Scale className="h-5 w-5 text-purple-500" />
                Introducción
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-zinc-300">
                <p>
                  Bienvenido a Challz, la plataforma donde puedes desafiar tu rutina y retar tu mundo. Al usar nuestra
                  aplicación, aceptas estos términos de servicio.
                </p>
                <p>
                  Challz es una plataforma social que permite a los usuarios crear, compartir y participar en retos
                  creativos y desafiantes. Nos comprometemos a proporcionar un entorno seguro y divertido para todos
                  nuestros usuarios.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* User Responsibilities */}
          <Card className="mb-6 bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Shield className="h-5 w-5 text-purple-500" />
                Responsabilidades del Usuario
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-medium text-white">Al usar Challz, te comprometes a:</h4>
                  <ul className="text-sm text-zinc-300 space-y-2 ml-4">
                    <li>• Proporcionar información veraz y actualizada en tu perfil</li>
                    <li>• Respetar a otros usuarios y mantener un comportamiento apropiado</li>
                    <li>• No crear contenido que sea ofensivo, ilegal o dañino</li>
                    <li>• No usar la plataforma para actividades comerciales no autorizadas</li>
                    <li>• Proteger tu cuenta y no compartir tus credenciales</li>
                    <li>• Cumplir con todas las leyes locales aplicables</li>
                  </ul>
                </div>
                <div className="bg-zinc-800 p-4 rounded-lg">
                  <h4 className="font-medium mb-2 text-white">Edad mínima:</h4>
                  <p className="text-sm text-zinc-300">
                    Debes tener al menos 13 años para usar Challz. Los usuarios menores de 18 años deben tener el
                    consentimiento de sus padres o tutores.
                  </p>
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
              <div className="space-y-4">
                <p className="text-zinc-300">
                  Está estrictamente prohibido publicar o compartir contenido que incluya:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-white">Contenido dañino:</h4>
                    <ul className="text-sm text-zinc-300 space-y-1">
                      <li>• Violencia o amenazas</li>
                      <li>• Acoso o bullying</li>
                      <li>• Discriminación o odio</li>
                      <li>• Autolesión o suicidio</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-white">Contenido ilegal:</h4>
                    <ul className="text-sm text-zinc-300 space-y-1">
                      <li>• Material con derechos de autor</li>
                      <li>• Contenido sexual explícito</li>
                      <li>• Drogas o sustancias ilegales</li>
                      <li>• Actividades peligrosas</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-red-900/20 border border-red-900/30 p-4 rounded-lg">
                  <p className="text-sm text-red-300">
                    <strong>Importante:</strong> El incumplimiento de estas reglas puede resultar en la suspensión
                    temporal o permanente de tu cuenta.
                  </p>
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
              <div className="space-y-4 text-zinc-300">
                <div>
                  <h4 className="font-medium text-white mb-2">Tu contenido:</h4>
                  <p className="text-sm">
                    Mantienes todos los derechos sobre el contenido que publicas en Challz. Sin embargo, nos otorgas una
                    licencia para usar, mostrar y distribuir tu contenido en nuestra plataforma.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-white mb-2">Nuestro contenido:</h4>
                  <p className="text-sm">
                    Challz, su logo, diseño y funcionalidades son propiedad de nuestra empresa. No puedes usar nuestros
                    elementos de marca sin autorización previa.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy and Data */}
          <Card className="mb-6 bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white">Privacidad y Datos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-zinc-300">
                <p>
                  Tu privacidad es importante para nosotros. Recolectamos y usamos tu información de acuerdo con nuestra
                  Política de Privacidad.
                </p>
                <div className="bg-zinc-800 p-4 rounded-lg">
                  <h4 className="font-medium mb-2 text-white">Datos que recolectamos:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Información de perfil (nombre, email, edad)</li>
                    <li>• Contenido que publicas (retos, respuestas, comentarios)</li>
                    <li>• Datos de uso y interacciones</li>
                    <li>• Información técnica del dispositivo</li>
                  </ul>
                </div>
                <p className="text-sm">
                  Para más detalles, consulta nuestra{" "}
                  <Link href="/privacidad" className="text-purple-400 hover:text-purple-300">
                    Política de Privacidad
                  </Link>
                  .
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Limitation of Liability */}
          <Card className="mb-6 bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white">Limitación de Responsabilidad</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-zinc-300">
                <p>
                  Challz se proporciona "tal como está". No garantizamos que el servicio esté libre de errores o
                  interrupciones.
                </p>
                <div className="space-y-2">
                  <h4 className="font-medium text-white">No somos responsables por:</h4>
                  <ul className="text-sm space-y-1 ml-4">
                    <li>• Pérdida de datos o contenido</li>
                    <li>• Daños resultantes del uso de la plataforma</li>
                    <li>• Contenido generado por otros usuarios</li>
                    <li>• Interrupciones del servicio</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Changes to Terms */}
          <Card className="mb-6 bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white">Modificaciones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-zinc-300">
                <p>
                  Nos reservamos el derecho de modificar estos términos en cualquier momento. Te notificaremos sobre
                  cambios importantes a través de la aplicación o por email.
                </p>
                <p className="text-sm">
                  El uso continuado de Challz después de los cambios constituye tu aceptación de los nuevos términos.
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
                  <div>
                    <p className="font-medium text-white">Email de Soporte</p>
                    <p className="text-sm text-zinc-400">challzchito@gmail.com</p>
                  </div>
                </div>
                <p className="text-xs text-zinc-500">Responderemos a tu consulta en un plazo máximo de 48 horas.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
