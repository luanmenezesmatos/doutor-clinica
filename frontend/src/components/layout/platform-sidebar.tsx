"use client";

import Link from "next/link";
import Image from "next/image";

import React, { useState } from "react";

import { cn } from "@/lib/utils";

import { NavItems } from "@/config/sidebar";
import { useSidebar } from "@/hooks/use-sidebar";

import { Icons } from "@/components/icons";
import { SideNav } from "@/components/layout/platform-side-nav";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const { isOpen, toggle } = useSidebar();
  const [status, setStatus] = useState(false);

  const handleToggle = () => {
    setStatus(true);
    toggle();
    setTimeout(() => setStatus(false), 500);
  };
  return (
    <>
      <nav
        className={cn(
          `relative hidden h-screen border-r pt-10 md:block font-inter`,
          status && "duration-500",
          isOpen ? "w-72" : "w-[78px]",
          className
        )}
      >
        {isOpen ? (
          <div className="flex flex-col p-4 gap-4">
            <Link href="/plataforma">
              <Image
                alt="logo"
                src="/images/svg/logo.svg"
                width={170}
                height={40}
              />
            </Link>

            <p
              className={cn(
                "text-md font-inter",
                "transition-all duration-300"
              )}
            >
              Democratizamos o acesso à{" "}
              <b className="font-semibold">saúde de qualidade</b>
            </p>
          </div>
        ) : (
          <div className="flex items-center justify-center p-4">
            <Link href="/plataforma">
              <Image alt="logo" src="/logo-icon.svg" width={30} height={30} />
            </Link>
          </div>
        )}

        <Icons.chevronLeft
          className={cn(
            "absolute -right-3 top-20 cursor-pointer rounded-full border bg-background text-3xl text-foreground",
            !isOpen && "rotate-180",
            status && "duration-500"
          )}
          onClick={handleToggle}
        />

        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <div className="mt-3 space-y-1">
              <SideNav
                className={cn(
                  "text-background opacity-0 transition-all duration-300",
                  "group-hover:font-sans group-hover:font-semibold group-hover:ml-4 group-hover:rounded-lg group-hover:bg-white group-hover:text-black group-hover:text-sm group-hover:px-4 group-hover:py-2 group-hover:opacity-100 group-hover:border-l-2 group-hover:border-gray-500 group-hover:shadow-md group-hover:transform group-hover:translate-x-2 group-hover:transition-all group-hover:duration-300 group-hover:ease-in-out"
                )}
                items={NavItems}
              />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
