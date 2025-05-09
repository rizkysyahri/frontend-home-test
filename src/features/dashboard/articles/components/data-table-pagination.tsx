import React, { useCallback, useEffect } from "react";
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
import { useGetArticles } from "@/services/api/article";

const DataTablePagination = () => {
  const {
    data: articles,
    page,
    limit,
    total,
    setArticles,
    categoryFilter,
    searchFilter,
    fetchArticles,
    setPagination,
    setCurrentPage,
  } = useArticleStore();

  const { data } = useGetArticles(page, limit, categoryFilter, searchFilter);

  useEffect(() => {
    if (data) {
      setArticles(data.articles)
      setPagination(data.page, data.limit, data.total);
      fetchArticles(data.page, data.limit);
    }
  }, [data, page, limit, setPagination, fetchArticles]);

  const handlePageChange = useCallback(
    (newPage: number) => {
      if (newPage <= total && newPage !== page) {
        setCurrentPage(newPage);
      }
    },
    [page, total, fetchArticles, setCurrentPage]
  );

  const firstPageToShow = Math.floor((page - 1) / 2) * 2 + 1;
  const secondPageToShow = firstPageToShow + 1;

  return (
    <div className="flex items-center justify-center mt-24">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
              onClick={() => handlePageChange(page - 1)}
              aria-disabled={page === 1}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              onClick={() => handlePageChange(firstPageToShow)}
              className={
                page === firstPageToShow ? "text-black font-semibold" : ""
              }
            >
              {firstPageToShow}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              onClick={() => handlePageChange(secondPageToShow)}
              className={
                page === secondPageToShow ? "text-black font-semibold" : ""
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
              onClick={() => handlePageChange(page + 1)}
              aria-disabled={page === total}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default DataTablePagination;
