"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { InputDefault } from "@/components/ui/input-default";
import Link from "next/link";
import ArticlesListing from "@/features/dashboard/articles/articles-listing";
import { useArticleStore } from "@/stores/use-article-store";
import { useGetCategory } from "@/services/api/category";
import { useGetArticles } from "@/services/api/article";
import { useCategoriesStore } from "@/stores/use-category-store";

const Page = () => {
  const {
    fetchArticles,
    page,
    limit,
    total,
    categoryFilter,
    setCategoryFilter,
    setSearchFilter,
    searchFilter,
  } = useArticleStore();
  const { categories, fetchCategory } = useCategoriesStore();
  const { data: dataCategory } = useGetCategory();
  const activeSearchFilter = searchFilter.trim() !== "" ? searchFilter : "";
  const { data } = useGetArticles(
    page,
    limit,
    categoryFilter,
    activeSearchFilter
  );
  const [searchInput, setSearchInput] = useState(searchFilter);

  useEffect(() => {
    if (dataCategory) {
      useCategoriesStore.getState().setCategories(dataCategory.categories);
    }
    if (categories.length === 0) {
      fetchCategory(1, "");
    }
  }, [dataCategory, categories, fetchCategory]);

  useEffect(() => {
    fetchArticles(page, limit, categoryFilter, activeSearchFilter);
  }, [page, limit, categoryFilter, activeSearchFilter, fetchArticles]);

  const handleCategoryChange = (value: string) => {
    console.log("Category changed to:", value);
    setCategoryFilter(value);
  };

  const debouncedSetSearchFilter = useMemo(() => {
    let timeoutId: NodeJS.Timeout;
    return (value: string) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setSearchFilter(value);
      }, 400);
    };
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);
    debouncedSetSearchFilter(value);
  };

  return (
    <div>
      <div className="bg-gray-50 rounded-xl flex flex-col">
        <div className="p-4">
          <span>Total Article: {data?.total ?? 0}</span>
        </div>
        <Separator className="bg-slate-300" />
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <Select onValueChange={handleCategoryChange} value={categoryFilter}>
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <div className="relative w-full">
              <InputDefault
                type="search"
                placeholder="Search articles"
                value={searchInput}
                onChange={handleSearchChange}
                className="flex w-full h-9 bg-slate-200 pl-10 text-black border-[1px] border-slate-300 focus:ring-1"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
            </div>
          </div>
          <Link href="/dashboard/articles/add">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4" />
              <span>Add Articles</span>
            </Button>
          </Link>
        </div>
        <Separator className="bg-slate-300" />

        <ArticlesListing />
      </div>
    </div>
  );
};

export default Page;
