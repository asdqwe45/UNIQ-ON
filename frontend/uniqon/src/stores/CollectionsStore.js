import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
  setMidCollecImg: (payload) => set({ midCollecImg: payload })
});

collectionsStore = persist(collectionsStore, { name: 'collections' });

export const useCollectionsStore = create(collectionsStore);
