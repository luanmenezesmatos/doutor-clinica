import Link from "next/link";
import Image from "next/image";

import { navConfig } from "@/config/nav";

import { cn } from "@/lib/utils";

import { Icons } from "@/components/icons";

import { Button, buttonVariants } from "@/components/ui/button";
import { DesktopNav } from "@/components/layout/main-desktop-nav";

import { DemoDialog } from "@/components/modals/demo-dialog";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default async function MainLayout({ children }: MainLayoutProps) {
  return (
    <section className="flex min-h-screen flex-col">
      <header className="container">
        <div className="flex h-20 items-center justify-between">
          <DesktopNav items={navConfig.mainNav} />

          <div
            className={cn(
              "hidden md:flex lg:flex xl:flex items-center space-x-4"
            )}
          >
            <DemoDialog>
              <Button
                variant="expandIcon"
                Icon={Icons.arrowRight}
                iconPlacement="right"
                size="sm"
                className="px-4"
              >
                Solicite uma Demonstração
              </Button>
            </DemoDialog>

            <Link href="/entrar">
              <Button
                variant="expandIcon"
                size="sm"
                className="px-4 text-primary border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                Icon={Icons.login}
                iconPlacement="right"
              >
                Entrar
              </Button>
            </Link>
          </div>

          <div className="md:hidden lg:hidden xl:hidden items-center space-x-4 pl-5">
            <Link
              href="/entrar"
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "px-4"
              )}
            >
              Entrar <Icons.login className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>
    </section>
  );
}
