"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  onAuthStateChangedHelper,
  logOut as firebaseLogOut,
  completeGoogleRedirectSignIn,
  consumeAuthRedirectUrl,
} from "@/lib/firebase";
import type { User } from "firebase/auth";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  logout: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let unsubscribe = () => {};

    const init = async () => {
      try {
        const redirectUser = await completeGoogleRedirectSignIn();
        if (redirectUser) {
          setUser(redirectUser);
          router.replace(consumeAuthRedirectUrl());
          router.refresh();
        }
      } catch (error) {
        console.error("Google redirect sign-in failed:", error);
      }

      unsubscribe = onAuthStateChangedHelper((firebaseUser) => {
        setUser(firebaseUser);
        setLoading(false);
      });
    };

    void init();

    return () => unsubscribe();
  }, [router]);

  const logout = async () => {
    setLoading(true);
    try {
      await firebaseLogOut();
      setUser(null);
    } catch (e) {
      console.error("Sign out failed", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
