import { ArrowLeft, Calendar, Clock, Users } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CrearRetoPage() {
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
          <h1 className="text-lg font-semibold">Crear Reto</h1>
        </div>
        <Button
          size="sm"
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          Publicar Reto
        </Button>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-16 pb-4">
        <div className="p-4 max-w-xl mx-auto">
          <div className="space-y-6">
            <div>
              <Label htmlFor="title" className="text-sm text-zinc-400 mb-1 block">
                Título del Reto
              </Label>
              <Input
                id="title"
                placeholder="Ej: Crea un video bailando con tu canción favorita"
                className="bg-zinc-900 border-zinc-700"
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-sm text-zinc-400 mb-1 block">
                Descripción
              </Label>
              <Textarea
                id="description"
                placeholder="Describe en qué consiste el reto y cómo completarlo..."
                className="bg-zinc-900 border-zinc-700 resize-none min-h-[120px]"
              />
            </div>

            <div>
              <Label className="text-sm text-zinc-400 mb-3 block">Tipo de Respuesta</Label>
              <RadioGroup defaultValue="all" className="flex flex-col space-y-3">
                <div className="flex items-center space-x-3 rounded-md border border-zinc-700 p-3">
                  <RadioGroupItem value="video" id="video" />
                  <Label htmlFor="video" className="flex-1 cursor-pointer">
                    Video
                  </Label>
                </div>
                <div className="flex items-center space-x-3 rounded-md border border-zinc-700 p-3">
                  <RadioGroupItem value="photo" id="photo" />
                  <Label htmlFor="photo" className="flex-1 cursor-pointer">
                    Foto
                  </Label>
                </div>
                <div className="flex items-center space-x-3 rounded-md border border-zinc-700 p-3">
                  <RadioGroupItem value="audio" id="audio" />
                  <Label htmlFor="audio" className="flex-1 cursor-pointer">
                    Audio
                  </Label>
                </div>
                <div className="flex items-center space-x-3 rounded-md border border-zinc-700 p-3">
                  <RadioGroupItem value="all" id="all" />
                  <Label htmlFor="all" className="flex-1 cursor-pointer">
                    Cualquier formato
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="duration" className="text-sm text-zinc-400 mb-1 block">
                  Duración
                </Label>
                <Select>
                  <SelectTrigger className="bg-zinc-900 border-zinc-700">
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 día</SelectItem>
                    <SelectItem value="3">3 días</SelectItem>
                    <SelectItem value="7">1 semana</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex items-center mt-2 text-xs text-zinc-500">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>Tiempo que estará activo el reto</span>
                </div>
              </div>

              <div>
                <Label htmlFor="category" className="text-sm text-zinc-400 mb-1 block">
                  Categoría
                </Label>
                <Select>
                  <SelectTrigger className="bg-zinc-900 border-zinc-700">
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="creative">Creatividad</SelectItem>
                    <SelectItem value="fitness">Fitness</SelectItem>
                    <SelectItem value="music">Música</SelectItem>
                    <SelectItem value="food">Comida</SelectItem>
                    <SelectItem value="learning">Aprendizaje</SelectItem>
                    <SelectItem value="social">Social</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="hashtags" className="text-sm text-zinc-400 mb-1 block">
                Hashtags
              </Label>
              <Input id="hashtags" placeholder="#challz #baile #música" className="bg-zinc-900 border-zinc-700" />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-zinc-900 border border-zinc-800">
              <div className="flex items-center">
                <Users className="h-5 w-5 text-purple-400 mr-2" />
                <div>
                  <p className="font-medium">Visibilidad</p>
                  <p className="text-xs text-zinc-400">¿Quién puede ver este reto?</p>
                </div>
              </div>
              <Select defaultValue="public">
                <SelectTrigger className="w-32 bg-zinc-800 border-zinc-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Público</SelectItem>
                  <SelectItem value="followers">Seguidores</SelectItem>
                  <SelectItem value="private">Privado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-zinc-900 border border-zinc-800">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-purple-400 mr-2" />
                <div>
                  <p className="font-medium">Programar</p>
                  <p className="text-xs text-zinc-400">Publicar ahora o programar para después</p>
                </div>
              </div>
              <Select defaultValue="now">
                <SelectTrigger className="w-32 bg-zinc-800 border-zinc-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="now">Ahora</SelectItem>
                  <SelectItem value="later">Programar</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
