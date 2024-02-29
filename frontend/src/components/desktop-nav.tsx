"use client";

import * as React from "react";

import Link from "next/link";
import Image from "next/image";

import { NavItem } from "@/types";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { MobileNav } from "./mobile-nav";
import { buttonVariants } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

interface MainNavProps {
  items?: NavItem[];
  children?: React.ReactNode;
}

export function DesktopNav({ items, children }: MainNavProps) {
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        <Image src="images/svg/logo.svg" alt="Logo" width="150" height="40" />
      </Link>

      {items?.length ? (
        <nav className="hidden gap-6 md:flex">
          {items?.map((item, index) =>
            item.type === "link" ? (
              <Link
                key={index}
                href={item.disabled ? "#" : item.href || "#"}
                className={cn(
                  "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
                  item.disabled && "cursor-not-allowed opacity-80"
                )}
              >
                {item.title}
              </Link>
            ) : item.type === "dropdown" ? (
              <NavigationMenu key={index}>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                        {!item.hideNavMenuLink && (
                          <li className="row-span-3">
                            <NavigationMenuLink asChild>
                              <a
                                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                href="/"
                              >
                                <div className="mb-2 mt-4 text-lg font-medium break-words">
                                  {item.title}
                                </div>
                                <p className="text-sm leading-tight text-muted-foreground break-words">
                                  {item.description}
                                </p>
                              </a>
                            </NavigationMenuLink>
                          </li>
                        )}
                        {item.dropdownItems?.map((item, index) => {
                          return (
                            <ListItem
                              key={index}
                              href={item.href}
                              title={item.title}
                            >
                              {item.description}
                            </ListItem>
                          );
                        })}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            ) : null
          )}
        </nav>
      ) : null}

      <button
        className="flex items-center space-x-2 md:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        {showMobileMenu ? <Icons.close /> : <Icons.menu />}
        <span className="font-sans font-semibold">Menu</span>
      </button>

      {showMobileMenu && items && (
        <MobileNav items={items}>{children}</MobileNav>
      )}
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-200 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
