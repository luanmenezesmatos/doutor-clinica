"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";

import { format, formatDistance, formatRelative, subDays } from "date-fns";
import { ptBR } from "date-fns/locale";

export type Patient = {
  id: string;
  full_civil_name: string;
  date_of_birth: string;
};

export const columns: ColumnDef<Patient>[] = [
  {
    accessorKey: "full_civil_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome
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

      console.log(dateOfBirth);

      /* const date = new Date(dateOfBirth);
      const formattedDate = date.toLocaleDateString("pt-BR");

      // Converter para 10/10/2021
      const today = new Date();
      const birthDate = new Date(dateOfBirth);
      const age = today.getFullYear() - birthDate.getFullYear();

      return (
        <div className="justify-center items-center">
          <p>{formattedDate}</p>
          <p className="text-gray-500 text-sm">({age} anos)</p>
        </div>
      ); */
    },
  },
  {
    accessorKey: "id",
    header: "Ações",
    cell: ({ getValue }) => {
      const id = getValue() as string;
      return (
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Icons.eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Icons.closeCircle className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];
