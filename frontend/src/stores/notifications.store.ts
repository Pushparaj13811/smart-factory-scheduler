// Notifications state management with Zustand
// Global notification state for the application

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: Date;
  link?: string;
}

interface NotificationsState {
  // State
  notifications: Notification[];

  // Computed
  unreadCount: () => number;
  unreadNotifications: () => Notification[];

  // Actions
  addNotification: (notification: Omit<Notification, 'id' | 'read' | 'createdAt'>) => void;
  removeNotification: (id: string) => void;
  markAsRead: (id: string) => void;
  markAsUnread: (id: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
  clearRead: () => void;
}

export const useNotificationsStore = create<NotificationsState>()(
  persist(
    (set, get) => ({
      // Initial state
      notifications: [],

      // Computed values
      unreadCount: () => get().notifications.filter((n) => !n.read).length,

      unreadNotifications: () => get().notifications.filter((n) => !n.read),

      // Actions
      addNotification: (notification) =>
        set((state) => ({
          notifications: [
            {
              ...notification,
              id: `notification-${Date.now()}-${Math.random()}`,
              read: false,
              createdAt: new Date(),
            },
            ...state.notifications,
          ],
        })),

      removeNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        })),

      markAsRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        })),

      markAsUnread: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: false } : n
          ),
        })),

      markAllAsRead: () =>
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
        })),

      clearAll: () =>
        set({
          notifications: [],
        }),

      clearRead: () =>
        set((state) => ({
          notifications: state.notifications.filter((n) => !n.read),
        })),
    }),
    {
      name: 'notifications-storage',
      // Only persist notifications for 7 days
      partialize: (state) => ({
        notifications: state.notifications.filter((n) => {
          const sevenDaysAgo = new Date();
          sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
          return new Date(n.createdAt) > sevenDaysAgo;
        }),
      }),
    }
  )
);
