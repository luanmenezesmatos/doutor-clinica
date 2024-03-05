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
      <div className="flex h-screen border-collapse overflow-y-auto overflow-x-hidden">
        <Sidebar />
        <main className="flex-1 overflow-hidden pt-16 bg-secondary/10 pb-1">
          <PlatformDesktopNav />

          {children}
        </main>
      </div>
    </>
  );
}
