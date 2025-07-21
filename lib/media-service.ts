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
  isViral?: boolean
  viralScore?: number
}

export interface ViralMetrics {
  averageViews: number
  averageLikes: number
  averageComments: number
  topPercentileViews: number
  topPercentileLikes: number
  topPercentileComments: number
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
    isViral: true,
    viralScore: 95,
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
    isViral: true,
    viralScore: 78,
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
    isViral: false,
    viralScore: 45,
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
    isViral: false,
    viralScore: 32,
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
    isViral: true,
    viralScore: 82,
  },
  {
    id: "6",
    userId: "demo-user-6",
    username: "@pedrogomez",
    userPhotoURL: "/placeholder.svg?height=40&width=40",
    title: "¡VIRAL! Baile épico de los 90s",
    description: "Este video se está volviendo viral! 🔥🔥🔥 #viral #challz",
    mediaUrl: "/placeholder.svg?height=800&width=400",
    type: "video",
    hashtags: ["#viral", "#challz", "#epic", "#90s"],
    likes: 2500,
    views: 12000,
    comments: 180,
    createdAt: Timestamp.now(),
    isViral: true,
    viralScore: 98,
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

// Calculate viral metrics from recent content (last 24 hours)
export async function calculateViralMetrics(): Promise<ViralMetrics> {
  const hasAccess = await canAccessFirestore()

  if (!hasAccess) {
    // Return mock metrics when Firebase is not accessible
    return {
      averageViews: 2500,
      averageLikes: 650,
      averageComments: 35,
      topPercentileViews: 4000,
      topPercentileLikes: 1000,
      topPercentileComments: 60,
    }
  }

  try {
    const twentyFourHoursAgo = new Date()
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24)

    const recentQuery = query(
      collection(db, "media"),
      where("createdAt", ">=", Timestamp.fromDate(twentyFourHoursAgo)),
      orderBy("createdAt", "desc"),
    )

    const snapshot = await getDocs(recentQuery)
    const recentMedia = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as MediaItem)

    if (recentMedia.length === 0) {
      // Fallback to mock metrics
      return {
        averageViews: 2500,
        averageLikes: 650,
        averageComments: 35,
        topPercentileViews: 4000,
        topPercentileLikes: 1000,
        topPercentileComments: 60,
      }
    }

    // Calculate averages
    const totalViews = recentMedia.reduce((sum, item) => sum + item.views, 0)
    const totalLikes = recentMedia.reduce((sum, item) => sum + item.likes, 0)
    const totalComments = recentMedia.reduce((sum, item) => sum + item.comments, 0)

    const averageViews = totalViews / recentMedia.length
    const averageLikes = totalLikes / recentMedia.length
    const averageComments = totalComments / recentMedia.length

    // Calculate 90th percentile thresholds
    const sortedByViews = [...recentMedia].sort((a, b) => b.views - a.views)
    const sortedByLikes = [...recentMedia].sort((a, b) => b.likes - a.likes)
    const sortedByComments = [...recentMedia].sort((a, b) => b.comments - a.comments)

    const percentileIndex = Math.floor(recentMedia.length * 0.1) // Top 10%

    return {
      averageViews,
      averageLikes,
      averageComments,
      topPercentileViews: sortedByViews[percentileIndex]?.views || averageViews * 2,
      topPercentileLikes: sortedByLikes[percentileIndex]?.likes || averageLikes * 2,
      topPercentileComments: sortedByComments[percentileIndex]?.comments || averageComments * 2,
    }
  } catch (error: any) {
    console.warn("Error calculating viral metrics:", error.message)
    // Fallback to mock metrics
    return {
      averageViews: 2500,
      averageLikes: 650,
      averageComments: 35,
      topPercentileViews: 4000,
      topPercentileLikes: 1000,
      topPercentileComments: 60,
    }
  }
}

