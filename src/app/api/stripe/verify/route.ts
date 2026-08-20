import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/firebaseAdmin";
import { hasUserCompletedPayment, savePaymentSuccess } from "@/lib/firestore";
import { getStripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { sessionId } = await req.json();
    if (!sessionId || typeof sessionId !== "string") {
      return new NextResponse("Session ID is required.", { status: 400 });
    }

    const alreadyPaid = await hasUserCompletedPayment(user.uid);
    if (alreadyPaid) {
      return NextResponse.json({ success: true, redirectUrl: "/dashboard" });
    }

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return new NextResponse("Payment not completed.", { status: 400 });
    }

    const sessionUid = session.metadata?.firebaseUid || session.client_reference_id;
    if (sessionUid !== user.uid) {
      return new NextResponse("Payment session does not belong to this user.", { status: 403 });
    }

    await savePaymentSuccess({
      sessionId: session.id,
      paymentIntentId:
        typeof session.payment_intent === "string"
          ? session.payment_intent
          : session.payment_intent?.id ?? null,
      amountTotal: session.amount_total ?? 0,
      currency: session.currency ?? "usd",
      status: session.payment_status,
      productId: session.metadata?.productId || process.env.STRIPE_PRODUCT_ID || "",
      priceId: session.metadata?.priceId || process.env.STRIPE_PRICE_ID || "",
      email: user.email,
      uid: user.uid,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, redirectUrl: "/dashboard" });
  } catch (error) {
    console.error("[STRIPE_VERIFY_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
