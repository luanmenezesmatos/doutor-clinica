import Image from "next/image";
import { useState, useEffect } from "react";
import { AlignRight } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SideNav } from "@/components/layout/platform-side-nav";
import { NavItems } from "@/config/sidebar";

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
          <div className="flex items-center justify-center gap-2 p-1 border rounded-xl bg-neutral-50">
            <AlignRight />
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
