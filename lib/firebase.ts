// lib/firebase.ts
import { initializeApp, FirebaseApp, getApps, getApp } from "firebase/app";
import { getAuth, Auth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, Firestore, connectFirestoreEmulator } from "firebase/firestore";
import { getStorage, FirebaseStorage, connectStorageEmulator } from "firebase/storage";
import { getPerformance } from "firebase/performance";

type FirebaseServices = {
  app: FirebaseApp | null;
  auth: Auth | null;
  db: Firestore | null;
  storage: FirebaseStorage | null;
  perf: any;
  isConfigured: boolean;
};

const checkConfiguration = (): boolean => {
  const requiredKeys = [
    'NEXT_PUBLIC_FIREBASE_API_KEY',
    'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
    'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
    'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
    'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
    'NEXT_PUBLIC_FIREBASE_APP_ID'
  ];

  return requiredKeys.every(key => {
    const value = process.env[key];
    if (!value || value.includes('demo-') || value === 'your-key-here') {
      return false;
    }
    return true;
  });
};

export const isFirebaseConfigured = (): boolean => {
  return checkConfiguration();
};

const initializeFirebase = (): FirebaseServices => {
  const services: FirebaseServices = {
    app: null,
    auth: null,
    db: null,
    storage: null,
    perf: null,
    isConfigured: false
  };

  try {
    if (!isFirebaseConfigured()) {
      throw new Error('Invalid Firebase configuration: One or more environment variables are missing or invalid.');
    }

    const config = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!
    };

    services.app = !getApps().length ? initializeApp(config) : getApp();
    services.auth = getAuth(services.app);
    services.db = getFirestore(services.app);
    services.storage = getStorage(services.app);

    // SOLO inicializar Performance en el cliente (navegador)
    if (typeof window !== 'undefined') {
      services.perf = getPerformance(services.app);
    } else {
      services.perf = null;
    }

    services.isConfigured = true;

    if (process.env.NODE_ENV === 'development') {
      connectAuthEmulator(services.auth, 'http://localhost:9099');
      connectFirestoreEmulator(services.db, 'localhost', 8080);
      connectStorageEmulator(services.storage, 'localhost', 9199);
    }

  } catch (error) {
    console.error('Firebase initialization failed:', error);
    services.isConfigured = false;
  }

  return services;
};

const { app, auth, db, storage, perf, isConfigured } = initializeFirebase();

export { app, auth, db, storage, perf, isConfigured };

export const getFirebaseAuth = (): Auth => {
  if (!auth || !isConfigured) {
    throw new Error('Firebase Auth not properly initialized. Check your .env.local variables.');
  }
  return auth;
};

export const getFirestoreDB = (): Firestore => {
  if (!db || !isConfigured) {
    throw new Error('Firestore not properly initialized. Check your .env.local variables.');
  }
  return db;
};

export const getFirebaseStorage = (): FirebaseStorage => {
  if (!storage || !isConfigured) {
    throw new Error('Firebase Storage not properly initialized. Check your .env.local variables.');
  }
  return storage;
};
