"use client"

import { ArrowLeft, Shield, Database, Eye, Lock, Mail } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AppIcon } from "@/components/app-icon"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacyPolicyPage() {
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
          <h1 className="text-lg font-semibold">Política de Privacidad</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-16 pb-4">
        <div className="p-4 max-w-2xl mx-auto">
          <div className="flex flex-col items-center text-center mb-8">
            <AppIcon size={64} />
            <h2 className="mt-4 text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Política de Privacidad
            </h2>
            <p className="mt-2 text-zinc-400">Última actualización: Enero 2024</p>
          </div>

          {/* Introduction */}
          <Card className="mb-6 bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Shield className="h-5 w-5 text-purple-500" />
                Tu Privacidad es Nuestra Prioridad
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-zinc-300 leading-relaxed">
                En Challz, respetamos y protegemos tu privacidad. Esta política explica qué información recolectamos,
                cómo la usamos y tus derechos sobre tus datos personales. Nunca compartimos tu información sin tu
                consentimiento explícito.
              </p>
            </CardContent>
          </Card>

          {/* Data Collection */}
          <Card className="mb-6 bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Database className="h-5 w-5 text-purple-500" />
                Información que Recolectamos
              </CardTitle>
              <CardDescription className="text-zinc-400">
                Solo recolectamos la información necesaria para brindarte el mejor servicio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-zinc-800 p-4 rounded-lg">
                  <h4 className="font-medium mb-3 text-white">Información de Registro:</h4>
                  <ul className="text-sm text-zinc-300 space-y-2">
                    <li>
                      • <strong>Correo electrónico:</strong> Para crear y gestionar tu cuenta
                    </li>
                    <li>
                      • <strong>Edad:</strong> Para cumplir con regulaciones de edad mínima
                    </li>
                    <li>
                      • <strong>Género:</strong> Para personalizar tu experiencia (opcional)
                    </li>
                    <li>
                      • <strong>Nombre de usuario:</strong> Para identificarte en la plataforma
                    </li>
                  </ul>
                </div>

                <div className="bg-zinc-800 p-4 rounded-lg">
                  <h4 className="font-medium mb-3 text-white">Contenido y Actividad:</h4>
                  <ul className="text-sm text-zinc-300 space-y-2">
                    <li>• Retos que creas y respuestas que publicas</li>
                    <li>• Comentarios, likes y interacciones</li>
                    <li>• Mensajes directos (encriptados)</li>
                    <li>• Configuraciones de privacidad</li>
                  </ul>
                </div>

                <div className="bg-zinc-800 p-4 rounded-lg">
                  <h4 className="font-medium mb-3 text-white">Datos Técnicos:</h4>
                  <ul className="text-sm text-zinc-300 space-y-2">
                    <li>• Información del dispositivo (tipo, sistema operativo)</li>
                    <li>• Datos de uso de la aplicación</li>
                    <li>• Logs de errores para mejorar el servicio</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* How We Use Data */}
          <Card className="mb-6 bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Eye className="h-5 w-5 text-purple-500" />
                Cómo Usamos tu Información
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-2"></div>
                  <div>
                    <h4 className="font-medium text-white">Proporcionar el Servicio</h4>
                    <p className="text-sm text-zinc-300">
                      Crear tu cuenta, mostrar contenido personalizado y facilitar interacciones sociales
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-2"></div>
                  <div>
                    <h4 className="font-medium text-white">Mejorar la Experiencia</h4>
                    <p className="text-sm text-zinc-300">
                      Analizar patrones de uso para mejorar funcionalidades y recomendar contenido relevante
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-2"></div>
                  <div>
                    <h4 className="font-medium text-white">Seguridad y Protección</h4>
                    <p className="text-sm text-zinc-300">
                      Detectar actividades sospechosas, prevenir spam y mantener la comunidad segura
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-2"></div>
                  <div>
                    <h4 className="font-medium text-white">Comunicación</h4>
                    <p className="text-sm text-zinc-300">
                      Enviarte notificaciones importantes sobre tu cuenta y actualizaciones del servicio
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Sharing */}
          <Card className="mb-6 bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Lock className="h-5 w-5 text-purple-500" />
                Compartir Información
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-green-900/20 border border-green-800 p-4 rounded-lg">
                  <h4 className="font-medium text-green-300 mb-2">✓ Lo que NO hacemos:</h4>
                  <ul className="text-sm text-zinc-300 space-y-1">
                    <li>• No vendemos tu información personal</li>
                    <li>• No compartimos datos con anunciantes</li>
                    <li>• No accedemos a tus mensajes privados</li>
                    <li>• No rastreamos tu actividad fuera de Challz</li>
                  </ul>
                </div>

                <div className="bg-zinc-800 p-4 rounded-lg">
                  <h4 className="font-medium text-white mb-2">Casos excepcionales donde podríamos compartir datos:</h4>
                  <ul className="text-sm text-zinc-300 space-y-1">
                    <li>• Con tu consentimiento explícito</li>
                    <li>• Para cumplir con obligaciones legales</li>
                    <li>• Para proteger la seguridad de usuarios</li>
                    <li>• Con proveedores de servicios (bajo estrictos acuerdos de confidencialidad)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card className="mb-6 bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Shield className="h-5 w-5 text-purple-500" />
                Tus Derechos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-zinc-800 p-4 rounded-lg">
                  <h4 className="font-medium text-white mb-2">Acceso</h4>
                  <p className="text-sm text-zinc-300">Solicitar una copia de todos tus datos</p>
                </div>
                <div className="bg-zinc-800 p-4 rounded-lg">
                  <h4 className="font-medium text-white mb-2">Corrección</h4>
                  <p className="text-sm text-zinc-300">Actualizar información incorrecta</p>
                </div>
                <div className="bg-zinc-800 p-4 rounded-lg">
                  <h4 className="font-medium text-white mb-2">Eliminación</h4>
                  <p className="text-sm text-zinc-300">Borrar tu cuenta y datos permanentemente</p>
                </div>
                <div className="bg-zinc-800 p-4 rounded-lg">
                  <h4 className="font-medium text-white mb-2">Portabilidad</h4>
                  <p className="text-sm text-zinc-300">Exportar tus datos a otras plataformas</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Security */}
          <Card className="mb-6 bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white">Seguridad de Datos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-zinc-300">
                <p>Implementamos medidas de seguridad técnicas y organizacionales para proteger tu información:</p>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• Encriptación de datos en tránsito y en reposo</li>
                  <li>• Acceso limitado solo a personal autorizado</li>
                  <li>• Auditorías regulares de seguridad</li>
                  <li>• Respaldo seguro de datos</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Mail className="h-5 w-5 text-purple-500" />
                Contacto sobre Privacidad
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-zinc-300">
                  Si tienes preguntas sobre esta política de privacidad o quieres ejercer tus derechos:
                </p>
                <div className="flex items-center gap-3 p-3 bg-zinc-800 rounded-lg">
                  <Mail className="h-5 w-5 text-purple-500" />
                  <div>
                    <p className="font-medium text-white">Email de Privacidad</p>
                    <p className="text-sm text-zinc-400">challzchito@gmail.com</p>
                  </div>
                </div>
                <p className="text-xs text-zinc-500">
                  Responderemos a tu consulta en un plazo máximo de 72 horas. Esta política puede actualizarse
                  ocasionalmente para reflejar cambios en nuestras prácticas.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
