"use client";

import Link from "next/link";

import { ColumnDef } from "@tanstack/react-table";

import { cn } from "@/lib/utils";

import { Icons } from "@/components/icons";
import { Button, buttonVariants } from "@/components/ui/button";

import { format, formatDistance, formatRelative, subDays } from "date-fns";
import { ptBR } from "date-fns/locale";

import { FaWhatsapp } from "react-icons/fa";

export type Patient = {
  id: string;
  control_number: string;
  full_civil_name: string;
  date_of_birth: string;
  cell_phone: string;
  email: string;
  is_active: boolean;
};

export const columns: ColumnDef<Patient>[] = [
  {
    accessorKey: "control_number",
    header: "Número de Controle",
    cell: ({ getValue }) => {
      const controlNumber = getValue() as string;

      return <span>{controlNumber}</span>;
    },
  },
  {
    accessorKey: "full_civil_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome do Paciente
          <Icons.arrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ getValue }) => {
      const name = getValue() as string;

      return <span className="font-semibold">{name}</span>;
    },
  },
  {
    accessorKey: "date_of_birth",
    header: "Data de Nascimento",
    cell: ({ getValue }) => {
      const dateOfBirth = getValue() as string;

      return (
        <>
          <span>{format(new Date(dateOfBirth), "dd/MM/yyyy")}</span>
          <span className="ml-2 text-gray-500 font-semibold">
            (
            {formatDistance(new Date(dateOfBirth), new Date(), {
              locale: ptBR,
            })}
            )
          </span>
        </>
      );
    },
  },
  {
    accessorKey: "cell_phone",
    header: "Telefone Celular",
    cell: ({ getValue }) => {
      const cellPhone = getValue() as string;

      return (
        <div className="flex flex-row items-center space-x-2">
          <span>{cellPhone}</span>
          <Link
            href={`https://wa.me/+55${cellPhone.replace(/\D/g, "")}`}
            passHref
            target="_blank"
            className={cn(
              buttonVariants({ variant: "outline", size: "icon" }),
              "h-6 w-6"
            )}
          >
            <FaWhatsapp />
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "E-mail",
    cell: ({ getValue }) => {
      const email = getValue() as string;

      return <span>{email ? email : "Não informado"}</span>;
    },
  },
  {
    accessorKey: "is_active",
    header: "Situação",
    cell: ({ getValue }) => {
      const isActive = getValue() as boolean;

      return (
        <span
          className={`px-2 py-1 rounded-md ${
            isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {isActive ? "Ativo" : "Inativo"}
        </span>
      );
    },
  },
  {
    accessorKey: "id",
    header: "Ações",
    cell: ({ getValue, row }) => {
      const id = getValue() as string;
      const controlNumber = row.original.control_number;

      return (
        <>
          <div className="flex items-center space-x-2">
            <Link
              href={`/plataforma/paciente/visualiza/${controlNumber}`}
              className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
            >
              <Icons.eye className="h-4 w-4" />
            </Link>

            <Button variant="outline" size="sm">
              <Icons.closeCircle className="h-4 w-4" />
            </Button>
          </div>
        </>
      );
    },
  },
];
