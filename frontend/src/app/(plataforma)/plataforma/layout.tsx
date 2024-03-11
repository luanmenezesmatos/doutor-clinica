import React from "react";

import { getCurrentUser } from "@/lib/auth/session";

import { RedirectType, redirect } from "next/navigation";

import { Sidebar } from "@/components/layout/platform-sidebar";

import { PlatformDesktopHeader } from "@/components/layout/platform-desktop-header";

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
      <div className="flex h-screen border-collapse overflow-y-auto overflow-x-auto">
        <Sidebar className="z-10" />
        <main className="flex-1 bg-secondary/10 pb-1 relative">
          <PlatformDesktopHeader className="z-20" />

          <div className="overflow-hidden w-full bg-stone-100">{children}</div>
        </main>
      </div>
    </>
  );
}
