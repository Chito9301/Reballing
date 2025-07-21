"use client"

import { useEffect, useState } from "react"
import { ArrowLeft, Edit, Settings } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/contexts/auth-context"
import { getUserMedia, type MediaItem } from "@/lib/media-service"
import ProtectedRoute from "@/components/protected-route"
import { Skeleton } from "@/components/ui/skeleton"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

interface UserProfile {
  name: string
  username: string
  bio: string
  age: number
  gender: string
  followers: number
  following: number
  challengesCompleted: number
}

export default function ProfilePage() {
  const { user } = useAuth()
  const [userMedia, setUserMedia] = useState<MediaItem[]>([])
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchUserData() {
      if (user) {
        try {
          setLoading(true)

          // Fetch user profile
          const userDoc = await getDoc(doc(db, "users", user.email!))
          if (userDoc.exists()) {
            const userData = userDoc.data()
            setProfile({
              name: userData.name || user.displayName || "Usuario",
              username: userData.username || "@usuario",
              bio: userData.bio || "Amante de los retos y la creatividad 🚀",
              age: userData.age || 18,
              gender: userData.gender || "",
              followers: userData.followers || 0,
              following: userData.following || 0,
              challengesCompleted: userData.challengesCompleted || 0,
            })
          } else {
            // Default profile
            setProfile({
              name: user.displayName || "Usuario",
              username: "@usuario",
              bio: "Amante de los retos y la creatividad 🚀",
              age: 18,
              gender: "",
              followers: 0,
              following: 0,
              challengesCompleted: 0,
            })
          }

          // Fetch user media
          const media = await getUserMedia(user.uid)
          setUserMedia(media)
        } catch (error) {
          console.error("Error fetching user data:", error)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchUserData()
  }, [user])

  return (
    <ProtectedRoute>
      <div className="flex flex-col min-h-screen bg-black text-white">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-black/80 backdrop-blur-md border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="ghost" size="icon" className="text-zinc-400">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-lg font-semibold">Mi Perfil</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/profile/edit">
              <Button variant="ghost" size="icon" className="text-zinc-400">
                <Edit className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/settings">
              <Button variant="ghost" size="icon" className="text-zinc-400">
                <Settings className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 pt-16 pb-20">
          <div className="p-4">
            {loading ? (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-20 w-20 rounded-full bg-zinc-800" />
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-32 bg-zinc-800" />
                    <Skeleton className="h-4 w-24 bg-zinc-800" />
                    <Skeleton className="h-4 w-48 bg-zinc-800" />
                  </div>
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-12 w-20 bg-zinc-800" />
                  <Skeleton className="h-12 w-20 bg-zinc-800" />
                  <Skeleton className="h-12 w-20 bg-zinc-800" />
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-4 mb-6">
                  <Avatar className="h-20 w-20 border-4 border-purple-500">
                    <AvatarImage
                      src={user?.photoURL || "/placeholder.svg?height=80&width=80"}
                      alt={profile?.name || "Usuario"}
                    />
                    <AvatarFallback>{profile?.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-bold">{profile?.name || "Usuario"}</h2>
                      {profile?.age && (
                        <Badge variant="secondary" className="text-xs bg-zinc-800 text-zinc-300">
                          {profile.age} años
                        </Badge>
                      )}
                    </div>
                    <p className="text-zinc-400">{profile?.username || "@usuario"}</p>
                    <p className="text-sm mt-1">{profile?.bio || "Sin biografía"}</p>
                  </div>
                </div>

                <div className="flex justify-between mb-6 text-center">
                  <div className="flex-1">
                    <p className="text-xl font-bold">{userMedia.length}</p>
                    <p className="text-xs text-zinc-400">Publicaciones</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-xl font-bold">{profile?.followers || 0}</p>
                    <p className="text-xs text-zinc-400">Seguidores</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-xl font-bold">{profile?.following || 0}</p>
                    <p className="text-xs text-zinc-400">Siguiendo</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-xl font-bold">{profile?.challengesCompleted || 0}</p>
                    <p className="text-xs text-zinc-400">Retos</p>
                  </div>
                </div>
              </>
            )}

            <Tabs defaultValue="posts" className="w-full">
              <TabsList className="w-full bg-zinc-900 border-b border-zinc-800 rounded-none h-12">
                <TabsTrigger
                  value="posts"
                  className="flex-1 data-[state=active]:bg-black data-[state=active]:text-white"
                >
                  Publicaciones
                </TabsTrigger>
                <TabsTrigger
                  value="challenges"
                  className="flex-1 data-[state=active]:bg-black data-[state=active]:text-white"
                >
                  Retos
                </TabsTrigger>
                <TabsTrigger
                  value="saved"
                  className="flex-1 data-[state=active]:bg-black data-[state=active]:text-white"
                >
                  Guardados
                </TabsTrigger>
              </TabsList>

              <TabsContent value="posts" className="mt-4">
                {loading ? (
                  <div className="grid grid-cols-3 gap-1">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                      <Skeleton key={item} className="aspect-square bg-zinc-800" />
                    ))}
                  </div>
                ) : userMedia.length > 0 ? (
                  <div className="grid grid-cols-3 gap-1">
                    {userMedia.map((item) => (
                      <Link href={`/media/${item.id}`} key={item.id}>
                        <div className="aspect-square relative">
                          <Image
                            src={
                              item.type === "image"
                                ? item.mediaUrl
                                : item.thumbnailUrl || `/placeholder.svg?height=150&width=150`
                            }
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute bottom-1 right-1">
                            <Badge className="text-[10px] py-0 h-4 bg-black/60 backdrop-blur-sm">{item.likes}</Badge>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-zinc-400 mb-4">Aún no has publicado nada.</p>
                    <Link href="/create">
                      <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                        Crear primera publicación
                      </Button>
                    </Link>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="challenges" className="mt-4">
                <div className="text-center py-8">
                  <p className="text-zinc-400 mb-4">Aún no has completado ningún reto.</p>
                  <Link href="/">
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                      Explorar Retos
                    </Button>
                  </Link>
                </div>
              </TabsContent>

              <TabsContent value="saved" className="mt-4">
                <div className="text-center py-8">
                  <p className="text-zinc-400 mb-4">Aún no has guardado ninguna publicación.</p>
                  <Link href="/trending">
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                      Explorar Contenido
                    </Button>
                  </Link>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
