import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  role: "MANAGER" | "CLINIC" | "DOCTOR" | "DEMO";
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}