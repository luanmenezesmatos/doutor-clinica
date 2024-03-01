import React from "react";

import { getCurrentUser } from "@/lib/auth/session";

import { RedirectType, redirect } from "next/navigation";

interface PlatformLayoutProps {
  children: React.ReactNode;
}

export default async function PlatformLayout({
  children,
}: PlatformLayoutProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/entrar", RedirectType.replace);
  }

  return (
    <>
      <main>{children}</main>
    </>
  );
}
