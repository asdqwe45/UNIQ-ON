import { create } from "zustand";
import { persist } from "zustand/middleware";

let transactionStore = (set) => ({
  transaction: [],
  setTransaction: (payload) => set({ transaction: payload }),
});

transactionStore = persist(transactionStore, { name: "transaction" });

export const useTransactionStore = create(transactionStore);