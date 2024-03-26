"use server";

import { db as prisma } from "@/lib/db";

export async function getClinicByUser({ userId }: { userId: string }) {
  try {
    const clinic = await prisma.clinic.findFirst({
      where: {
        userId: userId,
      },
    });

    if (clinic) {
      return {
        success: true,
        clinic,
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
}
