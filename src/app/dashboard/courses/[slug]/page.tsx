import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { CoursePlayerClient } from "@/components/courses/CoursePlayerClient";
import { courses as mockCourses } from "@/lib/courses";
import { getCurriculumForCourse } from "@/lib/courseData";

interface CoursePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params;

  try {
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
    const isEnrolled = true;

    return (
      <CoursePlayerClient 
        courseSlug={course.slug}
        courseTitle={course.title}
        courseDescription={course.description}
        isEnrolled={isEnrolled}
        modules={course.modules}
      />
    );
  } catch (error) {
    console.warn("Database connection failed. Falling back to static mock course data:", error);
    
    const mockCourse = mockCourses.find((c) => c.slug === slug);
    if (!mockCourse) {
      return notFound();
    }

    // Map static curriculum lessons to the ModuleWithLessons interface
    const courseCurriculum = getCurriculumForCourse(slug);
    const fallbackModules = courseCurriculum.map((m, idx) => {
      const videoLesson = m.lessons.find((l) => l.type === "video");
      return {
        id: m.id,
        courseId: "fallback_course_id",
        title: m.title,
        description: m.description,
        order: idx + 1,
        lessons: videoLesson ? [{
          id: videoLesson.id,
          moduleId: m.id,
          title: videoLesson.title,
          duration: videoLesson.duration,
          videoUrl: videoLesson.videoUrl || null,
          isFreePreview: m.id === "m1", // Enable preview for the first module
          order: 1
        }] : []
      };
    });

    return (
      <CoursePlayerClient 
        courseSlug={mockCourse.slug}
        courseTitle={mockCourse.title}
        courseDescription={mockCourse.description}
        isEnrolled={true} // Default to enrolled for offline/dev preview
        modules={fallbackModules}
      />
    );
  }
}
