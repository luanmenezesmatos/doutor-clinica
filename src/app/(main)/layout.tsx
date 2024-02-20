import Link from "next/link";

import { navConfig } from "@/config/nav";

import { cn } from "@/lib/utils";

import { Icons } from "@/components/icons";

import { buttonVariants } from "@/components/ui/button";
import { DesktopNav } from "@/components/desktop-nav";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default async function MainLayout({ children }: MainLayoutProps) {
  return (
    <section className="flex min-h-screen flex-col">
      <header className="container z-40">
        <div className="flex h-20 items-center justify-between">
          <DesktopNav items={navConfig.mainNav} />
        </div>
      </header>

      <main className="flex-1">{children}</main>
    </section>
  );
}
