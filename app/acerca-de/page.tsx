import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AppIcon } from "@/components/app-icon"

export default function AcercaDePage() {
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
          <h1 className="text-lg font-semibold">Acerca de Challz</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-16 pb-4">
        <div className="flex flex-col items-center justify-center min-h-full p-6">
          <div className="w-full max-w-2xl space-y-8">
            <div className="flex flex-col items-center text-center">
              <AppIcon size={120} />
              <h1 className="mt-6 text-4xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                Acerca de Challz
              </h1>
            </div>

            <div className="bg-zinc-900 rounded-lg p-8 border border-zinc-800">
              <div className="space-y-6 text-center">
                <p className="text-lg text-zinc-300 leading-relaxed">
                  Challz es una plataforma creada para conectar, desafiar y crecer juntos. Nuestra misión es brindar una
                  experiencia segura, moderna y emocionante para todos nuestros usuarios.
                </p>

                <div className="grid md:grid-cols-3 gap-6 mt-8">
                  <div className="bg-zinc-800 rounded-lg p-6">
                    <div className="text-3xl mb-3">🚀</div>
                    <h3 className="font-bold text-purple-300 mb-2">Innovación</h3>
                    <p className="text-sm text-zinc-400">
                      Creamos experiencias únicas que inspiran creatividad y conexión auténtica.
                    </p>
                  </div>

                  <div className="bg-zinc-800 rounded-lg p-6">
                    <div className="text-3xl mb-3">🤝</div>
                    <h3 className="font-bold text-purple-300 mb-2">Comunidad</h3>
                    <p className="text-sm text-zinc-400">
                      Fomentamos un espacio seguro donde todos pueden expresarse y crecer juntos.
                    </p>
                  </div>

                  <div className="bg-zinc-800 rounded-lg p-6">
                    <div className="text-3xl mb-3">⭐</div>
                    <h3 className="font-bold text-purple-300 mb-2">Excelencia</h3>
                    <p className="text-sm text-zinc-400">
                      Nos comprometemos a ofrecer la mejor experiencia posible a nuestros usuarios.
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-zinc-700">
                  <p className="text-zinc-400 mb-6">
                    Desafía tu rutina. Reta tu mundo. Únete a la revolución de los retos creativos.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/centro-de-ayuda">
                      <Button
                        variant="outline"
                        className="border-zinc-700 text-purple-400 hover:bg-zinc-800 hover:text-purple-300 bg-transparent"
                      >
                        Centro de ayuda
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
