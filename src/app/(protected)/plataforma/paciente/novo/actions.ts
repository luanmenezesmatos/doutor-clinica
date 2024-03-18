"use server";

import { z } from "zod";
import { db as prisma } from "@/lib/db";
import { createPatientSchema } from "./schema";

import { getCurrentUser } from "@/lib/auth/auth";

import { generateControlNumber } from "@/lib/utils";

export async function createPatient(
  values: z.infer<typeof createPatientSchema>
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return {
        success: false,
        title: "Erro ao cadastrar paciente",
        message: "Usuário não autenticado!",
      };
    }

    const user = await prisma.user.findFirst({
      where: {
        email: currentUser?.email,
      },
    });

    if (!user) {
      return {
        success: false,
        title: "Erro ao cadastrar paciente",
        message: "Usuário não encontrado!",
      };
    }

    const patient = await prisma.patient.findFirst({
      where: {
        OR: [
          {
            cpf_cnpj: values.cpf_cnpj,
          },
          {
            full_civil_name: values.full_civil_name,
          },
        ],
      },
    });

    if (patient) {
      return {
        success: false,
        title: "Erro ao cadastrar paciente",
        message: "O paciente que está tentando cadastrar já existe!",
      };
    }

    await prisma.patient.create({
      data: {
        full_civil_name: values.full_civil_name,
        full_social_name: values.full_social_name,
        cpf_cnpj: values.cpf_cnpj,
        rg: values.rg,
        rg_issuing_office: values.rg_issuing_office,
        date_of_birth: values.date_of_birth,
        gender: values.gender,
        nationality: values.nationality,
        address: {
          create: {
            zip: values.zip,
            street: values.street,
            number: values.number,
            complement: values.complement,
            neighborhood: values.neighborhood,
            city: values.city,
          },
        },
        identification_number: values.identification_number,
        control_number: values.control_number || generateControlNumber(),
        email: values.email,
        cell_phone: values.cell_phone,
        home_phone: values.home_phone,
        extension: values.extension,
        additional_information: {
          create: {
            cns_sus: values.cns_sus,
            blood_factor: values.blood_factor,
            family: {
              create: {
                civil_status: values.civil_status,
                partner_name: values.partner_name,
                mother_name: values.mother_name,
                father_name: values.father_name,
                responsible_name: values.responsible_name,
              },
            },
            referral_source: values.referral_source,
          },
        },
        additional_contact_information: {
          create: {
            business_phone: values.additional_information_business_phone,
            messages_phone: values.additional_information_messages_phone,
            extension_one: values.additional_information_extension_one,
            extension_two: values.additional_information_extension_two,
            skype: values.additional_information_skype,
            updatedAt: new Date(),
          },
        },
        marketing_information: {
          create: {
            hobby: values.hobby,
            schooling: values.schooling,
            indication: values.indication,
            birthday: {
              create: {
                email_birthday_card: values.email_birthday_card,
              },
            },
          },
        },
        medical_record: {
          create: {
            weight: 0,
            height: 0,
            bloodType: values.blood_factor,
            allergies: "",
            updatedAt: new Date(),
          },
        },
        is_active: values.is_active ? true : false,
        is_foreign: values.is_foreign ? true : false,
        updatedAt: new Date(),
        clinic: {
          connect: {
            id: "65e1fda984f12d594ad2d1f6",
          },
        },
      },
    });

    return {
      success: true,
      title: "Paciente cadastrado com sucesso!",
      message: "O paciente foi cadastrado com sucesso!",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
}
