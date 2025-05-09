import { IArticlesPagination, ICategories } from "@/types/types";
import Link from "next/link";
import React, { useCallback } from "react";
import { AlertDeleteCategory } from "./alert-delete-category";
import { useDeleteCategory } from "@/services/api/category";

interface CellActionCategoryProps {
  data: ICategories;
}

const CellActionCategory: React.FC<CellActionCategoryProps> = ({ data }) => {
  const { mutate } = useDeleteCategory(data.id);

  const onConfirm = useCallback(() => {
    mutate();
  }, [mutate]);

  return (
    <div className="flex justify-center gap-2 ">
      <Link
        href={`/dashboard/category/(..)edit/${data.id}`}
        className="text-blue-600 underline"
      >
        Edit
      </Link>
      <AlertDeleteCategory onClick={onConfirm} name={data.name}/>
    </div>
  );
};

export default CellActionCategory;
