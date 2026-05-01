import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';

export async function initializeFirebase() {
  try {
    if (Platform.OS === 'ios') {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (!enabled) {
        console.log('Notification permissions not granted');
        return null;
      }
    }

    const fcmToken = await messaging().getToken();
    console.log('FCM Token:', fcmToken);
    return fcmToken;
  } catch (error) {
    console.error('Firebase initialization error:', error);
    return null;
  }
}

export async function getFCMToken() {
  try {
    const token = await messaging().getToken();
    return token;
  } catch (error) {
    console.error('Error getting FCM token:', error);
    return null;
  }
}

export function setupNotificationHandlers(
  onNotification?: (notification: any) => void,
) {
  const unsubscribeForeground = messaging().onMessage(async (remoteMessage) => {
    console.log('Message received in foreground:', remoteMessage);
    onNotification?.(remoteMessage);
  });

  messaging()
    .getInitialNotification()
    .then((remoteMessage) => {
      if (remoteMessage) {
        console.log('Message opened app from killed state:', remoteMessage);
        onNotification?.(remoteMessage);
      }
    });


  const unsubscribeBackground = messaging().onNotificationOpenedApp(
    (remoteMessage) => {
      console.log('Message opened app from background state:', remoteMessage);
      onNotification?.(remoteMessage);
    },
  );

  return () => {
    unsubscribeForeground();
    unsubscribeBackground();
  };
}

export async function subscribeToTopic(topic: string) {
  try {
    await messaging().subscribeToTopic(topic);
    console.log(`Subscribed to topic: ${topic}`);
  } catch (error) {
    console.error(`Error subscribing to topic ${topic}:`, error);
  }
}

export async function unsubscribeFromTopic(topic: string) {
  try {
    await messaging().unsubscribeFromTopic(topic);
    console.log(`Unsubscribed from topic: ${topic}`);
  } catch (error) {
    console.error(`Error unsubscribing from topic ${topic}:`, error);
  }
}
