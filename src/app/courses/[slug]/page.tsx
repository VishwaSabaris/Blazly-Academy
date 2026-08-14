import { CourseHero } from "@/components/courses/CourseHero";
import { CourseTabs } from "@/components/courses/CourseTabs";
import { Topbar } from "@/components/dashboard/Topbar";

interface CoursePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CourseDetailPage({ params }: CoursePageProps) {
  const { slug } = await params;

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <Topbar />
      <main className="flex-1">
        <CourseHero slug={slug} />
        <CourseTabs />
      </main>
    </div>
  );
}
