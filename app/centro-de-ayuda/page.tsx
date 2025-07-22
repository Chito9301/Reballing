import { ArrowLeft, Mail, MessageCircle, HelpCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CentroDeAyudaPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-900 to-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-black/80 backdrop-blur-md border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Button variant="ghost" size="icon" className="text-zinc-400">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold">Centro de ayuda</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-16 pb-4">
        <div className="flex flex-col items-center justify-center min-h-full p-6">
          <div className="w-full max-w-2xl space-y-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-purple-500/20 p-4 rounded-full mb-4">
                <HelpCircle className="h-12 w-12 text-purple-400" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                Centro de ayuda
              </h1>
              <p className="mt-2 text-zinc-400">Estamos aquí para ayudarte</p>
            </div>

            <div className="bg-zinc-900 rounded-lg p-8 border border-zinc-800">
              <div className="space-y-6 text-center">
                <div className="bg-zinc-800 rounded-lg p-6">
                  <Mail className="h-8 w-8 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-4">¿Necesitas ayuda?</h3>
                  <p className="text-zinc-300 mb-6">
                    ¿Tienes alguna duda, sugerencia o encontraste un problema? Escríbenos a:
                  </p>
                  <div className="bg-zinc-700 rounded-lg p-4 mb-6">
                    <p className="text-xl font-bold text-purple-300">challzchito@gmail.com</p>
                  </div>
                  <p className="text-sm text-zinc-400">
                    Nos esforzamos por responder todas las consultas en un plazo de 24-48 horas.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-zinc-800 rounded-lg p-6">
                    <MessageCircle className="h-6 w-6 text-purple-400 mb-3" />
                    <h4 className="font-bold text-purple-300 mb-2">Soporte técnico</h4>
                    <p className="text-sm text-zinc-400">Problemas con la app, errores, o dificultades técnicas.</p>
                  </div>

                  <div className="bg-zinc-800 rounded-lg p-6">
                    <HelpCircle className="h-6 w-6 text-purple-400 mb-3" />
                    <h4 className="font-bold text-purple-300 mb-2">Preguntas generales</h4>
                    <p className="text-sm text-zinc-400">Dudas sobre cómo usar Challz o sugerencias de mejora.</p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-zinc-700">
                  <h4 className="font-bold text-lg mb-4">Preguntas frecuentes</h4>
                  <div className="space-y-4 text-left">
                    <div className="bg-zinc-800 rounded-lg p-4">
                      <h5 className="font-medium text-purple-300 mb-2">¿Cómo puedo crear un reto?</h5>
                      <p className="text-sm text-zinc-400">
                        Toca el botón "+" en la pantalla principal y sigue las instrucciones para crear tu reto.
                      </p>
                    </div>
                    <div className="bg-zinc-800 rounded-lg p-4">
                      <h5 className="font-medium text-purple-300 mb-2">¿Puedo eliminar mi cuenta?</h5>
                      <p className="text-sm text-zinc-400">
                        Sí, contáctanos por correo y te ayudaremos con el proceso de eliminación de cuenta.
                      </p>
                    </div>
                    <div className="bg-zinc-800 rounded-lg p-4">
                      <h5 className="font-medium text-purple-300 mb-2">¿Cómo reporto contenido inapropiado?</h5>
                      <p className="text-sm text-zinc-400">
                        Usa el botón de reportar en cualquier publicación o escríbenos directamente.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                  <Link href="/acerca-de">
                    <Button
                      variant="outline"
                      className="border-zinc-700 text-purple-400 hover:bg-zinc-800 hover:text-purple-300 bg-transparent"
                    >
                      Acerca de Challz
                    </Button>
                  </Link>
                  <Link href="/terminos">
                    <Button
                      variant="outline"
                      className="border-zinc-700 text-purple-400 hover:bg-zinc-800 hover:text-purple-300 bg-transparent"
                    >
                      Términos y servicios
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Link href="/">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  Volver al inicio
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
