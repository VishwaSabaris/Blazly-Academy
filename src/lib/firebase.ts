"use client";

import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut as fbSignOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
  onAuthStateChanged,
  type Auth,
  type User,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const REDIRECT_KEY = "auth_redirect_url";

let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let googleProvider: GoogleAuthProvider | undefined;

function ensureFirebaseClient() {
  if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
    throw new Error(
      "Firebase client is not configured. Please define your NEXT_PUBLIC_FIREBASE_API_KEY in .env.local."
    );
  }

  if (auth && googleProvider) {
    return { auth, googleProvider };
  }

  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  auth = getAuth(app);
  googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({ prompt: "select_account" });

  return { auth, googleProvider };
}

function isIndexedDbClosingError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return message.includes("Database is closing/hidden");
}

async function persistSession(user: User) {
  const idToken = await user.getIdToken(true);
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: idToken }),
  });

  if (!res.ok) {
    throw new Error("Failed to establish session.");
  }
}

export async function completeGoogleRedirectSignIn(): Promise<User | null> {
  const { auth: firebaseAuth } = ensureFirebaseClient();
  const result = await getRedirectResult(firebaseAuth);

  if (!result?.user) {
    return null;
  }

  await persistSession(result.user);
  return result.user;
}

export async function signInWithGoogle(redirectUrl = "/dashboard"): Promise<{ user: User }> {
  const { auth: firebaseAuth, googleProvider: provider } = ensureFirebaseClient();

  try {
    const result = await signInWithPopup(firebaseAuth, provider);
    await persistSession(result.user);
    return { user: result.user };
  } catch (error) {
    if (
      isIndexedDbClosingError(error) ||
      (error instanceof Error && error.message.includes("auth/popup-blocked"))
    ) {
      sessionStorage.setItem(REDIRECT_KEY, redirectUrl);
      await signInWithRedirect(firebaseAuth, provider);
      return new Promise(() => {});
    }

    throw error;
  }
}

export async function signInWithEmail(
  email: string,
  password: string
): Promise<{ user: User }> {
  const { auth: firebaseAuth } = ensureFirebaseClient();
  const result = await signInWithEmailAndPassword(firebaseAuth, email, password);
  await persistSession(result.user);
  return { user: result.user };
}

export async function signUpWithEmail(
  email: string,
  password: string,
  name: string
): Promise<{ user: User }> {
  const { auth: firebaseAuth } = ensureFirebaseClient();
  const result = await createUserWithEmailAndPassword(firebaseAuth, email, password);
  await updateProfile(result.user, { displayName: name });
  await persistSession(result.user);
  return { user: result.user };
}

export async function resetPassword(email: string): Promise<void> {
  const { auth: firebaseAuth } = ensureFirebaseClient();
  await sendPasswordResetEmail(firebaseAuth, email);
}

export async function logOut(): Promise<void> {
  try {
    const { auth: firebaseAuth } = ensureFirebaseClient();
    await fbSignOut(firebaseAuth);
  } catch {
    // Ignore if Firebase was never initialized (e.g. already signed out).
  }

  await fetch("/api/auth/logout", { method: "POST" });
}

export function onAuthStateChangedHelper(callback: (user: User | null) => void) {
  try {
    const { auth: firebaseAuth } = ensureFirebaseClient();
    return onAuthStateChanged(firebaseAuth, callback);
  } catch (error) {
    console.error("Firebase auth listener failed:", error);
    callback(null);
    return () => {};
  }
}

export function consumeAuthRedirectUrl(): string {
  const redirectUrl = sessionStorage.getItem(REDIRECT_KEY) || "/dashboard";
  sessionStorage.removeItem(REDIRECT_KEY);
  return redirectUrl;
}

export { auth };
