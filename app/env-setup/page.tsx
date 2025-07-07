import { AppIcon } from "@/components/app-icon"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function EnvSetupPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center text-center">
            <AppIcon size={80} />
            <h1 className="mt-4 text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Challz
            </h1>
            <p className="mt-2 text-zinc-400">Configuración de Firebase</p>
          </div>

          <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
            <h2 className="text-xl font-bold mb-4">Variables de Entorno Requeridas</h2>
            <p className="text-sm text-zinc-400 mb-6">
              Para que la aplicación funcione correctamente, necesitas configurar las siguientes variables de entorno de
              Firebase:
            </p>

            <div className="space-y-4 mb-6">
              <div className="bg-zinc-800 p-3 rounded-md">
                <code className="text-xs text-purple-300">NEXT_PUBLIC_FIREBASE_API_KEY</code>
              </div>
              <div className="bg-zinc-800 p-3 rounded-md">
                <code className="text-xs text-purple-300">NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN</code>
              </div>
              <div className="bg-zinc-800 p-3 rounded-md">
                <code className="text-xs text-purple-300">NEXT_PUBLIC_FIREBASE_PROJECT_ID</code>
              </div>
              <div className="bg-zinc-800 p-3 rounded-md">
                <code className="text-xs text-purple-300">NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET</code>
              </div>
              <div className="bg-zinc-800 p-3 rounded-md">
                <code className="text-xs text-purple-300">NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID</code>
              </div>
              <div className="bg-zinc-800 p-3 rounded-md">
                <code className="text-xs text-purple-300">NEXT_PUBLIC_FIREBASE_APP_ID</code>
              </div>
            </div>

            <p className="text-sm text-zinc-400 mb-4">
              Puedes obtener estas variables desde la consola de Firebase al crear un nuevo proyecto.
            </p>

            <Link href="https://console.firebase.google.com/" target="_blank">
              <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                Ir a la Consola de Firebase
              </Button>
            </Link>
          </div>

          <div className="text-center">
            <Link href="/">
              <Button variant="link" className="text-purple-400 hover:text-purple-300">
                Volver a la Aplicación
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
