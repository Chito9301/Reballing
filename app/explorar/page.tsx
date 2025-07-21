import { ArrowLeft, Search, TrendingUp, Flame, Hash, Users } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ViralBadge } from "@/components/viral-badge"

export default function ExplorarPage() {
  // Mock viral content data
  const viralChallenges = [
    {
      title: "Baile de los 90s",
      participants: 238,
      image: "/placeholder.svg?height=200&width=200",
      isViral: true,
      viralScore: 95,
    },
    {
      title: "Imita a tu personaje favorito",
      participants: 156,
      image: "/placeholder.svg?height=200&width=200",
      isViral: true,
      viralScore: 88,
    },
    {
      title: "Cuenta una historia en 15 segundos",
      participants: 102,
      image: "/placeholder.svg?height=200&width=200",
      isViral: false,
      viralScore: 65,
    },
    {
      title: "Foto de tu lugar favorito",
      participants: 89,
      image: "/placeholder.svg?height=200&width=200",
      isViral: false,
      viralScore: 45,
    },
  ]

  const viralResponses = [
    {
      id: 1,
      username: "@mariarodriguez",
      title: "¡VIRAL! Mi baile de los 90s",
      likes: 2500,
      comments: 180,
      views: 12000,
      isViral: true,
      viralScore: 98,
    },
    {
      id: 2,
      username: "@carlosperez",
      title: "Imitando a mi personaje favorito",
      likes: 1800,
      comments: 95,
      views: 8500,
      isViral: true,
      viralScore: 85,
    },
    {
      id: 3,
      username: "@analopez",
      title: "Historia épica en 15 segundos",
      likes: 1200,
      comments: 67,
      views: 5400,
      isViral: true,
      viralScore: 78,
    },
  ]

  const trendingHashtags = [
    { name: "challz", count: "1.2k", isViral: true },
    { name: "baile90s", count: "856", isViral: true },
    { name: "creatividad", count: "723", isViral: false },
    { name: "retosdiarios", count: "512", isViral: false },
    { name: "musica", count: "498", isViral: false },
    { name: "talento", count: "345", isViral: false },
    { name: "diversión", count: "289", isViral: false },
    { name: "challenge", count: "267", isViral: false },
  ]

  const trendingUsers = [
    { name: "María Rodríguez", username: "mariarodriguez", followers: "1.2k", isVerified: true },
    { name: "Carlos Pérez", username: "carlosperez", followers: "856", isVerified: false },
    { name: "Ana López", username: "analopez", followers: "723", isVerified: true },
    { name: "Juan Díaz", username: "juandiaz", followers: "512", isVerified: false },
    { name: "Laura Martínez", username: "lauramartinez", followers: "498", isVerified: false },
  ]

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
        <Tabs defaultValue="viral" className="w-full">
          <TabsList className="w-full bg-zinc-900 border-b border-zinc-800 rounded-none h-12">
            <TabsTrigger value="viral" className="flex-1 data-[state=active]:bg-black data-[state=active]:text-white">
              <Flame className="h-4 w-4 mr-2" />
              Viral
            </TabsTrigger>
            <TabsTrigger
              value="trending"
              className="flex-1 data-[state=active]:bg-black data-[state=active]:text-white"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Tendencias
            </TabsTrigger>
            <TabsTrigger
              value="categories"
              className="flex-1 data-[state=active]:bg-black data-[state=active]:text-white"
            >
              <Hash className="h-4 w-4 mr-2" />
              Categorías
            </TabsTrigger>
            <TabsTrigger value="users" className="flex-1 data-[state=active]:bg-black data-[state=active]:text-white">
              <Users className="h-4 w-4 mr-2" />
              Usuarios
            </TabsTrigger>
          </TabsList>

          {/* Viral Tab */}
          <TabsContent value="viral" className="p-4 space-y-6">
            {/* Contenido Mega Viral */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold flex items-center">
                  <Flame className="h-5 w-5 mr-2 text-red-500 animate-bounce" />
                  Contenido Mega Viral
                </h2>
                <Button variant="link" className="text-purple-400 p-0">
                  Ver todos
                </Button>
              </div>

              <div className="space-y-4">
                {viralResponses.map((item) => (
                  <div key={item.id} className="flex gap-3 p-3 bg-zinc-900 rounded-lg border border-zinc-800 relative">
                    <div className="absolute top-2 right-2">
                      <ViralBadge isViral={item.isViral} viralScore={item.viralScore} size="sm" />
                    </div>
                    <div className="h-20 w-20 bg-zinc-800 rounded-md overflow-hidden relative">
                      <Image
                        src={`/placeholder.svg?height=80&width=80`}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src="/placeholder.svg?height=24&width=24" alt={item.username} />
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <p className="text-sm font-medium">{item.username}</p>
                      </div>
                      <p className="text-sm mt-1 font-bold">{item.title}</p>
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
                          <span className="text-xs font-bold">{item.likes.toLocaleString()}</span>
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
                          <span className="text-xs">{item.comments}</span>
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
                            className="text-purple-400"
                          >
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                          <span className="text-xs font-bold text-purple-400">{item.views.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Retos Virales */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-purple-500" />
                  Retos Virales
                </h2>
                <Button variant="link" className="text-purple-400 p-0">
                  Ver todos
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {viralChallenges.map((reto, index) => (
                  <Link href={`/reto/${index + 1}`} key={index} className="block">
                    <div className="rounded-lg overflow-hidden bg-zinc-900 border border-zinc-800 relative">
                      {reto.isViral && (
                        <div className="absolute top-2 left-2 z-10">
                          <ViralBadge isViral={reto.isViral} viralScore={reto.viralScore} size="sm" />
                        </div>
                      )}
                      <div className="aspect-square relative">
                        <Image src={reto.image || "/placeholder.svg"} alt={reto.title} fill className="object-cover" />
                      </div>
                      <div className="p-3">
                        <h3 className="font-medium text-sm line-clamp-1">{reto.title}</h3>
                        <p className="text-xs text-zinc-400 mt-1">
                          {reto.participants} participantes
                          {reto.isViral && <span className="text-red-400 ml-1">🔥</span>}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Tendencias Tab */}
          <TabsContent value="trending" className="p-4 space-y-6">
            {/* Hashtags Populares */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold flex items-center">
                  <Hash className="h-5 w-5 mr-2 text-purple-500" />
                  Hashtags Populares
                </h2>
              </div>

              <div className="flex flex-wrap gap-2">
                {trendingHashtags.map((hashtag, index) => (
                  <Badge
                    key={index}
                    className={`
                      ${
                        hashtag.isViral
                          ? "bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
                          : "bg-zinc-800 hover:bg-zinc-700"
                      } 
                      text-white border-none py-1.5 px-3 cursor-pointer
                    `}
                  >
                    #{hashtag.name}
                    <span className="text-zinc-300 ml-1">{hashtag.count}</span>
                    {hashtag.isViral && <Flame className="h-3 w-3 ml-1" />}
                  </Badge>
                ))}
              </div>
            </div>

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
                {viralChallenges.map((reto, index) => (
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
          </TabsContent>

          {/* Categorías Tab */}
          <TabsContent value="categories" className="p-4">
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: "Creatividad", icon: "🎨", color: "from-purple-500 to-pink-500" },
                { name: "Fitness", icon: "💪", color: "from-green-500 to-emerald-500" },
                { name: "Música", icon: "🎵", color: "from-blue-500 to-indigo-500" },
                { name: "Comida", icon: "🍕", color: "from-red-500 to-rose-500" },
                { name: "Aprendizaje", icon: "📚", color: "from-cyan-500 to-blue-500" },
                { name: "Social", icon: "👥", color: "from-pink-500 to-rose-500" },
                { name: "Viajes", icon: "✈️", color: "from-teal-500 to-green-500" },
                { name: "Tecnología", icon: "💻", color: "from-violet-500 to-purple-500" },
              ].map((category, index) => (
                <div
                  key={index}
                  className={`rounded-lg overflow-hidden bg-gradient-to-br ${category.color} p-6 flex flex-col items-center justify-center aspect-square cursor-pointer hover:scale-105 transition-transform`}
                >
                  <span className="text-4xl mb-2">{category.icon}</span>
                  <h3 className="font-bold text-white text-center">{category.name}</h3>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Usuarios Tab */}
          <TabsContent value="users" className="p-4">
            <div className="space-y-4">
              {trendingUsers.map((user, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 border-2 border-purple-500">
                      <AvatarImage src={`/placeholder.svg?height=48&width=48`} alt={`@${user.username}`} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{user.name}</p>
                        {user.isVerified && (
                          <svg className="h-4 w-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
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
