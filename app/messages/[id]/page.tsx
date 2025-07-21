"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { ArrowLeft, Send, MoreVertical, Phone, Video, ImageIcon, Smile } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import ProtectedRoute from "@/components/protected-route"

interface Message {
  id: number
  text: string
  timestamp: string
  isOwn: boolean
  status?: "sent" | "delivered" | "read"
}

export default function ChatPage({ params }: { params: { id: string } }) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "¡Hola! Vi tu último reto y me encantó 🔥",
      timestamp: "10:30",
      isOwn: false,
    },
    {
      id: 2,
      text: "¡Gracias! Me tomó mucho tiempo hacerlo",
      timestamp: "10:32",
      isOwn: true,
      status: "read",
    },
    {
      id: 3,
      text: "Se nota el esfuerzo. ¿Cómo conseguiste ese efecto?",
      timestamp: "10:33",
      isOwn: false,
    },
    {
      id: 4,
      text: "Es un secreto 😉 Pero te puedo enseñar si quieres",
      timestamp: "10:35",
      isOwn: true,
      status: "read",
    },
    {
      id: 5,
      text: "¡Sí, por favor! Sería genial",
      timestamp: "10:36",
      isOwn: false,
    },
  ])

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: message,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isOwn: true,
        status: "sent",
      }
      setMessages([...messages, newMessage])
      setMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Mock user data - in real app this would come from API
  const chatUser = {
    name: "María Rodríguez",
    username: "@mariarodriguez",
    avatar: "/placeholder.svg?height=40&width=40",
    online: true,
  }

  return (
    <ProtectedRoute>
      <div className="flex flex-col min-h-screen bg-black text-white">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-black/80 backdrop-blur-md border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <Link href="/messages">
              <Button variant="ghost" size="icon" className="text-zinc-400">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <Avatar className="h-10 w-10">
              <AvatarImage src={chatUser.avatar || "/placeholder.svg"} alt={chatUser.name} />
              <AvatarFallback>{chatUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-white">{chatUser.name}</p>
              <p className="text-xs text-zinc-400">{chatUser.online ? "En línea" : "Última vez hace 2h"}</p>
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
        </header>

        {/* Messages */}
        <main className="flex-1 pt-16 pb-20 overflow-y-auto">
          <div className="p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}>
                <div
                  className={`
                    max-w-xs lg:max-w-md px-4 py-2 rounded-2xl
                    ${msg.isOwn ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white" : "bg-zinc-800 text-white"}
                  `}
                >
                  <p className="text-sm">{msg.text}</p>
                  <div
                    className={`flex items-center justify-end gap-1 mt-1 ${msg.isOwn ? "text-purple-200" : "text-zinc-400"}`}
                  >
                    <span className="text-xs">{msg.timestamp}</span>
                    {msg.isOwn && msg.status && (
                      <div className="flex">
                        {msg.status === "sent" && <span className="text-xs">✓</span>}
                        {msg.status === "delivered" && <span className="text-xs">✓✓</span>}
                        {msg.status === "read" && <span className="text-xs text-blue-400">✓✓</span>}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </main>

        {/* Message Input */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-black/80 backdrop-blur-md border-t border-zinc-800">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-zinc-400">
              <ImageIcon className="h-5 w-5" />
            </Button>
            <div className="flex-1 relative">
              <Input
                placeholder="Escribe un mensaje..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="bg-zinc-900 border-zinc-700 pr-12"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 text-zinc-400"
              >
                <Smile className="h-4 w-4" />
              </Button>
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
