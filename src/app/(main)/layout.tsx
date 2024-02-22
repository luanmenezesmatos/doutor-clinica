import Link from "next/link";
import Image from "next/image";

import { navConfig } from "@/config/nav";

import { cn } from "@/lib/utils";

import { Icons } from "@/components/icons";

import { Button, buttonVariants } from "@/components/ui/button";
import { DesktopNav } from "@/components/desktop-nav";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default async function MainLayout({ children }: MainLayoutProps) {
  return (
    <section className="flex min-h-screen flex-col">
      <header className="container">
        <div className="flex h-20 items-center justify-between">
          <DesktopNav items={navConfig.mainNav} />

          {/* <Link
            href="/login"
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "px-4"
            )}
          >
            Solicite uma demonstração
          </Link> */}

          <div
            className={cn(
              "hidden md:flex lg:flex xl:flex items-center space-x-4"
            )}
          >
            <Button variant="default" size="sm" className="px-4">
              Solicite uma Demonstração
            </Button>

            <Link
              href="/entrar"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "px-4"
              )}
            >
              Entrar
              <Icons.login className="w-4 h-4 ml-2" />
            </Link>
          </div>

          <div className="md:hidden lg:hidden xl:hidden items-center space-x-4 pl-10">
            <Link
              href="/entrar"
              className={cn(
                buttonVariants({ variant: "default", size: "sm" }),
                "px-4"
              )}
            >
              Solicite uma Demonstração{" "}
              <span className="md:inline-block">
                <Icons.arrowRight className="w-4 h-4 ml-1" />
              </span>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>
    </section>
  );
}
