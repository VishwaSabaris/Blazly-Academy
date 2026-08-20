export type CourseRecord = {
  slug: string;
  title: string;
  description: string;
  price: number;
  published: boolean;
};

export type LessonRecord = {
  id: string;
  moduleId: string;
  title: string;
  duration: string | null;
  videoUrl: string | null;
  isFreePreview: boolean;
  order: number;
};

export type ModuleRecord = {
  id: string;
  courseId: string;
  title: string;
  description: string | null;
  order: number;
  lessons: LessonRecord[];
};

export type CourseWithModules = CourseRecord & {
  modules: ModuleRecord[];
};

export type EnrollmentRecord = {
  courseSlug: string;
  enrolledAt: string;
};

export type UserRecord = {
  uid: string;
  email: string;
  name?: string;
  createdAt: string;
  hasPaid?: boolean;
  paidAt?: string;
  stripeCustomerId?: string;
};

export type PaymentRecord = {
  sessionId: string;
  paymentIntentId: string | null;
  amountTotal: number;
  currency: string;
  status: string;
  productId: string;
  priceId: string;
  email: string;
  uid: string;
  createdAt: string;
};
