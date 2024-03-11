"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";

import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";

import Breadcrumb from "@/components/breadcrumb";

export function Patients() {
  const breadcrumbItems = [{ title: "Pacientes", link: "" }];

  return (
    <>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <Breadcrumb items={breadcrumbItems} />

        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Pacientes</h2>

          <div className="flex flex-col md:flex-row items-center space-x-2">
            <Link
              href="/plataforma/paciente/novo"
              className={cn(buttonVariants({ variant: "default" }))}
            >
              <Icons.plus className="h-4 w-4" />
              <span className="ml-2">Adicionar paciente</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
