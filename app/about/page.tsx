"use client"

import { ArrowLeft, Heart, Users, Shield, Target, Sparkles, Globe } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AppIcon } from "@/components/app-icon"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
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
          <h1 className="text-lg font-semibold">Acerca de Challz</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-16 pb-4">
        <div className="p-4 max-w-2xl mx-auto">
          {/* Hero Section */}
          <div className="flex flex-col items-center text-center mb-8">
            <AppIcon size={80} />
            <h2 className="mt-4 text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Challz
            </h2>
            <p className="mt-2 text-xl text-muted-foreground">Desafía tu rutina. Reta tu mundo.</p>
          </div>

          {/* Mission Section */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-purple-500" />
                Nuestra Misión
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Challz es una app para crear, aceptar y compartir desafíos de manera divertida y social. Nuestra misión
                es conectar a personas mediante retos creativos, promoviendo valores de inclusión, respeto y aprendizaje
                mutuo en un entorno seguro.
              </p>
            </CardContent>
          </Card>

          {/* Values Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Heart className="h-6 w-6 text-red-500" />
                  <h3 className="font-semibold">Inclusión</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Creamos un espacio donde todos pueden participar, sin importar su origen, edad o habilidades.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="h-6 w-6 text-green-500" />
                  <h3 className="font-semibold">Respeto</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Fomentamos un ambiente de respeto mutuo donde cada persona se siente valorada y segura.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Sparkles className="h-6 w-6 text-yellow-500" />
                  <h3 className="font-semibold">Creatividad</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Inspiramos la creatividad a través de retos únicos que desafían tu imaginación.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Users className="h-6 w-6 text-blue-500" />
                  <h3 className="font-semibold">Comunidad</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Construimos conexiones genuinas entre personas de todo el mundo a través de experiencias compartidas.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Features Section */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-purple-500" />
                ¿Qué puedes hacer en Challz?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-2"></div>
                  <div>
                    <h4 className="font-medium">Crear Retos</h4>
                    <p className="text-sm text-muted-foreground">
                      Diseña desafíos únicos y compártelos con la comunidad global.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-2"></div>
                  <div>
                    <h4 className="font-medium">Aceptar Desafíos</h4>
                    <p className="text-sm text-muted-foreground">
                      Participa en retos diarios y demuestra tu creatividad con videos, fotos o audio.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-2"></div>
                  <div>
                    <h4 className="font-medium">Conectar</h4>
                    <p className="text-sm text-muted-foreground">
                      Sigue a otros usuarios, comenta sus creaciones y construye una red de amigos creativos.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-2"></div>
                  <div>
                    <h4 className="font-medium">Descubrir</h4>
                    <p className="text-sm text-muted-foreground">
                      Explora tendencias, encuentra inspiración y descubre talentos increíbles.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Section */}
          <Card>
            <CardHeader>
              <CardTitle>Contáctanos</CardTitle>
              <CardDescription>¿Tienes sugerencias o quieres colaborar con nosotros?</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                    <span className="text-purple-600 font-bold text-sm">@</span>
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">challzchito@gmail.com</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  Versión 1.0.0 • Hecho con ❤️ para la comunidad creativa
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
