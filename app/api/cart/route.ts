import { NextResponse } from "next/server";

let cart = [
  { id: "panel-001", quantity: 1 },
  { id: "inverter-001", quantity: 1 },
];

export async function GET() {
  return NextResponse.json(cart);
}

export async function POST(request: Request) {
  const payload = await request.json();
  cart = payload.cart || cart;
  return NextResponse.json({ status: "ok", cart });
}
