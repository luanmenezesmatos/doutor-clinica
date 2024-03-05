"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";

import { MobileSidebar } from "./platform-mobile-sidebar";

interface PlatformDesktopNavProps {
  className?: string;
}

export function PlatformDesktopNav({ className }: PlatformDesktopNavProps) {
  return (
    <div className="supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur">
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
    </div>
  );
}
