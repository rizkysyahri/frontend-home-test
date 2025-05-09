import type { TProfile } from "@/types/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LoginStore {
  user: TProfile | null | undefined;
  token: string;
  login: (user: TProfile | null | undefined, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<LoginStore>()(
  persist(
    (set) => ({
      user: undefined,
      token: "",
      login: (user, token) => {
        set({ user, token });
      },
      logout: () => {
        set({ user: undefined, token: "" });
        localStorage.removeItem("token");
      },
    }),
    {
      name: "auth-storage", 
      partialize: (state) => ({ token: state.token }),
    }
  )
);
