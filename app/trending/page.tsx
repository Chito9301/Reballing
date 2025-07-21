"use client"

import { useEffect, useState } from "react"
import { ArrowLeft, TrendingUp, Heart, MessageCircle, Eye, Flame, Filter } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getTrendingMedia, getViralContent, type MediaItem } from "@/lib/media-service"
import { Skeleton } from "@/components/ui/skeleton"
import { ViralBadge } from "@/components/viral-badge"
import { Badge } from "@/components/ui/badge"

export default function TrendingPage() {
  const [viewsMedia, setViewsMedia] = useState<MediaItem[]>([])
  const [likesMedia, setLikesMedia] = useState<MediaItem[]>([])
  const [commentsMedia, setCommentsMedia] = useState<MediaItem[]>([])
  const [viralMedia, setViralMedia] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTrendingMedia() {
      try {
        setLoading(true)
        const [byViews, byLikes, byComments, viral] = await Promise.all([
          getTrendingMedia("views"),
          getTrendingMedia("likes"),
          getTrendingMedia("comments"),
          getViralContent(15),
        ])

        setViewsMedia(byViews)
        setLikesMedia(byLikes)
        setCommentsMedia(byComments)
        setViralMedia(viral)
      } catch (error) {
        console.error("Error fetching trending media:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTrendingMedia()
  }, [])

  const renderMediaList = (mediaList: MediaItem[], showViralBadge = false) => {
    if (loading) {
      return (
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="flex gap-3 p-3 bg-zinc-900 rounded-lg border border-zinc-800">
              <Skeleton className="h-20 w-20 rounded-md bg-zinc-800" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-6 w-6 rounded-full bg-zinc-800" />
                  <Skeleton className="h-4 w-24 bg-zinc-800" />
                </div>
                <Skeleton className="h-4 w-48 mt-2 bg-zinc-800" />
                <div className="flex items-center gap-4 mt-2">
                  <Skeleton className="h-4 w-16 bg-zinc-800" />
                  <Skeleton className="h-4 w-16 bg-zinc-800" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )
    }

    if (mediaList.length === 0) {
      return (
        <div className="text-center py-8">
          <p className="text-zinc-400">No hay contenido disponible en este momento.</p>
        </div>
      )
    }

    return (
      <div className="space-y-4">
        {mediaList.map((item, index) => (
          <Link href={`/media/${item.id}`} key={item.id}>
            <div className="flex gap-3 p-3 bg-zinc-900 rounded-lg border border-zinc-800 hover:bg-zinc-800/50 transition-colors relative">
              {/* Ranking Badge */}
              <div className="absolute top-2 left-2 z-10">
                <Badge
                  className={`
                  ${
                    index === 0
                      ? "bg-gradient-to-r from-yellow-600 to-orange-600"
                      : index === 1
                        ? "bg-gradient-to-r from-gray-400 to-gray-600"
                        : index === 2
                          ? "bg-gradient-to-r from-amber-600 to-yellow-600"
                          : "bg-zinc-700"
                  } 
                  text-white text-xs px-2 py-1
                `}
                >
                  #{index + 1}
                </Badge>
              </div>

              {/* Viral Badge */}
              {showViralBadge && (item.isViral || (item.viralScore && item.viralScore > 70)) && (
                <div className="absolute top-2 right-2 z-10">
                  <ViralBadge isViral={item.isViral} viralScore={item.viralScore} size="sm" />
                </div>
              )}

              <div className="h-20 w-20 bg-zinc-800 rounded-md overflow-hidden relative">
                <Image
                  src={
                    item.type === "image" ? item.mediaUrl : item.thumbnailUrl || `/placeholder.svg?height=80&width=80`
                  }
                  alt={item.title}
                  fill
                  className="object-cover"
                />
                {/* Media Type Indicator */}
                <div className="absolute bottom-1 left-1">
                  <Badge className="text-xs py-0 px-1 bg-black/60 text-white">
                    {item.type === "video" ? "📹" : item.type === "image" ? "📷" : "🎵"}
                  </Badge>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={item.userPhotoURL || "/placeholder.svg?height=24&width=24"} alt={item.username} />
                    <AvatarFallback>{item.username.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <p className="text-sm font-medium">{item.username}</p>
                </div>
                <p className="text-sm mt-1 line-clamp-2">{item.title}</p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1">
                    <Heart className="h-3 w-3 text-red-400" />
                    <span className="text-xs font-medium">{item.likes.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-3 w-3 text-zinc-400" />
                    <span className="text-xs">{item.comments}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-3 w-3 text-purple-400" />
                    <span className="text-xs font-medium text-purple-400">{item.views.toLocaleString()}</span>
                  </div>
                </div>
                {/* Hashtags */}
                {item.hashtags && item.hashtags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {item.hashtags.slice(0, 3).map((tag, tagIndex) => (
                      <Badge key={tagIndex} className="text-xs bg-zinc-800 text-zinc-300 border-none">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    )
  }

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
          <h1 className="text-lg font-semibold flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-purple-500" />
            Tendencias
          </h1>
        </div>
        <Button variant="ghost" size="icon" className="text-zinc-400">
          <Filter className="h-5 w-5" />
        </Button>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-16 pb-20">
        <Tabs defaultValue="viral" className="w-full">
          <TabsList className="w-full bg-zinc-900 border-b border-zinc-800 rounded-none h-12">
            <TabsTrigger value="viral" className="flex-1 data-[state=active]:bg-black data-[state=active]:text-white">
              <Flame className="h-4 w-4 mr-2" />
              Viral
            </TabsTrigger>
            <TabsTrigger value="views" className="flex-1 data-[state=active]:bg-black data-[state=active]:text-white">
              <Eye className="h-4 w-4 mr-2" />
              Más Vistos
            </TabsTrigger>
            <TabsTrigger value="likes" className="flex-1 data-[state=active]:bg-black data-[state=active]:text-white">
              <Heart className="h-4 w-4 mr-2" />
              Más Likes
            </TabsTrigger>
            <TabsTrigger
              value="comments"
              className="flex-1 data-[state=active]:bg-black data-[state=active]:text-white"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Comentados
            </TabsTrigger>
          </TabsList>

          <TabsContent value="viral" className="p-4">
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Flame className="h-5 w-5 text-red-500 animate-bounce" />
                <h2 className="text-lg font-bold">Contenido Viral</h2>
              </div>
              <p className="text-sm text-zinc-400">Los retos y respuestas que están causando sensación en Challz</p>
            </div>
            {renderMediaList(viralMedia, true)}
          </TabsContent>

          <TabsContent value="views" className="p-4">
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="h-5 w-5 text-purple-500" />
                <h2 className="text-lg font-bold">Más Vistos</h2>
              </div>
              <p className="text-sm text-zinc-400">El contenido que más personas están viendo ahora mismo</p>
            </div>
            {renderMediaList(viewsMedia)}
          </TabsContent>

          <TabsContent value="likes" className="p-4">
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="h-5 w-5 text-red-500" />
                <h2 className="text-lg font-bold">Más Likes</h2>
              </div>
              <p className="text-sm text-zinc-400">Los retos y respuestas que más amor están recibiendo</p>
            </div>
            {renderMediaList(likesMedia)}
          </TabsContent>

          <TabsContent value="comments" className="p-4">
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <MessageCircle className="h-5 w-5 text-blue-500" />
                <h2 className="text-lg font-bold">Más Comentados</h2>
              </div>
              <p className="text-sm text-zinc-400">El contenido que está generando más conversación</p>
            </div>
            {renderMediaList(commentsMedia)}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
