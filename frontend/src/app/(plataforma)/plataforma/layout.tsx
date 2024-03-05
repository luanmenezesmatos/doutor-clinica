import React from "react";

import { getCurrentUser } from "@/lib/auth/session";

import { RedirectType, redirect } from "next/navigation";

import { Sidebar } from "@/components/layout/platform-sidebar";

import { PlatformDesktopNav } from "@/components/layout/platform-desktop-nav";

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
        <Sidebar className="z-10" />
        <main className="flex-1 pt-16 bg-secondary/10 pb-1 relative">
          <PlatformDesktopNav className="z-20" />

          {children}
        </main>
      </div>
    </>
  );
}
