"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowLeft, Send, MoreVertical, Phone, Video, Smile, Paperclip, Mic } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/contexts/auth-context"
import ProtectedRoute from "@/components/protected-route"
import { Skeleton } from "@/components/ui/skeleton"

interface Message {
  id: string
  senderId: string
  text: string
  timestamp: Date
  status: "sent" | "delivered" | "read"
  type: "text" | "image" | "audio"
}

interface ChatUser {
  id: string
  username: string
  name: string
  photoURL: string
  isOnline: boolean
  lastSeen?: Date
  isTyping: boolean
}

export default function ChatPage({ params }: { params: { id: string } }) {
  const { user } = useAuth()
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [chatUser, setChatUser] = useState<ChatUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Mock chat data - in real app this would come from Firebase
    const mockChatUser: ChatUser = {
      id: params.id,
      username: "@creador_viral",
      name: "Creador Viral",
      photoURL: "/placeholder.svg?height=40&width=40",
      isOnline: true,
      isTyping: false,
    }

    const mockMessages: Message[] = [
      {
        id: "1",
        senderId: params.id,
        text: "¡Hola! Vi tu último reto y está increíble 🔥",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        status: "read",
        type: "text",
      },
      {
        id: "2",
        senderId: user?.uid || "current_user",
        text: "¡Gracias! Me alegra que te haya gustado 😊",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000 + 5 * 60 * 1000), // 1h 55m ago
        status: "read",
        type: "text",
      },
      {
        id: "3",
        senderId: params.id,
        text: "¿Te gustaría colaborar en un reto juntos?",
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
        status: "read",
        type: "text",
      },
      {
        id: "4",
        senderId: user?.uid || "current_user",
        text: "¡Me encantaría! ¿Qué tienes en mente?",
        timestamp: new Date(Date.now() - 50 * 60 * 1000), // 50 minutes ago
        status: "read",
        type: "text",
      },
      {
        id: "5",
        senderId: params.id,
        text: "Estaba pensando en algo relacionado con baile y creatividad",
        timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
        status: "read",
        type: "text",
      },
      {
        id: "6",
        senderId: user?.uid || "current_user",
        text: "Perfecto, podemos planificarlo mejor mañana",
        timestamp: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
        status: "delivered",
        type: "text",
      },
    ]

    setTimeout(() => {
      setChatUser(mockChatUser)
      setMessages(mockMessages)
      setLoading(false)
    }, 1000)
  }, [params.id, user])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = async () => {
    if (!newMessage.trim() || sending) return

    setSending(true)

    const message: Message = {
      id: Date.now().toString(),
      senderId: user?.uid || "current_user",
      text: newMessage.trim(),
      timestamp: new Date(),
      status: "sent",
      type: "text",
    }

    setMessages((prev) => [...prev, message])
    setNewMessage("")

    // Simulate message delivery
    setTimeout(() => {
      setMessages((prev) => prev.map((msg) => (msg.id === message.id ? { ...msg, status: "delivered" } : msg)))
    }, 1000)

    // Simulate message read
    setTimeout(() => {
      setMessages((prev) => prev.map((msg) => (msg.id === message.id ? { ...msg, status: "read" } : msg)))
    }, 3000)

    setSending(false)
  }

  const formatMessageTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const getStatusIcon = (status: Message["status"]) => {
    switch (status) {
      case "sent":
        return "✓"
      case "delivered":
        return "✓✓"
      case "read":
        return "✓✓"
      default:
        return ""
    }
  }

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="flex flex-col min-h-screen bg-black text-white">
          {/* Header Skeleton */}
          <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-800">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 bg-zinc-800" />
                <Skeleton className="h-12 w-12 rounded-full bg-zinc-800" />
                <div>
                  <Skeleton className="h-5 w-32 bg-zinc-800 mb-1" />
                  <Skeleton className="h-3 w-20 bg-zinc-800" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-10 w-10 bg-zinc-800" />
                <Skeleton className="h-10 w-10 bg-zinc-800" />
                <Skeleton className="h-10 w-10 bg-zinc-800" />
              </div>
            </div>
          </header>

          {/* Messages Skeleton */}
          <main className="flex-1 pt-20 pb-20 p-4">
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className={`flex ${item % 2 === 0 ? "justify-end" : "justify-start"}`}>
                  <Skeleton className={`max-w-xs p-3 rounded-lg ${item % 2 === 0 ? "bg-purple-900" : "bg-zinc-800"}`}>
                    <Skeleton className="h-4 w-32 bg-zinc-700 mb-1" />
                    <Skeleton className="h-3 w-16 bg-zinc-700" />
                  </Skeleton>
                </div>
              ))}
            </div>
          </main>

          {/* Input Skeleton */}
          <footer className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-md border-t border-zinc-800 p-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 bg-zinc-800" />
              <Skeleton className="flex-1 h-10 bg-zinc-800 rounded-full" />
              <Skeleton className="h-10 w-10 bg-zinc-800" />
            </div>
          </footer>
        </div>
      </ProtectedRoute>
    )
  }

  if (!chatUser) {
    return (
      <ProtectedRoute>
        <div className="flex flex-col min-h-screen bg-black text-white">
          <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-black/80 backdrop-blur-md border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <Link href="/messages">
                <Button variant="ghost" size="icon" className="text-zinc-400">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <h1 className="text-lg font-semibold">Chat no encontrado</h1>
            </div>
          </header>
          <main className="flex-1 pt-16 pb-20 flex items-center justify-center">
            <div className="text-center">
              <p className="text-zinc-400 mb-4">Esta conversación no está disponible</p>
              <Link href="/messages">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  Volver a Mensajes
                </Button>
              </Link>
            </div>
          </main>
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <div className="flex flex-col min-h-screen bg-black text-white">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-800">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Link href="/messages">
                <Button variant="ghost" size="icon" className="text-zinc-400">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div className="relative">
                <Avatar className="h-10 w-10 border-2 border-purple-500">
                  <AvatarImage src={chatUser.photoURL || "/placeholder.svg"} alt={chatUser.name} />
                  <AvatarFallback>{chatUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                {chatUser.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-black rounded-full"></div>
                )}
              </div>
              <div>
                <h1 className="font-medium text-white">{chatUser.name}</h1>
                <p className="text-xs text-zinc-400">
                  {chatUser.isTyping
                    ? "Escribiendo..."
                    : chatUser.isOnline
                      ? "En línea"
                      : chatUser.lastSeen
                        ? `Visto ${formatMessageTime(chatUser.lastSeen)}`
                        : "Desconectado"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-zinc-400">
                <Phone className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-zinc-400">
                <Video className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-zinc-400">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Messages */}
        <main className="flex-1 pt-20 pb-20 p-4 overflow-y-auto">
          <div className="space-y-4">
            {messages.map((message) => {
              const isOwn = message.senderId === user?.uid || message.senderId === "current_user"

              return (
                <div key={message.id} className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                      isOwn ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white" : "bg-zinc-800 text-white"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <div
                      className={`flex items-center justify-end gap-1 mt-1 text-xs ${
                        isOwn ? "text-purple-100" : "text-zinc-400"
                      }`}
                    >
                      <span>{formatMessageTime(message.timestamp)}</span>
                      {isOwn && (
                        <span className={`${message.status === "read" ? "text-purple-200" : "text-purple-300"}`}>
                          {getStatusIcon(message.status)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}

            {chatUser.isTyping && (
              <div className="flex justify-start">
                <div className="bg-zinc-800 px-4 py-2 rounded-2xl">
                  <div className="flex items-center gap-1">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </main>

        {/* Message Input */}
        <footer className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-md border-t border-zinc-800 p-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="text-zinc-400">
              <Paperclip className="h-5 w-5" />
            </Button>
            <div className="flex-1 relative">
              <Input
                placeholder="Escribe un mensaje..."
                className="bg-zinc-900 border-zinc-700 pr-20"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400">
                  <Smile className="h-4 w-4" />
                </Button>
                {newMessage.trim() ? (
                  <Button
                    size="icon"
                    className="h-8 w-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    onClick={handleSendMessage}
                    disabled={sending}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400">
                    <Mic className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </ProtectedRoute>
  )
}
