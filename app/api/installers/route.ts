import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const installers = await prisma.installer.findMany({
    include: {
      jobs: true,
    },
  });
  return NextResponse.json(installers);
}
