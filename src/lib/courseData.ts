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
    title: "Search is Changing",
    description: "Understand how search behavior is shifting in the AI era.",
    lessons: [
      { id: "l1", title: "Video Lecture", duration: "4:32", type: "video", videoUrl: "https://drive.google.com/file/d/1_VTrIC-wVfqiVhKzfkSGjAeY7aC4Or_F/preview" },
      { id: "l1_quiz", title: "Module Quiz", duration: "3:00", type: "quiz" },
    ],
  },
  {
    id: "m2",
    title: "Understanding AI Search",
    description: "Deep dive into retrieval systems and synthesis engines.",
    lessons: [
      { id: "l2", title: "Video Lecture", duration: "4:13", type: "video", videoUrl: "https://drive.google.com/file/d/1NRGxDCPMrOQ_aWqx0Df2g4uXXIhDiClq/preview" },
      { id: "l2_quiz", title: "Module Quiz", duration: "3:00", type: "quiz" },
    ],
  },
  {
    id: "m3",
    title: "Introduction to GEO",
    description: "Learn the core concepts of Generative Engine Optimization.",
    lessons: [
      { id: "l3", title: "Video Lecture", duration: "6:59", type: "video", videoUrl: "https://drive.google.com/file/d/1IEYgPWX5JRfteDcHbPH99w4J9KJV4CyF/preview" },
      { id: "l3_quiz", title: "Module Quiz", duration: "3:00", type: "quiz" },
    ],
  },
  {
    id: "m4",
    title: "Content for AI",
    description: "How to structure and optimize content for LLM ingestion.",
    lessons: [
      { id: "l4", title: "Video Lecture", duration: "4:19", type: "video", videoUrl: "https://drive.google.com/file/d/1NczIAUKxLxVIatQ89oNnvH3f18AjhjwK/preview" },
      { id: "l4_quiz", title: "Module Quiz", duration: "3:00", type: "quiz" },
    ],
  },
  {
    id: "m5",
    title: "Building Digital Authority",
    description: "Establishing trustworthiness and credibility for LLMs.",
    lessons: [
      { id: "l5", title: "Video Lecture", duration: "3:33", type: "video", videoUrl: "https://drive.google.com/file/d/1ozxqAXJut3RtgaIg7I84pOABtwLCTRPF/preview" },
      { id: "l5_quiz", title: "Module Quiz", duration: "3:00", type: "quiz" },
    ],
  },
  {
    id: "m6",
    title: "Future of Search",
    description: "Preparing for the future of agentic and conversational engines.",
    lessons: [
      { id: "l6", title: "Video Lecture", duration: "2:45", type: "video", videoUrl: "https://drive.google.com/file/d/1yQ_2WMY99LUAA38LS-2fE50sU1RgAH1s/preview" },
      { id: "l6_quiz", title: "Module Quiz", duration: "3:00", type: "quiz" },
    ],
  },
];

export const professionalCurriculum: Module[] = [
  {
    id: "pm1",
    title: "Advanced RAG Structures",
    description: "Learn semantic architectures and vector embeddings.",
    lessons: [
      { id: "pl1", title: "Video Lecture", duration: "5:00", type: "video" },
      { id: "pl1_quiz", title: "Module Quiz", duration: "3:00", type: "quiz" },
    ],
  },
  {
    id: "pm2",
    title: "Context Windows Optimization",
    description: "Master prompt padding and semantic text splitting.",
    lessons: [
      { id: "pl2", title: "Video Lecture", duration: "5:00", type: "video" },
      { id: "pl2_quiz", title: "Module Quiz", duration: "3:00", type: "quiz" },
    ],
  },
  {
    id: "pm3",
    title: "Controlling AI Citations",
    description: "Establish brand anchor mapping for LLM extraction.",
    lessons: [
      { id: "pl3", title: "Video Lecture", duration: "5:00", type: "video" },
      { id: "pl3_quiz", title: "Module Quiz", duration: "3:00", type: "quiz" },
    ],
  },
  {
    id: "pm4",
    title: "Sentiment Alignment",
    description: "Optimizing content syntax to fit sentiment filters.",
    lessons: [
      { id: "pl4", title: "Video Lecture", duration: "5:00", type: "video" },
      { id: "pl4_quiz", title: "Module Quiz", duration: "3:00", type: "quiz" },
    ],
  },
  {
    id: "pm5",
    title: "Knowledge Graph Integration",
    description: "Connecting structured schemas to semantic networks.",
    lessons: [
      { id: "pl5", title: "Video Lecture", duration: "5:00", type: "video" },
      { id: "pl5_quiz", title: "Module Quiz", duration: "3:00", type: "quiz" },
    ],
  },
  {
    id: "pm6",
    title: "Structured Schema Markup",
    description: "Using JSON-LD and microdata for search crawlers.",
    lessons: [
      { id: "pl6", title: "Video Lecture", duration: "5:00", type: "video" },
      { id: "pl6_quiz", title: "Module Quiz", duration: "3:00", type: "quiz" },
    ],
  },
  {
    id: "pm7",
    title: "Multi-Agent Scenarios",
    description: "Analyzing agent workflows in LLM search synthesis.",
    lessons: [
      { id: "pl7", title: "Video Lecture", duration: "5:00", type: "video" },
      { id: "pl7_quiz", title: "Module Quiz", duration: "3:00", type: "quiz" },
    ],
  },
  {
    id: "pm8",
    title: "Tracking GenAI Search Share",
    description: "Measuring brand visibility on Perplexity, Gemini, and ChatGPT.",
    lessons: [
      { id: "pl8", title: "Video Lecture", duration: "5:00", type: "video" },
      { id: "pl8_quiz", title: "Module Quiz", duration: "3:00", type: "quiz" },
    ],
  },
  {
    id: "pm9",
    title: "Conversational Copywriting",
    description: "Crafting text that models answer outputs.",
    lessons: [
      { id: "pl9", title: "Video Lecture", duration: "5:00", type: "video" },
      { id: "pl9_quiz", title: "Module Quiz", duration: "3:00", type: "quiz" },
    ],
  },
  {
    id: "pm10",
    title: "GEO Strategy & Audit Reporting",
    description: "Running automated audits on brand search presence.",
    lessons: [
      { id: "pl10", title: "Video Lecture", duration: "5:00", type: "video" },
      { id: "pl10_quiz", title: "Module Quiz", duration: "3:00", type: "quiz" },
    ],
  },
];

export function getCurriculumForCourse(slug: string): Module[] {
  if (slug === "geo-foundations") {
    return curriculum;
  }
  return professionalCurriculum;
}


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
