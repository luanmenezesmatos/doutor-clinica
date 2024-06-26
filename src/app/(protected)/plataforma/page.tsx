import { currentUser } from "@/lib/auth/session";

import { ScrollArea } from "@/components/ui/scroll-area";

import { Indicators } from "@/components/platform/indicators/indicators";

export default async function DashboardPage() {
  const user = await currentUser();

  return (
    <ScrollArea className="h-full">
      <Indicators />
    </ScrollArea>
  );
}
