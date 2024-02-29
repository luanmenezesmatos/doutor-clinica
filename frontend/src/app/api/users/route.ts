import { db as prisma } from "@/lib/db";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();

  const { name, email, password } = data;
  console.log("route handler", data);

  return NextResponse.json({ message: "teste" });
}
