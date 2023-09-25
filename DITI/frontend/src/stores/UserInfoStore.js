import { create } from 'zustand';

const useUserInfoStore = create((set) => ({
  walletAddress: null,
  token: null,
  setUserInfo: (walletAddress, token) => {
    set({ walletAddress, token });
  },
}));

export default useUserInfoStore;
