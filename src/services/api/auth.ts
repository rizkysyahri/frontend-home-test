import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import axiosInstance from "../axios";
import { useRouter } from "next/navigation";
import { string } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/stores/use-auth-store";
import { TProfile } from "@/types/types";

export function useSignUp() {
  const [registerForm, setRegisterForm] = useState<{
    username: string;
    password: string;
    role: string;
  }>({ username: "", password: "", role: "" });

  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationKey: ["signup"],
    mutationFn: async ({
      username,
      password,
      role,
    }: {
      username: string;
      password: string;
      role: string;
    }) => {
      const res = await axiosInstance.post("/auth/register", {
        username,
        password,
        role,
      });

      return res.data;
    },
    onSuccess: () => {
      return router.push("/");
    },
  });

  return { mutate, isPending, setRegisterForm };
}

export function useSignIn() {
  const [loginForm, setLoginForm] = useState<{
    username: string;
    password: string;
  }>({ username: "", password: "" });

  const login = useAuthStore((state) => state.login);
  const router = useRouter();
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationKey: ["signin"],
    mutationFn: async ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => {
      const res = await axiosInstance.post("/auth/login", {
        username,
        password,
      });

      return res.data;
    },
    onSuccess: (data) => {
      console.log("Login berhasil ✅ Data:", data);
      console.log("Login form saat ini:", loginForm)
      if (!data.token) {
        throw new Error("Invalid response: Missing token");
      }

      const role = loginForm.username === "adminAku" ? "Admin" : "User";

      const user: TProfile = {
        role,
        username: loginForm.username,
      };

      login(user, data.token);

      if (role === "Admin") {
        console.log("Navigating to dashboard for Admin");

        router.push("/dashboard");
      } else if (role === "User") {
        console.log("user");

        return router.push("/articles");
      } else {
        router.push("/");
      }
    },
  });

  return { setLoginForm, isPending, mutate };
}
