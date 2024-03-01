import { getCurrentUser } from "@/lib/auth/session";

export default async function DashboardPage() {
  await new Promise((resolve) => setTimeout(resolve, 4000));

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
