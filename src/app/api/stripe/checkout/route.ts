import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/firebaseAdmin";
import { hasUserCompletedPayment } from "@/lib/firestore";
import { getAppOrigin, getStripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const alreadyPaid = await hasUserCompletedPayment(user.uid);
    if (alreadyPaid) {
      return NextResponse.json({ url: "/dashboard" });
    }

    const priceId = process.env.STRIPE_PRICE_ID;
    if (!priceId) {
      return new NextResponse("Stripe price is not configured.", { status: 500 });
    }

    const origin = getAppOrigin(req.headers.get("origin"));
    const stripe = getStripe();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: user.email,
      client_reference_id: user.uid,
      metadata: {
        firebaseUid: user.uid,
        productId: process.env.STRIPE_PRODUCT_ID || "",
        priceId,
      },
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/onboarding/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/onboarding/payment?canceled=true`,
    });

    if (!session.url) {
      return new NextResponse("Failed to create checkout session.", { status: 500 });
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("[STRIPE_CHECKOUT_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
