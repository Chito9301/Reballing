"use client"

import { ArrowLeft, Shield, Database, Eye, Lock, Mail, Cookie } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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
        <div className="p-4 max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
              <Shield className="h-8 w-8 text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Política de Privacidad de Challz
            </h2>
            <p className="mt-2 text-zinc-400">Última actualización: 21 de enero de 2025</p>
          </div>

          {/* Introduction */}
          <Card className="mb-6 bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Shield className="h-5 w-5 text-purple-500" />
                Introducción
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-zinc-300">
                <p>
                  En Challz, respetamos tu privacidad y nos comprometemos a proteger tu información personal. Esta
                  política explica cómo recolectamos, usamos y protegemos tus datos.
                </p>
                <p>
                  Al usar nuestra aplicación, aceptas las prácticas descritas en esta política de privacidad. Si no
                  estás de acuerdo, por favor no uses nuestros servicios.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Data Collection */}
          <Card className="mb-6 bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Database className="h-5 w-5 text-purple-500" />
                Información que Recolectamos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-medium text-white">Información que proporcionas directamente:</h4>
                  <ul className="text-sm text-zinc-300 space-y-2 ml-4">
                    <li>
                      • <strong>Datos de cuenta:</strong> Email, nombre de usuario, fecha de nacimiento
                    </li>
                    <li>
                      • <strong>Información de perfil:</strong> Foto, biografía, preferencias
                    </li>
                    <li>
                      • <strong>Contenido:</strong> Retos, respuestas, comentarios, mensajes
                    </li>
                    <li>
                      • <strong>Interacciones:</strong> Likes, seguimientos, reportes
                    </li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium text-white">Información recolectada automáticamente:</h4>
                  <ul className="text-sm text-zinc-300 space-y-2 ml-4">
                    <li>
                      • <strong>Datos técnicos:</strong> Tipo de dispositivo, sistema operativo, IP
                    </li>
                    <li>
                      • <strong>Datos de uso:</strong> Tiempo en la app, funciones utilizadas
                    </li>
                    <li>
                      • <strong>Datos de ubicación:</strong> Solo si otorgas permiso explícito
                    </li>
                    <li>
                      • <strong>Cookies y tecnologías similares</strong>
                    </li>
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
                <p className="text-zinc-300">Utilizamos tu información para los siguientes propósitos:</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-white">Servicios principales:</h4>
                    <ul className="text-sm text-zinc-300 space-y-1">
                      <li>• Crear y mantener tu cuenta</li>
                      <li>• Mostrar contenido personalizado</li>
                      <li>• Facilitar interacciones sociales</li>
                      <li>• Procesar tus retos y respuestas</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-white">Mejoras y seguridad:</h4>
                    <ul className="text-sm text-zinc-300 space-y-1">
                      <li>• Mejorar nuestros servicios</li>
                      <li>• Prevenir fraude y abuso</li>
                      <li>• Proporcionar soporte técnico</li>
                      <li>• Enviar notificaciones importantes</li>
                    </ul>
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
                <p className="text-zinc-300">
                  <strong>No vendemos tu información personal.</strong> Solo compartimos datos en estas situaciones:
                </p>
                <div className="space-y-3">
                  <div className="bg-zinc-800 p-4 rounded-lg">
                    <h4 className="font-medium mb-2 text-white">Con tu consentimiento:</h4>
                    <p className="text-sm text-zinc-300">
                      Cuando explícitamente nos autorizas a compartir información específica.
                    </p>
                  </div>
                  <div className="bg-zinc-800 p-4 rounded-lg">
                    <h4 className="font-medium mb-2 text-white">Proveedores de servicios:</h4>
                    <p className="text-sm text-zinc-300">
                      Con empresas que nos ayudan a operar la plataforma (hosting, análisis, soporte).
                    </p>
                  </div>
                  <div className="bg-zinc-800 p-4 rounded-lg">
                    <h4 className="font-medium mb-2 text-white">Requerimientos legales:</h4>
                    <p className="text-sm text-zinc-300">
                      Cuando la ley nos obliga o para proteger derechos y seguridad.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Security */}
          <Card className="mb-6 bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Lock className="h-5 w-5 text-purple-500" />
                Seguridad de Datos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-zinc-300">
                <p>Implementamos medidas de seguridad técnicas y organizacionales para proteger tu información:</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-white">Medidas técnicas:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Cifrado de datos en tránsito y reposo</li>
                      <li>• Autenticación de dos factores</li>
                      <li>• Monitoreo de seguridad 24/7</li>
                      <li>• Actualizaciones regulares de seguridad</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-white">Medidas organizacionales:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Acceso limitado a datos personales</li>
                      <li>• Capacitación en privacidad para empleados</li>
                      <li>• Auditorías regulares de seguridad</li>
                      <li>• Políticas estrictas de manejo de datos</li>
                    </ul>
                  </div>
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
              <div className="space-y-4">
                <p className="text-zinc-300">Tienes los siguientes derechos sobre tu información personal:</p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-500 mt-2"></div>
                    <div>
                      <h4 className="font-medium text-white">Acceso</h4>
                      <p className="text-sm text-zinc-300">
                        Solicitar una copia de toda la información que tenemos sobre ti.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-500 mt-2"></div>
                    <div>
                      <h4 className="font-medium text-white">Rectificación</h4>
                      <p className="text-sm text-zinc-300">Corregir información incorrecta o incompleta.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-500 mt-2"></div>
                    <div>
                      <h4 className="font-medium text-white">Eliminación</h4>
                      <p className="text-sm text-zinc-300">Solicitar la eliminación de tu cuenta y datos personales.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-500 mt-2"></div>
                    <div>
                      <h4 className="font-medium text-white">Portabilidad</h4>
                      <p className="text-sm text-zinc-300">Exportar tus datos en un formato legible por máquina.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-500 mt-2"></div>
                    <div>
                      <h4 className="font-medium text-white">Oposición</h4>
                      <p className="text-sm text-zinc-300">
                        Oponerte al procesamiento de tus datos para ciertos propósitos.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cookies */}
          <Card className="mb-6 bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Cookie className="h-5 w-5 text-purple-500" />
                Cookies y Tecnologías Similares
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-zinc-300">
                <p>Utilizamos cookies y tecnologías similares para mejorar tu experiencia:</p>
                <div className="space-y-3">
                  <div className="bg-zinc-800 p-4 rounded-lg">
                    <h4 className="font-medium mb-2 text-white">Cookies esenciales:</h4>
                    <p className="text-sm">
                      Necesarias para el funcionamiento básico de la aplicación (sesión, seguridad).
                    </p>
                  </div>
                  <div className="bg-zinc-800 p-4 rounded-lg">
                    <h4 className="font-medium mb-2 text-white">Cookies de rendimiento:</h4>
                    <p className="text-sm">Nos ayudan a entender cómo usas la aplicación para mejorarla.</p>
                  </div>
                  <div className="bg-zinc-800 p-4 rounded-lg">
                    <h4 className="font-medium mb-2 text-white">Cookies de personalización:</h4>
                    <p className="text-sm">Permiten recordar tus preferencias y personalizar tu experiencia.</p>
                  </div>
                </div>
                <p className="text-sm">
                  Puedes controlar las cookies a través de la configuración de tu navegador o dispositivo.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Data Retention */}
          <Card className="mb-6 bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white">Retención de Datos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-zinc-300">
                <p>
                  Conservamos tu información personal solo mientras sea necesario para los propósitos descritos en esta
                  política:
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-3 bg-zinc-800 rounded-lg">
                    <span className="text-sm">Datos de cuenta activa</span>
                    <span className="text-sm text-purple-400">Mientras uses Challz</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-zinc-800 rounded-lg">
                    <span className="text-sm">Datos después de eliminar cuenta</span>
                    <span className="text-sm text-purple-400">30 días</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-zinc-800 rounded-lg">
                    <span className="text-sm">Logs de seguridad</span>
                    <span className="text-sm text-purple-400">1 año</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-zinc-800 rounded-lg">
                    <span className="text-sm">Datos analíticos agregados</span>
                    <span className="text-sm text-purple-400">Indefinidamente</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* International Transfers */}
          <Card className="mb-6 bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white">Transferencias Internacionales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-zinc-300">
                <p>
                  Tus datos pueden ser procesados en países fuera de tu región. Cuando esto ocurre, implementamos
                  salvaguardas apropiadas:
                </p>
                <ul className="text-sm space-y-2 ml-4">
                  <li>• Cláusulas contractuales estándar aprobadas</li>
                  <li>• Certificaciones de adecuación de protección de datos</li>
                  <li>• Medidas técnicas y organizacionales adicionales</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Changes to Policy */}
          <Card className="mb-6 bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white">Cambios a esta Política</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-zinc-300">
                <p>
                  Podemos actualizar esta política de privacidad ocasionalmente. Te notificaremos sobre cambios
                  importantes a través de:
                </p>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• Notificación en la aplicación</li>
                  <li>• Email a tu dirección registrada</li>
                  <li>• Aviso en nuestro sitio web</li>
                </ul>
                <p className="text-sm">
                  Te recomendamos revisar esta política periódicamente para mantenerte informado sobre cómo protegemos
                  tu información.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Mail className="h-5 w-5 text-purple-500" />
                Contacto
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-zinc-300">
                  Si tienes preguntas sobre esta política de privacidad o quieres ejercer tus derechos, contáctanos:
                </p>
                <div className="flex items-center gap-3 p-3 bg-zinc-800 rounded-lg">
                  <Mail className="h-5 w-5 text-purple-500" />
                  <div>
                    <p className="font-medium text-white">Email de Privacidad</p>
                    <p className="text-sm text-zinc-400">challzchito@gmail.com</p>
                  </div>
                </div>
                <div className="bg-purple-900/20 border border-purple-900/30 p-4 rounded-lg">
                  <p className="text-sm text-purple-300">
                    <strong>Tiempo de respuesta:</strong> Responderemos a tu consulta de privacidad en un plazo máximo
                    de 72 horas.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
