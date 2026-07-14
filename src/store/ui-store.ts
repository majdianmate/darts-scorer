import { create } from 'zustand'

export type dialogs = 'club-creator';

interface UiStore {
  isSidebarOpen: boolean
  setSidebarOpen: (isOpen: boolean) => void
  toggleSidebar: () => void
  dialogs: Record<dialogs, boolean>
  setDialog: (dialog: dialogs, isOpen: boolean) => void
}

export const useUiStore = create<UiStore>((set) => ({
  isSidebarOpen: true,
  setSidebarOpen: (isSidebarOpen) => set({ isSidebarOpen }),
  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  dialogs: {
    'club-creator': false,
  },
  setDialog: (dialog: dialogs, isOpen: boolean) =>
    set((state) => ({ dialogs: { ...state.dialogs, [dialog]: isOpen } })),
}))
