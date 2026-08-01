export type Lesson = {
  id: string;
  title: string;
  duration: string;
  type: "video" | "reading" | "quiz";
  videoUrl?: string;
};

export type Module = {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
};

export type Review = {
  id: string;
  author: string;
  role: string;
  avatar: string;
  rating: number;
  text: string;
  date: string;
};

export type Resource = {
  id: string;
  title: string;
  type: string;
  url: string;
};

export const curriculum: Module[] = [
  {
    id: "m1",
    title: "Module 1: Introduction to GEO",
    description: "Understand the fundamentals of Generative Engine Optimization.",
    lessons: [
      { id: "l1", title: "What is GEO?", duration: "5:30", type: "video" },
      { id: "l2", title: "SEO vs GEO", duration: "8:15", type: "video" },
      { id: "l3", title: "Core Concepts Quiz", duration: "2:00", type: "quiz" },
    ],
  },
  {
    id: "m2",
    title: "Module 2: AI Search Algorithms",
    description: "Deep dive into how LLMs index and retrieve information.",
    lessons: [
      { id: "l4", title: "How RAG Works", duration: "12:45", type: "video" },
      { id: "l5", title: "Optimizing for Retrieval", duration: "10:20", type: "video" },
      { id: "l6", title: "Algorithmic Factors", duration: "5:00", type: "reading" },
    ],
  },
  {
    id: "m3",
    title: "Module 3: Structuring Content",
    description: "Learn how to format data for maximum AI visibility.",
    lessons: [
      { id: "l7", title: "Data Density and Entities", duration: "9:10", type: "video" },
      { id: "l8", title: "Using Tables and Lists", duration: "6:40", type: "video" },
      { id: "l9", title: "Content Structure Quiz", duration: "3:00", type: "quiz" },
    ],
  }
];

export const reviews: Review[] = [
  {
    id: "r1",
    author: "Sarah Chen",
    role: "Head of SEO",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    rating: 5,
    text: "This course completely changed my approach to content strategy. The insights into RAG are invaluable.",
    date: "2 weeks ago",
  },
  {
    id: "r2",
    author: "Michael Ross",
    role: "Content Director",
    avatar: "https://i.pravatar.cc/150?u=michael",
    rating: 5,
    text: "The practical examples of formatting content for AI engines were exactly what our agency needed.",
    date: "1 month ago",
  }
];

export const resources: Resource[] = [
  { id: "res1", title: "GEO Checklist 2026", type: "PDF", url: "#" },
  { id: "res2", title: "Content Structure Template", type: "Notion", url: "#" },
  { id: "res3", title: "AI Search Ranking Factors", type: "Spreadsheet", url: "#" },
];
