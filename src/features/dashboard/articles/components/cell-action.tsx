import { IArticlesPagination } from "@/types/types";
import Link from "next/link";
import React, { useCallback } from "react";
import { AlertDeleteArticle } from "./alert-delete-article";
import { useDeleteArticle } from "@/services/api/article";

interface CellActionProps {
  data: IArticlesPagination;
}

const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const { mutate } = useDeleteArticle(data.id);

  const onConfirm = useCallback(() => {
    mutate();
  }, [mutate]);

  return (
    <div className="flex justify-center gap-2 ">
      <Link href={`/articles/preview/${data.id}`} className="text-blue-600 underline">
        Preview
      </Link>
      <Link
        href={`/dashboard/articles/edit/${data.id}`}
        className="text-blue-600 underline"
      >
        Edit
      </Link>
      <AlertDeleteArticle onClick={onConfirm} />
    </div>
  );
};

export default CellAction;
