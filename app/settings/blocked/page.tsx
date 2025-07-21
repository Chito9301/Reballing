"use client"

import { ArrowLeft, UserX, Search } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ProtectedRoute from "@/components/protected-route"
import { useState } from "react"

export default function BlockedUsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [blockedUsers] = useState([
    // Mock data - in real app this would come from database
    {
      id: "1",
      username: "@usuario_bloqueado",
      name: "Usuario Bloqueado",
      photoURL: "/placeholder.svg?height=40&width=40",
      blockedAt: "2024-01-15",
    },
  ])

  const filteredUsers = blockedUsers.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleUnblock = (userId: string) => {
    // In real app, this would call an API to unblock the user
    console.log("Unblocking user:", userId)
  }

  return (
    <ProtectedRoute>
      <div className="flex flex-col min-h-screen bg-black text-white">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-black/80 backdrop-blur-md border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <Link href="/settings">
              <Button variant="ghost" size="icon" className="text-zinc-400">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-lg font-semibold">Usuarios Bloqueados</h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 pt-16 pb-4">
          <div className="p-4 max-w-2xl mx-auto">
            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 h-4 w-4" />
              <Input
                placeholder="Buscar usuarios bloqueados..."
                className="pl-10 bg-zinc-900 border-zinc-700"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Info Card */}
            <Card className="mb-6 bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <UserX className="h-5 w-5 text-red-500" />
                  Usuarios Bloqueados
                </CardTitle>
                <CardDescription className="text-zinc-400">
                  Los usuarios bloqueados no pueden interactuar contigo ni ver tu contenido
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Blocked Users List */}
            {filteredUsers.length > 0 ? (
              <div className="space-y-3">
                {filteredUsers.map((user) => (
                  <Card key={user.id} className="bg-zinc-900 border-zinc-800">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={user.photoURL || "/placeholder.svg"} alt={user.username} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-white">{user.name}</p>
                            <p className="text-sm text-zinc-400">{user.username}</p>
                            <p className="text-xs text-zinc-500">Bloqueado el {user.blockedAt}</p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUnblock(user.id)}
                          className="border-red-600 text-red-400 hover:bg-red-900/20"
                        >
                          Desbloquear
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="p-8 text-center">
                  <UserX className="h-12 w-12 text-zinc-500 mx-auto mb-4" />
                  <h3 className="font-medium mb-2 text-white">No hay usuarios bloqueados</h3>
                  <p className="text-sm text-zinc-400">
                    {searchTerm
                      ? "No se encontraron usuarios con ese término de búsqueda"
                      : "Cuando bloquees a un usuario, aparecerá aquí"}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Help Text */}
            <Card className="mt-6 bg-zinc-900 border-zinc-800">
              <CardContent className="p-4">
                <h4 className="font-medium mb-2 text-white">¿Cómo bloquear a un usuario?</h4>
                <p className="text-sm text-zinc-300">
                  Ve al perfil del usuario que quieres bloquear, toca los tres puntos (⋯) y selecciona "Bloquear
                  usuario". También puedes bloquear usuarios desde sus comentarios o publicaciones.
                </p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
