import { AppIcon } from "@/components/app-icon"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function SplashPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-900 to-black text-white p-6">
      <div className="flex flex-col items-center text-center max-w-md">
        <div className="mb-12">
          <AppIcon size={200} />
        </div>

        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
          Challz
        </h1>

        <p className="text-xl mb-12 text-purple-200">Desafía tu rutina. Reta tu mundo.</p>

        <div className="w-full space-y-4">
          <Link href="/" className="w-full block">
            <Button className="w-full bg-white text-purple-900 hover:bg-purple-100">Iniciar Sesión</Button>
          </Link>

          <Link href="/" className="w-full block">
            <Button variant="outline" className="w-full border-white text-white hover:bg-white/10">
              Registrarse
            </Button>
          </Link>
        </div>

        <p className="mt-12 text-sm text-purple-300">
          Al continuar, aceptas nuestros Términos y Política de Privacidad
        </p>
      </div>
    </div>
  )
}
