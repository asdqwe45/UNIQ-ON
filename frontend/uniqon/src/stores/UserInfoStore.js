import { create } from 'zustand';
import { persist } from "zustand/middleware";

const useUserInfoStore = create(persist((set) => ({
  walletAddress: null,
  accessToken: null,
  setUserInfo: (walletAddress, token) => {
    set({ walletAddress, token });
  },
  setWalletAddress: (payload) => {
    set({ walletAddress: payload })
  },
  setAccessToken: (payload) => {
    set({ accessToken: payload })
  },
  clearUserInfo: () => {
    set({ walletAddress: null, accessToken: null });
  }
}), { name: "user_info" }));


export default useUserInfoStore;