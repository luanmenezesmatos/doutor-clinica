"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { db as prisma } from "@/lib/db";
import { registerSchema } from "@/lib/validations/auth";
import { getUserByEmail } from "@/data/user";

import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async (values: z.infer<typeof registerSchema>) => {
  const validatedFields = registerSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Campos inválidos!" };
  }

  const { email, password, name, clinic_name, occupation } =
    validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "O usuário informado já está cadastrado!" };
  }

  await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: hashedPassword,
      occupation: occupation,
      clinic: {
        create: {
          name: clinic_name,
        },
      },
    },
  });

  const verificationToken = await generateVerificationToken(email);

  await sendVerificationEmail(
    verificationToken.email,
    verificationToken.token
  )

  return {
    success: "Confirmação de e-mail enviada com sucesso!",
  };
};
