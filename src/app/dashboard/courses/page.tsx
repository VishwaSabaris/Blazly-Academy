import { prisma } from "@/lib/prisma";
import { CourseSearchFilter } from "@/components/courses/CourseSearchFilter";

// This is a Server Component, meaning it fetches data directly from the DB securely on the server
export default async function MyCoursesPage() {
  let courses = [];
  try {
    // Fetch all published courses from our Neon Database!
    courses = await prisma.course.findMany({
      where: {
        published: true
      },
      select: {
        slug: true,
        title: true,
        description: true,
        price: true
      },
      orderBy: {
        title: 'asc'
      }
    });
  } catch (error) {
    console.warn("Database connection failed. Falling back to static mock courses:", error);
    courses = [
      {
        slug: "geo-foundations",
        title: "GEO Foundations",
        description: "Understand the core concepts of Generative Engine Optimization.",
        price: 0
      },
      {
        slug: "geo-professional",
        title: "GEO Professional",
        description: "Advanced strategies for technical SEO and LLM optimization.",
        price: 199
      },
      {
        slug: "platform-specialist",
        title: "Blazly Platform Specialist",
        description: "Master the Blazly video generation pipeline.",
        price: 0
      }
    ];
  }

  return (
    <main className="mx-auto max-w-[1100px] px-6 py-10 md:px-12 reveal is-visible">
      {/* Pass the DB data down to the Client Component for interactive search */}
      <CourseSearchFilter dbCourses={courses} />
    </main>
  );
}
