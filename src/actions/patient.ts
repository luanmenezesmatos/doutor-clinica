"use server";

import * as z from "zod";

import { db as prisma } from "@/lib/db";

import { appointmentFormSchema } from "@/lib/validations/event";

/* export const getPatient = async (values: z.infer<typeof appointmentFormSchema>) => {

} */

export async function getPatient({
  values,
}: {
  values: {
    patient_select_option: string;
  };
}) {
  try {
    const patient = await prisma.patient.findFirst({
      where: {
        OR: [
          {
            full_civil_name: {
              contains: values.patient_select_option,
              mode: "insensitive",
            },
          },
          {
            full_civil_name: {
              contains: values.patient_select_option,
              mode: "insensitive",
            },
          },
          {
            cpf_cnpj: {
              contains: values.patient_select_option,
              mode: "insensitive",
            },
          },
          {
            control_number: {
              contains: values.patient_select_option,
              mode: "insensitive",
            },
          },
          {
            email: {
              contains: values.patient_select_option,
              mode: "insensitive",
            },
          },
        ],
      },
    });

    if (patient) {
      return {
        success: true,
        patient,
      };
    } else {
      return {
        success: false,
        error: "Patient not found!",
      };
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
}
