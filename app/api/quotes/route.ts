import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

function parseJsonBody(request: Request) {
  return request.text().then((text) => {
    try {
      return JSON.parse(text || "{}");
    } catch {
      return null;
    }
  });
}

export async function POST(request: Request) {
  const payload = await parseJsonBody(request);
  if (!payload) {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const phone = typeof payload.phone === "string" ? payload.phone.trim() : "";
  const country = typeof payload.country === "string" ? payload.country.trim() : "";
  const preferredTimeline = typeof payload.preferredTimeline === "string" ? payload.preferredTimeline.trim() : "";
  const message = typeof payload.message === "string" ? payload.message.trim() : "";
  const electricityBill = Number(payload.electricityBill);
  const roofArea = Number(payload.roofArea);

  if (
    !name ||
    !email ||
    !phone ||
    !country ||
    !preferredTimeline ||
    Number.isNaN(electricityBill) ||
    Number.isNaN(roofArea)
  ) {
    return NextResponse.json(
      {
        error: "Missing or invalid quote request fields.",
        required: ["name", "email", "phone", "country", "electricityBill", "roofArea", "preferredTimeline"],
      },
      { status: 400 }
    );
  }

  const session = await getServerSession(authOptions);
  const quoteData: any = {
    name,
    email,
    phone,
    country,
    electricityBill,
    roofArea,
    preferredTimeline,
    message,
  };

  if (session?.user?.email) {
    quoteData.user = { connect: { email: session.user.email } };
  }

  const quote = await prisma.quoteRequest.create({ data: quoteData });

  return NextResponse.json({
    status: "success",
    message: "Quote request received.",
    quoteId: quote.id,
  });
}
