"use client"

import {
  Heart,
  MessageCircle,
  Plus,
  Search,
  Share2,
  ChevronUp,
  Music,
  Bookmark,
  Eye,
  TrendingUp,
  Home,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { AppIcon } from "@/components/app-icon"
import { ViralBadge } from "@/components/viral-badge"
import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { getTrendingMedia, getViralContent, type MediaItem } from "@/lib/media-service"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const { user, isConfigured } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"challenge" | "feed">("challenge")
  const [feedMedia, setFeedMedia] = useState<MediaItem[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchFeedContent() {
      try {
        setLoading(true)

        if (activeTab === "feed") {
          // Prioritize viral content in feed
          const viralContent = await getViralContent(6)
          const trendingContent = await getTrendingMedia("views", 4)

          // Mix viral and trending content
          const mixedContent = [...viralContent, ...trendingContent]
          const uniqueContent = mixedContent.filter(
            (item, index, self) => index === self.findIndex((t) => t.id === item.id),
          )

          setFeedMedia(uniqueContent.slice(0, 10))
        } else {
          // For challenge tab, still show some viral content mixed with trending
          const media = await getTrendingMedia("views", 10)
          setFeedMedia(media)
        }
      } catch (error) {
        console.error("Error fetching feed content:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeedContent()
  }, [activeTab])

  const currentMedia = feedMedia[currentIndex]

  const handleSwipeUp = () => {
    if (feedMedia.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % feedMedia.length)
    }
  }

  const handleCreateClick = () => {
    if (!isConfigured) {
      router.push("/env-setup")
    } else if (!user) {
      router.push("/auth/login")
    } else {
      router.push("/create")
    }
  }

  const handleProfileClick = () => {
    if (!isConfigured) {
      router.push("/env-setup")
    } else if (!user) {
      router.push("/auth/login")
    } else {
      router.push("/profile")
    }
  }

  const handleShare = async () => {
    if (navigator.share && currentMedia) {
      try {
        await navigator.share({
          title: currentMedia.title,
          text: currentMedia.description,
          url: window.location.href,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      // Fallback: copy to clipboard
      if (currentMedia) {
        navigator.clipboard.writeText(`${currentMedia.title} - ${window.location.href}`)
      }
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-transparent">
        <div className="flex items-center gap-2">
          <AppIcon size={32} />
          <p className="text-sm font-medium">Desafía tu rutina. Reta tu mundo.</p>
        </div>
        <div className="flex items-center gap-3">
          {!isConfigured && (
            <Link href="/env-setup">
              <Button
                variant="ghost"
                size="sm"
                className="text-amber-400 bg-amber-400/10 backdrop-blur-md rounded-full"
              >
                Configurar
              </Button>
            </Link>
          )}
          <Link href="/explorar">
            <Button variant="ghost" size="icon" className="text-white bg-black/30 backdrop-blur-md rounded-full">
              <Search className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Firebase Configuration Warning */}
      {!isConfigured && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-amber-900/20 border-b border-amber-900 p-3">
          <div className="text-center">
            <p className="text-amber-300 text-sm">
              ⚠️ Modo Demo - Firebase no configurado.{" "}
              <Link href="/env-setup" className="underline hover:text-amber-200">
                Configurar ahora
              </Link>
            </p>
          </div>
        </div>
      )}

      {/* Tab Selector */}
      <div className={`fixed ${!isConfigured ? "top-28" : "top-16"} left-0 right-0 z-50 flex justify-center`}>
        <div className="flex bg-black/40 backdrop-blur-md rounded-full p-1">
          <button
            onClick={() => setActiveTab("challenge")}
            className={`px-4 py-1.5 rounded-full text-sm font-medium ${
              activeTab === "challenge" ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white" : "text-zinc-400"
            }`}
          >
            Reto Diario
          </button>
          <button
            onClick={() => setActiveTab("feed")}
            className={`px-4 py-1.5 rounded-full text-sm font-medium ${
              activeTab === "feed" ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white" : "text-zinc-400"
            }`}
          >
            Feed Viral
          </button>
        </div>
      </div>

      {/* Main Content - TikTok Style */}
      <main className="flex-1 relative" onClick={handleSwipeUp}>
        {/* Full Screen Video Background */}
        <div className="absolute inset-0 bg-zinc-900">
          {loading || feedMedia.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="animate-spin-slow mb-4">
                  <AppIcon size={64} />
                </div>
                <p className="text-zinc-400">
                  {!isConfigured
                    ? "Modo Demo - Configurar Firebase para contenido real"
                    : "Cargando contenido viral..."}
                </p>
              </div>
            </div>
          ) : (
            <div className="relative h-full w-full">
              {currentMedia.type === "image" ? (
                <Image
                  src={currentMedia.mediaUrl || "/placeholder.svg"}
                  alt={currentMedia.title}
                  fill
                  className="object-cover"
                  priority
                />
              ) : currentMedia.type === "video" ? (
                <div className="relative h-full w-full">
                  <Image
                    src={currentMedia.mediaUrl || "/placeholder.svg"}
                    alt={currentMedia.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black/60 rounded-full p-4">
                      <svg
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-white"
                      >
                        <polygon points="5,3 19,12 5,21" fill="currentColor" />
                      </svg>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full bg-gradient-to-b from-purple-900/20 to-black">
                  <div className="text-center">
                    <Music className="h-16 w-16 text-purple-400 mx-auto mb-4" />
                    <p className="text-xl font-bold">{currentMedia.title}</p>
                    <div className="mt-4 bg-zinc-800 rounded-lg p-4">
                      <p className="text-sm text-zinc-400">Audio no disponible en modo demo</p>
                    </div>
                  </div>
                </div>
              )}
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
            </div>
          )}
        </div>

        {/* Viral Badge - Top Right */}
        {currentMedia && (currentMedia.isViral || (currentMedia.viralScore && currentMedia.viralScore > 70)) && (
          <div className="absolute top-4 right-4 z-10">
            <ViralBadge
              isViral={currentMedia.isViral}
              viralScore={currentMedia.viralScore}
              size="lg"
              showScore={true}
            />
          </div>
        )}

        {/* TikTok-style Right Side Controls */}
        <div className="absolute right-4 bottom-32 z-10 flex flex-col items-center gap-6">
          <div className="flex flex-col items-center" onClick={handleProfileClick}>
            <Avatar className="h-12 w-12 border-2 border-white cursor-pointer">
              <AvatarImage
                src={user?.photoURL || "/placeholder.svg?height=48&width=48"}
                alt={user?.displayName || "@user"}
              />
              <AvatarFallback>{user?.displayName?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <div className="mt-1 bg-purple-600 rounded-full h-5 w-5 flex items-center justify-center absolute -bottom-1">
              <Plus className="h-3 w-3 text-white" />
            </div>
          </div>

          <div className="flex flex-col items-center">
            <Button variant="ghost" size="icon" className="rounded-full bg-black/40 backdrop-blur-md h-12 w-12">
              <Heart className="h-7 w-7" />
            </Button>
            <span className="text-xs mt-1">{currentMedia?.likes || 0}</span>
          </div>

          <div className="flex flex-col items-center">
            <Link href={currentMedia ? `/media/${currentMedia.id}` : "#"}>
              <Button variant="ghost" size="icon" className="rounded-full bg-black/40 backdrop-blur-md h-12 w-12">
                <MessageCircle className="h-7 w-7" />
              </Button>
            </Link>
            <span className="text-xs mt-1">{currentMedia?.comments || 0}</span>
          </div>

          <div className="flex flex-col items-center">
            <Button variant="ghost" size="icon" className="rounded-full bg-black/40 backdrop-blur-md h-12 w-12">
              <Eye className="h-7 w-7" />
            </Button>
            <span className="text-xs mt-1">{currentMedia?.views || 0}</span>
          </div>

          <div className="flex flex-col items-center">
            <Button variant="ghost" size="icon" className="rounded-full bg-black/40 backdrop-blur-md h-12 w-12">
              <Bookmark className="h-7 w-7" />
            </Button>
            <span className="text-xs mt-1">Guardar</span>
          </div>

          <div className="flex flex-col items-center">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-black/40 backdrop-blur-md h-12 w-12"
              onClick={handleShare}
            >
              <Share2 className="h-7 w-7" />
            </Button>
            <span className="text-xs mt-1">Compartir</span>
          </div>
        </div>

        {/* Bottom Content Info */}
        <div className="absolute bottom-0 left-0 right-16 p-4 z-10">
          {activeTab === "challenge" ? (
            <div>
              <Badge className="mb-2 bg-purple-500/20 text-purple-300 hover:bg-purple-500/30">RETO DEL DÍA</Badge>
              <h2 className="text-xl font-bold mb-2">Crea un video bailando con tu canción favorita de los 90s</h2>
              <div className="flex items-center gap-2 mb-3">
                <Avatar className="h-8 w-8 border-2 border-purple-500">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@challz" />
                  <AvatarFallback>CH</AvatarFallback>
                </Avatar>
                <p className="font-medium">@challz</p>
                <Button
                  size="sm"
                  variant="secondary"
                  className="ml-2 text-xs bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Seguir
                </Button>
              </div>
              <p className="text-sm text-zinc-300 mb-3">
                Muestra tus mejores pasos de baile con una canción nostálgica. ¡Sorprende a todos con tu creatividad!
              </p>
              <div className="flex items-center gap-2 mb-3">
                <Music className="h-4 w-4 text-zinc-400" />
                <p className="text-sm text-zinc-400">Música de los 90s - Challz Mix</p>
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={handleCreateClick}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  {!isConfigured ? "Configurar Firebase" : "Aceptar Reto"}
                </Button>
                <Link href="/reto/1">
                  <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 bg-transparent">
                    Ver Respuestas
                  </Button>
                </Link>
              </div>
              <div className="mt-3 flex items-center gap-2 text-xs text-zinc-500">
                <span>Quedan 14 horas</span>
                <span className="w-1 h-1 rounded-full bg-zinc-500"></span>
                <span>238 participantes</span>
              </div>
            </div>
          ) : (
            <div>
              {currentMedia && (
                <>
                  <div className="flex items-center gap-2 mb-2">
                    <Avatar className="h-8 w-8 border-2 border-purple-500">
                      <AvatarImage
                        src={currentMedia.userPhotoURL || "/placeholder.svg?height=32&width=32"}
                        alt={currentMedia.username}
                      />
                      <AvatarFallback>{currentMedia.username.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <p className="font-medium">{currentMedia.username}</p>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="ml-auto text-xs bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      Seguir
                    </Button>
                  </div>
                  <p className="text-sm mb-2">{currentMedia.description || currentMedia.title}</p>
                  {currentMedia.hashtags && currentMedia.hashtags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {currentMedia.hashtags.map((tag, index) => (
                        <Badge key={index} className="bg-zinc-800 hover:bg-zinc-700 text-white border-none text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                  {/* Viral Stats */}
                  {currentMedia.isViral && (
                    <div className="flex items-center gap-4 text-xs text-zinc-400 mt-2">
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {currentMedia.views.toLocaleString()} vistas
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        {currentMedia.likes.toLocaleString()} likes
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="h-3 w-3" />
                        {currentMedia.comments} comentarios
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        {/* Swipe Up Indicator */}
        <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center animate-bounce">
          <p className="text-xs text-zinc-400 mb-1">
            {activeTab === "feed" ? "Siguiente viral" : "Desliza hacia arriba"}
          </p>
          <ChevronUp className="h-4 w-4 text-zinc-400" />
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-t border-zinc-800">
        <div className="flex items-center justify-around p-3">
          <div className="flex flex-col items-center gap-1 py-2">
            <Home className="h-6 w-6 text-white" />
            <span className="text-xs text-white">Inicio</span>
          </div>

          <Link href="/trending" className="flex flex-col items-center gap-1 py-2">
            <TrendingUp className="h-5 w-5 text-zinc-500" />
            <span className="text-xs text-zinc-500">Tendencias</span>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-full h-14 w-14 flex items-center justify-center shadow-lg"
            onClick={handleCreateClick}
          >
            <Plus className="h-7 w-7" />
          </Button>

          <div className="flex flex-col items-center gap-1 py-2 cursor-pointer" onClick={handleProfileClick}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-zinc-500"
              />
              <path
                d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-zinc-500"
              />
            </svg>
            <span className="text-xs text-zinc-500">Perfil</span>
          </div>

          <Link href="/alertas" className="flex flex-col items-center gap-1 py-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-zinc-500"
              />
              <path
                d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-zinc-500"
              />
            </svg>
            <span className="text-xs text-zinc-500">Alertas</span>
          </Link>
        </div>
      </nav>
    </div>
  )
}
