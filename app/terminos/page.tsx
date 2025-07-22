import { ArrowLeft, FileText, Shield, Eye } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function TerminosPage() {
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
          <h1 className="text-lg font-semibold">Términos y servicios</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-16 pb-4">
        <div className="max-w-4xl mx-auto p-6">
          <div className="space-y-8">
            <div className="text-center">
              <div className="bg-purple-500/20 p-4 rounded-full w-fit mx-auto mb-4">
                <FileText className="h-12 w-12 text-purple-400" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                Términos y servicios
              </h1>
              <p className="mt-4 text-zinc-300 max-w-2xl mx-auto">
                Lee atentamente los términos y condiciones de Challz. Usar esta plataforma implica la aceptación de
                nuestras políticas de uso y privacidad.
              </p>
              <p className="text-sm text-zinc-500 mt-2">Última actualización: Enero 2025</p>
            </div>

            <div className="bg-zinc-900 rounded-lg p-8 border border-zinc-800">
              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-bold text-purple-300 mb-4 flex items-center">
                    <Shield className="h-6 w-6 mr-2" />
                    1. Aceptación de términos
                  </h2>
                  <p className="text-zinc-300 leading-relaxed">
                    Al acceder y utilizar Challz, aceptas estar sujeto a estos términos de servicio y todas las leyes y
                    regulaciones aplicables. Si no estás de acuerdo con alguno de estos términos, no debes usar esta
                    aplicación.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-purple-300 mb-4">2. Uso de la plataforma</h2>
                  <div className="space-y-4 text-zinc-300">
                    <p>Al usar Challz, te comprometes a:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Proporcionar información veraz y actualizada</li>
                      <li>Mantener la seguridad de tu cuenta y contraseña</li>
                      <li>No usar la plataforma para actividades ilegales o dañinas</li>
                      <li>Respetar los derechos de otros usuarios</li>
                      <li>No publicar contenido ofensivo, discriminatorio o inapropiado</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-purple-300 mb-4">3. Contenido del usuario</h2>
                  <p className="text-zinc-300 leading-relaxed">
                    Eres responsable del contenido que publicas en Challz. Al subir contenido, otorgas a Challz una
                    licencia no exclusiva para usar, mostrar y distribuir tu contenido en la plataforma. Nos reservamos
                    el derecho de eliminar contenido que viole nuestras políticas.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-purple-300 mb-4 flex items-center">
                    <Eye className="h-6 w-6 mr-2" />
                    4. Privacidad
                  </h2>
                  <p className="text-zinc-300 leading-relaxed">
                    Tu privacidad es importante para nosotros. Recopilamos y utilizamos tu información de acuerdo con
                    nuestra Política de Privacidad. Al usar Challz, consientes la recopilación y uso de información
                    según se describe en dicha política.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-purple-300 mb-4">5. Propiedad intelectual</h2>
                  <p className="text-zinc-300 leading-relaxed">
                    Challz y su contenido original, características y funcionalidad son propiedad de Challz y están
                    protegidos por derechos de autor, marcas comerciales y otras leyes de propiedad intelectual.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-purple-300 mb-4">6. Limitación de responsabilidad</h2>
                  <p className="text-zinc-300 leading-relaxed">
                    Challz se proporciona "tal como está" sin garantías de ningún tipo. No seremos responsables de daños
                    directos, indirectos, incidentales o consecuentes que resulten del uso de la plataforma.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-purple-300 mb-4">7. Modificaciones</h2>
                  <p className="text-zinc-300 leading-relaxed">
                    Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en
                    vigor inmediatamente después de su publicación. Tu uso continuado de Challz constituye la aceptación
                    de los términos modificados.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-purple-300 mb-4">8. Contacto</h2>
                  <p className="text-zinc-300 leading-relaxed">
                    Si tienes preguntas sobre estos términos, contáctanos en:{" "}
                    <span className="font-bold text-purple-300">challzchito@gmail.com</span>
                  </p>
                </section>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/acerca-de">
                <Button
                  variant="outline"
                  className="border-zinc-700 text-purple-400 hover:bg-zinc-800 hover:text-purple-300 bg-transparent"
                >
                  Acerca de Challz
                </Button>
              </Link>
              <Link href="/centro-de-ayuda">
                <Button
                  variant="outline"
                  className="border-zinc-700 text-purple-400 hover:bg-zinc-800 hover:text-purple-300 bg-transparent"
                >
                  Centro de ayuda
                </Button>
              </Link>
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
