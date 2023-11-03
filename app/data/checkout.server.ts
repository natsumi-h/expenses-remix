import { redirect } from "@remix-run/node";
import { prisma } from "./database.server";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const YOUR_DOMAIN = "http://localhost:3000";

export async function checkout() {
  const stripeSession = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: "price_1O8I39LzoGgSX8G9pxoCNpq0",
        quantity: 1,
      },
    ],
    mode: "payment",
    // success_url: `${YOUR_DOMAIN}/thanks?success=true`,
    success_url: `${YOUR_DOMAIN}/thanks?session_id={CHECKOUT_SESSION_ID}`,
    // cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });
  console.log(stripeSession);

  throw redirect(stripeSession.url as string);
}

export async function updateUsersPlan(userId: string) {
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });
  if (!user) {
    throw new Error("User not found");
  }
  try {
    return await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        plan: "premium",
      },
    });
  } catch (error) {
    throw new Error("Could not update user plan");
  }
}
