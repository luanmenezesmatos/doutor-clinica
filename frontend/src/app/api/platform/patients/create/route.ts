import { NextRequest } from "next/server";

import { db as prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  return Response.json({
    message: "Method not allowed!",
    request_method: request.method,
  });
}

export async function POST(request: NextRequest) {
  try {
    const { full_civil_name } = await request.json();

    const patient = await prisma.patient.findFirst({
      where: {
        full_civil_name,
      },
    });

    if (patient) {
      return Response.json({
        success: false,
        error: "Patient already exists!",
      });
    } else {
      await prisma.patient.create({
        data: {
          full_civil_name: full_civil_name,
          date_of_birth: new Date(),
          clinic: {
            connect: {
              id: "65e1fda984f12d594ad2d1f6",
            },
          },
        },
      });

      return Response.json({
        success: true,
        message: "Patient created successfully!",
      });
    }
  } catch (error: any) {
    return Response.json({
      success: false,
      error: error.message,
    });
  }
}
