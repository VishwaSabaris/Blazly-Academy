import { NextRequest, NextResponse } from "next/server";
import {
  createEnrollment,
  getCourseBySlug,
  getEnrollment,
  upsertUser,
} from "@/lib/firestore";
import { getCurrentUser } from "@/lib/firebaseAdmin";

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const user = await getCurrentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await getCourseBySlug(slug);
    if (!course) {
      return new NextResponse("Course Not Found", { status: 404 });
    }

    const existingEnrollment = await getEnrollment(user.uid, slug);
    if (existingEnrollment) {
      return new NextResponse("Already enrolled", { status: 400 });
    }

    await upsertUser({
      uid: user.uid,
      email: user.email,
      name: user.name,
    });

    const enrollment = await createEnrollment(user.uid, slug);
    return NextResponse.json(enrollment);
  } catch (error) {
    console.error("[COURSE_ENROLL]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
