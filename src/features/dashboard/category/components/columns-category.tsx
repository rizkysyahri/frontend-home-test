"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { IArticlesPagination, ICategories } from "@/types/types";
import CellActionCategory from "./cell-action-category";
import { formatDateAdmin } from "@/lib/utils";

// export type Articles = {
//   data: IArticlesPagination[];
// };

export const columns: ColumnDef<ICategories>[] = [
  {
    accessorKey: "name",
    header: "Category",
  },

  {
    accessorKey: "createdAt",
    header: "Created at",
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as string;
      return <div>{formatDateAdmin(createdAt)}</div>;
    },
  },
  {
    accessorKey: "id",
    header: "Actions",
    cell: ({ row }) => <CellActionCategory data={row.original} />,
  },
];
