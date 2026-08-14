import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { cookies } from "next/headers";

const isAdminConfigured = !!process.env.FIREBASE_PROJECT_ID;

if (isAdminConfigured && getApps().length === 0) {
  try {
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      }),
    });
  } catch (e) {
    console.error("Firebase Admin initialization failed.", e);
  }
} else if (!isAdminConfigured) {
  console.warn("Firebase Admin credentials are not defined. Server-side session verification will fail until keys are provided in env.");
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
    const decodedToken = await getAuth().verifyIdToken(token);
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
