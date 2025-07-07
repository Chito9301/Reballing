import { ArrowLeft, Search, TrendingUp, Zap } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ExplorarPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex flex-col bg-black/80 backdrop-blur-md border-b border-zinc-800">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="ghost" size="icon" className="text-zinc-400">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-lg font-semibold">Explorar</h1>
          </div>
        </div>
        <div className="px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 h-4 w-4" />
            <Input
              placeholder="Buscar retos, usuarios o hashtags"
              className="pl-10 bg-zinc-900 border-zinc-700 focus-visible:ring-purple-500"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-28 pb-20">
        <Tabs defaultValue="trending" className="w-full">
          <TabsList className="w-full bg-zinc-900 border-b border-zinc-800 rounded-none h-12">
            <TabsTrigger
              value="trending"
              className="flex-1 data-[state=active]:bg-black data-[state=active]:text-white"
            >
              Tendencias
            </TabsTrigger>
            <TabsTrigger
              value="categories"
              className="flex-1 data-[state=active]:bg-black data-[state=active]:text-white"
            >
              Categorías
            </TabsTrigger>
            <TabsTrigger value="users" className="flex-1 data-[state=active]:bg-black data-[state=active]:text-white">
              Usuarios
            </TabsTrigger>
          </TabsList>

          {/* Tendencias Tab */}
          <TabsContent value="trending" className="p-4 space-y-6">
            {/* Retos Destacados */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-purple-500" />
                  Retos Destacados
                </h2>
                <Button variant="link" className="text-purple-400 p-0">
                  Ver todos
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    title: "Baile de los 90s",
                    participants: 238,
                    image: "/placeholder.svg?height=200&width=200",
                  },
                  {
                    title: "Imita a tu personaje favorito",
                    participants: 156,
                    image: "/placeholder.svg?height=200&width=200",
                  },
                  {
                    title: "Cuenta una historia en 15 segundos",
                    participants: 102,
                    image: "/placeholder.svg?height=200&width=200",
                  },
                  {
                    title: "Foto de tu lugar favorito",
                    participants: 89,
                    image: "/placeholder.svg?height=200&width=200",
                  },
                ].map((reto, index) => (
                  <Link href={`/reto/${index + 1}`} key={index} className="block">
                    <div className="rounded-lg overflow-hidden bg-zinc-900 border border-zinc-800">
                      <div className="aspect-square relative">
                        <Image src={reto.image || "/placeholder.svg"} alt={reto.title} fill className="object-cover" />
                      </div>
                      <div className="p-3">
                        <h3 className="font-medium text-sm line-clamp-1">{reto.title}</h3>
                        <p className="text-xs text-zinc-400 mt-1">{reto.participants} participantes</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Hashtags Populares */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold flex items-center">
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
                    className="mr-2 text-purple-500"
                  >
                    <line x1="4" y1="9" x2="20" y2="9"></line>
                    <line x1="4" y1="15" x2="20" y2="15"></line>
                    <line x1="10" y1="3" x2="8" y2="21"></line>
                    <line x1="16" y1="3" x2="14" y2="21"></line>
                  </svg>
                  Hashtags Populares
                </h2>
              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  { name: "challz", count: "1.2k" },
                  { name: "baile90s", count: "856" },
                  { name: "creatividad", count: "723" },
                  { name: "retosdiarios", count: "512" },
                  { name: "musica", count: "498" },
                  { name: "talento", count: "345" },
                  { name: "diversión", count: "289" },
                  { name: "challenge", count: "267" },
                ].map((hashtag, index) => (
                  <Badge
                    key={index}
                    className="bg-zinc-800 hover:bg-zinc-700 text-white border-none py-1.5 px-3 cursor-pointer"
                  >
                    #{hashtag.name} <span className="text-zinc-400 ml-1">{hashtag.count}</span>
                  </Badge>
                ))}
              </div>
            </div>

            {/* Respuestas Populares */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-purple-500" />
                  Respuestas Populares
                </h2>
                <Button variant="link" className="text-purple-400 p-0">
                  Ver todas
                </Button>
              </div>

              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex gap-3 p-3 bg-zinc-900 rounded-lg border border-zinc-800">
                    <div className="h-20 w-20 bg-zinc-800 rounded-md overflow-hidden relative">
                      <Image
                        src={`/placeholder.svg?height=80&width=80`}
                        alt={`Popular response ${item}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src="/placeholder.svg?height=24&width=24" alt="@user" />
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <p className="text-sm font-medium">@usuario{item}</p>
                      </div>
                      <p className="text-xs text-zinc-400 mt-1">Reto: Título del reto {item}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-red-400"
                          >
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                          </svg>
                          <span className="text-xs">{Math.floor(Math.random() * 1000)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-zinc-400"
                          >
                            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                          </svg>
                          <span className="text-xs">{Math.floor(Math.random() * 100)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Categorías Tab */}
          <TabsContent value="categories" className="p-4">
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: "Creatividad", icon: "🎨", color: "from-purple-500 to-pink-500" },
                { name: "Fitness", icon: "💪", color: "from-green-500 to-emerald-500" },
                { name: "Música", icon: "🎵", color: "from-blue-500 to-indigo-500" },
                { name: "Comida", icon: "🍕", color: "from-orange-500 to-amber-500" },
                { name: "Aprendizaje", icon: "📚", color: "from-cyan-500 to-blue-500" },
                { name: "Social", icon: "👥", color: "from-pink-500 to-rose-500" },
                { name: "Viajes", icon: "✈️", color: "from-teal-500 to-green-500" },
                { name: "Tecnología", icon: "💻", color: "from-violet-500 to-purple-500" },
              ].map((category, index) => (
                <div
                  key={index}
                  className={`rounded-lg overflow-hidden bg-gradient-to-br ${category.color} p-6 flex flex-col items-center justify-center aspect-square`}
                >
                  <span className="text-4xl mb-2">{category.icon}</span>
                  <h3 className="font-bold text-white">{category.name}</h3>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Usuarios Tab */}
          <TabsContent value="users" className="p-4">
            <div className="space-y-4">
              {[
                { name: "María Rodríguez", username: "mariarodriguez", followers: "1.2k" },
                { name: "Carlos Pérez", username: "carlosperez", followers: "856" },
                { name: "Ana López", username: "analopez", followers: "723" },
                { name: "Juan Díaz", username: "juandiaz", followers: "512" },
                { name: "Laura Martínez", username: "lauramartinez", followers: "498" },
              ].map((user, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 border-2 border-purple-500">
                      <AvatarImage src={`/placeholder.svg?height=48&width=48`} alt={`@${user.username}`} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-zinc-400">@{user.username}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                      Seguir
                    </Button>
                    <p className="text-xs text-zinc-400 mt-1">{user.followers} seguidores</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
