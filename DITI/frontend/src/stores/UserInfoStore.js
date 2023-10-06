import { create } from 'zustand';
import { persist } from 'zustand/middleware'

const useUserInfoStore = create(persist((set) => ({
  walletAddress: null,
  token: null,
  setUserInfo: (walletAddress, token) => {
    set({ walletAddress, token });
  },
}),{name:"diti"}));

export default useUserInfoStore;
