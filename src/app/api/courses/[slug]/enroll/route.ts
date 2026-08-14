import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const userId = "guest-user";

    const course = await prisma.course.findUnique({
      where: {
        slug: slug,
      },
    });

    if (!course) {
      return new NextResponse("Course Not Found", { status: 404 });
    }

    // Check if already enrolled
    const existingEnrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: userId,
          courseId: course.id,
        },
      },
    });

    if (existingEnrollment) {
      return new NextResponse("Already enrolled", { status: 400 });
    }

    // Check if the user exists in our DB, if not create them
    let user = await prisma.user.findUnique({
      where: { clerkId: userId }
    });

    if (!user) {
      // In a real app, we should use Clerk Webhooks to sync users automatically.
      // But for this demo, we'll create the user just-in-time if they don't exist yet.
      user = await prisma.user.create({
        data: {
          clerkId: userId,
          email: `${userId}@placeholder.com`, // We don't have access to the exact email without clerk API client
        }
      });
    }

    const enrollment = await prisma.enrollment.create({
      data: {
        userId: user.id,
        courseId: course.id,
      },
    });

    return NextResponse.json(enrollment);
  } catch (error) {
    console.error("[COURSE_ENROLL]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
