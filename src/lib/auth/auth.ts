import { NextAuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { db as prisma } from "@/lib/db";

import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma as any),
  providers: [
    CredentialProvider({
      name: "credentials",
      credentials: {
        email: { label: "E-mail", type: "text", placeholder: "E-mail" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        try {
          if (!credentials?.email || !credentials?.password)
            throw new Error("Os dados do usuário não foram informados.");

          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (!user || !user.hashedPassword) {
            throw new Error("Usuário não encontrado.");
          }

          const matchPassword = await bcrypt.compare(
            credentials.password,
            user.hashedPassword
          );

          if (!matchPassword) {
            throw new Error("Senha incorreta.");
          }

          return {
            ...user,
          };
        } catch (error: any) {
          throw new Error(error.message);
        }
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token.role && session.user) {
        session.user.role = token.role as
          | "MANAGER"
          | "CLINIC"
          | "DOCTOR"
          | "DEMO";
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.email) return token;

      const existingUser = await prisma.user.findUnique({
        where: { email: token.email },
      });

      if (!existingUser) return token;

      token.role = existingUser.role;

      return token;
    },
  },
  pages: {
    signIn: "/entrar",
  },
  session: {
    strategy: "jwt",
    maxAge: 4 * 60 * 60, // 4 hours
  },
  jwt: {
    maxAge: 4 * 60 * 60, // 4 hours
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};
