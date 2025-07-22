"use client"

import { useEffect, useState } from "react"
import { ArrowLeft, TrendingUp, Heart, MessageCircle, Eye } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getTrendingMedia, type MediaItem } from "@/lib/media-service"
import { Skeleton } from "@/components/ui/skeleton"

export default function TrendingPage() {
  const [viewsMedia, setViewsMedia] = useState<MediaItem[]>([])
  const [likesMedia, setLikesMedia] = useState<MediaItem[]>([])
  const [commentsMedia, setCommentsMedia] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTrendingMedia() {
      try {
        setLoading(true)
        const [byViews, byLikes, byComments] = await Promise.all([
          getTrendingMedia("views"),
          getTrendingMedia("likes"),
          getTrendingMedia("comments"),
        ])

        setViewsMedia(byViews)
        setLikesMedia(byLikes)
        setCommentsMedia(byComments)
      } catch (error) {
        console.error("Error fetching trending media:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTrendingMedia()
  }, [])

  const renderMediaList = (mediaList: MediaItem[]) => {
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
        {mediaList.map((item) => (
          <Link href={`/media/${item.id}`} key={item.id}>
            <div className="flex gap-3 p-3 bg-zinc-900 rounded-lg border border-zinc-800 hover:bg-zinc-800/50 transition-colors">
              <div className="h-20 w-20 bg-zinc-800 rounded-md overflow-hidden relative">
                <Image
                  src={
                    item.type === "image" ? item.mediaUrl : item.thumbnailUrl || `/placeholder.svg?height=80&width=80`
                  }
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={item.userPhotoURL || "/placeholder.svg?height=24&width=24"} alt={item.username} />
                    <AvatarFallback>{item.username.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <p className="text-sm font-medium">{item.username}</p>
                </div>
                <p className="text-sm mt-1">{item.title}</p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1">
                    <Heart className="h-3 w-3 text-red-400" />
                    <span className="text-xs">{item.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-3 w-3 text-zinc-400" />
                    <span className="text-xs">{item.comments}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-3 w-3 text-zinc-400" />
                    <span className="text-xs">{item.views}</span>
                  </div>
                </div>
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
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-16 pb-20">
        <Tabs defaultValue="views" className="w-full">
          <TabsList className="w-full bg-zinc-900 border-b border-zinc-800 rounded-none h-12">
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

          <TabsContent value="views" className="p-4">
            {renderMediaList(viewsMedia)}
          </TabsContent>

          <TabsContent value="likes" className="p-4">
            {renderMediaList(likesMedia)}
          </TabsContent>

          <TabsContent value="comments" className="p-4">
            {renderMediaList(commentsMedia)}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
