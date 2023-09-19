import { create } from "zustand";
import { persist } from "zustand/middleware";

let mypageStore = (set) => ({
  mypage: [],
  setMypage: (payload) => set({ mypage: payload }),
});

mypageStore = persist(mypageStore, { name: "mypage" });

export const useMypageStore = create(mypageStore);