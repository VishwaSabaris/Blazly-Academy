import { CourseHero } from "@/components/courses/CourseHero";
import { CourseTabs } from "@/components/courses/CourseTabs";
import { Topbar } from "@/components/dashboard/Topbar";

export default function CourseDetailPage({ params }: { params: { slug: string } }) {
  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <Topbar />
      <main className="flex-1">
        <CourseHero slug={params.slug} />
        <CourseTabs />
      </main>
    </div>
  );
}
