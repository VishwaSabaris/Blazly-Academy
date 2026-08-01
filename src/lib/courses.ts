export type Category = "All";
export type Level = "Beginner" | "Intermediate" | "Advanced";

export type Course = {
  slug: string;
  tag: string;
  category: Category;
  level: Level;
  title: string;
  description: string;
  audience: string;
  modules: number;
  duration: string;
  rating: number;
  students: number;
  publishedDaysAgo: number;
  badge?: string;
  gradient: string;
  imageUrl?: string;
  progress?: number;
};

export const courses: Course[] = [
  {
    slug: "geo-foundations",
    tag: "GEO",
    category: "All",
    level: "Beginner",
    title: "GEO Foundations",
    description: "Understand AI Search",
    audience: "Beginners, Founders, Students",
    modules: 6,
    duration: "30 min",
    rating: 4.8,
    students: 2400,
    publishedDaysAgo: 5,
    badge: "New",
    gradient: "from-[#0B6E4F] to-[#0E4A38]",
    imageUrl: "/geo-foundations.png",
    progress: 100,
  },
  {
    slug: "geo-professional",
    tag: "GEO",
    category: "All",
    level: "Intermediate",
    title: "GEO Professional",
    description: "Implement GEO Strategies",
    audience: "SEO Experts, Agencies, Consultants",
    modules: 10,
    duration: "40 min",
    rating: 4.9,
    students: 1850,
    publishedDaysAgo: 12,
    badge: "Flagship",
    gradient: "from-[#3E4C39] to-[#20281E]",
    progress: 58,
  },
  {
    slug: "platform-specialist",
    tag: "Platform",
    category: "All",
    level: "Advanced",
    title: "Platform Specialist",
    description: "Master the Blazly Platform",
    audience: "Blazly Users and Analysts",
    modules: 7,
    duration: "40 min",
    rating: 4.7,
    students: 980,
    publishedDaysAgo: 3,
    gradient: "from-[#8A6A22] to-[#5B4515]",
  }
];
