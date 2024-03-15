"use server";

import { db as prisma } from "@/lib/db";

export async function createPatient({
  values
}: {
  values: {
    full_civil_name: string;
  };
}) {
  try {
    const patient = await prisma.patient.findFirst({
      where: {
        full_civil_name: values.full_civil_name
      }
    });

    if (patient) {
      return {
        success: false,
        error: "Patient already exists!"
      };
    } else {
      await prisma.patient.create({
        data: {
          full_civil_name: values.full_civil_name
        }
      });

      return {
        success: true,
        message: "Patient created successfully!"
      };
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message
    };
  }
}