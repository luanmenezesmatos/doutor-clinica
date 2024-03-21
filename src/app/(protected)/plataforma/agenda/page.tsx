import { db as prisma } from "@/lib/db";

import { currentUser } from "@/lib/auth/session";

import { Schedule } from "@/components/schedule/schedule";

export default async function SchedulePage() {
  const user = await currentUser();

  return <Schedule user={user?.id ?? ""} />;
}
