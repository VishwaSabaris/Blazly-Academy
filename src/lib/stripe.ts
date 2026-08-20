import Stripe from "stripe";

let stripeClient: Stripe | null = null;

export function getStripe(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not configured.");
  }

  if (!stripeClient) {
    stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY);
  }

  return stripeClient;
}

export function getAppOrigin(fallbackOrigin?: string | null) {
  return (
    process.env.NEXT_PUBLIC_APP_URL ||
    fallbackOrigin ||
    "http://localhost:3000"
  );
}
