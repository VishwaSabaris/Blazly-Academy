import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();
    if (!token) {
      return new NextResponse("Token is required", { status: 400 });
    }

    const cookieStore = await cookies();
    cookieStore.set("firebase-token", token, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[AUTH_LOGIN_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("firebase-token")?.value;
    return NextResponse.json({ loggedIn: !!token });
  } catch (error) {
    return NextResponse.json({ loggedIn: false });
  }
}
