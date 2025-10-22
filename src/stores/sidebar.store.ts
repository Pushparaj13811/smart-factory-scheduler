// Sidebar state management with Zustand
// Replaces the SidebarContext from components/ui/sidebar.tsx

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SidebarState {
  // Desktop sidebar state
  isOpen: boolean;
  isCollapsed: boolean;

  // Mobile sidebar state
  isMobileSidebarOpen: boolean;
  isMobile: boolean;

  // Actions
  setOpen: (open: boolean) => void;
  setCollapsed: (collapsed: boolean) => void;
  setMobileSidebarOpen: (open: boolean) => void;
  setIsMobile: (isMobile: boolean) => void;
  toggleSidebar: () => void;
  toggleMobileSidebar: () => void;
  collapseSidebar: () => void;
  expandSidebar: () => void;
  closeSidebar: () => void;
}

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set) => ({
      // Initial state
      isOpen: true,
      isCollapsed: false,
      isMobileSidebarOpen: false,
      isMobile: false,

      // Actions
      setOpen: (open) => set({ isOpen: open }),

      setCollapsed: (collapsed) => set({ isCollapsed: collapsed }),

      setMobileSidebarOpen: (open) => set({ isMobileSidebarOpen: open }),

      setIsMobile: (isMobile) => set({ isMobile }),

      toggleSidebar: () =>
        set((state) => ({
          isOpen: !state.isOpen,
        })),

      toggleMobileSidebar: () =>
        set((state) => ({
          isMobileSidebarOpen: !state.isMobileSidebarOpen,
        })),

      collapseSidebar: () => set({ isCollapsed: true }),

      expandSidebar: () => set({ isCollapsed: false }),

      closeSidebar: () =>
        set({
          isOpen: false,
          isMobileSidebarOpen: false,
        }),
    }),
    {
      name: 'sidebar-storage',
      // Only persist desktop sidebar state, not mobile state
      partialize: (state) => ({
        isOpen: state.isOpen,
        isCollapsed: state.isCollapsed,
      }),
    }
  )
);
