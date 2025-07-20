// lib/firebase.ts

import { initializeApp, FirebaseApp, getApps, getApp } from "firebase/app";
import { getAuth, Auth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, Firestore, connectFirestoreEmulator } from "firebase/firestore";
import { getStorage, FirebaseStorage, connectStorageEmulator } from "firebase/storage";
import { getPerformance } from "firebase/performance";

/**
 * Objeto de configuración de Firebase usando variables de entorno Next.js.
 */
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

/**
 * Verifica si todas las variables necesarias están presentes y son válidas.
 */
export const isFirebaseConfigured = (): boolean => {
  return Object.values(firebaseConfig).every(
    (v) => !!v && v !== "" && !String(v).includes("demo-") && v !== "your-key-here"
  );
};

type FirebaseServices = {
  app: FirebaseApp | null;
  auth: Auth | null;
  db: Firestore | null;
  storage: FirebaseStorage | null;
  perf: any;
  isConfigured: boolean;
};

/**
 * Inicializa Firebase solo una vez y configura emuladores en desarrollo.
 */
const initializeFirebase = (): FirebaseServices => {
  const services: FirebaseServices = {
    app: null,
    auth: null,
    db: null,
    storage: null,
    perf: null,
    isConfigured: false,
  };

  if (!isFirebaseConfigured()) {
    console.error("Invalid Firebase configuration: Check your .env.local variables.");
    return services;
  }

  try {
    services.app = getApps().length ? getApp() : initializeApp(firebaseConfig);
    services.auth = getAuth(services.app);
    services.db = getFirestore(services.app);
    services.storage = getStorage(services.app);

    // Inicializa Performance solo en el navegador
    if (typeof window !== "undefined") {
      services.perf = getPerformance(services.app);
    }

    // Emuladores solo en modo desarrollo
    if (process.env.NODE_ENV === "development") {
      try {
        connectAuthEmulator(services.auth, "http://localhost:9099");
        connectFirestoreEmulator(services.db, "localhost", 8080);
        connectStorageEmulator(services.storage, "localhost", 9199);
        console.log("Firebase emulators connected (development mode)");
      } catch (emulatorErr) {
        console.warn("Error connecting emulators:", emulatorErr);
      }
    }

    services.isConfigured = true;
  } catch (error) {
    console.error("Firebase initialization failed:", error);
  }

  return services;
};

const { app, auth, db, storage, perf, isConfigured } = initializeFirebase();

// Exporta todos los servicios y utilidades necesarias
export { app, auth, db, storage, perf, isConfigured };

/**
 * Helpers seguros para obtener servicios
 */
export const getFirebaseAuth = (): Auth => {
  if (!auth || !isConfigured) {
    throw new Error("Firebase Auth not properly initialized. Check your .env.local variables.");
  }
  return auth;
};

export const getFirestoreDB = (): Firestore => {
  if (!db || !isConfigured) {
    throw new Error("Firestore not properly initialized. Check your .env.local variables.");
  }
  return db;
};

export const getFirebaseStorage = (): FirebaseStorage => {
  if (!storage || !isConfigured) {
    throw new Error("Firebase Storage not properly initialized. Check your .env.local variables.");
  }
  return storage;
};

