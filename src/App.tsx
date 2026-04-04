import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Auth0Provider } from '@context/index';
import { RootNavigator } from '@navigation/index';
import { useUIStore, showNotification } from '@store/index';
import { Toast, ErrorBoundary, GlobalLoadingOverlay } from '@components/index';
import { Colors } from '@constants/index';
import { initializeFirebase } from '@firebase/index';
import { Notification } from 'react-native-notifications';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const { notifications } = useUIStore();

  useEffect(() => {
    // Initialize Firebase
    try {
      initializeFirebase();
    } catch (error) {
      console.error('Firebase initialization error:', error);
    }

    // Hide splash screen after app is ready
    SplashScreen.hideAsync();

    // Setup notification listeners
    setupNotificationListeners();
  }, []);

  const setupNotificationListeners = () => {
    // Setup foreground notification handler
    Notification.events().registerNotificationReceivedForeground(
      (notification, completion) => {
        showNotification.info(notification.body || 'New notification');
        completion({ alert: true, sound: true, badge: false });
      }
    );

    // Setup notification open handler
    Notification.events().registerNotificationOpened(
      (notification, completion, action) => {
        console.log('Notification opened:', notification);
        completion();
      }
    );
  };

  return (
    <ErrorBoundary>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Auth0Provider>
          <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
          <RootNavigator />
          
          {/* Global Components */}
          <GlobalLoadingOverlay />
          {notifications.length > 0 && (
            <Toast 
              type={notifications[0].type} 
              message={notifications[0].message} 
            />
          )}
        </Auth0Provider>
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
}
