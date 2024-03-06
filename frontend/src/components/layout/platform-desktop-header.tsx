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
      <div className="right-0 supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur z-20">
        <nav className="container flex h-16 items-center justify-between">
          <div className={cn("block md:!hidden")}>
            <div className={cn("block md:!hidden")}>
              <MobileSidebar />
            </div>
          </div>

          <div className="flex flex-1 items-center justify-end space-x-2"></div>
        </nav>
      </div>
    </>
  );
}
