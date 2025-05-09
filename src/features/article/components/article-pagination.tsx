import React, { useCallback } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useArticleStore } from "@/stores/use-article-store";
import { useRouter, useSearchParams } from "next/navigation";

const ArticlePagination = () => {
  const currentPage = useArticleStore((state) => state.page);
  const limit = useArticleStore((state) => state.limit);
  const total = useArticleStore((state) => state.total);
  const fetchArticle = useArticleStore((state) => state.fetchArticles);
  const setCurrentPage = useArticleStore((state) => state.setCurrentPage);

  console.log({ currentPage, total, limit });

  const handlePageChange = useCallback(
    (newPage: number) => {
      if (newPage <= total && newPage !== currentPage) {
        setCurrentPage(newPage);
        fetchArticle(newPage, limit);
      }
    },
    [currentPage, total, fetchArticle, limit, setCurrentPage]
  );

  const firstPageToShow = Math.floor((currentPage - 1) / 2) * 2 + 1;
  const secondPageToShow = firstPageToShow + 1;

  return (
    <div className="flex items-center justify-center mt-24">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
              onClick={() => handlePageChange(currentPage - 1)}
              aria-disabled={currentPage === 1}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              onClick={() => handlePageChange(firstPageToShow)}
              className={
                currentPage === firstPageToShow
                  ? "text-black font-semibold"
                  : ""
              }
            >
              {firstPageToShow}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              onClick={() => handlePageChange(secondPageToShow)}
              className={
                currentPage === secondPageToShow
                  ? "text-black font-semibold"
                  : ""
              }
            >
              {secondPageToShow}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
              onClick={() => handlePageChange(currentPage + 1)}
              aria-disabled={currentPage === total}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default ArticlePagination;
