"use client";

import React, { useEffect } from "react";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import { useArticleStore } from "@/stores/use-article-store";
import { useGetArticles } from "@/services/api/article";

export default function ArticlesListing() {
  const {
    data: articles,
    fetchArticles,
    page,
    limit,
    setArticles,
    categoryFilter,
    searchFilter,
  } = useArticleStore();

  const { data } = useGetArticles();

  useEffect(() => {
    if (data) {
      setArticles(data.articles)
      fetchArticles(page, limit, categoryFilter, searchFilter);
    }
  }, [data, page, limit, categoryFilter, searchFilter, fetchArticles]);

  return <DataTable data={articles} columns={columns} />;
}
