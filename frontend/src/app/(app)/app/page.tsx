import { getCurrentUser } from "@/lib/auth/session";

import { RedirectType, redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/entrar", RedirectType.replace);
  }

  return (
    <>
      {user ? (
        <p>Usuário autenticado: {user.name}</p>
      ) : (
        <p>Usuário não autenticado</p>
      )}
    </>
  );
}
