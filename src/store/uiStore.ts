import { create } from 'zustand';
import { NotificationPayload, NotificationType } from '@types/index';

interface Notification extends NotificationPayload {
  id: string;
}

interface UIStore {
  notifications: Notification[];
  addNotification: (notification: Omit<NotificationPayload, 'duration'>) => void;
  removeNotification: (id: string) => void;
  showLoading: boolean;
  setShowLoading: (show: boolean) => void;
}

let notificationId = 0;

export const useUIStore = create<UIStore>((set) => ({
  notifications: [],
  showLoading: false,

  addNotification: (notification) => {
    const id = String(notificationId++);
    const duration = notification.duration || 3000;

    set((state) => ({
      notifications: [...state.notifications, { ...notification, id }],
    }));

    setTimeout(() => {
      set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== id),
      }));
    }, duration);
  },

  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),

  setShowLoading: (showLoading) => set({ showLoading }),
}));

// Helper functions for notifications
export const showNotification = {
  success: (message: string) =>
    useUIStore.getState().addNotification({
      type: NotificationType.SUCCESS,
      message,
    }),
  error: (message: string) =>
    useUIStore.getState().addNotification({
      type: NotificationType.ERROR,
      message,
    }),
  warning: (message: string) =>
    useUIStore.getState().addNotification({
      type: NotificationType.WARNING,
      message,
    }),
  info: (message: string) =>
    useUIStore.getState().addNotification({
      type: NotificationType.INFO,
      message,
    }),
};
