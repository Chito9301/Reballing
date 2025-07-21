"use client"

import { useState } from "react"
import { ArrowLeft, Search, Plus } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import ProtectedRoute from "@/components/protected-route"

export default function MessagesPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const conversations = [
    {
      id: 1,
      name: "María Rodríguez",
      username: "@mariarodriguez",
      lastMessage: "¡Me encantó tu último reto! 🔥",
      timestamp: "2m",
      unread: 2,
      online: true,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Carlos Pérez",
      username: "@carlosperez",
      lastMessage: "¿Participas en el reto de mañana?",
      timestamp: "1h",
      unread: 0,
      online: false,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Ana López",
      username: "@analopez",
      lastMessage: "Gracias por seguirme ✨",
      timestamp: "3h",
      unread: 1,
      online: true,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      name: "Juan Díaz",
      username: "@juandiaz",
      lastMessage: "Tú: Claro, nos vemos ahí",
      timestamp: "1d",
      unread: 0,
      online: false,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 5,
      name: "Laura Martínez",
      username: "@lauramartinez",
      lastMessage: "¿Cómo hiciste ese efecto?",
      timestamp: "2d",
      unread: 0,
      online: false,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.username.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <ProtectedRoute>
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
              <h1 className="text-lg font-semibold">Mensajes</h1>
            </div>
            <Button variant="ghost" size="icon" className="text-zinc-400">
              <Plus className="h-5 w-5" />
            </Button>
          </div>
          <div className="px-4 pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 h-4 w-4" />
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
        <main className="flex-1 pt-28 pb-20">
          {filteredConversations.length > 0 ? (
            <div className="divide-y divide-zinc-800">
              {filteredConversations.map((conversation) => (
                <Link href={`/messages/${conversation.id}`} key={conversation.id}>
                  <div className="flex items-center gap-3 p-4 hover:bg-zinc-900/50 transition-colors">
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={conversation.avatar || "/placeholder.svg"} alt={conversation.name} />
                        <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {conversation.online && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black"></div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-white truncate">{conversation.name}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-zinc-400">{conversation.timestamp}</span>
                          {conversation.unread > 0 && (
                            <Badge className="bg-purple-600 text-white text-xs min-w-[20px] h-5 flex items-center justify-center">
                              {conversation.unread}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-zinc-400 truncate mt-1">{conversation.lastMessage}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-8">
              <div className="w-24 h-24 rounded-full bg-zinc-800 flex items-center justify-center mb-4">
                <Search className="h-12 w-12 text-zinc-500" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">
                {searchTerm ? "No se encontraron conversaciones" : "No hay mensajes"}
              </h3>
              <p className="text-sm text-zinc-400 text-center">
                {searchTerm ? "Intenta con otro término de búsqueda" : "Cuando tengas conversaciones, aparecerán aquí"}
              </p>
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  )
}
