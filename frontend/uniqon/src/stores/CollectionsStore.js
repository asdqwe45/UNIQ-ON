import { create } from "zustand";
import { persist } from "zustand/middleware";

let collectionsStore = (set) => ({
  mainCollecId: [],
  setMainCollecId: (payload) => set({ mainCollecId: payload }),

  mainCollecType: [],
  setMainCollecType: (payload) => set({ mainCollecType: payload }),

  mainCollecImg: [],
  setMainCollecImg: (payload) => set({ mainCollecImg: payload }),

  midCollecId: [],
  setMidCollecId: (payload) => set({ midCollecId: payload }),

  midCollecType: [],
  setMidCollecType: (payload) => set({ midCollecType: payload }),

  midCollecImg: [],
  setMidCollecImg: (payload) => set({ midCollecImg: payload }),

  liked: false,
  setLiked: (payload) => set({ liked: payload }),

  mainType: [],
  setMainType: (payload) => set({ mainType: payload })
});

collectionsStore = persist(collectionsStore, { name: "collections" });

export const useCollectionsStore = create(collectionsStore);
