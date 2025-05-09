import axiosInstance from "@/services/axios";
import { IArticlesPagination } from "@/types/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ArticleState {
  data: IArticlesPagination[];
  page: number;
  limit: number;
  total: number;
  loading: boolean;
  categoryFilter: string;
  searchFilter: string;
  setArticles: (data: IArticlesPagination[]) => void;
  setCurrentPage: (page: number) => void;
  setCategoryFilter: (category: string) => void;
  setSearchFilter: (search: string) => void;
  setPagination: (
    currentPage: number,
    totalPages: number,
    totalData: number
  ) => void;
  fetchArticles: (
    page?: number,
    limit?: number,
    category?: string,
    search?: string
  ) => void;
}

export const useArticleStore = create<ArticleState>()(
  persist(
    (set, get) => ({
      data: [],
      page: 1,
      limit: 9,
      total: 0,
      loading: false,
      categoryFilter: "",
      searchFilter: "",
      setArticles: (data) => set({ data }),
      setCurrentPage: (page: number) => {
        set({ page });
        get().fetchArticles(
          page,
          get().limit,
          get().categoryFilter,
          get().searchFilter
        );
      },
      setCategoryFilter: (category: string) => {
        set({ categoryFilter: category });
        get().fetchArticles(
          1,
          get().limit,
          get().categoryFilter,
          get().searchFilter
        );
      },
      setSearchFilter: (search: string) => {
        set({ searchFilter: search });
        get().fetchArticles(1, get().limit, get().categoryFilter, search);
      },
      setPagination: (page, limit, total) => {
        set({ page, limit, total });
      },
      fetchArticles: (page, limit) => {
        set({ page, limit });
      },
    }),
    {
      name: "article-storage",
      partialize: (state) => ({
        total: state.total,
      }),
    }
  )
);
