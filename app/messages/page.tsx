"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Search, MessageCircle, Plus, MoreVertical } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useAuth } from "@/contexts/auth-context"
import ProtectedRoute from "@/components/protected-route"
import { Skeleton } from "@/components/ui/skeleton"

interface Conversation {
  id: string
  userId: string
  username: string
  name: string
  photoURL: string
  lastMessage: string
  lastMessageTime: Date
  unreadCount: number
  isOnline: boolean
  isTyping: boolean
}

export default function MessagesPage() {
  const { user } = useAuth()
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock conversations data - in real app this would come from Firebase
    const mockConversations: Conversation[] = [
      {
        id: "1",
        userId: "user1",
        username: "@creador_viral",
        name: "Creador Viral",
        photoURL: "/placeholder.svg?height=50&width=50",
        lastMessage: "¡Increíble tu último reto! 🔥",
        lastMessageTime: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
        unreadCount: 2,
        isOnline: true,
        isTyping: false,
      },
      {
        id: "2",
        userId: "user2",
        username: "@talent_master",
        name: "Talent Master",
        photoURL: "/placeholder.svg?height=50&width=50",
        lastMessage: "¿Quieres colaborar en un reto?",
        lastMessageTime: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
        unreadCount: 0,
        isOnline: false,
        isTyping: false,
      },
      {
        id: "3",
        userId: "user3",
        username: "@reto_queen",
        name: "Reto Queen",
        photoURL: "/placeholder.svg?height=50&width=50",
        lastMessage: "Está escribiendo...",
        lastMessageTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        unreadCount: 1,
        isOnline: true,
        isTyping: true,
      },
      {
        id: "4",
        userId: "user4",
        username: "@creative_mind",
        name: "Creative Mind",
        photoURL: "/placeholder.svg?height=50&width=50",
        lastMessage: "Gracias por seguirme! 😊",
        lastMessageTime: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        unreadCount: 0,
        isOnline: false,
        isTyping: false,
      },
      {
        id: "5",
        userId: "user5",
        username: "@challenge_pro",
        name: "Challenge Pro",
        photoURL: "/placeholder.svg?height=50&width=50",
        lastMessage: "¿Has visto el nuevo reto viral?",
        lastMessageTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        unreadCount: 0,
        isOnline: false,
        isTyping: false,
      },
    ]

    setTimeout(() => {
      setConversations(mockConversations)
      setLoading(false)
    }, 1000)
  }, [])

  const formatMessageTime = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "Ahora"
    if (diffInMinutes < 60) return `${diffInMinutes}m`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h`
    if (diffInMinutes < 10080) return `${Math.floor(diffInMinutes / 1440)}d`

    return date.toLocaleDateString()
  }

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalUnreadCount = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0)

  return (
    <ProtectedRoute>
      <div className="flex flex-col min-h-screen bg-black text-white">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-800">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-2">
              <Link href="/">
                <Button variant="ghost" size="icon" className="text-zinc-400">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-lg font-semibold flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-purple-500" />
                  Mensajes
                </h1>
                {totalUnreadCount > 0 && (
                  <p className="text-xs text-zinc-400">
                    {totalUnreadCount} mensaje{totalUnreadCount !== 1 ? "s" : ""} sin leer
                  </p>
                )}
              </div>
            </div>
            <Button variant="ghost" size="icon" className="text-zinc-400">
              <Plus className="h-5 w-5" />
            </Button>
          </div>

          {/* Search Bar */}
          <div className="px-4 pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 h-4 w-4" />
              <Input
                placeholder="Buscar conversaciones..."
                className="pl-10 bg-zinc-900 border-zinc-700"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 pt-32 pb-20">
          {loading ? (
            <div className="p-4 space-y-3">
              {[1, 2, 3, 4, 5].map((item) => (
                <Card key={item} className="bg-zinc-900 border-zinc-800">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-12 w-12 rounded-full bg-zinc-800" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-32 bg-zinc-800" />
                        <Skeleton className="h-3 w-48 bg-zinc-800" />
                      </div>
                      <Skeleton className="h-3 w-8 bg-zinc-800" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredConversations.length > 0 ? (
            <div className="p-4 space-y-2">
              {filteredConversations.map((conversation) => (
                <Link href={`/messages/${conversation.id}`} key={conversation.id}>
                  <Card className="bg-zinc-900 border-zinc-800 hover:bg-zinc-800 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="h-12 w-12 border-2 border-purple-500">
                            <AvatarImage src={conversation.photoURL || "/placeholder.svg"} alt={conversation.name} />
                            <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          {conversation.isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-black rounded-full"></div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-medium text-white truncate">{conversation.name}</h3>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-zinc-500">
                                {formatMessageTime(conversation.lastMessageTime)}
                              </span>
                              {conversation.unreadCount > 0 && (
                                <Badge className="bg-purple-600 text-white text-xs min-w-[20px] h-5 flex items-center justify-center">
                                  {conversation.unreadCount}
                                </Badge>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <p
                              className={`text-sm truncate ${
                                conversation.isTyping
                                  ? "text-purple-400 italic"
                                  : conversation.unreadCount > 0
                                    ? "text-white font-medium"
                                    : "text-zinc-400"
                              }`}
                            >
                              {conversation.isTyping ? "Está escribiendo..." : conversation.lastMessage}
                            </p>
                            <Button variant="ghost" size="icon" className="h-6 w-6 text-zinc-500 hover:text-zinc-300">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </div>

                          <p className="text-xs text-zinc-500 mt-1">{conversation.username}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="text-center">
                <MessageCircle className="h-16 w-16 text-zinc-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">
                  {searchTerm ? "No se encontraron conversaciones" : "No tienes mensajes"}
                </h3>
                <p className="text-sm text-zinc-400 mb-6">
                  {searchTerm
                    ? "Intenta con otros términos de búsqueda"
                    : "Cuando alguien te envíe un mensaje, aparecerá aquí"}
                </p>
                {!searchTerm && (
                  <Link href="/explorar">
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                      Explorar Usuarios
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  )
}
