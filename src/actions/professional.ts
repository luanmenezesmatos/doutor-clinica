"use server";

import { db as prisma } from "@/lib/db";

export async function getProfessional({
  professionalId,
}: {
  professionalId: string | undefined;
}) {
  try {
    if (!professionalId) {
      throw new Error("professionalId is required");
    }

    const professional = await prisma.doctor.findUnique({
      where: {
        id: professionalId,
      },
    });

    if (professional) {
      return {
        id: professional.id,
        name: professional.name,
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
}

export async function getProfessionals({
  clinicId,
}: {
  clinicId: string | undefined;
}) {
  try {
    if (!clinicId) {
      throw new Error("clinicId is required");
    }

    console.log(clinicId);
    
    const professionals = await prisma.doctor.findMany({
      where: {
        clinic: {
          id: clinicId,
        },
      },
    });

    if (professionals) {
      professionals.map((professional) => {
        return {
          id: professional.id,
          name: professional.name,
        };
      });
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
}
