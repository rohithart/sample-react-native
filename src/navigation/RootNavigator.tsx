import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Linking from 'expo-linking';
import { useAuthStore } from '@store/index';
import { SplashScreen } from '@screens/index';
import { AuthNavigator } from './AuthNavigator';
import { AppNavigator } from './AppNavigator';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const linking = {
  prefixes: ['mobileapp://', 'https://mobileapp.com'],
  config: {
    screens: {
      App: {
        screens: {
          Dashboard: 'dashboard/:id',
          Profile: 'profile',
          Chat: 'chat',
        },
      },
    },
  },
};

export function RootNavigator() {
  const [isReady, setIsReady] = useState(false);
  const { isAuthenticated, isLoading } = useAuthStore();

  useEffect(() => {
    // Simulate app initialization
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!isReady || isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer linking={linking} fallback={<SplashScreen />}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animationEnabled: true,
        }}
      >
        {isAuthenticated ? (
          <Stack.Screen
            name="App"
            component={AppNavigator}
            options={{ animationEnabled: false }}
          />
        ) : (
          <Stack.Screen
            name="Auth"
            component={AuthNavigator}
            options={{ animationEnabled: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
