import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "demo-api-key",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "demo-project.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "demo-project",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "demo-project.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:123456789:web:abcdef123456",
}

// Check if we have valid Firebase configuration
export const isFirebaseConfigured = () => {
  return !!(
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN &&
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID &&
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET &&
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID &&
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID
  )
}

// Initialize Firebase
let app: any = null
let auth: any = null
let db: any = null
let storage: any = null

try {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

  if (isFirebaseConfigured()) {
    auth = getAuth(app)
    db = getFirestore(app)
    storage = getStorage(app)
  } else {
    console.warn("Firebase not configured. Using demo mode.")
    // In demo mode, we'll create mock objects
    auth = null
    db = null
    storage = null
  }
} catch (error) {
  console.error("Firebase initialization error:", error)
  // Fallback to null values
  auth = null
  db = null
  storage = null
}

export { app, auth, db, storage }
