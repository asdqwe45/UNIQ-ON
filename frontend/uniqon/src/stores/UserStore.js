import { create } from "zustand";
import { persist } from "zustand/middleware";

let userStore = (set) => ({
  user: [],
  setUser: (payload) => set({ user: payload }),
});

userStore = persist(userStore, { name: "user_settings" });

export const useUserStore = create(userStore);