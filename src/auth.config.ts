import type { NextAuthConfig } from "next-auth";

import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { loginSchema } from "./lib/validations/auth";

import { getUserByEmail } from "./data/user";

export default {
  providers: [
    Credentials({
      async authorize(credentials): Promise<any> {
        const validatedFields = loginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
