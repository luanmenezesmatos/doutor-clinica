"use client";

import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";

import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";

import { MobileSidebar } from "@/components/layout/platform-mobile-sidebar";

interface PlatformDesktopHeaderProps {
  className?: string;
}

export function PlatformDesktopHeader({
  className,
}: PlatformDesktopHeaderProps) {
  return (
    <>
      {/* <div className="supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur">
      <div className="flex items-center justify-between px-4">
        <Link
          href={"/"}
          className="hidden items-center justify-between md:flex"
        >
          <h1 className="text-lg font-semibold">doutor clínica</h1>
        </Link>
        <div className={cn("block md:!hidden")}>
          <MobileSidebar />
        </div>
      </div>
    </div> */}

      <div className="right-0 supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur z-20">
        <nav className="container flex h-16 items-center justify-between">
          <Link href={"/"}>
            <Image
              src="/images/svg/logo.svg"
              alt="Logo"
              width={160}
              height={40}
            />
          </Link>

          <div className="flex flex-1 items-center justify-end space-x-2">
            <div className={cn("block md:!hidden", "flex gap-2")}>
              <Link
                href="/entrar"
                className={cn(
                  "p-1 border rounded-xl bg-neutral-50",
                )}
              >
                <Icons.login className="w-4 h-4" />
              </Link>

              <MobileSidebar />
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
