import * as React from "react";

import Link from "next/link";
import Image from "next/image";

import { NavItem } from "@/types";

import { cn } from "@/lib/utils";
import { useLockBody } from "@/hooks/use-lock-body";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { DemoDialog } from "../modals/demo-dialog";

interface MobileNavProps {
  items: NavItem[];
  children?: React.ReactNode;
}

export function MobileNav({ items, children }: MobileNavProps) {
  useLockBody();

  return (
    <div
      className={cn(
        "fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 md:hidden"
      )}
    >
      <div className="relative z-20 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="images/svg/logo.svg" alt="Logo" width="130" height="40" />
        </Link>
        <nav className="grid grid-flow-row auto-rows-max text-sm">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href || "#"}
              className={cn(
                "flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline",
                item.disabled && "cursor-not-allowed opacity-60"
              )}
            >
              {item.title}
            </Link>
          ))}

          <Separator />

          <div className="flex flex-col items-center pt-4">
            <DemoDialog>
              <Button
                variant="default"
                size="lg"
                className="px-4 w-[fit-content] mt-4"
              >
                Solicite uma Demonstração
              </Button>
            </DemoDialog>
          </div>
        </nav>
        {children}
      </div>
    </div>
  );
}
