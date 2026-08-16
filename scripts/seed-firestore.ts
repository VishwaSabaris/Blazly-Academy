import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import fs from "fs";
import path from "path";

function loadEnvLocal() {
  try {
    const envPath = path.resolve(process.cwd(), ".env.local");
    const envContent = fs.readFileSync(envPath, "utf8");
    for (const line of envContent.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const [key, ...rest] = trimmed.split("=");
      if (!key || rest.length === 0) continue;
      process.env[key] = rest.join("=").replace(/^"|"$/g, "");
    }
  } catch {
    // Ignore missing .env.local during seed.
  }
}

loadEnvLocal();

const projectId =
  process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

if (!projectId || !clientEmail || !privateKey) {
  throw new Error(
    "Missing Firebase Admin credentials. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY in .env.local."
  );
}

if (getApps().length === 0) {
  initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
    projectId,
  });
}

const db = getFirestore();

const courses = [
  {
    slug: "geo-foundations",
    title: "GEO Foundations",
    description: "Understand the core concepts of Generative Engine Optimization.",
    price: 0,
    published: true,
    modules: [
      { id: "mod_geo_1", title: "Search is Changing", description: "Understand how search behavior is shifting in the AI era.", order: 1, lesson: { id: "les_geo_1", title: "Video Lecture", duration: "4:15", videoUrl: "/videos/module-1.mp4", isFreePreview: true, order: 1 } },
      { id: "mod_geo_2", title: "Understanding AI Search", description: "Deep dive into retrieval systems and synthesis engines.", order: 2, lesson: { id: "les_geo_2", title: "Video Lecture", duration: "6:20", videoUrl: "/videos/module-2.mp4", isFreePreview: false, order: 1 } },
      { id: "mod_geo_3", title: "Introduction to GEO", description: "Learn the core concepts of Generative Engine Optimization.", order: 3, lesson: { id: "les_geo_3", title: "Video Lecture", duration: "5:30", videoUrl: "/videos/module-3.mp4", isFreePreview: false, order: 1 } },
      { id: "mod_geo_4", title: "Content for AI", description: "How to structure and optimize content for LLM ingestion.", order: 4, lesson: { id: "les_geo_4", title: "Video Lecture", duration: "7:45", videoUrl: "/videos/module-4.mp4", isFreePreview: false, order: 1 } },
      { id: "mod_geo_5", title: "Building Digital Authority", description: "Establishing trustworthiness and credibility for LLMs.", order: 5, lesson: { id: "les_geo_5", title: "Video Lecture", duration: "8:10", videoUrl: "/videos/module-5.mp4", isFreePreview: false, order: 1 } },
      { id: "mod_geo_6", title: "Future of Search", description: "Preparing for the future of agentic and conversational engines.", order: 6, lesson: { id: "les_geo_6", title: "Video Lecture", duration: "5:55", videoUrl: "/videos/module-6.mp4", isFreePreview: false, order: 1 } },
    ],
  },
  {
    slug: "geo-professional",
    title: "GEO Professional",
    description: "Advanced strategies for technical SEO and LLM optimization.",
    price: 199,
    published: false,
    modules: [],
  },
  {
    slug: "platform-specialist",
    title: "Blazly Platform Specialist",
    description: "Master the Blazly video generation pipeline.",
    price: 0,
    published: true,
    modules: [],
  },
];

async function seed() {
  console.log("Seeding Firestore...");

  for (const course of courses) {
    const courseRef = db.collection("courses").doc(course.slug);
    await courseRef.set(
      {
        title: course.title,
        description: course.description,
        price: course.price,
        published: course.published,
      },
      { merge: true }
    );

    for (const module of course.modules) {
      const moduleRef = courseRef.collection("modules").doc(module.id);
      await moduleRef.set(
        {
          title: module.title,
          description: module.description,
          order: module.order,
        },
        { merge: true }
      );

      await moduleRef.collection("lessons").doc(module.lesson.id).set(
        {
          title: module.lesson.title,
          duration: module.lesson.duration,
          videoUrl: module.lesson.videoUrl,
          isFreePreview: module.lesson.isFreePreview,
          order: module.lesson.order,
        },
        { merge: true }
      );
    }

    console.log(`Seeded course: ${course.slug}`);
  }

  console.log("Firestore seed complete.");
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
