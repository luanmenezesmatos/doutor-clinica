import { create } from "zustand";

interface Sidebar {
  isOpen: boolean;
  toggle: () => void;
}

export const useSidebar = create<Sidebar>((set) => ({
  isOpen: true,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));
