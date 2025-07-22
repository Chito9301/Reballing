"use client"

import { useState, useEffect } from "react"
import { Search, TrendingUp, Hash, Users, Flame, Star, Filter } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ViralBadge } from "@/components/viral-badge"
import { getAllMedia, type MediaItem } from "@/lib/media-service"
import { Skeleton } from "@/components/ui/skeleton"

export default function ExplorePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("viral")
  const [media, setMedia] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)

  // Mock data for trending hashtags and users
  const trendingHashtags = [
    { tag: "#ChallzViral", posts: 15420, growth: "+45%" },
    { tag: "#RetoDelDia", posts: 8930, growth: "+23%" },
    { tag: "#CreatividadTotal", posts: 6750, growth: "+67%" },
    { tag: "#ViralChallenge", posts: 5240, growth: "+12%" },
    { tag: "#TalentShow", posts: 4180, growth: "+89%" },
    { tag: "#DanceChallenge", posts: 3920, growth: "+34%" },
  ]

  const featuredUsers = [
    {
      id: "1",
      username: "@creador_viral",
      name: "Creador Viral",
      followers: 125000,
      verified: true,
      photoURL: "/placeholder.svg?height=60&width=60",
    },
    {
      id: "2",
      username: "@talent_master",
      name: "Talent Master",
      followers: 89000,
      verified: true,
      photoURL: "/placeholder.svg?height=60&width=60",
    },
    {
      id: "3",
      username: "@reto_queen",
      name: "Reto Queen",
      followers: 67000,
      verified: false,
      photoURL: "/placeholder.svg?height=60&width=60",
    },
  ]

  useEffect(() => {
    async function fetchMedia() {
      try {
        setLoading(true)
        const allMedia = await getAllMedia()

        // Calculate viral score for each media item
        const mediaWithScores = allMedia.map((item) => ({
          ...item,
          viralScore: calculateViralScore(item),
        }))

        setMedia(mediaWithScores)
      } catch (error) {
        console.error("Error fetching media:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMedia()
  }, [])

  // Viral score calculation algorithm
  const calculateViralScore = (item: MediaItem) => {
    const ageInHours = (Date.now() - item.createdAt.toMillis()) / (1000 * 60 * 60)
    const engagementRate = (item.likes + item.comments * 2 + item.shares * 3) / Math.max(item.views, 1)
    const timeDecay = Math.exp(-ageInHours / 24) // Decay over 24 hours

    return engagementRate * timeDecay * 1000
  }

  const getFilteredMedia = () => {
    let filtered = media

    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.hashtags?.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    switch (activeTab) {
      case "viral":
        return filtered
          .filter((item) => item.viralScore > 50)
          .sort((a, b) => b.viralScore - a.viralScore)
          .slice(0, 20)
      case "trending":
        return filtered
          .sort((a, b) => {
            const aEngagement = a.likes + a.comments + a.shares
            const bEngagement = b.likes + b.comments + b.shares
            return bEngagement - aEngagement
          })
          .slice(0, 20)
      case "hashtags":
        return filtered.filter((item) => item.hashtags && item.hashtags.length > 0)
      case "users":
        return filtered.sort((a, b) => b.likes - a.likes).slice(0, 10)
      default:
        return filtered
    }
  }

  const filteredMedia = getFilteredMedia()

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-800">
        <div className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-xl font-bold">Explorar</h1>
            <Button variant="ghost" size="icon" className="text-zinc-400">
              <Filter className="h-5 w-5" />
            </Button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 h-4 w-4" />
            <Input
              placeholder="Buscar retos, usuarios, hashtags..."
              className="pl-10 bg-zinc-900 border-zinc-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-32 pb-20">
        <div className="px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full bg-zinc-900 mb-6">
              <TabsTrigger value="viral" className="flex-1 data-[state=active]:bg-purple-600">
                <Flame className="h-4 w-4 mr-2" />
                Viral
              </TabsTrigger>
              <TabsTrigger value="trending" className="flex-1 data-[state=active]:bg-purple-600">
                <TrendingUp className="h-4 w-4 mr-2" />
                Trending
              </TabsTrigger>
              <TabsTrigger value="hashtags" className="flex-1 data-[state=active]:bg-purple-600">
                <Hash className="h-4 w-4 mr-2" />
                Hashtags
              </TabsTrigger>
              <TabsTrigger value="users" className="flex-1 data-[state=active]:bg-purple-600">
                <Users className="h-4 w-4 mr-2" />
                Usuarios
              </TabsTrigger>
            </TabsList>

            <TabsContent value="viral" className="space-y-4">
              <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <Flame className="h-5 w-5 text-red-500" />
                  Contenido Mega-Viral
                </h2>
                <p className="text-sm text-zinc-400">Los retos más populares del momento</p>
              </div>

              {loading ? (
                <div className="grid grid-cols-2 gap-3">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <Skeleton key={item} className="aspect-[3/4] bg-zinc-800 rounded-lg" />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {filteredMedia.map((item) => (
                    <Link href={`/media/${item.id}`} key={item.id}>
                      <Card className="bg-zinc-900 border-zinc-800 overflow-hidden hover:bg-zinc-800 transition-colors">
                        <div className="aspect-[3/4] relative">
                          <Image
                            src={item.type === "image" ? item.mediaUrl : item.thumbnailUrl || "/placeholder.svg"}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute top-2 left-2">
                            <ViralBadge type="viral" />
                          </div>
                          <div className="absolute bottom-2 right-2 flex gap-1">
                            <Badge className="text-xs bg-black/60 backdrop-blur-sm">{item.likes}</Badge>
                          </div>
                        </div>
                        <CardContent className="p-3">
                          <h3 className="font-medium text-sm line-clamp-2 text-white">{item.title}</h3>
                          <p className="text-xs text-zinc-400 mt-1">@{item.username}</p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="trending" className="space-y-4">
              <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-purple-500" />
                  Tendencias Actuales
                </h2>
                <p className="text-sm text-zinc-400">Lo que está ganando popularidad ahora</p>
              </div>

              {loading ? (
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <Skeleton key={item} className="h-20 bg-zinc-800 rounded-lg" />
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredMedia.map((item, index) => (
                    <Link href={`/media/${item.id}`} key={item.id}>
                      <Card className="bg-zinc-900 border-zinc-800 hover:bg-zinc-800 transition-colors">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-sm">
                              {index + 1}
                            </div>
                            <div className="w-16 h-16 relative rounded-lg overflow-hidden">
                              <Image
                                src={item.type === "image" ? item.mediaUrl : item.thumbnailUrl || "/placeholder.svg"}
                                alt={item.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium text-white line-clamp-1">{item.title}</h3>
                              <p className="text-sm text-zinc-400">@{item.username}</p>
                              <div className="flex items-center gap-4 mt-1">
                                <span className="text-xs text-zinc-500">{item.likes} likes</span>
                                <span className="text-xs text-zinc-500">{item.views} views</span>
                              </div>
                            </div>
                            <ViralBadge type="trending" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="hashtags" className="space-y-4">
              <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <Hash className="h-5 w-5 text-pink-500" />
                  Hashtags Populares
                </h2>
                <p className="text-sm text-zinc-400">Los hashtags más usados en Challz</p>
              </div>

              <div className="space-y-3">
                {trendingHashtags.map((hashtag, index) => (
                  <Card key={hashtag.tag} className="bg-zinc-900 border-zinc-800 hover:bg-zinc-800 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-sm">
                            {index + 1}
                          </div>
                          <div>
                            <h3 className="font-medium text-white">{hashtag.tag}</h3>
                            <p className="text-sm text-zinc-400">{hashtag.posts.toLocaleString()} publicaciones</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-green-600 text-white mb-1">{hashtag.growth}</Badge>
                          <p className="text-xs text-zinc-500">crecimiento</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="users" className="space-y-4">
              <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-500" />
                  Creadores Destacados
                </h2>
                <p className="text-sm text-zinc-400">Los usuarios más populares de la semana</p>
              </div>

              <div className="space-y-3">
                {featuredUsers.map((user, index) => (
                  <Card key={user.id} className="bg-zinc-900 border-zinc-800 hover:bg-zinc-800 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-sm">
                            {index + 1}
                          </div>
                          <Avatar className="h-12 w-12 border-2 border-purple-500">
                            <AvatarImage src={user.photoURL || "/placeholder.svg"} alt={user.username} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium text-white">{user.name}</h3>
                              {user.verified && <Star className="h-4 w-4 text-purple-500" />}
                            </div>
                            <p className="text-sm text-zinc-400">{user.username}</p>
                            <p className="text-xs text-zinc-500">{user.followers.toLocaleString()} seguidores</p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                        >
                          Seguir
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* User Media Grid */}
              {filteredMedia.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-4">Contenido Popular de Usuarios</h3>
                  <div className="grid grid-cols-3 gap-1">
                    {filteredMedia.slice(0, 9).map((item) => (
                      <Link href={`/media/${item.id}`} key={item.id}>
                        <div className="aspect-square relative">
                          <Image
                            src={item.type === "image" ? item.mediaUrl : item.thumbnailUrl || "/placeholder.svg"}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute bottom-1 right-1">
                            <Badge className="text-[10px] py-0 h-4 bg-black/60 backdrop-blur-sm">{item.likes}</Badge>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
