"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, TrendingUp, Crown, Trophy, Star, Flame, Calendar } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ViralBadge } from "@/components/viral-badge"
import { AchievementBadge } from "@/components/achievement-badge"
import { getAllMedia, type MediaItem } from "@/lib/media-service"
import { Skeleton } from "@/components/ui/skeleton"

export default function TrendingPage() {
  const [activeTab, setActiveTab] = useState("today")
  const [media, setMedia] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)

  // Mock leaderboard data
  const weeklyLeaderboard = [
    {
      id: "1",
      username: "@viral_creator",
      name: "Viral Creator",
      points: 15420,
      photoURL: "/placeholder.svg?height=50&width=50",
      badge: "diamond" as const,
      growth: "+234%",
    },
    {
      id: "2",
      username: "@challenge_master",
      name: "Challenge Master",
      points: 12890,
      photoURL: "/placeholder.svg?height=50&width=50",
      badge: "platinum" as const,
      growth: "+189%",
    },
    {
      id: "3",
      username: "@trend_setter",
      name: "Trend Setter",
      points: 10340,
      photoURL: "/placeholder.svg?height=50&width=50",
      badge: "gold" as const,
      growth: "+156%",
    },
    {
      id: "4",
      username: "@creative_soul",
      name: "Creative Soul",
      points: 8750,
      photoURL: "/placeholder.svg?height=50&width=50",
      badge: "silver" as const,
      growth: "+123%",
    },
    {
      id: "5",
      username: "@rising_star",
      name: "Rising Star",
      points: 6420,
      photoURL: "/placeholder.svg?height=50&width=50",
      badge: "bronze" as const,
      growth: "+98%",
    },
  ]

  const trendingChallenges = [
    {
      id: "1",
      title: "#DanceViralChallenge",
      description: "El reto de baile más viral de la semana",
      participants: 45230,
      views: 2340000,
      category: "Baile",
      difficulty: "Fácil",
      reward: "500 XP",
    },
    {
      id: "2",
      title: "#CreatividadExtrema",
      description: "Demuestra tu lado más creativo",
      participants: 32100,
      views: 1890000,
      category: "Arte",
      difficulty: "Medio",
      reward: "750 XP",
    },
    {
      id: "3",
      title: "#TalentShowcase",
      description: "Muestra tu talento único",
      participants: 28900,
      views: 1560000,
      category: "Talento",
      difficulty: "Difícil",
      reward: "1000 XP",
    },
  ]

  useEffect(() => {
    async function fetchTrendingMedia() {
      try {
        setLoading(true)
        const allMedia = await getAllMedia()

        // Sort by engagement and recency for trending
        const trendingMedia = allMedia
          .map((item) => ({
            ...item,
            trendingScore: calculateTrendingScore(item),
          }))
          .sort((a, b) => b.trendingScore - a.trendingScore)
          .slice(0, 20)

        setMedia(trendingMedia)
      } catch (error) {
        console.error("Error fetching trending media:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTrendingMedia()
  }, [])

  const calculateTrendingScore = (item: MediaItem) => {
    const ageInHours = (Date.now() - item.createdAt.toMillis()) / (1000 * 60 * 60)
    const engagementRate = (item.likes + item.comments * 2 + item.shares * 3) / Math.max(item.views, 1)

    // Boost recent content
    const recencyBoost = ageInHours < 24 ? 2 : ageInHours < 48 ? 1.5 : 1

    return engagementRate * recencyBoost * 1000
  }

  const getFilteredMedia = () => {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const thisWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
    const thisMonth = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)

    switch (activeTab) {
      case "today":
        return media.filter((item) => item.createdAt.toDate() >= today)
      case "week":
        return media.filter((item) => item.createdAt.toDate() >= thisWeek)
      case "month":
        return media.filter((item) => item.createdAt.toDate() >= thisMonth)
      case "challenges":
        return media.filter((item) => item.challengeId)
      default:
        return media
    }
  }

  const filteredMedia = getFilteredMedia()

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
          <h1 className="text-lg font-semibold flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-purple-500" />
            Tendencias
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-16 pb-20">
        <div className="p-4">
          {/* Weekly Leaderboard */}
          <Card className="mb-6 bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Crown className="h-5 w-5 text-yellow-500" />
                Ranking Semanal
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {weeklyLeaderboard.slice(0, 3).map((user, index) => (
                <div key={user.id} className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold">
                    {index + 1}
                  </div>
                  <Avatar className="h-12 w-12 border-2 border-purple-500">
                    <AvatarImage src={user.photoURL || "/placeholder.svg"} alt={user.username} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-white">{user.name}</h3>
                      <AchievementBadge type={user.badge} achievement="Top Creator" unlocked />
                    </div>
                    <p className="text-sm text-zinc-400">{user.username}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className="text-xs bg-purple-600">{user.points.toLocaleString()} pts</Badge>
                      <Badge className="text-xs bg-green-600">{user.growth}</Badge>
                    </div>
                  </div>
                  {index === 0 && <Crown className="h-6 w-6 text-yellow-500" />}
                  {index === 1 && <Trophy className="h-6 w-6 text-gray-400" />}
                  {index === 2 && <Star className="h-6 w-6 text-amber-600" />}
                </div>
              ))}

              <Link href="/gamification">
                <Button
                  variant="outline"
                  className="w-full mt-4 border-purple-600 text-purple-400 hover:bg-purple-600/20 bg-transparent"
                >
                  Ver Ranking Completo
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Trending Challenges */}
          <Card className="mb-6 bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Flame className="h-5 w-5 text-red-500" />
                Retos Virales
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {trendingChallenges.map((challenge, index) => (
                <div key={challenge.id} className="p-4 rounded-lg bg-zinc-800 border border-zinc-700">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-white">{challenge.title}</h3>
                        <ViralBadge type="viral" />
                      </div>
                      <p className="text-sm text-zinc-300 mb-2">{challenge.description}</p>
                      <div className="flex items-center gap-4 text-xs text-zinc-400">
                        <span>{challenge.participants.toLocaleString()} participantes</span>
                        <span>{challenge.views.toLocaleString()} views</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-purple-600 text-white">{challenge.category}</Badge>
                      <Badge variant="outline" className="border-zinc-600 text-zinc-300">
                        {challenge.difficulty}
                      </Badge>
                      <Badge className="bg-green-600 text-white">{challenge.reward}</Badge>
                    </div>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      Participar
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Trending Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full bg-zinc-900 mb-6">
              <TabsTrigger value="today" className="flex-1 data-[state=active]:bg-purple-600">
                <Calendar className="h-4 w-4 mr-2" />
                Hoy
              </TabsTrigger>
              <TabsTrigger value="week" className="flex-1 data-[state=active]:bg-purple-600">
                <TrendingUp className="h-4 w-4 mr-2" />
                Semana
              </TabsTrigger>
              <TabsTrigger value="month" className="flex-1 data-[state=active]:bg-purple-600">
                <Star className="h-4 w-4 mr-2" />
                Mes
              </TabsTrigger>
              <TabsTrigger value="challenges" className="flex-1 data-[state=active]:bg-purple-600">
                <Trophy className="h-4 w-4 mr-2" />
                Retos
              </TabsTrigger>
            </TabsList>

            <TabsContent value="today" className="space-y-4">
              <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Trending Hoy</h2>
                <p className="text-sm text-zinc-400">El contenido más popular de las últimas 24 horas</p>
              </div>

              {loading ? (
                <div className="grid grid-cols-2 gap-3">
                  {[1, 2, 3, 4].map((item) => (
                    <Skeleton key={item} className="aspect-[3/4] bg-zinc-800 rounded-lg" />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {filteredMedia.slice(0, 8).map((item, index) => (
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
                            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xs">
                              {index + 1}
                            </div>
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

            <TabsContent value="week" className="space-y-4">
              <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Top de la Semana</h2>
                <p className="text-sm text-zinc-400">Los retos más populares de los últimos 7 días</p>
              </div>

              {loading ? (
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <Skeleton key={item} className="h-20 bg-zinc-800 rounded-lg" />
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredMedia.slice(0, 10).map((item, index) => (
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
                                <span className="text-xs text-zinc-500">{item.comments} comentarios</span>
                              </div>
                            </div>
                            {index < 3 && <ViralBadge type="trending" />}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="month" className="space-y-4">
              <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Éxitos del Mes</h2>
                <p className="text-sm text-zinc-400">El contenido más exitoso de los últimos 30 días</p>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 gap-3">
                  {[1, 2, 3].map((item) => (
                    <Skeleton key={item} className="h-32 bg-zinc-800 rounded-lg" />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredMedia.slice(0, 5).map((item, index) => (
                    <Link href={`/media/${item.id}`} key={item.id}>
                      <Card className="bg-zinc-900 border-zinc-800 hover:bg-zinc-800 transition-colors">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold">
                              {index + 1}
                            </div>
                            <div className="w-20 h-20 relative rounded-lg overflow-hidden">
                              <Image
                                src={item.type === "image" ? item.mediaUrl : item.thumbnailUrl || "/placeholder.svg"}
                                alt={item.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-medium text-white">{item.title}</h3>
                                {index === 0 && <ViralBadge type="viral" />}
                              </div>
                              <p className="text-sm text-zinc-400 mb-2">@{item.username}</p>
                              <div className="flex items-center gap-6">
                                <div className="flex items-center gap-1">
                                  <span className="text-sm font-medium text-white">{item.likes.toLocaleString()}</span>
                                  <span className="text-xs text-zinc-500">likes</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <span className="text-sm font-medium text-white">{item.views.toLocaleString()}</span>
                                  <span className="text-xs text-zinc-500">views</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <span className="text-sm font-medium text-white">{item.comments}</span>
                                  <span className="text-xs text-zinc-500">comentarios</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="challenges" className="space-y-4">
              <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Retos Populares</h2>
                <p className="text-sm text-zinc-400">Los retos con más participación</p>
              </div>

              {loading ? (
                <div className="grid grid-cols-2 gap-3">
                  {[1, 2, 3, 4].map((item) => (
                    <Skeleton key={item} className="aspect-[3/4] bg-zinc-800 rounded-lg" />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {filteredMedia
                    .filter((item) => item.challengeId)
                    .slice(0, 6)
                    .map((item) => (
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
                              <ViralBadge type="featured" />
                            </div>
                            <div className="absolute bottom-2 right-2 flex gap-1">
                              <Badge className="text-xs bg-black/60 backdrop-blur-sm">{item.likes}</Badge>
                            </div>
                          </div>
                          <CardContent className="p-3">
                            <h3 className="font-medium text-sm line-clamp-2 text-white">{item.title}</h3>
                            <p className="text-xs text-zinc-400 mt-1">@{item.username}</p>
                            {item.challengeTitle && (
                              <p className="text-xs text-purple-400 mt-1">Reto: {item.challengeTitle}</p>
                            )}
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
