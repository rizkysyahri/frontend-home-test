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
import { useCategoriesStore } from "@/stores/use-category-store";
import { useGetCategory } from "@/services/api/category";

const DataTablePaginationCategory = () => {
  const {
    currentPage,
    totalPages,
    setCategories,
    setPagination,
    setCurrentPage,
  } = useCategoriesStore();
  const { data } = useGetCategory();

  useEffect(() => {
    if (data) {
      setCategories(data.categories);
      setPagination(data.currentPage, data.totalPages, data.totalData);
    }
  }, [data, setCategories, setPagination]);

  const handlePageChange = useCallback(
    (newPage: number) => {
      if (newPage <= totalPages && newPage !== currentPage) {
        setCurrentPage(newPage);
      }
    },
    [currentPage, totalPages, setCurrentPage]
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
              aria-disabled={currentPage === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default DataTablePaginationCategory;
