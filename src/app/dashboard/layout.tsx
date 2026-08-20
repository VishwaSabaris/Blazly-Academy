import { redirect } from "next/navigation";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Topbar } from "@/components/dashboard/Topbar";
import { getCurrentUser } from "@/lib/firebaseAdmin";
import { hasUserCompletedPayment } from "@/lib/firestore";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login?redirect_url=/dashboard");
  }

  const hasPaid = await hasUserCompletedPayment(user.uid);
  if (!hasPaid) {
    redirect("/onboarding/payment");
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar />
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
