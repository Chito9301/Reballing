import { storage, db, isFirebaseConfigured } from "./firebase"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
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

// Mock data for when Firebase is not configured
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
]

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
  if (!isFirebaseConfigured() || !storage || !db) {
    throw new Error("Firebase no está configurado. Por favor configura las variables de entorno.")
  }

  try {
    // Create a unique filename
    const fileExtension = file.name.split(".").pop()
    const fileName = `${userId}/${metadata.type}/${uuidv4()}.${fileExtension}`
    const storageRef = ref(storage, fileName)

    // Upload the file
    const uploadTask = uploadBytesResumable(storageRef, file)

    // Return a promise that resolves when the upload is complete
    return new Promise<MediaItem>((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // You can track progress here if needed
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log("Upload is " + progress + "% done")
        },
        (error) => {
          // Handle unsuccessful uploads
          console.error("Upload failed:", error)
          reject(error)
        },
        async () => {
          // Handle successful uploads
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)

          // Create a document in Firestore
          const mediaData: Omit<MediaItem, "id"> = {
            userId,
            username,
            userPhotoURL: userPhotoURL || undefined,
            title: metadata.title,
            description: metadata.description,
            mediaUrl: downloadURL,
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

          // Update the user's media array
          const userRef = doc(db, "users", userId)
          await updateDoc(userRef, {
            media: arrayUnion(docRef.id),
          })

          resolve({ id: docRef.id, ...mediaData })
        },
      )
    })
  } catch (error) {
    console.error("Error in uploadMedia:", error)
    throw error
  }
}

export async function getTrendingMedia(type: "views" | "likes" | "comments", limit = 10) {
  if (!isFirebaseConfigured() || !db) {
    // Return mock data when Firebase is not configured
    return mockMediaData.sort((a, b) => b[type] - a[type]).slice(0, limit)
  }

  try {
    const mediaQuery = query(collection(db, "media"), orderBy(type, "desc"), limit(limit))

    const snapshot = await getDocs(mediaQuery)
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as MediaItem)
  } catch (error) {
    console.error(`Error getting trending media by ${type}:`, error)
    // Fallback to mock data
    return mockMediaData.sort((a, b) => b[type] - a[type]).slice(0, limit)
  }
}

export async function getRecentMedia(limit = 10) {
  if (!isFirebaseConfigured() || !db) {
    // Return mock data when Firebase is not configured
    return mockMediaData.slice(0, limit)
  }

  try {
    const mediaQuery = query(collection(db, "media"), orderBy("createdAt", "desc"), limit(limit))

    const snapshot = await getDocs(mediaQuery)
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as MediaItem)
  } catch (error) {
    console.error("Error getting recent media:", error)
    // Fallback to mock data
    return mockMediaData.slice(0, limit)
  }
}

export async function getUserMedia(userId: string) {
  if (!isFirebaseConfigured() || !db) {
    // Return empty array when Firebase is not configured
    return []
  }

  try {
    const mediaQuery = query(collection(db, "media"), where("userId", "==", userId), orderBy("createdAt", "desc"))

    const snapshot = await getDocs(mediaQuery)
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as MediaItem)
  } catch (error) {
    console.error("Error getting user media:", error)
    return []
  }
}

export async function incrementMediaStats(mediaId: string, field: "views" | "likes" | "comments") {
  if (!isFirebaseConfigured() || !db) {
    console.warn("Firebase not configured, skipping stats increment")
    return
  }

  try {
    const mediaRef = doc(db, "media", mediaId)
    await updateDoc(mediaRef, {
      [field]: increment(1),
    })
  } catch (error) {
    console.error(`Error incrementing ${field} for media ${mediaId}:`, error)
  }
}
