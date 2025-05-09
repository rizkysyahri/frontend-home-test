import { useAuthStore } from "@/stores/use-auth-store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../axios";
import { useToast } from "@/hooks/use-toast";
import { useCategoriesStore } from "@/stores/use-category-store";

interface CategoryParams {
  page: number;
  limit: number;
  search?: string;
}
export function useGetCategory(page = 1, search = "") {
  const { data } = useQuery({
    queryKey: ["get-category", { page, search }],
    queryFn: async () => {
      const params: CategoryParams = { page, limit: 1 };
      if (search) params.search = search;
      console.log("params for cateogir : ", params);

      const res = await axiosInstance.get("/categories", {
        params: { page, search },
      });

      const data = res.data;

      console.log("api response categori: ", data);

      return {
        categories: data.data,
        currentPage: data.currentPage,
        totalPages: data.totalPages,
        totalData: data.totalData,
      };
    },
    staleTime: 5 * 60 * 1000,
  });

  return { data };
}

export function useCreateCategory() {
  const token = useAuthStore((state) => state.token);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["create-category"],
    mutationFn: async ({ name }: { name: string }) => {
      const res = await axiosInstance.post(
        "/categories",
        {
          name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-category"] });
      toast({
        title: "Success",
        variant: "success",
        description: "Create category successfully",
      });
    },
  });

  return { mutate };
}

export function useDeleteCategory(id: string) {
  const token = useAuthStore((state) => state.token);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["delete-category"],
    mutationFn: async () => {
      await axiosInstance.delete(`/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-category"] });
      toast({
        title: "Success",
        variant: "success",
        description: "Delete category successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        variant: "destructive",
        description: error.message,
      });
    },
  });

  return { mutate, isPending };
}

export function useEditCategoryById(id: string) {
  const token = useAuthStore((state) => state.token);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["edit-category"],
    mutationFn: async ({ name }: { name: string }) => {
      await axiosInstance.put(
        `/categories/${id}`,
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-category"] });
      toast({
        title: "Success",
        variant: "success",
        description: "Edit category successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        variant: "destructive",
        description: error.message,
      });
    },
  });

  return { mutate, isPending };
}
