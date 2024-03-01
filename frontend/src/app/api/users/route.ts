import { NextRequest, NextResponse } from "next/server";

import { db as prisma } from "@/lib/db";

import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  const data = await request.json();

  const { name, email, password, clinic_name, occupation } = data;
  console.log("routeHandler", data);

  if (!name || !email || !password || !clinic_name || !occupation) {
    return NextResponse.json(
      {
        message: "Missing name, email, password, clinic name or occupation",
        code: "missing_data",
      },
      { status: 400 }
    );
  }

  const isUserExists = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (isUserExists) {
    return NextResponse.json(
      { error: "User already exists", code: "user_exists" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
      occupation,
      clinic: {
        create: {
          name: clinic_name,
        },
      },
    },
  });

  return NextResponse.json(user);
}
