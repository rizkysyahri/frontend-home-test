"use client";

import React, { useEffect } from "react";
import { Search } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { InputDefault } from "@/components/ui/input-default";
import CategoryListing from "@/features/dashboard/category/category-listing";
import { DialogAddCategory } from "@/features/dashboard/category/components/dialog-add-category";
import { useGetCategory } from "@/services/api/category";
import { useCategoriesStore } from "@/stores/use-category-store";

const Page = () => {
  const { search, setSearch, currentPage, setCategories, setPagination } =
    useCategoriesStore();
  const { data } = useGetCategory(currentPage, search);

  useEffect(() => {
    console.log("useEffect triggered with data:", data);
    if (data) {
      useCategoriesStore.getState().setCategories(data.categories);

      setPagination(data.currentPage, data.totalPages, data.totalData);
    }
  }, [data, setCategories, setPagination]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log("Search value changed to:", value);
    setSearch(value);
    useCategoriesStore.getState().setCurrentPage(1);
  };

  return (
    <div>
      <div className="bg-gray-50 rounded-xl flex flex-col ">
        <div className="p-4">
          <span>Total Category : {data?.totalData ?? 0}</span>
        </div>
        <Separator className="bg-slate-300" />
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <div className="relative w-full">
              <InputDefault
                type="search"
                placeholder="Search category"
                value={search}
                onChange={handleSearchChange}
                className="flex w-full h-9 bg-slate-200 pl-10 text-black border-[1px] border-slate-300 focus:ring-1"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
            </div>
          </div>

          <DialogAddCategory />
        </div>
        <Separator className="bg-slate-300" />

        <CategoryListing />
      </div>
    </div>
  );
};

export default Page;
