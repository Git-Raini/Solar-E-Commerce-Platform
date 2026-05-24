import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import Stripe from "stripe";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

const stripeSecret = process.env.STRIPE_SECRET_KEY;
const stripe = stripeSecret ? new Stripe(stripeSecret, { apiVersion: "2026-04-22.dahlia" }) : null;

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  let payload;
  const rawText = await request.text();

  try {
    payload = rawText ? JSON.parse(rawText) : {};
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const { items, shipping } = payload || {};
  if (!Array.isArray(items) || !items.length) {
    return NextResponse.json({ error: "No cart items provided." }, { status: 400 });
  }

  if (
    items.some(
      (item: any) =>
        !item ||
        typeof item.id !== "string" ||
        typeof item.quantity !== "number" ||
        item.quantity <= 0
    )
  ) {
    return NextResponse.json({ error: "Cart items must include valid product IDs and quantities." }, { status: 400 });
  }

  if (
    !shipping ||
    !shipping.address ||
    !shipping.city ||
    !shipping.state ||
    !shipping.postalCode ||
    !shipping.country
  ) {
    return NextResponse.json({ error: "Complete shipping information is required." }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) {
    return NextResponse.json({ error: "Authenticated user not found." }, { status: 401 });
  }

  const productIds = items.map((item: any) => item.id);
  const products = await prisma.product.findMany({ where: { id: { in: productIds } } });
  const missingProductIds = productIds.filter(
    (productId: string) => !products.some((product) => product.id === productId)
  );

  if (missingProductIds.length) {
    return NextResponse.json({ error: `Products not found: ${missingProductIds.join(", ")}` }, { status: 400 });
  }

  const orderItems = items.map((item: any) => {
    const product = products.find((product) => product.id === item.id);
    return {
      product: { connect: { id: item.id } },
      quantity: item.quantity,
      unitPrice: product?.price ?? 0,
    };
  });

  const total = orderItems.reduce((sum: number, item: any) => sum + item.quantity * item.unitPrice, 0 as number);

  const shippingAddress = `${shipping.address}, ${shipping.city}, ${shipping.state}, ${shipping.postalCode}, ${shipping.country}`;

  const order = await prisma.order.create({
    data: {
      userId: user.id,
      total,
      currency: shipping?.currency || "USD",
      shippingAddress,
      items: {
        create: orderItems,
      },
    },
  });

  if (stripe) {
    const line_items = orderItems.map((item: any) => {
      const product = products.find((product) => product.id === item.product.connect.id);
      return {
        price_data: {
          currency: shipping?.currency || "USD",
          product_data: {
            name: product?.name || "Solar product",
          },
          unit_amount: Math.round(item.unitPrice * 100),
        },
        quantity: item.quantity,
      };
    });

    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/orders?payment=success`,
      cancel_url: `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/checkout?payment=cancelled`,
      metadata: {
        orderId: order.id,
      },
    });

    return NextResponse.json({ url: checkoutSession.url });
  }

  return NextResponse.json({ success: true, orderId: order.id });
}
