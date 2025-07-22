"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import {
  type User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth"
import { auth, isFirebaseConfigured } from "@/lib/firebase"

type AuthContextType = {
  user: User | null
  loading: boolean
  isConfigured: boolean
  signUp: (email: string, password: string, username: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isConfigured: false,
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
  resetPassword: async () => {},
})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const configured = isFirebaseConfigured()

  useEffect(() => {
    if (!configured || !auth) {
      setLoading(false)
      return
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [configured])

  const signUp = async (email: string, password: string, username: string) => {
    if (!configured || !auth) {
      throw new Error("Firebase no está configurado")
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      // Update the user profile with the username
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: username,
        })
      }
    } catch (error) {
      console.error("Error signing up:", error)
      throw error
    }
  }

  const signIn = async (email: string, password: string) => {
    if (!configured || !auth) {
      throw new Error("Firebase no está configurado")
    }

    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      console.error("Error signing in:", error)
      throw error
    }
  }

  const logout = async () => {
    if (!configured || !auth) {
      throw new Error("Firebase no está configurado")
    }

    try {
      await signOut(auth)
    } catch (error) {
      console.error("Error signing out:", error)
      throw error
    }
  }

  const resetPassword = async (email: string) => {
    if (!configured || !auth) {
      throw new Error("Firebase no está configurado")
    }

    try {
      await sendPasswordResetEmail(auth, email)
    } catch (error) {
      console.error("Error sending password reset email:", error)
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, isConfigured: configured, signUp, signIn, logout, resetPassword }}>
      {children}
    </AuthContext.Provider>
  )
}
