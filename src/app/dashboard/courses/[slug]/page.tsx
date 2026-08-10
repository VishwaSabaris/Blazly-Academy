import { notFound, redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { CoursePlayerClient } from "@/components/courses/CoursePlayerClient";

interface CoursePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params;
  const { userId } = await auth();

  if (!userId) {
    return redirect("/login");
  }

  // Fetch the user to get their DB ID
  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  const course = await prisma.course.findUnique({
    where: { slug: slug },
    include: {
      modules: {
        orderBy: { order: 'asc' },
        include: {
          lessons: {
            orderBy: { order: 'asc' },
          },
        },
      },
    },
  });

  if (!course) {
    return notFound();
  }

  // Check enrollment
  let isEnrolled = false;
  if (user) {
    const enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: course.id,
        },
      },
    });
    if (enrollment) {
      isEnrolled = true;
    }
  }

  return (
    <CoursePlayerClient 
      courseSlug={course.slug}
      courseTitle={course.title}
      courseDescription={course.description}
      isEnrolled={isEnrolled}
      modules={course.modules}
    />
  );
}
