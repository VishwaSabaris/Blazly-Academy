import { notFound } from "next/navigation";
import { CoursePlayerClient } from "@/components/courses/CoursePlayerClient";
import { getCourseBySlug, getEnrollment } from "@/lib/firestore";
import { getCurrentUser } from "@/lib/firebaseAdmin";

interface CoursePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    return notFound();
  }

  const user = await getCurrentUser();
  const enrollment = user ? await getEnrollment(user.uid, slug) : null;
  const isEnrolled = Boolean(enrollment) || course.price === 0;

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
