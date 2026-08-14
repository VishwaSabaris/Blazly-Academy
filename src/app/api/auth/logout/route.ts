import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("firebase-token");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[AUTH_LOGOUT_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
