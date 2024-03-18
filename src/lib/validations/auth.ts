import * as z from "zod";

export const loginSchema = z.object({
  email: z
    .string({ required_error: "O e-mail é obrigatório" })
    .email({ message: "E-mail inválido" }),
  password: z
    .string({ required_error: "A senha é obrigatória" })
    .min(8, { message: "A senha deve ter no mínimo 8 caracteres" }),
  code: z.optional(z.string()),
});

export const registerSchema = z
  .object({
    name: z
      .string({ required_error: "O nome é obrigatório" })
      .min(3, { message: "O nome deve ter no mínimo 3 caracteres" }),
    email: z
      .string({ required_error: "O e-mail é obrigatório" })
      .email({ message: "E-mail inválido" }),
    password: z
      .string({ required_error: "A senha é obrigatória" })
      .min(8, { message: "A senha deve ter no mínimo 8 caracteres" }),
    confirm_password: z
      .string({ required_error: "A confirmação de senha é obrigatória" })
      .min(8, {
        message: "A confirmação da senha deve ter no mínimo 8 caracteres",
      }),
    clinic_name: z.string({
      required_error: "O nome da clínica é obrigatório",
    }),
    occupation: z.string({ required_error: "A profissão é obrigatória" }),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"],
    message: "As senhas não coincidem",
  });
