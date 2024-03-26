"use server";

import { db as prisma } from "@/lib/db";

export async function getUserById({ id }: { id: string }) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    if (user) {
      return {
        success: true,
        user,
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
}
