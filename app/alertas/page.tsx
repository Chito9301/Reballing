import { ArrowLeft, Bell, BellOff, Clock, Filter } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function AlertasPage() {
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
          <h1 className="text-lg font-semibold">Alertas</h1>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="text-zinc-400">
            <Filter className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-16 pb-20">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full bg-zinc-900 border-b border-zinc-800 rounded-none h-12">
            <TabsTrigger value="all" className="flex-1 data-[state=active]:bg-black data-[state=active]:text-white">
              Todas
            </TabsTrigger>
            <TabsTrigger
              value="mentions"
              className="flex-1 data-[state=active]:bg-black data-[state=active]:text-white"
            >
              Menciones
            </TabsTrigger>
            <TabsTrigger value="retos" className="flex-1 data-[state=active]:bg-black data-[state=active]:text-white">
              Retos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="p-0 mt-0">
            <div className="divide-y divide-zinc-800">
              {/* Notificación de nuevo reto */}
              <div className="flex items-start gap-3 p-4 hover:bg-zinc-900/50">
                <div className="bg-purple-500/20 p-2 rounded-full">
                  <Bell className="h-5 w-5 text-purple-400" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">¡Nuevo reto diario disponible!</p>
                  <p className="text-sm text-zinc-400">Crea un video bailando con tu canción favorita de los 90s</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="h-3 w-3 text-zinc-500" />
                    <span className="text-xs text-zinc-500">Hace 2 horas</span>
                  </div>
                </div>
                <Badge className="bg-purple-500 text-white">Nuevo</Badge>
              </div>

              {/* Notificación de seguidor */}
              <div className="flex items-start gap-3 p-4 hover:bg-zinc-900/50">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="@user" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium">
                    <span className="text-purple-400">@carlosperez</span> comenzó a seguirte
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="h-3 w-3 text-zinc-500" />
                    <span className="text-xs text-zinc-500">Hace 5 horas</span>
                  </div>
                </div>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                  Seguir
                </Button>
              </div>

              {/* Notificación de like */}
              <div className="flex items-start gap-3 p-4 hover:bg-zinc-900/50">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="@user" />
                  <AvatarFallback>MR</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium">
                    <span className="text-purple-400">@mariarodriguez</span> le dio me gusta a tu respuesta al reto
                    "Baile de los 90s"
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="h-3 w-3 text-zinc-500" />
                    <span className="text-xs text-zinc-500">Hace 1 día</span>
                  </div>
                </div>
                <div className="h-12 w-12 bg-zinc-800 rounded-md overflow-hidden relative">
                  <img
                    src="/placeholder.svg?height=48&width=48"
                    alt="Challenge thumbnail"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>

              {/* Notificación de comentario */}
              <div className="flex items-start gap-3 p-4 hover:bg-zinc-900/50">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="@user" />
                  <AvatarFallback>AP</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium">
                    <span className="text-purple-400">@anaperez</span> comentó en tu respuesta: "¡Increíble! Me encantó
                    tu versión 🔥"
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="h-3 w-3 text-zinc-500" />
                    <span className="text-xs text-zinc-500">Hace 2 días</span>
                  </div>
                </div>
                <div className="h-12 w-12 bg-zinc-800 rounded-md overflow-hidden relative">
                  <img
                    src="/placeholder.svg?height=48&width=48"
                    alt="Challenge thumbnail"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>

              {/* Notificación de reto completado */}
              <div className="flex items-start gap-3 p-4 hover:bg-zinc-900/50">
                <div className="bg-green-500/20 p-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-400"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-medium">¡Has completado el reto "Foto de tu lugar favorito"!</p>
                  <p className="text-sm text-zinc-400">Tu respuesta ha recibido 24 me gusta</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="h-3 w-3 text-zinc-500" />
                    <span className="text-xs text-zinc-500">Hace 3 días</span>
                  </div>
                </div>
                <div className="h-12 w-12 bg-zinc-800 rounded-md overflow-hidden relative">
                  <img
                    src="/placeholder.svg?height=48&width=48"
                    alt="Challenge thumbnail"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="mentions" className="p-0 mt-0">
            <div className="divide-y divide-zinc-800">
              {/* Notificación de mención en comentario */}
              <div className="flex items-start gap-3 p-4 hover:bg-zinc-900/50">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="@user" />
                  <AvatarFallback>AP</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium">
                    <span className="text-purple-400">@anaperez</span> te mencionó en un comentario: "Creo que{" "}
                    <span className="text-purple-400">@juandiaz</span> haría este reto genial!"
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="h-3 w-3 text-zinc-500" />
                    <span className="text-xs text-zinc-500">Hace 1 día</span>
                  </div>
                </div>
                <div className="h-12 w-12 bg-zinc-800 rounded-md overflow-hidden relative">
                  <img
                    src="/placeholder.svg?height=48&width=48"
                    alt="Challenge thumbnail"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>

              {/* Notificación de mención en reto */}
              <div className="flex items-start gap-3 p-4 hover:bg-zinc-900/50">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="@user" />
                  <AvatarFallback>MR</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium">
                    <span className="text-purple-400">@mariarodriguez</span> te retó a participar en "Baile de los 90s"
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="h-3 w-3 text-zinc-500" />
                    <span className="text-xs text-zinc-500">Hace 2 días</span>
                  </div>
                </div>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                  Ver Reto
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="retos" className="p-0 mt-0">
            <div className="divide-y divide-zinc-800">
              {/* Notificación de nuevo reto */}
              <div className="flex items-start gap-3 p-4 hover:bg-zinc-900/50">
                <div className="bg-purple-500/20 p-2 rounded-full">
                  <Bell className="h-5 w-5 text-purple-400" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">¡Nuevo reto diario disponible!</p>
                  <p className="text-sm text-zinc-400">Crea un video bailando con tu canción favorita de los 90s</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="h-3 w-3 text-zinc-500" />
                    <span className="text-xs text-zinc-500">Hace 2 horas</span>
                  </div>
                </div>
                <Badge className="bg-purple-500 text-white">Nuevo</Badge>
              </div>

              {/* Notificación de reto completado */}
              <div className="flex items-start gap-3 p-4 hover:bg-zinc-900/50">
                <div className="bg-green-500/20 p-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-400"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-medium">¡Has completado el reto "Foto de tu lugar favorito"!</p>
                  <p className="text-sm text-zinc-400">Tu respuesta ha recibido 24 me gusta</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="h-3 w-3 text-zinc-500" />
                    <span className="text-xs text-zinc-500">Hace 3 días</span>
                  </div>
                </div>
                <div className="h-12 w-12 bg-zinc-800 rounded-md overflow-hidden relative">
                  <img
                    src="/placeholder.svg?height=48&width=48"
                    alt="Challenge thumbnail"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>

              {/* Notificación de reto por expirar */}
              <div className="flex items-start gap-3 p-4 hover:bg-zinc-900/50">
                <div className="bg-amber-500/20 p-2 rounded-full">
                  <Clock className="h-5 w-5 text-amber-400" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">¡El reto "Imita a tu personaje favorito" está por terminar!</p>
                  <p className="text-sm text-zinc-400">Te quedan 3 horas para participar</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="h-3 w-3 text-zinc-500" />
                    <span className="text-xs text-zinc-500">Hace 5 horas</span>
                  </div>
                </div>
                <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white">
                  Participar
                </Button>
              </div>

              {/* Notificación de reto popular */}
              <div className="flex items-start gap-3 p-4 hover:bg-zinc-900/50">
                <div className="bg-blue-500/20 p-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-400"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-medium">¡Tu reto "Cuenta una historia en 15 segundos" se ha vuelto popular!</p>
                  <p className="text-sm text-zinc-400">Ya tiene más de 100 participantes</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="h-3 w-3 text-zinc-500" />
                    <span className="text-xs text-zinc-500">Hace 1 día</span>
                  </div>
                </div>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                  Ver Reto
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Configuración de notificaciones */}
        <div className="p-4 border-t border-zinc-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BellOff className="h-5 w-5 text-zinc-400" />
              <span className="text-sm">Configurar notificaciones</span>
            </div>
            <Link href="/notifications/settings">
              <Button variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300">
                Configurar
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
