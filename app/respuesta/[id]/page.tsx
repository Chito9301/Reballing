import { ArrowLeft, Heart, MessageCircle, MoreVertical, Share2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

export default function RespuestaPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-black/80 backdrop-blur-md border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <Link href="/reto/1">
            <Button variant="ghost" size="icon" className="text-zinc-400">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold">Respuesta al Reto</h1>
        </div>
        <Button variant="ghost" size="icon" className="text-zinc-400">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-16 pb-20">
        <div className="relative h-[calc(100vh-8rem)] bg-zinc-900">
          <Image src="/placeholder.svg?height=800&width=400" alt="Challenge response" fill className="object-cover" />

          <div className="absolute right-4 top-4 z-10 flex flex-col items-center gap-6">
            <div className="flex flex-col items-center">
              <Button variant="ghost" size="icon" className="rounded-full bg-black/40 backdrop-blur-md">
                <Heart className="h-6 w-6" />
              </Button>
              <span className="text-xs mt-1">1.2k</span>
            </div>
            <div className="flex flex-col items-center">
              <Button variant="ghost" size="icon" className="rounded-full bg-black/40 backdrop-blur-md">
                <MessageCircle className="h-6 w-6" />
              </Button>
              <span className="text-xs mt-1">85</span>
            </div>
            <div className="flex flex-col items-center">
              <Button variant="ghost" size="icon" className="rounded-full bg-black/40 backdrop-blur-md">
                <Share2 className="h-6 w-6" />
              </Button>
              <span className="text-xs mt-1">32</span>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
            <div className="flex items-center gap-3 mb-2">
              <Avatar className="h-10 w-10 border-2 border-purple-500">
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="@user" />
                <AvatarFallback>MR</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">@mariarodriguez</p>
                <p className="text-xs text-zinc-400">Reto: Baile de los 90s</p>
              </div>
              <Button
                size="sm"
                variant="secondary"
                className="ml-auto text-xs bg-purple-600 hover:bg-purple-700 text-white"
              >
                Seguir
              </Button>
            </div>
            <p className="text-sm">Mi versión de "Wannabe" de las Spice Girls 💃 #challz #90sdance</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge className="bg-zinc-800 hover:bg-zinc-700 text-white border-none text-xs">#challz</Badge>
              <Badge className="bg-zinc-800 hover:bg-zinc-700 text-white border-none text-xs">#90sdance</Badge>
              <Badge className="bg-zinc-800 hover:bg-zinc-700 text-white border-none text-xs">#spicegirls</Badge>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-zinc-800">
          <h3 className="font-medium mb-3">Comentarios (85)</h3>

          <div className="space-y-4 mb-4">
            {[
              { name: "Ana Pérez", username: "anaperez", comment: "¡Increíble! Me encantó tu versión 🔥", time: "2h" },
              {
                name: "Carlos López",
                username: "carloslopez",
                comment: "Muy buena coreografía, me hizo recordar mi adolescencia 😄",
                time: "5h",
              },
              {
                name: "Laura Martínez",
                username: "lauramartinez",
                comment: "¡Quiero ver más videos así! Eres muy talentosa",
                time: "1d",
              },
            ].map((comment, index) => (
              <div key={index} className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={`@${comment.username}`} />
                  <AvatarFallback>{comment.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">@{comment.username}</p>
                    <span className="text-xs text-zinc-500">{comment.time}</span>
                  </div>
                  <p className="text-sm">{comment.comment}</p>
                  <div className="flex items-center gap-4 mt-1">
                    <Button variant="ghost" size="sm" className="h-auto p-0 text-xs text-zinc-400 hover:text-zinc-300">
                      Me gusta
                    </Button>
                    <Button variant="ghost" size="sm" className="h-auto p-0 text-xs text-zinc-400 hover:text-zinc-300">
                      Responder
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@user" />
              <AvatarFallback>YO</AvatarFallback>
            </Avatar>
            <div className="flex-1 relative">
              <Input placeholder="Añadir un comentario..." className="bg-zinc-900 border-zinc-700 pr-20" />
              <Button
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-purple-600 hover:bg-purple-700 text-white"
              >
                Publicar
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
