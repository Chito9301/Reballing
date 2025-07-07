import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";

// Tipo para los servicios de Firebase
type FirebaseServices = {
  app: FirebaseApp | null;
  auth: Auth | null;
  db: Firestore | null;
  storage: FirebaseStorage | null;
  isConfigured: boolean;
};

// Verifica configuración completa
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
      console.warn(`Invalid or missing value for: ${key}`);
      return false;
    }
    return true;
  });
};

// Configuración dinámica
const getFirebaseConfig = () => {
  if (!checkConfiguration()) {
    throw new Error('Invalid Firebase configuration');
  }

  return {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
  };
};

// Inicialización segura
const initializeFirebase = (): FirebaseServices => {
  const services: FirebaseServices = {
    app: null,
    auth: null,
    db: null,
    storage: null,
    isConfigured: false
  };

  try {
    const config = getFirebaseConfig();
    services.app = initializeApp(config);
    services.auth = getAuth(services.app);
    services.db = getFirestore(services.app);
    services.storage = getStorage(services.app);
    services.isConfigured = true;
  } catch (error) {
    console.error('Firebase initialization failed:', error);
    services.isConfigured = false;
  }

  return services;
};

export const { app, auth, db, storage, isConfigured } = initializeFirebase();

// Helpers para acceso seguro
export const getFirebaseAuth = (): Auth => {
  if (!auth) throw new Error('Firebase Auth not initialized');
  return auth;
};

export const getFirestoreDB = (): Firestore => {
  if (!db) throw new Error('Firestore not initialized');
  return db;
};