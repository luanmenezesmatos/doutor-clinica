import { z } from "zod";

export const createPatientSchema = z.object({
  is_active: z.boolean().optional(),
  full_civil_name: z
    .string({
      required_error: "Precisamos do nome civil completo do paciente.",
    })
    .min(
      3,
      "O nome civil completo do paciente deve ter no mínimo 3 caracteres."
    )
    .max(
      255,
      "O nome civil completo do paciente deve ter no máximo 255 caracteres."
    ),
  full_social_name: z.string().optional(),
  date_of_birth: z.date({
    required_error: "Precisamos da data de nascimento do paciente",
  }),
  gender: z.string({
    required_error: "Precisamos do gênero do paciente.",
  }),
  is_foreign: z.boolean().optional(),
  cpf_cnpj: z.string().optional(),
  rg: z.string().optional(),
  rg_issuing_office: z.string().optional(),
  identification_number: z.string().optional(),
  control_number: z.string().optional(),
  nationality: z.string().optional(),
  email: z.string().email("Precisamos de um e-mail válido.").optional(),
  cell_phone: z.string({
    required_error: "Precisamos do número de celular do paciente.",
  }),
  home_phone: z.string().optional(),
  extension: z.string().optional(),
  additional_information_business_phone: z.string().optional(),
  additional_information_messages_phone: z.string().optional(),
  additional_information_extension_one: z.string().optional(),
  additional_information_extension_two: z.string().optional(),
  additional_information_skype: z.string().optional(),
  zip: z.string().optional(),
  street: z.string().optional(),
  number: z.string().optional(),
  complement: z.string().optional(),
  neighborhood: z.string().optional(),
  city: z.string().optional(),
  cns_sus: z.string().optional(),
  blood_factor: z.string().optional(),
  ethnicity: z.string().optional(),
  civil_status: z.string().optional(),
  partner_name: z.string().optional(),
  mother_name: z.string().optional(),
  father_name: z.string().optional(),
  responsible_name: z.string().optional(),
  referral_source: z.string().optional(),
  hobby: z
    .string()
    .max(1000, {
      message: "O hobby deve ter no máximo 1000 caracteres.",
    })
    .optional(),
  schooling: z.string().optional(),
  occupation: z.string().optional(),
  indication: z.string().optional(),
  email_birthday_card: z.boolean().optional(),
});
