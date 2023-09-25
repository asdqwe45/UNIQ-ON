import { create } from "zustand";
import { persist } from "zustand/middleware";

let transactionStore = (set) => ({
  salesItemsList: [],
  forDetailItem: "",
  isWishList: 0,
  setSalesItemsList: (payload) => set({ salesItemsList: payload }),
  setForDetailItem: (payload) => set({ forDetailItem: payload }),
  setIsWishList: (payload) => set({ isWishList: payload }),
});

transactionStore = persist(transactionStore, { name: "transaction_store" });

export const useTransactionStore = create(transactionStore);