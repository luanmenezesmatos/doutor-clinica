import Image from "next/image";

import { useState, useEffect } from "react";

import { NavItems } from "@/config/sidebar";

import { Icons } from "@/components/icons";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { SideNav } from "@/components/layout/platform-side-nav";

export const MobileSidebar = () => {
  const [open, setOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          {/* <button
            className="flex items-center space-x-2 md:hidden"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? <Icons.close /> : <Icons.menu />}
            <span className="font-sans font-semibold">Menu</span>
          </button> */}

          <div className="flex items-center justify-center space-x-2">
            {open ? (
              <Icons.close className="h-5 w-5" />
            ) : (
              <Icons.alignRight className="h-5 w-5" />
            )}
            <span className="font-sans font-semibold">Menu</span>
          </div>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 overflow-y-auto">
          <div className="flex flex-col items-start justify-start pt-10 gap-2">
            <Image
              alt="logo"
              src="/images/svg/logo.svg"
              width={160}
              height={40}
            />

            <div className="text-md font-inter" style={{ maxWidth: "200px" }}>
              Democratizamos o acesso à{" "}
              <b className="font-semibold">saúde de qualidade</b>
            </div>
          </div>

          <div className="px-1 py-6 pt-16">
            <SideNav items={NavItems} setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};
