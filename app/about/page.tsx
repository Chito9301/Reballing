"use client"

import { ArrowLeft, Heart, Users, Shield, Target, Sparkles, Globe } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AppIcon } from "@/components/app-icon"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
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
          <h1 className="text-lg font-semibold">Acerca de Challz</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-16 pb-4">
        <div className="p-4 max-w-2xl mx-auto">
          {/* Hero Section */}
          <div className="flex flex-col items-center text-center mb-8">
            <AppIcon size={80} />
            <h2 className="mt-4 text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Challz
            </h2>
            <p className="mt-2 text-xl text-zinc-400">Desafía tu rutina. Reta tu mundo.</p>
          </div>

          {/* Mission Section */}
          <Card className="mb-6 bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Target className="h-5 w-5 text-purple-500" />
                Nuestra Misión
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-zinc-300 leading-relaxed">
                Challz es una app para crear, aceptar y compartir desafíos de manera divertida y social. Nuestra misión
                es conectar a personas mediante retos creativos, promoviendo valores de inclusión, respeto y aprendizaje
                mutuo en un entorno seguro.
              </p>
            </CardContent>
          </Card>

          {/* Values Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Heart className="h-6 w-6 text-red-500" />
                  <h3 className="font-semibold text-white">Inclusión</h3>
                </div>
                <p className="text-sm text-zinc-300">
                  Creamos un espacio donde todos pueden participar, sin importar su origen, edad o habilidades.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="h-6 w-6 text-green-500" />
                  <h3 className="font-semibold text-white">Respeto</h3>
                </div>
                <p className="text-sm text-zinc-300">
                  Fomentamos un ambiente de respeto mutuo donde cada persona se siente valorada y segura.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Sparkles className="h-6 w-6 text-purple-500" />
                  <h3 className="font-semibold text-white">Creatividad</h3>
                </div>
                <p className="text-sm text-zinc-300">
                  Inspiramos la creatividad a través de retos únicos que desafían tu imaginación.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Users className="h-6 w-6 text-blue-500" />
                  <h3 className="font-semibold text-white">Comunidad</h3>
                </div>
                <p className="text-sm text-zinc-300">
                  Construimos conexiones genuinas entre personas de todo el mundo a través de experiencias compartidas.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Features Section */}
          <Card className="mb-6 bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Globe className="h-5 w-5 text-purple-500" />
                ¿Qué puedes hacer en Challz?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-2"></div>
                  <div>
                    <h4 className="font-medium text-white">Crear Retos</h4>
                    <p className="text-sm text-zinc-300">
                      Diseña desafíos únicos y compártelos con la comunidad global.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-2"></div>
                  <div>
                    <h4 className="font-medium text-white">Aceptar Desafíos</h4>
                    <p className="text-sm text-zinc-300">
                      Participa en retos diarios y demuestra tu creatividad con videos, fotos o audio.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-2"></div>
                  <div>
                    <h4 className="font-medium text-white">Conectar</h4>
                    <p className="text-sm text-zinc-300">
                      Sigue a otros usuarios, comenta sus creaciones y construye una red de amigos creativos.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-2"></div>
                  <div>
                    <h4 className="font-medium text-white">Descubrir</h4>
                    <p className="text-sm text-zinc-300">
                      Explora tendencias, encuentra inspiración y descubre talentos increíbles.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Section */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white">Contáctanos</CardTitle>
              <CardDescription className="text-zinc-400">
                ¿Tienes sugerencias o quieres colaborar con nosotros?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <span className="text-purple-400 font-bold text-sm">@</span>
                  </div>
                  <div>
                    <p className="font-medium text-white">Email</p>
                    <p className="text-sm text-zinc-400">challzchito@gmail.com</p>
                  </div>
                </div>
                <p className="text-xs text-zinc-500 mt-4">Versión 1.0.0 • Hecho con ❤️ para la comunidad creativa</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
