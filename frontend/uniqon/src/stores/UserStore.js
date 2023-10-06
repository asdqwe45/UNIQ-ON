import { create } from "zustand";
import { persist } from "zustand/middleware";

let userStore = (set) => ({
  user: [],
  accessToken: "",
  nowAccessToken: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMTEiLCJhdXRoIjoiQURNSU4sVVNFUiIsImV4cCI6MTY5NTcwOTMzNH0.oc82R5ybi12gGcXbcssOUlkfHT0d4k31lOg_IbZzEfkAWUVB4jG3DD6-cufvIaM9sPN481OLoz43Q4V7-HsZFw",
  setUser: (payload) => set({ user: payload }),
  setAccessToken: (payload) => set({ accessToken: payload }),
});

userStore = persist(userStore, { name: "user_settings" });

export const useUserStore = create(userStore);