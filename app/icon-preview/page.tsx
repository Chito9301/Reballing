import { AppIcon } from "@/components/app-icon"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function IconPreviewPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-black/80 backdrop-blur-md border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Button variant="ghost" size="icon" className="text-zinc-400">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold">Vista previa del icono</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-16 pb-4 flex flex-col items-center justify-center p-6">
        <div className="flex flex-col items-center max-w-md text-center">
          <h2 className="text-2xl font-bold mb-8">Icono de Challz</h2>

          <div className="mb-12 relative">
            <AppIcon size={300} />
          </div>

          <p className="text-lg mb-8">Icono oficial de Challz con el gradiente característico de la marca.</p>

          <div className="grid grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col items-center">
              <AppIcon size={64} />
              <p className="mt-2 text-sm text-zinc-400">64px</p>
            </div>
            <div className="flex flex-col items-center">
              <AppIcon size={96} />
              <p className="mt-2 text-sm text-zinc-400">96px</p>
            </div>
            <div className="flex flex-col items-center">
              <AppIcon size={128} />
              <p className="mt-2 text-sm text-zinc-400">128px</p>
            </div>
          </div>

          <Link href="/">
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              Volver a la aplicación
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
