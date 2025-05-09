import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../axios";
import { useAuthStore } from "@/stores/use-auth-store";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface ArticleParams {
  page: number;
  limit: number;
  categoryId?: string;
  search?: string;
}
export function useGetArticles(
  page = 1,
  limit = 9,
  category = "",
  search = ""
) {
  const { data } = useQuery({
    queryKey: ["get-articles", { page, limit, category, search }],
    queryFn: async () => {
      const params: ArticleParams = { page, limit };
      if (category) params.categoryId = category;
      if (search) params.search = search;

      console.log("api request param:", params);

      const res = await axiosInstance.get("/articles", {
        params: { page, limit, category, search },
      });

      const data = res.data;

      console.log("res:", data);

      return {
        articles: data.data,
        total: data.total,
        page: data.page,
        limit: data.limit,
      };
    },
  });

  return { data };
}

export function useGetArticleById(id: string) {
  const { data } = useQuery({
    queryKey: ["get-article-by-id"],
    queryFn: async () => {
      const res = await axiosInstance.get(`/articles/${id}`);

      return res.data;
    },
  });

  return { data };
}

export function useCreateArticle() {
  const token = useAuthStore((state) => state.token);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationKey: ["create-article"],
    mutationFn: async ({
      title,
      content,
      categoryId,
    }: {
      title: string;
      content: string;
      categoryId: string;
    }) => {
      const res = await axiosInstance.post(
        "/articles",
        {
          title,
          content,
          categoryId,
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
      queryClient.invalidateQueries({ queryKey: ["get-articles"] });
      router.push("/dashboard/articles");
      toast({
        title: "Success",
        variant: "success",
        description: "Create article successfully",
      });
    },
  });

  return { mutate, isPending };
}

export function useUploadImage() {
  const token = useAuthStore((state) => state.token);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["upload-image"],
    mutationFn: async ({ formData }: { formData: FormData }) => {
      const resUpload = await axiosInstance.post("/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      return resUpload.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-articles"] });
    },
  });

  return { mutate, isPending };
}

export function useUpdateArticleById(id: string) {
  const token = useAuthStore((state) => state.token);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["update-article"],
    mutationFn: async ({
      title,
      content,
      categoryId,
      formData,
    }: {
      title: string;
      content: string;
      categoryId: string;
      formData: FormData;
    }) => {
      const resUpload = await axiosInstance.post("/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      resUpload.data;

      const res = await axiosInstance.put(
        `/articles/${id}`,
        {
          title,
          content,
          categoryId,
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
      queryClient.invalidateQueries({ queryKey: ["get-articles"] });

      toast({
        title: "Success",
        variant: "success",
        description: "Update article successfully",
      });
    },
  });

  return { mutate, isPending };
}

export function useDeleteArticle(id: string) {
  const token = useAuthStore((state) => state.token);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["delete-article"],
    mutationFn: async () => {
      await axiosInstance.delete(`/articles/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-articles"] });

      toast({
        title: "Success",
        variant: "success",
        description: "Delete article successfully",
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

  return { mutate };
}
