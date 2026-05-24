import { NextResponse } from "next/server";
import { calculateSolarRecommendation } from "@/lib/data";

export async function POST(request: Request) {
  const payload = await request.json();
  const result = calculateSolarRecommendation({
    monthlyBill: Number(payload.monthlyBill) || 0,
    roofArea: Number(payload.roofArea) || 0,
    location: payload.location || "India",
  });

  return NextResponse.json(result);
}
