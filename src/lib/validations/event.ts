import * as z from "zod";

export const eventFormSchema = z.object({
  title: z.string({ required_error: "O título é obrigatório" }).max(20, {
    message: "O título deve ter no máximo 20 caracteres",
  }),
  description: z
    .string({ required_error: "A descrição é obrigatória" })
    .max(100, {
      message: "A descrição deve ter no máximo 100 caracteres",
    }),
  dateTime: z.date({
    required_error: "A data e hora são obrigatórias",
  }),
});

export const appointmentFormSchema = z.object({
  date: z.date({
    required_error: "Campo obrigatório!",
  }),
  startTime: z.date({
    required_error: "Campo obrigatório!",
  }),
  endTime: z.date({
    required_error: "Campo obrigatório!",
  }),
  typeOfService: z.string(),
  schedule: z.string(),
  professional: z.string().optional(),
  patient: z.string(),
  cellPhone: z.string(),
  agreementPlan: z.string(),
  procedure: z.string().optional(),
  speciality: z.string().optional(),
  observations: z.string().optional(),
  appointmentStatus: z.string().optional(),
});
