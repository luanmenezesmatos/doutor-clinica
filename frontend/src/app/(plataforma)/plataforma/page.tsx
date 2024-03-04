import { getCurrentUser } from "@/lib/auth/session";

export default async function DashboardPage() {
  const user = await getCurrentUser();

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
