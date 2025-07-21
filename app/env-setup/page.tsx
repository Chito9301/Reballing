import { AppIcon } from "@/components/app-icon"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, ExternalLink, Database, Shield } from "lucide-react"
import Link from "next/link"

export default function EnvSetupPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-2xl space-y-8">
          <div className="flex flex-col items-center text-center">
            <AppIcon size={80} />
            <h1 className="mt-4 text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Challz
            </h1>
            <p className="mt-2 text-zinc-400">Configuración de Firebase</p>
          </div>

          <Alert className="bg-amber-900/20 border-amber-900 text-amber-300">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              La aplicación está funcionando en modo demo. Para habilitar todas las funciones, configura Firebase.
            </AlertDescription>
          </Alert>

          <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Database className="h-5 w-5 mr-2 text-purple-400" />
              Variables de Entorno Requeridas
            </h2>
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

            <Link href="https://console.firebase.google.com/" target="_blank">
              <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 mb-4">
                <ExternalLink className="h-4 w-4 mr-2" />
                Ir a la Consola de Firebase
              </Button>
            </Link>
          </div>

          <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Shield className="h-5 w-5 mr-2 text-green-400" />
              Configuración de Firestore
            </h2>
            <p className="text-sm text-zinc-400 mb-4">
              Después de crear tu proyecto Firebase, necesitas configurar Firestore con las siguientes reglas de
              seguridad:
            </p>

            <div className="bg-zinc-800 p-4 rounded-md mb-4">
              <pre className="text-xs text-green-300 overflow-x-auto">
                {`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to media collection
    match /media/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Allow read/write access to users collection for authenticated users
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Allow read access to comments
    match /comments/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}`}
              </pre>
            </div>

            <p className="text-xs text-zinc-500">
              Estas reglas permiten lectura pública del contenido y escritura solo para usuarios autenticados.
            </p>
          </div>

          <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
            <h3 className="text-lg font-bold mb-3">Pasos para configurar:</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-zinc-300">
              <li>Crea un nuevo proyecto en Firebase Console</li>
              <li>Habilita Authentication (Email/Password)</li>
              <li>Crea una base de datos Firestore</li>
              <li>Configura las reglas de seguridad mostradas arriba</li>
              <li>Habilita Storage para subida de archivos</li>
              <li>Copia las variables de configuración a tu proyecto</li>
            </ol>
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
