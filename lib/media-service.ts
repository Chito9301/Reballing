import { db, isFirebaseConfigured } from "./firebase"
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  arrayUnion,
  increment,
  query,
  orderBy,
  getDocs,
  where,
  Timestamp,
  limit,
} from "firebase/firestore"
import { v4 as uuidv4 } from "uuid"

export type MediaType = "video" | "image" | "audio"

export interface MediaItem {
  id: string
  userId: string
  username: string
  userPhotoURL?: string
  title: string
  description: string
  mediaUrl: string
  thumbnailUrl?: string
  type: MediaType
  hashtags: string[]
  likes: number
  views: number
  comments: number
  createdAt: Timestamp
  challengeId?: string
  challengeTitle?: string
}

// Mock data for when Firebase is not configured or has permission issues
const mockMediaData: MediaItem[] = [
  {
    id: "1",
    userId: "demo-user-1",
    username: "@mariarodriguez",
    userPhotoURL: "/placeholder.svg?height=40&width=40",
    title: "Mi versión de Wannabe",
    description: "Mi versión de 'Wannabe' de las Spice Girls 💃 #challz #90sdance",
    mediaUrl: "/placeholder.svg?height=800&width=400",
    type: "video",
    hashtags: ["#challz", "#90sdance", "#spicegirls"],
    likes: 1200,
    views: 5400,
    comments: 85,
    createdAt: Timestamp.now(),
    challengeId: "daily-challenge-1",
    challengeTitle: "Crea un video bailando con tu canción favorita de los 90s",
  },
  {
    id: "2",
    userId: "demo-user-2",
    username: "@carlosperez",
    userPhotoURL: "/placeholder.svg?height=40&width=40",
    title: "Baile retro increíble",
    description: "Recordando los mejores pasos de los 90s 🕺",
    mediaUrl: "/placeholder.svg?height=800&width=400",
    type: "video",
    hashtags: ["#challz", "#retro", "#baile"],
    likes: 890,
    views: 3200,
    comments: 42,
    createdAt: Timestamp.now(),
  },
  {
    id: "3",
    userId: "demo-user-3",
    username: "@analopez",
    userPhotoURL: "/placeholder.svg?height=40&width=40",
    title: "Nostalgia pura",
    description: "Esta canción me trae tantos recuerdos ✨",
    mediaUrl: "/placeholder.svg?height=800&width=400",
    type: "image",
    hashtags: ["#challz", "#nostalgia", "#90s"],
    likes: 654,
    views: 2100,
    comments: 28,
    createdAt: Timestamp.now(),
  },
  {
    id: "4",
    userId: "demo-user-4",
    username: "@juandiaz",
    userPhotoURL: "/placeholder.svg?height=40&width=40",
    title: "Throwback Thursday",
    description: "Los mejores hits de los 90s nunca pasan de moda 🎵",
    mediaUrl: "/placeholder.svg?height=800&width=400",
    type: "audio",
    hashtags: ["#challz", "#throwback", "#90smusic"],
    likes: 432,
    views: 1800,
    comments: 19,
    createdAt: Timestamp.now(),
  },
  {
    id: "5",
    userId: "demo-user-5",
    username: "@lauramartinez",
    userPhotoURL: "/placeholder.svg?height=40&width=40",
    title: "Outfit inspirado en los 90s",
    description: "Recreando el look icónico de esa época ✨",
    mediaUrl: "/placeholder.svg?height=800&width=400",
    type: "image",
    hashtags: ["#challz", "#90sfashion", "#vintage"],
    likes: 789,
    views: 2900,
    comments: 56,
    createdAt: Timestamp.now(),
  },
]

// Check if we can access Firestore
async function canAccessFirestore(): Promise<boolean> {
  if (!isFirebaseConfigured() || !db) {
    return false
  }

  try {
    // Try to read from a test collection to check permissions
    const testQuery = query(collection(db, "media"), limit(1))
    await getDocs(testQuery)
    return true
  } catch (error: any) {
    console.warn("Firestore access check failed:", error.message)
    return false
  }
}

