import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut as fbSignOut, User, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const isConfigured = !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

let app: any;
let auth: any;
let googleProvider: any;

if (isConfigured) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();
  } catch (error) {
    console.error("Firebase client initialization failed:", error);
  }
} else {
  console.warn("Firebase credentials are not defined. Authentication features will not function until keys are provided in .env.local.");
}

export async function signInWithGoogle(): Promise<{ user: any }> {
  if (!auth) {
    throw new Error("Firebase client is not configured. Please define your NEXT_PUBLIC_FIREBASE_API_KEY in .env.local.");
  }
  const result = await signInWithPopup(auth, googleProvider);
  const idToken = await result.user.getIdToken();
  
  await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: idToken }),
  });

  return { user: result.user };
}

export async function signInWithEmail(email: string, password: string): Promise<{ user: any }> {
  if (!auth) {
    throw new Error("Firebase client is not configured. Please define your NEXT_PUBLIC_FIREBASE_API_KEY in .env.local.");
  }
  const result = await signInWithEmailAndPassword(auth, email, password);
  const idToken = await result.user.getIdToken();

  await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: idToken }),
  });

  return { user: result.user };
}

export async function signUpWithEmail(email: string, password: string, name: string): Promise<{ user: any }> {
  if (!auth) {
    throw new Error("Firebase client is not configured. Please define your NEXT_PUBLIC_FIREBASE_API_KEY in .env.local.");
  }
  const result = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(result.user, { displayName: name });
  const idToken = await result.user.getIdToken();

  await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: idToken }),
  });

  return { user: result.user };
}

export async function logOut(): Promise<void> {
  if (auth) {
    await fbSignOut(auth);
  }
  await fetch("/api/auth/logout", { method: "POST" });
}

export function onAuthStateChangedHelper(callback: (user: any) => void) {
  if (!auth) {
    callback(null);
    return () => {};
  }
  return auth.onAuthStateChanged(callback);
}

export { auth };
