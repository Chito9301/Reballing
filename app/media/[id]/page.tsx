"use client"

import { useEffect, useState } from "react"
import { ArrowLeft, Heart, MessageCircle, MoreVertical, Share2, Music, Loader2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { doc, getDoc, collection, addDoc, query, where, orderBy, getDocs, Timestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useAuth } from "@/contexts/auth-context"
import { incrementMediaStats, type MediaItem } from "@/lib/media-service"
import { useRouter } from "next/navigation"
import { AppIcon } from "@/components/app-icon"

interface Comment {
  id: string
  userId: string
  username: string
  userPhotoURL?: string
  text: string
  createdAt: Timestamp
}

export default function MediaDetailPage({ params }: { params: { id: string } }) {
  const { user } = useAuth()
  const router = useRouter()
  const [media, setMedia] = useState<MediaItem | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [commentText, setCommentText] = useState("")
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    async function fetchMediaAndComments() {
      try {
        setLoading(true)

        // Fetch media details
        const mediaDoc = await getDoc(doc(db, "media", params.id))
        if (!mediaDoc.exists()) {
          console.error("Media not found")
          router.push("/")
          return
        }

        const mediaData = { id: mediaDoc.id, ...mediaDoc.data() } as MediaItem
        setMedia(mediaData)

        // Increment view count
        await incrementMediaStats(params.id, "views")

        // Fetch comments
        const commentsQuery = query(
          collection(db, "comments"),
          where("mediaId", "==", params.id),
          orderBy("createdAt", "desc"),
        )

        const commentsSnapshot = await getDocs(commentsQuery)
        const commentsData = commentsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Comment[]

        setComments(commentsData)
      } catch (error) {
        console.error("Error fetching media details:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMediaAndComments()
  }, [params.id, router])

  const handleLike = async () => {
    if (!user) {
      router.push("/auth/login")
      return
    }

    if (media) {
      try {
        await incrementMediaStats(media.id, "likes")
        setMedia((prev) => (prev ? { ...prev, likes: prev.likes + 1 } : null))
      } catch (error) {
        console.error("Error liking media:", error)
      }
    }
  }

  const handleAddComment = async () => {
    if (!user || !commentText.trim() || !media) {
      return
    }

    try {
      setSubmitting(true)

      const newComment = {
        mediaId: media.id,
        userId: user.uid,
        username: user.displayName || "Usuario",
        userPhotoURL: user.photoURL || "",
        text: commentText.trim(),
        createdAt: Timestamp.now(),
      }

      const commentRef = await addDoc(collection(db, "comments"), newComment)

      // Increment comment count
      await incrementMediaStats(media.id, "comments")

      // Update UI
      setComments((prev) => [{ id: commentRef.id, ...newComment }, ...prev])
      setMedia((prev) => (prev ? { ...prev, comments: prev.comments + 1 } : null))
      setCommentText("")
    } catch (error) {
      console.error("Error adding comment:", error)
    } finally {
      setSubmitting(false)
    }
  }

  const formatTimestamp = (timestamp: Timestamp) => {
    const now = new Date()
    const commentDate = timestamp.toDate()
    const diffInSeconds = Math.floor((now.getTime() - commentDate.getTime()) / 1000)

    if (diffInSeconds < 60) return `${diffInSeconds}s`
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`
    return `${Math.floor(diffInSeconds / 86400)}d`
  }

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-black text-white">
        <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-black/80 backdrop-blur-md border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="ghost" size="icon" className="text-zinc-400">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-lg font-semibold">Cargando...</h1>
          </div>
        </header>

        <main className="flex-1 pt-16 pb-20">
          <div className="relative h-[calc(100vh-8rem)] bg-zinc-900">
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin-slow">
                <AppIcon size={64} />
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (!media) {
    return (
      <div className="flex flex-col min-h-screen bg-black text-white">
        <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-black/80 backdrop-blur-md border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="ghost" size="icon" className="text-zinc-400">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-lg font-semibold">Contenido no encontrado</h1>
          </div>
        </header>

        <main className="flex-1 pt-16 pb-20 flex items-center justify-center">
          <div className="text-center">
            <p className="text-zinc-400 mb-4">El contenido que buscas no está disponible</p>
            <Link href="/">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                Volver al Inicio
              </Button>
            </Link>
          </div>
        </main>
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
          <h1 className="text-lg font-semibold">{media.title}</h1>
        </div>
        <Button variant="ghost" size="icon" className="text-zinc-400">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-16 pb-20">
        <div className="relative h-[calc(100vh-16rem)] bg-zinc-900">
          {media.type === "image" ? (
            <Image src={media.mediaUrl || "/placeholder.svg"} alt={media.title} fill className="object-contain" />
          ) : media.type === "video" ? (
            <video src={media.mediaUrl} controls autoPlay className="w-full h-full object-contain" />
          ) : (
            <div className="flex items-center justify-center h-full bg-gradient-to-b from-purple-900/20 to-black">
              <div className="text-center p-4">
                <Music className="h-16 w-16 text-purple-400 mx-auto mb-4" />
                <p className="text-xl font-bold mb-4">{media.title}</p>
                <audio src={media.mediaUrl} controls className="w-full" autoPlay />
              </div>
            </div>
          )}

          <div className="absolute right-4 top-4 z-10 flex flex-col items-center gap-6">
            <div className="flex flex-col items-center">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-black/40 backdrop-blur-md"
                onClick={handleLike}
              >
                <Heart className="h-6 w-6" />
              </Button>
              <span className="text-xs mt-1">{media.likes}</span>
            </div>
            <div className="flex flex-col items-center">
              <Button variant="ghost" size="icon" className="rounded-full bg-black/40 backdrop-blur-md">
                <MessageCircle className="h-6 w-6" />
              </Button>
              <span className="text-xs mt-1">{media.comments}</span>
            </div>
            <div className="flex flex-col items-center">
              <Button variant="ghost" size="icon" className="rounded-full bg-black/40 backdrop-blur-md">
                <Share2 className="h-6 w-6" />
              </Button>
              <span className="text-xs mt-1">Compartir</span>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-zinc-800">
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="h-10 w-10 border-2 border-purple-500">
              <AvatarImage src={media.userPhotoURL || "/placeholder.svg?height=40&width=40"} alt={media.username} />
              <AvatarFallback>{media.username.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{media.username}</p>
              {media.challengeTitle && <p className="text-xs text-zinc-400">Reto: {media.challengeTitle}</p>}
            </div>
            <Button
              size="sm"
              variant="secondary"
              className="ml-auto text-xs bg-purple-600 hover:bg-purple-700 text-white"
            >
              Seguir
            </Button>
          </div>

          <p className="text-sm mb-3">{media.description}</p>

          {media.hashtags && media.hashtags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {media.hashtags.map((tag, index) => (
                <Badge key={index} className="bg-zinc-800 hover:bg-zinc-700 text-white border-none text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          <h3 className="font-medium mb-3">Comentarios ({media.comments})</h3>

          <div className="space-y-4 mb-4">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={comment.userPhotoURL || `/placeholder.svg?height=32&width=32`}
                      alt={comment.username}
                    />
                    <AvatarFallback>{comment.username.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{comment.username}</p>
                      <span className="text-xs text-zinc-500">{formatTimestamp(comment.createdAt)}</span>
                    </div>
                    <p className="text-sm">{comment.text}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 text-xs text-zinc-400 hover:text-zinc-300"
                      >
                        Me gusta
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 text-xs text-zinc-400 hover:text-zinc-300"
                      >
                        Responder
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-zinc-400 py-4">No hay comentarios aún. ¡Sé el primero en comentar!</p>
            )}
          </div>

          {user ? (
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={user.photoURL || "/placeholder.svg?height=32&width=32"}
                  alt={user.displayName || "Usuario"}
                />
                <AvatarFallback>{user.displayName?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <div className="flex-1 relative">
                <Input
                  placeholder="Añadir un comentario..."
                  className="bg-zinc-900 border-zinc-700 pr-20"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleAddComment()
                    }
                  }}
                />
                <Button
                  size="sm"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-purple-600 hover:bg-purple-700 text-white"
                  onClick={handleAddComment}
                  disabled={submitting || !commentText.trim()}
                >
                  {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Publicar"}
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-2">
              <Link href="/auth/login">
                <Button variant="link" className="text-purple-400 hover:text-purple-300">
                  Inicia sesión para comentar
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