// Calculate viral score for a media item
export function calculateViralScore(media: MediaItem, metrics: ViralMetrics): number {
  // Weight factors for different engagement types
  const viewsWeight = 0.4
  const likesWeight = 0.35
  const commentsWeight = 0.25

  // Calculate normalized scores (0-100)
  const viewsScore = Math.min(100, (media.views / metrics.topPercentileViews) * 100)
  const likesScore = Math.min(100, (media.likes / metrics.topPercentileLikes) * 100)
  const commentsScore = Math.min(100, (media.comments / metrics.topPercentileComments) * 100)

  // Calculate weighted viral score
  const viralScore = viewsScore * viewsWeight + likesScore * likesWeight + commentsScore * commentsWeight

  return Math.round(viralScore)
}

// Determine if content is viral
export function isContentViral(media: MediaItem, metrics: ViralMetrics): boolean {
  const viralScore = calculateViralScore(media, metrics)

  // Content is viral if:
  // 1. Viral score is above 70
  // 2. OR it exceeds average in all three metrics by significant margin
  const exceedsAverages =
    media.views > metrics.averageViews * 1.5 &&
    media.likes > metrics.averageLikes * 1.5 &&
    media.comments > metrics.averageComments * 1.5

  return viralScore > 70 || exceedsAverages
}

// Get viral content with smart distribution
export async function getViralContent(limitCount = 10, userId?: string): Promise<MediaItem[]> {
  const hasAccess = await canAccessFirestore()

  if (!hasAccess) {
    // Return mock viral content with some randomization
    const viralMockData = mockMediaData.filter((item) => item.isViral)
    const shuffled = [...viralMockData].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, limitCount)
  }

  try {
    const metrics = await calculateViralMetrics()

    // Get recent high-engagement content
    const viralQuery = query(
      collection(db, "media"),
      orderBy("views", "desc"),
      limit(limitCount * 2), // Get more to filter and randomize
    )

    const snapshot = await getDocs(viralQuery)
    let results = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as MediaItem)

    // Calculate viral scores and filter
    results = results
      .map((item) => ({
        ...item,
        viralScore: calculateViralScore(item, metrics),
        isViral: isContentViral(item, metrics),
      }))
      .filter((item) => item.isViral)

    // Smart distribution: mix top viral with some randomization
    const topViral = results.slice(0, Math.ceil(limitCount * 0.7)) // 70% top viral
    const randomViral = results
      .slice(Math.ceil(limitCount * 0.7))
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.floor(limitCount * 0.3)) // 30% random viral

    const finalResults = [...topViral, ...randomViral].slice(0, limitCount)

    // If no viral content found, fallback to mock data
    if (finalResults.length === 0) {
      const viralMockData = mockMediaData.filter((item) => item.isViral)
      return viralMockData.slice(0, limitCount)
    }

    return finalResults
  } catch (error: any) {
    console.warn("Error getting viral content:", error.message)
    // Fallback to mock viral content
    const viralMockData = mockMediaData.filter((item) => item.isViral)
    return viralMockData.slice(0, limitCount)
  }
}

