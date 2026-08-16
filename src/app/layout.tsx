import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/auth/AuthProvider";

import logoImage from "../../blazly-logo-white.png";

export const metadata: Metadata = {
  title: "Blazly Academy — Professional GEO Certification",
  description:
    "Get certified in Generative Engine Optimization and other AI-native skills. Real curriculum, graded quizzes, verifiable certificates.",
  icons: {
    icon: logoImage.src,
  },
};

import fs from "fs";
import path from "path";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (typeof window === "undefined") {
    try {
      const faviconPath = path.join(process.cwd(), "src", "app", "favicon.ico");
      if (fs.existsSync(faviconPath)) {
        fs.unlinkSync(faviconPath);
        console.log("Deleted default Vercel favicon.ico");
      }
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=Fraunces:ital,wght@1,400;1,500&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
