import { create } from "zustand";
import { persist } from "zustand/middleware";

let collectionsStore = (set) => ({
  collections: [],
  setCollections: (payload) => set({ collections: payload }),
});

collectionsStore = persist(collectionsStore, { name: "collections" });

export const useCollectionsStore = create(collectionsStore);