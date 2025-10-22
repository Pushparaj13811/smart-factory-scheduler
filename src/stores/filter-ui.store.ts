// Filter UI state management with Zustand
// Manages visibility of filter panels across different list views

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type FilterView =
  | 'users'
  | 'machines'
  | 'components'
  | 'rawMaterials'
  | 'tasks'
  | 'maintenance'
  | 'orders';

interface FilterUIState {
  // State - tracks which filter panels are visible
  visibleFilters: Record<FilterView, boolean>;

  // Actions
  toggleFilters: (view: FilterView) => void;
  showFilters: (view: FilterView) => void;
  hideFilters: (view: FilterView) => void;
  isFiltersVisible: (view: FilterView) => boolean;
  showAllFilters: () => void;
  hideAllFilters: () => void;
}

export const useFilterUIStore = create<FilterUIState>()(
  persist(
    (set, get) => ({
      // Initial state - all filters hidden by default
      visibleFilters: {
        users: false,
        machines: false,
        components: false,
        rawMaterials: false,
        tasks: false,
        maintenance: false,
        orders: false,
      },

      // Actions
      toggleFilters: (view) =>
        set((state) => ({
          visibleFilters: {
            ...state.visibleFilters,
            [view]: !state.visibleFilters[view],
          },
        })),

      showFilters: (view) =>
        set((state) => ({
          visibleFilters: {
            ...state.visibleFilters,
            [view]: true,
          },
        })),

      hideFilters: (view) =>
        set((state) => ({
          visibleFilters: {
            ...state.visibleFilters,
            [view]: false,
          },
        })),

      isFiltersVisible: (view) => get().visibleFilters[view],

      showAllFilters: () =>
        set({
          visibleFilters: {
            users: true,
            machines: true,
            components: true,
            rawMaterials: true,
            tasks: true,
            maintenance: true,
            orders: true,
          },
        }),

      hideAllFilters: () =>
        set({
          visibleFilters: {
            users: false,
            machines: false,
            components: false,
            rawMaterials: false,
            tasks: false,
            maintenance: false,
            orders: false,
          },
        }),
    }),
    {
      name: 'filter-ui-storage',
    }
  )
);
