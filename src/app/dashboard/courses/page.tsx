import { CourseSearchFilter } from "@/components/courses/CourseSearchFilter";
import { getPublishedCourses } from "@/lib/firestore";

export default async function MyCoursesPage() {
  const courses = await getPublishedCourses();

  return (
    <main className="mx-auto max-w-[1100px] px-6 py-10 md:px-12 reveal is-visible">
      <CourseSearchFilter
        dbCourses={courses.map(({ slug, title, description, price }) => ({
          slug,
          title,
          description,
          price,
        }))}
      />
    </main>
  );
}