// Cloudinary config (deberás poner tu cloud_name y upload_preset en .env.local)
const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/auto/upload`
const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

export async function uploadMedia(
  file: File,
  userId: string,
  username: string,
  userPhotoURL: string | null,
  metadata: {
    title: string
    description: string
    type: MediaType
    hashtags: string[]
    challengeId?: string
    challengeTitle?: string
  },
) {
  // Subida directa a Cloudinary
  if (!CLOUDINARY_UPLOAD_URL || !CLOUDINARY_UPLOAD_PRESET) {
    throw new Error("Cloudinary no está configurado correctamente.")
  }

  const formData = new FormData()
  formData.append("file", file)
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET)
  formData.append("folder", `${userId}/${metadata.type}`)

  // Puedes agregar más metadatos si lo deseas

  let uploadResponse
  try {
    uploadResponse = await fetch(CLOUDINARY_UPLOAD_URL, {
      method: "POST",
      body: formData,
    })
  } catch (err) {
    throw new Error("Error subiendo archivo a Cloudinary: " + err)
  }

  if (!uploadResponse.ok) {
    const errorText = await uploadResponse.text();
    throw new Error("Error en la respuesta de Cloudinary: " + errorText);
  }

  const uploadResult = await uploadResponse.json()
  const downloadURL = uploadResult.secure_url
  const thumbnailUrl = uploadResult.thumbnail_url || uploadResult.secure_url

  // Registro en Firestore (igual que antes)
  try {
    const mediaData: Omit<MediaItem, "id"> = {
      userId,
      username,
      userPhotoURL: userPhotoURL || undefined,
      title: metadata.title,
      description: metadata.description,
      mediaUrl: downloadURL,
      thumbnailUrl,
      type: metadata.type,
      hashtags: metadata.hashtags,
      likes: 0,
      views: 0,
      comments: 0,
      createdAt: Timestamp.now(),
      ...(metadata.challengeId && { challengeId: metadata.challengeId }),
      ...(metadata.challengeTitle && { challengeTitle: metadata.challengeTitle }),
    }

    const docRef = await addDoc(collection(db, "media"), mediaData)
    const userRef = doc(db, "users", userId)
    await updateDoc(userRef, {
      media: arrayUnion(docRef.id),
    })
    return { id: docRef.id, ...mediaData }
  } catch (error) {
    throw new Error("Error registrando media en Firestore: " + error)
  }
}

export async function getTrendingMedia(type: "views" | "likes" | "comments", limitCount = 10) {
  const hasAccess = await canAccessFirestore()

  if (!hasAccess) {
    console.log("Using mock data - Firebase not accessible or configured")
    // Return mock data when Firebase is not configured or accessible
    return mockMediaData.sort((a, b) => b[type] - a[type]).slice(0, limitCount)
  }

  try {
    const mediaQuery = query(collection(db, "media"), orderBy(type, "desc"), limit(limitCount))
    const snapshot = await getDocs(mediaQuery)
    const results = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as MediaItem)

    // If no results from Firebase, return mock data
    if (results.length === 0) {
      console.log("No data in Firebase, using mock data")
      return mockMediaData.sort((a, b) => b[type] - a[type]).slice(0, limitCount)
    }

    return results
  } catch (error: any) {
    console.warn(`Error getting trending media by ${type}:`, error.message)
    // Fallback to mock data on any error
    return mockMediaData.sort((a, b) => b[type] - a[type]).slice(0, limitCount)
  }
}

export async function getRecentMedia(limitCount = 10) {
  const hasAccess = await canAccessFirestore()

  if (!hasAccess) {
    console.log("Using mock data - Firebase not accessible")
    return mockMediaData.slice(0, limitCount)
  }

  try {
    const mediaQuery = query(collection(db, "media"), orderBy("createdAt", "desc"), limit(limitCount))
    const snapshot = await getDocs(mediaQuery)
    const results = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as MediaItem)

    // If no results from Firebase, return mock data
    if (results.length === 0) {
      return mockMediaData.slice(0, limitCount)
    }

    return results
  } catch (error: any) {
    console.warn("Error getting recent media:", error.message)
    // Fallback to mock data
    return mockMediaData.slice(0, limitCount)
  }
}

export async function getUserMedia(userId: string) {
  const hasAccess = await canAccessFirestore()

  if (!hasAccess) {
    // Return empty array when Firebase is not accessible
    return []
  }

  try {
    const mediaQuery = query(collection(db, "media"), where("userId", "==", userId), orderBy("createdAt", "desc"))
    const snapshot = await getDocs(mediaQuery)
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as MediaItem)
  } catch (error: any) {
    console.warn("Error getting user media:", error.message)
    return []
  }
}

export async function incrementMediaStats(mediaId: string, field: "views" | "likes" | "comments") {
  const hasAccess = await canAccessFirestore()

  if (!hasAccess) {
    console.warn("Firebase not accessible, skipping stats increment")
    return
  }

  try {
    const mediaRef = doc(db, "media", mediaId)
    await updateDoc(mediaRef, {
      [field]: increment(1),
    })
  } catch (error: any) {
    console.warn(`Error incrementing ${field} for media ${mediaId}:`, error.message)
  }
}
