import axiosInstance from "@/services/axios";
import { ICategories } from "@/types/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CategoriesState {
  categories: ICategories[];
  currentPage: number;
  totalData: number;
  totalPages: number;
  search: string;
  loading: boolean;
  setCurrentPage: (currentPage: number) => void;
  fetchCategory: (currentPage?: number, search?: string) => Promise<void>;
  setCategories: (categories: ICategories[]) => void;
  setPagination: (
    currentPage: number,
    totalPages: number,
    totalData: number
  ) => void;
  setSearch: (search: string) => void;
}

export const useCategoriesStore = create<CategoriesState>()(
  persist(
    (set, get) => ({
      categories: [],
      currentPage: 1,
      totalData: 0,
      totalPages: 0,
      search: "",
      loading: false,
      setCurrentPage: (currentPage: number) => {
        set({ currentPage: currentPage });
        get().fetchCategory(currentPage);
      },
      fetchCategory: async (currentPage = 1, search = get().search) => {
        set({ loading: true });
      },
      setCategories: (categories) => set({ categories }),
      setPagination: (currentPage, totalPages, totalData) => {
        set({ currentPage, totalPages, totalData });
      },
      setSearch: (search) => set({ search }),
    }),
    {
      name: "categories-storage",
      partialize: (state) => ({
        totalData: state.totalData,
      }),
    }
  )
);
