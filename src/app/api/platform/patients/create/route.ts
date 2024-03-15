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
    const { values } = await request.json();

    console.log("values", values);

    const patient = await prisma.patient.findFirst({
      where: {
        full_civil_name: values.full_civil_name,
      },
    });

    if (patient) {
      return Response.json({
        success: false,
        error: "Patient already exists!",
      });
    } else {
      console.log("paciente passou");
      
      const newPatient = {
        
      }

      /* await prisma.patient.create({
        data: {
          full_civil_name: values.full_civil_name
        }
      }); */

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
