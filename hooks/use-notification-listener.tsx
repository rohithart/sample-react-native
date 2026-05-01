import { useEffect } from 'react';
import { setupNotificationHandlers } from '@/services/firebase';
import { useToast } from '@/context/toast-context';

export function useNotificationListener() {
  const { showToast } = useToast();

  useEffect(() => {
    const unsubscribe = setupNotificationHandlers((notification) => {
      const title = notification.notification?.title || 'New Notification';
      const body = notification.notification?.body || '';

      console.log('Notification received:', { title, body });

      if (title && body) {
        showToast({
          title,
          message: body,
          type: 'info',
        });
      }

      if (notification.data) {
        console.log('Notification data:', notification.data);
      }
    });

    return () => {
      unsubscribe?.();
    };
  }, [showToast]);
}
