import { ArrowLeft, Shield, Eye, Lock, Database } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function PrivacidadPage() {
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
          <h1 className="text-lg font-semibold">Política de privacidad</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-16 pb-4">
        <div className="max-w-4xl mx-auto p-6">
          <div className="space-y-8">
            <div className="text-center">
              <div className="bg-purple-500/20 p-4 rounded-full w-fit mx-auto mb-4">
                <Shield className="h-12 w-12 text-purple-400" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                Política de privacidad
              </h1>
              <p className="mt-4 text-zinc-300 max-w-2xl mx-auto">
                En Challz, tu privacidad es fundamental. Esta política explica cómo recopilamos, usamos y protegemos tu
                información personal.
              </p>
              <p className="text-sm text-zinc-500 mt-2">Última actualización: Enero 2025</p>
            </div>

            <div className="bg-zinc-900 rounded-lg p-8 border border-zinc-800">
              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-bold text-purple-300 mb-4 flex items-center">
                    <Database className="h-6 w-6 mr-2" />
                    1. Información que recopilamos
                  </h2>
                  <div className="space-y-4 text-zinc-300">
                    <p>Recopilamos los siguientes tipos de información:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>
                        <strong>Información de cuenta:</strong> nombre, correo electrónico, nombre de usuario
                      </li>
                      <li>
                        <strong>Contenido:</strong> videos, fotos, audio y texto que publicas
                      </li>
                      <li>
                        <strong>Información de uso:</strong> cómo interactúas con la aplicación
                      </li>
                      <li>
                        <strong>Información técnica:</strong> tipo de dispositivo, sistema operativo, dirección IP
                      </li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-purple-300 mb-4 flex items-center">
                    <Eye className="h-6 w-6 mr-2" />
                    2. Cómo usamos tu información
                  </h2>
                  <div className="space-y-4 text-zinc-300">
                    <p>Utilizamos tu información para:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Proporcionar y mejorar nuestros servicios</li>
                      <li>Personalizar tu experiencia en la aplicación</li>
                      <li>Comunicarnos contigo sobre actualizaciones y cambios</li>
                      <li>Mantener la seguridad y prevenir el abuso</li>
                      <li>Cumplir con obligaciones legales</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-purple-300 mb-4">3. Compartir información</h2>
                  <p className="text-zinc-300 leading-relaxed">
                    No vendemos tu información personal. Podemos compartir información en casos limitados como:
                    cumplimiento legal, protección de derechos, o con proveedores de servicios que nos ayudan a operar
                    la plataforma bajo estrictos acuerdos de confidencialidad.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-purple-300 mb-4 flex items-center">
                    <Lock className="h-6 w-6 mr-2" />
                    4. Seguridad de datos
                  </h2>
                  <p className="text-zinc-300 leading-relaxed">
                    Implementamos medidas de seguridad técnicas y organizativas para proteger tu información contra
                    acceso no autorizado, alteración, divulgación o destrucción. Utilizamos encriptación y otras
                    tecnologías de seguridad estándar de la industria.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-purple-300 mb-4">5. Tus derechos</h2>
                  <div className="space-y-4 text-zinc-300">
                    <p>Tienes derecho a:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Acceder a tu información personal</li>
                      <li>Corregir información inexacta</li>
                      <li>Solicitar la eliminación de tu cuenta y datos</li>
                      <li>Portabilidad de datos</li>
                      <li>Oponerte al procesamiento de tus datos</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-purple-300 mb-4">6. Cookies y tecnologías similares</h2>
                  <p className="text-zinc-300 leading-relaxed">
                    Utilizamos cookies y tecnologías similares para mejorar tu experiencia, analizar el uso de la
                    aplicación y personalizar el contenido. Puedes controlar las cookies a través de la configuración de
                    tu navegador.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-purple-300 mb-4">7. Menores de edad</h2>
                  <p className="text-zinc-300 leading-relaxed">
                    Challz está dirigido a usuarios mayores de 13 años. No recopilamos intencionalmente información de
                    menores de 13 años. Si descubrimos que hemos recopilado información de un menor, la eliminaremos
                    inmediatamente.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-purple-300 mb-4">8. Cambios a esta política</h2>
                  <p className="text-zinc-300 leading-relaxed">
                    Podemos actualizar esta política de privacidad ocasionalmente. Te notificaremos sobre cambios
                    significativos publicando la nueva política en la aplicación y actualizando la fecha de "última
                    actualización".
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-purple-300 mb-4">9. Contacto</h2>
                  <p className="text-zinc-300 leading-relaxed">
                    Si tienes preguntas sobre esta política de privacidad o quieres ejercer tus derechos, contáctanos
                    en: <span className="font-bold text-purple-300">challzchito@gmail.com</span>
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
