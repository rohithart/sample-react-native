import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useUIStore } from '@store/index';
import { Colors, Spacing, Typography } from '@constants/index';

export function GlobalLoadingOverlay() {
  const { showLoading } = useUIStore();

  if (!showLoading) {
    return null;
  }

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <Text style={styles.text}>Loading...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  container: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: Spacing.lg,
    alignItems: 'center',
  },
  text: {
    ...Typography.body1,
    color: Colors.text,
    marginTop: Spacing.md,
  },
});
