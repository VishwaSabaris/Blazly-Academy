import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("firebase-token")?.value;
  const pathname = request.nextUrl.pathname;

  const requiresAuth =
    pathname.startsWith("/dashboard") || pathname.startsWith("/onboarding");

  if (requiresAuth && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect_url", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export default proxy;

export const config = {
  matcher: ["/dashboard/:path*", "/onboarding/:path*"],
};
