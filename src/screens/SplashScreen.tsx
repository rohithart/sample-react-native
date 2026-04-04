import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useAuthStore } from '@store/index';
import { LoadingPage } from '@components/index';
import { Colors } from '@constants/index';

export function SplashScreen() {
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    // Simulate app initialization
    const timer = setTimeout(() => {
      // Navigation will handle redirects based on auth state
    }, 2000);

    return () => clearTimeout(timer);
  }, [isAuthenticated]);

  return (
    <View style={styles.container}>
      <LoadingPage />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
});
