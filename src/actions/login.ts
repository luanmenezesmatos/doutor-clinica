"use server";

import * as z from "zod";
import { AuthError } from "next-auth";

import { db as prisma } from "@/lib/db";
import { signIn } from "@/auth";
import { loginSchema } from "@/lib/validations/auth";
import { getUserByEmail } from "@/data/user";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const login = async (
  values: z.infer<typeof loginSchema>,
  callbackUrl?: string | null
) => {
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Campos inválidos!" };
  }

  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Usuário não encontrado!" };
  }

  if (!existingUser.emailVerified) {
    return { error: "E-mail não verificado!" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Credenciais inválidas!" };
        default:
          return { error: "Erro desconhecido!" };
      }
    }
  }
};
