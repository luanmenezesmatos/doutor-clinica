import React from "react";

import { getCurrentUser } from "@/lib/auth/session";

import { RedirectType, redirect } from "next/navigation";

import { Sidebar } from "@/components/layout/platform-sidebar";

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
      <div className="flex h-screen border-collapse">
        <Sidebar className="overflow-y-auto overflow-x-hidden" />
        <main className="flex-1 overflow-hidden pt-16 bg-secondary/10 pb-1">
          {children}
        </main>
      </div>
    </>
  );
}
