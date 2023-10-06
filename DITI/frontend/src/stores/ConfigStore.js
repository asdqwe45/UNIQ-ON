import { create } from 'zustand';

export const useConfigStore = create((set) => ({
    page: "landing",
    setPage: (page) => {
        set({ page:page });
    },
}));