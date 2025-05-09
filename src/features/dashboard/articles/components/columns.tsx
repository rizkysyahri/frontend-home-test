"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import CellAction from "./cell-action";
import { IArticlesPagination } from "@/types/types";
import { formatDateAdmin } from "@/lib/utils";

// export type Articles = {
//   data: IArticlesPagination[];
// };

export const columns: ColumnDef<IArticlesPagination>[] = [
  {
    accessorKey: "imageUrl",
    header: "Thumbnail",
    cell: ({ row }) => {
      return (
        <div className="flex justify-center">
          <Image
            src={
              row.getValue("imageUrl") ||
              "https://images.unsplash.com/photo-1746469435655-00d7340ec1c4?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt={row.getValue("title")}
            width={90}
            height={90}
            className="rounded-[6px]"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "category.name",
    header: "Category",
    cell: ({ row }) => row.original.category.name,
  },
  {
    accessorKey: "createdAt",
    header: "Created at",
    cell: ({row}) => {
      const createdAt = row.getValue("createdAt") as string;
      return <div>{formatDateAdmin(createdAt)}</div>;
    }
  },
  {
    accessorKey: "id",
    header: "Actions",
    cell: ({ row }) => <CellAction data={row.original}/>,
  },
];
