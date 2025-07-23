"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

import {
  Heart,
  MessageCircle,
  Plus,
  Search,
  Share2,
  TrendingUp,
  Eye,
  Bookmark,
  MessageSquare,
  ChevronUp,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AppIcon } from "@/components/app-icon"

// Hook simulado, reemplaza con Firebase Auth real cuando puedas
function useAuth() {
  return {
    user: null, // cambia a objeto usuario real o null si no está logueado
    isConfigured: true,
  }
}

const mockTrendingMedia = [
  {
    id: "1",
    title: "Baile de los 90s",
    description: "¡Increíble baile con música de los 90s!",
    type: "video" as const,
    mediaUrl: "/placeholder.svg?height=600&width=400&text=Video+Demo",
    username: "usuario_demo",
    userPhotoURL: "/placeholder.svg?height=40&width=40",
    likes: 245,
    comments: 32,
    views: 1200,
    hashtags: ["#baile", "#90s", "#reto"],
  },
  {
    id: "2",
    title: "Foto artística",
    description: "Mi lugar favorito en la ciudad",
    type: "image" as const,
    mediaUrl: "/placeholder.svg?height=600&width=400&text=Imagen+Demo",
    username: "artista_urbano",
    userPhotoURL: "/placeholder.svg?height=40&width=40",
    likes: 189,
    comments: 28,
    views: 890,
    hashtags: ["#arte", "#ciudad", "#fotografia"],
  },
]

export default function Home() {
  const { user, isConfigured } = useAuth()
  const router = useRouter()
  const [trendingMedia] = useState(mockTrendingMedia)
  const [currentIndex, setCurrentIndex] = useState(0)

  const currentMedia = trendingMedia[currentIndex]

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

  const handleChatClick = () => {
    if (!isConfigured) {
      router.push("/env-setup")
    } else if (!user) {
      router.push("/auth/login")
    } else {
      alert("Función de chat por implementar")
    }
  }

  const handleSwipeUp = () => {
    setCurrentIndex((prev) => (prev + 1) % trendingMedia.length)
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <AppIcon size={32} />
          <p className="text-sm font-medium">Desafía tu rutina. Reta tu mundo.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/explorar">
            <Button variant="ghost" size="icon" className="text-white bg-black/30 backdrop-blur-md rounded-full">
              <Search className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Video Feed */}
      <main className="flex-1 relative pb-20" onClick={handleSwipeUp}>
        <div className="absolute inset-0 bg-zinc-900">
          <Image
            src={currentMedia.mediaUrl}
            alt={currentMedia.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
        </div>

        {/* Botones verticales de acciones */}
        <div className="absolute right-3 bottom-32 z-10 flex flex-col items-center gap-3">
          <Button size="icon" variant="ghost"><Heart /></Button>
          <Button size="icon" variant="ghost"><MessageCircle /></Button>
          <Button size="icon" variant="ghost"><Eye /></Button>
          <Button size="icon" variant="ghost"><Bookmark /></Button>
          <Button size="icon" variant="ghost" onClick={() => router.push("/trending")}><TrendingUp /></Button>
        </div>

        {/* Texto inferior */}
        <div className="absolute bottom-24 left-4 right-24 z-10">
          <Badge className="mb-1 bg-purple-500/20 text-purple-300">RETO DEL DÍA</Badge>
          <h2 className="text-xl font-bold">{currentMedia.title}</h2>
          <p className="text-sm opacity-80 mb-2">{currentMedia.description}</p>
        </div>

        {/* Indicador de swipe up */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center animate-bounce">
          <p className="text-xs text-zinc-400 mb-0.5">Desliza hacia arriba</p>
          <ChevronUp className="h-4 w-4 text-zinc-400" />
        </div>
      </main>

      {/* Navegación inferior */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-t border-zinc-800">
        <div className="flex items-center justify-around p-3">
          <Button variant="ghost" className="flex flex-col items-center gap-1 text-white text-xs">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M3 9L12 2L21 9V20..." stroke="white" strokeWidth="2" />
            </svg>
            Inicio
          </Button>

          <Button onClick={handleChatClick} variant="ghost" className="flex flex-col items-center gap-1 text-zinc-400 text-xs">
            <MessageSquare className="h-5 w-5" /> Chat
          </Button>

          <Button
            onClick={handleCreateClick}
            variant="ghost"
            size="icon"
            className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-full h-12 w-12 flex items-center justify-center text-white"
          >
            <Plus className="h-6 w-6" />
          </Button>

          <Button
            onClick={handleProfileClick}
            variant="ghost"
            className="flex flex-col items-center gap-1 text-zinc-400 text-xs"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
              <path d="M20 21V19C20..." stroke="currentColor" strokeWidth="2" />
            </svg>
            Perfil
          </Button>

          <Link href="/alertas">
            <Button variant="ghost" className="flex flex-col items-center gap-1 text-zinc-400 text-xs">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                <path d="M18 8C18..." stroke="currentColor" strokeWidth="2" />
              </svg>
              Alertas
            </Button>
          </Link>
        </div>
      </nav>
    </div>
  )
}
