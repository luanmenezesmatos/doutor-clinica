"use client";
import Link from "next/link";

import { type SideItem } from "@/types";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/use-sidebar";
import { buttonVariants } from "@/components/ui/button";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useState } from "react";
import { ChevronDownIcon } from "@radix-ui/react-icons";

interface SideNavProps {
  items: SideItem[];
  setOpen?: (open: boolean) => void;
  className?: string;
}

export function SideNav({ items, setOpen, className }: SideNavProps) {
  const path = usePathname();
  const { isOpen } = useSidebar();
  const [openItem, setOpenItem] = useState("");
  const [lastOpenItem, setLastOpenItem] = useState("");

  useEffect(() => {
    if (isOpen) {
      setOpenItem(lastOpenItem);
    } else {
      setLastOpenItem(openItem);
      setOpenItem("");
    }
  }, [isOpen]);

  return (
    <div className="space-y-2">
      {items.map((item) =>
        item.isChildren ? (
          <Accordion
            type="single"
            collapsible
            key={item.title}
            value={openItem}
            onValueChange={setOpenItem}
          >
            <AccordionItem value={item.title} className="border-none ">
              <AccordionTrigger
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "group relative flex h-auto justify-between px-4 py-2 text-base duration-200 hover:bg-muted hover:no-underline"
                )}
              >
                <div>
                  {item.icon && (
                    <item.icon className={cn("h-4 w-4", item.color)} />
                  )}
                </div>
                <div
                  className={cn(
                    "absolute left-12 text-base duration-200 ",
                    !isOpen && className
                  )}
                >
                  {item.title}
                </div>

                {isOpen && (
                  <ChevronDownIcon className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
                )}
              </AccordionTrigger>
              <AccordionContent className="mt-2 space-y-4 pb-1">
                {item.children?.map((child) => (
                  <Link
                    key={child.title}
                    href={child.href}
                    onClick={() => {
                      if (setOpen) setOpen(false);
                    }}
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      "group relative flex h-8 justify-start",
                      path === child.href &&
                        "bg-muted font-medium hover:bg-muted"
                    )}
                  >
                    {child.icon && (
                      <child.icon className={cn("h-4 w-4", item.color)} />
                    )}
                    <div
                      className={cn(
                        "absolute left-8 text-base duration-200",
                        !isOpen && className
                      )}
                    >
                      {child.title}
                    </div>
                  </Link>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ) : (
          <Link
            key={item.title}
            href={item.href}
            onClick={() => {
              if (setOpen) setOpen(false);
            }}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "group relative flex h-8 justify-start",
              path === item.href && "bg-muted font-semibold hover:bg-muted"
            )}
          >
            {item.icon && <item.icon className={cn("h-4 w-4", item.color)} />}
            {item.color ? (
              <span
                className={cn(
                  "absolute left-12 text-base duration-200",
                  item.color,
                  !isOpen && className
                )}
              >
                {item.title}
              </span>
            ) : (
              <span
                className={cn(
                  "absolute left-12 text-base duration-200",
                  !isOpen && className
                )}
              >
                {item.title}
              </span>
            )}
          </Link>
        )
      )}
    </div>
  );
}
