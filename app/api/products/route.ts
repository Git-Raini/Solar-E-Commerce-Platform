import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  if (id) {
    const product = await prisma.product.findUnique({
      where: { id },
    });
    return NextResponse.json(product ?? null, { status: product ? 200 : 404 });
  }

  const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(products);
}
