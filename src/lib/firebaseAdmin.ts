import { getApps, initializeApp, cert, getApp, type App } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { cookies } from "next/headers";

const projectId =
  process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

export const isAdminConfigured = Boolean(
  projectId && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY
);

export function getAdminApp(): App | null {
  if (!isAdminConfigured || !projectId) return null;

  if (getApps().length > 0) {
    return getApp();
  }

  try {
    return initializeApp({
      credential: cert({
        projectId,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
        privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
      }),
      projectId,
    });
  } catch (error) {
    console.error("Firebase Admin initialization failed.", error);
    return null;
  }
}

if (!isAdminConfigured) {
  console.warn(
    "Firebase Admin credentials are not defined. Server-side Firestore access will use fallback data until FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY are set."
  );
} else {
  getAdminApp();
}

export type DecodedUser = {
  uid: string;
  email: string;
  name?: string;
  picture?: string;
};

export async function getCurrentUser(): Promise<DecodedUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("firebase-token")?.value;

  if (!token || !isAdminConfigured) return null;

  try {
    const app = getAdminApp();
    if (!app) return null;

    const decodedToken = await getAuth(app).verifyIdToken(token);
    return {
      uid: decodedToken.uid,
      email: decodedToken.email || "",
      name: decodedToken.name,
      picture: decodedToken.picture,
    };
  } catch (error) {
    console.error("Error verifying Firebase ID token:", error);
    return null;
  }
}
