"use client"

import { ArrowLeft, Mail, MessageCircle, Shield, User, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AppIcon } from "@/components/app-icon"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function HelpPage() {
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
          <h1 className="text-lg font-semibold">Centro de Ayuda</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-16 pb-4">
        <div className="p-4 max-w-2xl mx-auto">
          <div className="flex flex-col items-center text-center mb-8">
            <AppIcon size={64} />
            <h2 className="mt-4 text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Centro de Ayuda
            </h2>
            <p className="mt-2 text-muted-foreground">
              ¿Tienes dudas o necesitas soporte? Aquí tienes respuestas a preguntas frecuentes
            </p>
          </div>

          {/* FAQ Section */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-purple-500" />
                Preguntas Frecuentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="password">
                  <AccordionTrigger>¿Cómo recupero mi contraseña?</AccordionTrigger>
                  <AccordionContent>
                    Haz clic en "¿Olvidaste tu contraseña?" en la pantalla de inicio de sesión. Te enviaremos un enlace
                    a tu correo electrónico para restablecer tu contraseña de forma segura.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="delete-account">
                  <AccordionTrigger>¿Cómo elimino mi cuenta?</AccordionTrigger>
                  <AccordionContent>
                    Para eliminar tu cuenta permanentemente, contáctanos usando el correo electrónico registrado en tu
                    cuenta. Procesaremos tu solicitud en un plazo de 48 horas.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="report">
                  <AccordionTrigger>¿Cómo reporto un reto o usuario?</AccordionTrigger>
                  <AccordionContent>
                    Usa el botón de reporte (tres puntos) que aparece en cada desafío o perfil de usuario. Nuestro
                    equipo revisará el reporte y tomará las medidas necesarias.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="challenges">
                  <AccordionTrigger>¿Cómo funcionan los retos?</AccordionTrigger>
                  <AccordionContent>
                    Los retos son desafíos creativos que puedes aceptar y completar. Sube tu respuesta en video, foto o
                    audio, y compártela con la comunidad. ¡Gana likes y comentarios de otros usuarios!
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="privacy">
                  <AccordionTrigger>¿Es segura mi información personal?</AccordionTrigger>
                  <AccordionContent>
                    Sí, protegemos tu privacidad. Solo recolectamos la información necesaria para crear tu cuenta y
                    nunca la compartimos sin tu permiso. Lee nuestra política de privacidad para más detalles.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="age">
                  <AccordionTrigger>¿Cuál es la edad mínima para usar Challz?</AccordionTrigger>
                  <AccordionContent>
                    La edad mínima para usar Challz es 13 años. Si eres menor de 18 años, recomendamos que uses la app
                    con supervisión de un adulto.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* Contact Section */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-purple-500" />
                Contacto Personalizado
              </CardTitle>
              <CardDescription>
                Si necesitas ayuda personalizada o no encuentras la respuesta a tu pregunta
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <Mail className="h-5 w-5 text-purple-500" />
                  <div>
                    <p className="font-medium">Correo de Soporte</p>
                    <p className="text-sm text-muted-foreground">challzchito@gmail.com</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Responderemos tu consulta en un plazo máximo de 24 horas durante días hábiles.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/settings/privacy">
              <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                <CardContent className="p-4 text-center">
                  <Shield className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                  <h3 className="font-medium">Privacidad</h3>
                  <p className="text-xs text-muted-foreground">Configurar privacidad</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/profile/edit">
              <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                <CardContent className="p-4 text-center">
                  <User className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                  <h3 className="font-medium">Mi Perfil</h3>
                  <p className="text-xs text-muted-foreground">Editar información</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/settings/blocked">
              <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                <CardContent className="p-4 text-center">
                  <AlertTriangle className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                  <h3 className="font-medium">Reportes</h3>
                  <p className="text-xs text-muted-foreground">Usuarios bloqueados</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
