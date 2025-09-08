// lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";

// Firebase config from environment
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase app (singleton)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Export the app
export { app };

// Service initialization functions with error handling
export const initAuth = async () => {
  try {
    // @ts-ignore - Firebase v11 module resolution issue
    const { getAuth } = await import("firebase/auth");
    return getAuth(app);
  } catch (error) {
    console.error("Failed to initialize Firebase Auth:", error);
    return null;
  }
};

export const initFirestore = async () => {
  try {
    // @ts-ignore - Firebase v11 module resolution issue
    const { getFirestore } = await import("firebase/firestore");
    return getFirestore(app);
  } catch (error) {
    console.error("Failed to initialize Firestore:", error);
    return null;
  }
};

export const initStorage = async () => {
  try {
    // @ts-ignore - Firebase v11 module resolution issue
    const { getStorage } = await import("firebase/storage");
    return getStorage(app);
  } catch (error) {
    console.error("Failed to initialize Firebase Storage:", error);
    return null;
  }
};

export const initFunctions = async () => {
  try {
    // @ts-ignore - Firebase v11 module resolution issue
    const { getFunctions } = await import("firebase/functions");
    return getFunctions(app);
  } catch (error) {
    console.error("Failed to initialize Firebase Functions:", error);
    return null;
  }
};

export const initAnalytics = async () => {
  if (typeof window === "undefined") return null;
  
  try {
    // @ts-ignore - Firebase v11 module resolution issue
    const { getAnalytics, isSupported } = await import("firebase/analytics");
    const supported = await isSupported();
    if (supported) {
      return getAnalytics(app);
    }
    return null;
  } catch (error) {
    console.error("Failed to initialize Firebase Analytics:", error);
    return null;
  }
};

// Convenience exports
export const getAuth = initAuth;
export const getFirestore = initFirestore;
export const getStorage = initStorage;
export const getFunctions = initFunctions;
export const getAnalytics = initAnalytics;

// For immediate use (returns promises)
export const auth = initAuth();
export const db = initFirestore();
export const storage = initStorage();
export const functions = initFunctions();