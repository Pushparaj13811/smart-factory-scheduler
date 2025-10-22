// Navigation state management with Zustand
// Manages expanded/collapsed state of navigation items

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface NavigationState {
  // State
  expandedItems: string[]; // Array of navigation item IDs that are expanded

  // Actions
  toggleItem: (itemId: string) => void;
  expandItem: (itemId: string) => void;
  collapseItem: (itemId: string) => void;
  expandAll: () => void;
  collapseAll: () => void;
  setExpandedItems: (items: string[]) => void;
}

export const useNavigationStore = create<NavigationState>()(
  persist(
    (set) => ({
      // Initial state
      expandedItems: [],

      // Actions
      toggleItem: (itemId) =>
        set((state) => ({
          expandedItems: state.expandedItems.includes(itemId)
            ? state.expandedItems.filter((id) => id !== itemId)
            : [...state.expandedItems, itemId],
        })),

      expandItem: (itemId) =>
        set((state) => ({
          expandedItems: state.expandedItems.includes(itemId)
            ? state.expandedItems
            : [...state.expandedItems, itemId],
        })),

      collapseItem: (itemId) =>
        set((state) => ({
          expandedItems: state.expandedItems.filter((id) => id !== itemId),
        })),

      expandAll: () =>
        set({
          expandedItems: [
            'inventory',
            'schedule',
            'maintenance',
            'users',
            'reports',
            'settings',
          ],
        }),

      collapseAll: () =>
        set({
          expandedItems: [],
        }),

      setExpandedItems: (items) =>
        set({
          expandedItems: items,
        }),
    }),
    {
      name: 'navigation-storage',
    }
  )
);
