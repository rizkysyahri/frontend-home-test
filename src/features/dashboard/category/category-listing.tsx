"use client";

import React, { useEffect } from "react";
import { DataTableCategory } from "./components/data-table-category";
import { columns } from "./components/columns-category";
import { useCategoriesStore } from "@/stores/use-category-store";
import { useGetCategory } from "@/services/api/category";

export default function CategoryListing() {
  const { categories, setCategories, setPagination } = useCategoriesStore();
  const { data } = useGetCategory();

  useEffect(() => {
    if (data) {
      setCategories(data.categories),
        setPagination(data.currentPage, data.totalPages, data.totalData);
    }
  }, [data, setCategories, setPagination]);

  return <DataTableCategory data={categories} columns={columns} />;
}
