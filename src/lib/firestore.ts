import { getFirestore, type Firestore } from "firebase-admin/firestore";
import { getAdminApp, isAdminConfigured } from "@/lib/firebaseAdmin";
import type {
  CourseRecord,
  CourseWithModules,
  EnrollmentRecord,
  ModuleRecord,
  PaymentRecord,
  UserRecord,
} from "@/lib/firestore-types";
import { courses as fallbackCourses } from "@/lib/courses";
import { getCurriculumForCourse } from "@/lib/courseData";

function getDb(): Firestore | null {
  if (!isAdminConfigured) return null;

  const app = getAdminApp();
  if (!app) return null;

  return getFirestore(app);
}

function fallbackPublishedCourses(): CourseRecord[] {
  return fallbackCourses.map((course) => ({
    slug: course.slug,
    title: course.title,
    description: course.description,
    price: course.slug === "geo-professional" ? 199 : 0,
    published: course.slug !== "geo-professional",
  }));
}

function fallbackCourseWithModules(slug: string): CourseWithModules | null {
  const course = fallbackCourses.find((item) => item.slug === slug);
  if (!course) return null;

  const curriculum = getCurriculumForCourse(slug);
  const modules: ModuleRecord[] = curriculum.map((module, index) => {
    const videoLesson = module.lessons.find((lesson) => lesson.type === "video");

    return {
      id: module.id,
      courseId: slug,
      title: module.title,
      description: module.description,
      order: index + 1,
      lessons: videoLesson
        ? [
            {
              id: videoLesson.id,
              moduleId: module.id,
              title: videoLesson.title,
              duration: videoLesson.duration,
              videoUrl: videoLesson.videoUrl || null,
              isFreePreview: module.id === "m1",
              order: 1,
            },
          ]
        : [],
    };
  });

  return {
    slug: course.slug,
    title: course.title,
    description: course.description,
    price: course.slug === "geo-professional" ? 199 : 0,
    published: course.slug !== "geo-professional",
    modules,
  };
}

export async function getPublishedCourses(): Promise<CourseRecord[]> {
  const db = getDb();
  if (!db) {
    return fallbackPublishedCourses();
  }

  try {
    const snapshot = await db.collection("courses").get();

    if (snapshot.empty) {
      return fallbackPublishedCourses();
    }

    return snapshot.docs
      .map((doc) => {
        const data = doc.data();
        return {
          slug: doc.id,
          title: String(data.title ?? ""),
          description: String(data.description ?? ""),
          price: Number(data.price ?? 0),
          published: Boolean(data.published),
        };
      })
      .filter((course) => course.published)
      .sort((a, b) => a.title.localeCompare(b.title));
  } catch (error) {
    console.warn("Firestore courses query failed. Using fallback data:", error);
    return fallbackPublishedCourses();
  }
}

export async function getCourseBySlug(slug: string): Promise<CourseWithModules | null> {
  const db = getDb();
  if (!db) {
    return fallbackCourseWithModules(slug);
  }

  try {
    const courseRef = db.collection("courses").doc(slug);
    const courseSnap = await courseRef.get();

    if (!courseSnap.exists) {
      return fallbackCourseWithModules(slug);
    }

    const courseData = courseSnap.data() ?? {};
    const modulesSnap = await courseRef.collection("modules").orderBy("order").get();

    const modules: ModuleRecord[] = await Promise.all(
      modulesSnap.docs.map(async (moduleDoc) => {
        const moduleData = moduleDoc.data();
        const lessonsSnap = await moduleDoc.ref.collection("lessons").orderBy("order").get();

        return {
          id: moduleDoc.id,
          courseId: slug,
          title: String(moduleData.title ?? ""),
          description: moduleData.description ? String(moduleData.description) : null,
          order: Number(moduleData.order ?? 0),
          lessons: lessonsSnap.docs.map((lessonDoc) => {
            const lessonData = lessonDoc.data();
            return {
              id: lessonDoc.id,
              moduleId: moduleDoc.id,
              title: String(lessonData.title ?? ""),
              duration: lessonData.duration ? String(lessonData.duration) : null,
              videoUrl: lessonData.videoUrl ? String(lessonData.videoUrl) : null,
              isFreePreview: Boolean(lessonData.isFreePreview),
              order: Number(lessonData.order ?? 0),
            };
          }),
        };
      })
    );

    return {
      slug,
      title: String(courseData.title ?? ""),
      description: String(courseData.description ?? ""),
      price: Number(courseData.price ?? 0),
      published: Boolean(courseData.published ?? false),
      modules,
    };
  } catch (error) {
    console.warn("Firestore course lookup failed. Using fallback data:", error);
    return fallbackCourseWithModules(slug);
  }
}

export async function upsertUser(user: {
  uid: string;
  email: string;
  name?: string;
}): Promise<UserRecord> {
  const db = getDb();
  if (!db) {
    throw new Error("Firestore is not configured.");
  }

  const userRef = db.collection("users").doc(user.uid);
  const existing = await userRef.get();
  const createdAt = existing.exists
    ? String(existing.data()?.createdAt ?? new Date().toISOString())
    : new Date().toISOString();

  const record: UserRecord = {
    uid: user.uid,
    email: user.email,
    name: user.name,
    createdAt,
  };

  await userRef.set(record, { merge: true });
  return record;
}

export async function getEnrollment(
  uid: string,
  courseSlug: string
): Promise<EnrollmentRecord | null> {
  const db = getDb();
  if (!db) return null;

  const snap = await db
    .collection("users")
    .doc(uid)
    .collection("enrollments")
    .doc(courseSlug)
    .get();

  if (!snap.exists) return null;

  const data = snap.data() ?? {};
  return {
    courseSlug,
    enrolledAt: String(data.enrolledAt ?? ""),
  };
}

export async function createEnrollment(
  uid: string,
  courseSlug: string
): Promise<EnrollmentRecord> {
  const db = getDb();
  if (!db) {
    throw new Error("Firestore is not configured.");
  }

  const enrollment: EnrollmentRecord = {
    courseSlug,
    enrolledAt: new Date().toISOString(),
  };

  await db
    .collection("users")
    .doc(uid)
    .collection("enrollments")
    .doc(courseSlug)
    .set(enrollment);

  return enrollment;
}

export async function hasUserCompletedPayment(uid: string): Promise<boolean> {
  const db = getDb();
  if (!db) return false;

  const userSnap = await db.collection("users").doc(uid).get();
  if (!userSnap.exists) return false;

  return Boolean(userSnap.data()?.hasPaid);
}

export async function savePaymentSuccess(payment: PaymentRecord): Promise<void> {
  const db = getDb();
  if (!db) {
    throw new Error("Firestore is not configured.");
  }

  const batch = db.batch();
  const userRef = db.collection("users").doc(payment.uid);
  const paymentRef = userRef.collection("payments").doc(payment.sessionId);
  const globalPaymentRef = db.collection("payments").doc(payment.sessionId);

  batch.set(
    userRef,
    {
      uid: payment.uid,
      email: payment.email,
      hasPaid: true,
      paidAt: payment.createdAt,
    },
    { merge: true }
  );

  batch.set(paymentRef, payment, { merge: true });
  batch.set(globalPaymentRef, payment, { merge: true });

  await batch.commit();
}
