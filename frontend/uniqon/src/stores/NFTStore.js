import { create } from "zustand";
import { persist } from "zustand/middleware";

let nftStore = (set) => ({
  nft: [],
  setNft: (payload) => set({ nft: payload })
});

nftStore = persist(nftStore, { name: "nft" });

export const useNftStore = create(nftStore);
