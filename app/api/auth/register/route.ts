import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  let body;
  const rawText = await request.text();

  try {
    body = rawText ? JSON.parse(rawText) : {};
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const { name, email, password } = body || {};

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "User already exists." }, { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name: name || null,
      email,
      password: hashedPassword,
    },
  });

  return NextResponse.json({ user: { id: user.id, email: user.email, name: user.name }, message: "Account created successfully." });
}
