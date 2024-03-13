"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";

export type Patient = {
  id: string;
  full_civil_name: string;
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
