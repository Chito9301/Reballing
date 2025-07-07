import { ArrowLeft, Camera, ImageIcon, Mic } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AceptarRetoPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-black/80 backdrop-blur-md border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <Link href={`/reto/${params.id}`}>
            <Button variant="ghost" size="icon" className="text-zinc-400">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold">Aceptar Reto</h1>
        </div>
        <Button
          size="sm"
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          Publicar
        </Button>
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

          <Tabs defaultValue="video" className="w-full">
            <TabsList className="w-full bg-zinc-900 border-b border-zinc-800 rounded-none h-12">
              <TabsTrigger value="video" className="flex-1 data-[state=active]:bg-black data-[state=active]:text-white">
                <Camera className="h-4 w-4 mr-2" />
                Video
              </TabsTrigger>
              <TabsTrigger value="photo" className="flex-1 data-[state=active]:bg-black data-[state=active]:text-white">
                <ImageIcon className="h-4 w-4 mr-2" />
                Foto
              </TabsTrigger>
              <TabsTrigger value="audio" className="flex-1 data-[state=active]:bg-black data-[state=active]:text-white">
                <Mic className="h-4 w-4 mr-2" />
                Audio
              </TabsTrigger>
            </TabsList>

            <TabsContent value="video" className="mt-4">
              <div className="border-2 border-dashed border-zinc-700 rounded-lg p-8 text-center mb-4">
                <div className="flex flex-col items-center justify-center">
                  <Camera className="h-12 w-12 text-zinc-500 mb-4" />
                  <h3 className="font-medium mb-2">Sube tu video</h3>
                  <p className="text-zinc-500 text-sm mb-4">Arrastra y suelta o haz clic para seleccionar</p>
                  <Button className="bg-zinc-800 hover:bg-zinc-700">Seleccionar Video</Button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-zinc-400 mb-1 block">Descripción</label>
                  <Textarea
                    placeholder="Describe tu respuesta al reto..."
                    className="bg-zinc-900 border-zinc-700 resize-none"
                  />
                </div>

                <div>
                  <label className="text-sm text-zinc-400 mb-1 block">Canción</label>
                  <Input placeholder="Nombre de la canción y artista" className="bg-zinc-900 border-zinc-700" />
                </div>

                <div>
                  <label className="text-sm text-zinc-400 mb-1 block">Hashtags</label>
                  <Input placeholder="#challz #90sdance" className="bg-zinc-900 border-zinc-700" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="photo" className="mt-4">
              <div className="border-2 border-dashed border-zinc-700 rounded-lg p-8 text-center mb-4">
                <div className="flex flex-col items-center justify-center">
                  <ImageIcon className="h-12 w-12 text-zinc-500 mb-4" />
                  <h3 className="font-medium mb-2">Sube tu foto</h3>
                  <p className="text-zinc-500 text-sm mb-4">Arrastra y suelta o haz clic para seleccionar</p>
                  <Button className="bg-zinc-800 hover:bg-zinc-700">Seleccionar Foto</Button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-zinc-400 mb-1 block">Descripción</label>
                  <Textarea
                    placeholder="Describe tu respuesta al reto..."
                    className="bg-zinc-900 border-zinc-700 resize-none"
                  />
                </div>

                <div>
                  <label className="text-sm text-zinc-400 mb-1 block">Hashtags</label>
                  <Input placeholder="#challz #90sdance" className="bg-zinc-900 border-zinc-700" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="audio" className="mt-4">
              <div className="border-2 border-dashed border-zinc-700 rounded-lg p-8 text-center mb-4">
                <div className="flex flex-col items-center justify-center">
                  <Mic className="h-12 w-12 text-zinc-500 mb-4" />
                  <h3 className="font-medium mb-2">Graba tu audio</h3>
                  <p className="text-zinc-500 text-sm mb-4">Presiona para comenzar a grabar</p>
                  <Button className="bg-zinc-800 hover:bg-zinc-700">Iniciar Grabación</Button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-zinc-400 mb-1 block">Descripción</label>
                  <Textarea
                    placeholder="Describe tu respuesta al reto..."
                    className="bg-zinc-900 border-zinc-700 resize-none"
                  />
                </div>

                <div>
                  <label className="text-sm text-zinc-400 mb-1 block">Hashtags</label>
                  <Input placeholder="#challz #90sdance" className="bg-zinc-900 border-zinc-700" />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
