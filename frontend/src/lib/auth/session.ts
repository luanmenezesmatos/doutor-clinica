import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);

  return session?.user;
}