// Enhanced trending media with viral prioritization
export async function getTrendingMedia(type: "views" | "likes" | "comments", limitCount = 10) {
  const hasAccess = await canAccessFirestore()

  if (!hasAccess) {
    console.log("Using mock data - Firebase not accessible or configured")
    // Prioritize viral content in mock data
    const viral = mockMediaData.filter((item) => item.isViral).sort((a, b) => b[type] - a[type])
    const nonViral = mockMediaData.filter((item) => !item.isViral).sort((a, b) => b[type] - a[type])
    return [...viral, ...nonViral].slice(0, limitCount)
  }

  try {
    const metrics = await calculateViralMetrics()
    const mediaQuery = query(collection(db, "media"), orderBy(type, "desc"), limit(limitCount * 2))
    const snapshot = await getDocs(mediaQuery)
    let results = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as MediaItem)

    // Add viral scoring
    results = results.map((item) => ({
      ...item,
      viralScore: calculateViralScore(item, metrics),
      isViral: isContentViral(item, metrics),
    }))

    // Prioritize viral content
    const viral = results.filter((item) => item.isViral)
    const nonViral = results.filter((item) => !item.isViral)

    // Mix: 70% viral, 30% non-viral
    const viralCount = Math.ceil(limitCount * 0.7)
    const nonViralCount = limitCount - viralCount

    const finalResults = [...viral.slice(0, viralCount), ...nonViral.slice(0, nonViralCount)]

    // If no results from Firebase, return mock data with viral priority
    if (finalResults.length === 0) {
      console.log("No data in Firebase, using mock data with viral priority")
      const viral = mockMediaData.filter((item) => item.isViral).sort((a, b) => b[type] - a[type])
      const nonViral = mockMediaData.filter((item) => !item.isViral).sort((a, b) => b[type] - a[type])
      return [...viral, ...nonViral].slice(0, limitCount)
    }

    return finalResults.slice(0, limitCount)
  } catch (error: any) {
    console.warn(`Error getting trending media by ${type}:`, error.message)
    // Fallback to mock data with viral priority
    const viral = mockMediaData.filter((item) => item.isViral).sort((a, b) => b[type] - a[type])
    const nonViral = mockMediaData.filter((item) => !item.isViral).sort((a, b) => b[type] - a[type])
    return [...viral, ...nonViral].slice(0, limitCount)
  }
}

export async function getRecentMedia(limitCount = 10) {
  const hasAccess = await canAccessFirestore()

  if (!hasAccess) {
    console.log("Using mock data - Firebase not accessible")
    // Prioritize viral content in recent feed
    const viral = mockMediaData.filter((item) => item.isViral)
    const nonViral = mockMediaData.filter((item) => !item.isViral)
    return [...viral, ...nonViral].slice(0, limitCount)
  }

  try {
    const metrics = await calculateViralMetrics()
    const mediaQuery = query(collection(db, "media"), orderBy("createdAt", "desc"), limit(limitCount * 2))
    const snapshot = await getDocs(mediaQuery)
    let results = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as MediaItem)

    // Add viral scoring
    results = results.map((item) => ({
      ...item,
      viralScore: calculateViralScore(item, metrics),
      isViral: isContentViral(item, metrics),
    }))

    // Smart mix: prioritize viral but maintain chronological diversity
    const viral = results.filter((item) => item.isViral)
    const nonViral = results.filter((item) => !item.isViral)

    // 60% viral, 40% recent non-viral for better balance
    const viralCount = Math.ceil(limitCount * 0.6)
    const nonViralCount = limitCount - viralCount

    const finalResults = [...viral.slice(0, viralCount), ...nonViral.slice(0, nonViralCount)]

    // If no results from Firebase, return mock data
    if (finalResults.length === 0) {
      const viral = mockMediaData.filter((item) => item.isViral)
      const nonViral = mockMediaData.filter((item) => !item.isViral)
      return [...viral, ...nonViral].slice(0, limitCount)
    }

    return finalResults.slice(0, limitCount)
  } catch (error: any) {
    console.warn("Error getting recent media:", error.message)
    // Fallback to mock data
    const viral = mockMediaData.filter((item) => item.isViral)
    const nonViral = mockMediaData.filter((item) => !item.isViral)
    return [...viral, ...nonViral].slice(0, limitCount)
  }
}

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
  const hasAccess = await canAccessFirestore()

  if (!hasAccess || !storage) {
    throw new Error("Firebase no está configurado correctamente o no tienes permisos de acceso.")
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
            isViral: false,
            viralScore: 0,
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

    // After updating stats, check if content became viral
    // This could trigger notifications or other viral content actions
    console.log(`Updated ${field} for media ${mediaId}`)
  } catch (error: any) {
    console.warn(`Error incrementing ${field} for media ${mediaId}:`, error.message)
  }
}
