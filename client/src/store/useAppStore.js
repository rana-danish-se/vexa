import { create } from "zustand";

export const useAppStore = create((set) => ({
  isSidebarOpen: false,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebar: (open) => set({ isSidebarOpen: open }),
  user: null,
  setUser: (user) => set({ user }),
}));
