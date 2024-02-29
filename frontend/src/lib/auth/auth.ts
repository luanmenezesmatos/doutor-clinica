import { NextAuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { db as prisma } from "@/lib/db";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma as any),
  providers: [
    CredentialProvider({
      name: "credentials",
      credentials: {
        email: { label: "E-mail", type: "text", placeholder: "E-mail" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials, req): Promise<any> {
        const user = {
          email: "luanmenezesmluiz@gmail.com",
          password: "12345678",
        };

        console.log("Authorize method", credentials);

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.SECRET,
  debug: process.env.NODE_ENV === "development",
};
