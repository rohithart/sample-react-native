import {
  getMessaging,
  getToken as getMessagingToken,
  onMessage,
} from 'firebase/messaging';
import { getMessagingInstance } from './config';

export class NotificationService {
  private messaging = getMessagingInstance();

  async getFCMToken(): Promise<string | null> {
    try {
      if (!this.messaging) {
        console.warn('Messaging not available');
        return null;
      }
      const token = await getMessagingToken(this.messaging, {
        vapidKey: process.env.FIREBASE_VAPID_KEY,
      });
      return token;
    } catch (error) {
      console.error('Failed to get FCM token:', error);
      return null;
    }
  }

  listenToMessages(onNotification: (payload: any) => void): () => void {
    if (!this.messaging) {
      console.warn('Messaging not available');
      return () => {};
    }

    return onMessage(this.messaging, (payload) => {
      console.log('Message received:', payload);
      onNotification(payload);
    });
  }
}

export const notificationService = new NotificationService();
