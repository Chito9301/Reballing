"use client"

import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import MediaUpload from "@/components/media-upload"
import ProtectedRoute from "@/components/protected-route"

export default function CreatePage() {
  return (
    <ProtectedRoute>
      <div className="flex flex-col min-h-screen bg-black text-white">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-black/80 backdrop-blur-md border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="ghost" size="icon" className="text-zinc-400">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-lg font-semibold">Crear Respuesta</h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 pt-16 pb-4">
          <div className="p-4">
            <div className="mb-6">
              <Badge className="mb-2 bg-purple-500/20 text-purple-300 hover:bg-purple-500/30">RETO DEL DÍA</Badge>
              <h2 className="text-xl font-bold mb-2">Crea un video bailando con tu canción favorita de los 90s</h2>
              <p className="text-zinc-400 text-sm">
                Muestra tus mejores pasos de baile con una canción nostálgica. ¡Sorprende a todos con tu creatividad!
              </p>
            </div>

            <MediaUpload
              challengeId="daily-challenge-1"
              challengeTitle="Crea un video bailando con tu canción favorita de los 90s"
            />
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
