import { create } from "zustand";
import { persist } from "zustand/middleware";


let wishlistStore = (set) => ({
  wishlist: [],
  setWishlist: (payload) => set({ wishlist: payload }),
});

wishlistStore = persist(wishlistStore, { name: "wishlist" });

export const useWishlistStore = create(wishlistStore);