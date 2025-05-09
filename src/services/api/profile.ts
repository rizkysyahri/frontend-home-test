import { useAuthStore } from "@/stores/use-auth-store";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axios";

export function useGetProfile() {
  const token = useAuthStore((state) => state.token);

  const { data } = useQuery({
    queryKey: ["get-profile"],
    queryFn: async () => {
      const res = await axiosInstance.get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    },
  });

  return { data };
}
