import { prisma } from "@/lib/prisma";
import { CourseSearchFilter } from "@/components/courses/CourseSearchFilter";

// This is a Server Component, meaning it fetches data directly from the DB securely on the server
export default async function MyCoursesPage() {
  // Fetch all published courses from our Neon Database!
  const courses = await prisma.course.findMany({
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

  return (
    <main className="mx-auto max-w-[1100px] px-6 py-10 md:px-12 reveal is-visible">
      {/* Pass the DB data down to the Client Component for interactive search */}
      <CourseSearchFilter dbCourses={courses} />
    </main>
  );
}
