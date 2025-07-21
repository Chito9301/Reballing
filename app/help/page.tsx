"use client"

import { ArrowLeft, Mail, MessageCircle, Shield, User, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AppIcon } from "@/components/app-icon"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function HelpPage() {
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
          <h1 className="text-lg font-semibold">Centro de Ayuda</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-16 pb-4">
        <div className="p-4 max-w-2xl mx-auto">
          <div className="flex flex-col items-center text-center mb-8">
            <AppIcon size={64} />
            <h2 className="mt-4 text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Centro de Ayuda
            </h2>
            <p className="mt-2 text-zinc-400">
              ¿Tienes dudas o necesitas soporte? Aquí tienes respuestas a preguntas frecuentes
            </p>
          </div>

          {/* FAQ Section */}
          <Card className="mb-6 bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <MessageCircle className="h-5 w-5 text-purple-500" />
                Preguntas Frecuentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="password" className="border-zinc-700">
                  <AccordionTrigger className="text-white hover:text-purple-300">
                    ¿Cómo recupero mi contraseña?
                  </AccordionTrigger>
                  <AccordionContent className="text-zinc-300">
                    Haz clic en "¿Olvidaste tu contraseña?" en la pantalla de inicio de sesión. Te enviaremos un enlace
                    a tu correo electrónico para restablecer tu contraseña de forma segura.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="delete-account" className="border-zinc-700">
                  <AccordionTrigger className="text-white hover:text-purple-300">
                    ¿Cómo elimino mi cuenta?
                  </AccordionTrigger>
                  <AccordionContent className="text-zinc-300">
                    Para eliminar tu cuenta permanentemente, contáctanos usando el correo electrónico registrado en tu
                    cuenta. Procesaremos tu solicitud en un plazo de 48 horas.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="report" className="border-zinc-700">
                  <AccordionTrigger className="text-white hover:text-purple-300">
                    ¿Cómo reporto un reto o usuario?
                  </AccordionTrigger>
                  <AccordionContent className="text-zinc-300">
                    Usa el botón de reporte (tres puntos) que aparece en cada desafío o perfil de usuario. Nuestro
                    equipo revisará el reporte y tomará las medidas necesarias.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="challenges" className="border-zinc-700">
                  <AccordionTrigger className="text-white hover:text-purple-300">
                    ¿Cómo funcionan los retos?
                  </AccordionTrigger>
                  <AccordionContent className="text-zinc-300">
                    Los retos son desafíos creativos que puedes aceptar y completar. Sube tu respuesta en video, foto o
                    audio, y compártela con la comunidad. ¡Gana likes y comentarios de otros usuarios!
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="privacy" className="border-zinc-700">
                  <AccordionTrigger className="text-white hover:text-purple-300">
                    ¿Es segura mi información personal?
                  </AccordionTrigger>
                  <AccordionContent className="text-zinc-300">
                    Sí, protegemos tu privacidad. Solo recolectamos la información necesaria para crear tu cuenta y
                    nunca la compartimos sin tu permiso. Lee nuestra política de privacidad para más detalles.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="age" className="border-zinc-700">
                  <AccordionTrigger className="text-white hover:text-purple-300">
                    ¿Cuál es la edad mínima para usar Challz?
                  </AccordionTrigger>
                  <AccordionContent className="text-zinc-300">
                    La edad mínima para usar Challz es 13 años. Si eres menor de 18 años, recomendamos que uses la app
                    con supervisión de un adulto.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* Contact Section */}
          <Card className="mb-6 bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Mail className="h-5 w-5 text-purple-500" />
                Contacto Personalizado
              </CardTitle>
              <CardDescription className="text-zinc-400">
                Si necesitas ayuda personalizada o no encuentras la respuesta a tu pregunta
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-zinc-800 rounded-lg">
                  <Mail className="h-5 w-5 text-purple-500" />
                  <div>
                    <p className="font-medium text-white">Correo de Soporte</p>
                    <p className="text-sm text-zinc-400">challzchito@gmail.com</p>
                  </div>
                </div>
                <p className="text-sm text-zinc-400">
                  Responderemos tu consulta en un plazo máximo de 24 horas durante días hábiles.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/settings/privacy">
              <Card className="hover:bg-zinc-800/50 transition-colors cursor-pointer bg-zinc-900 border-zinc-800">
                <CardContent className="p-4 text-center">
                  <Shield className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                  <h3 className="font-medium text-white">Privacidad</h3>
                  <p className="text-xs text-zinc-400">Configurar privacidad</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/profile/edit">
              <Card className="hover:bg-zinc-800/50 transition-colors cursor-pointer bg-zinc-900 border-zinc-800">
                <CardContent className="p-4 text-center">
                  <User className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                  <h3 className="font-medium text-white">Mi Perfil</h3>
                  <p className="text-xs text-zinc-400">Editar información</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/settings/blocked">
              <Card className="hover:bg-zinc-800/50 transition-colors cursor-pointer bg-zinc-900 border-zinc-800">
                <CardContent className="p-4 text-center">
                  <AlertTriangle className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                  <h3 className="font-medium text-white">Reportes</h3>
                  <p className="text-xs text-zinc-400">Usuarios bloqueados</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
