import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors, Spacing, BorderRadius } from '@constants/index';

const SkeletonLoader: React.FC = () => {
  return <View style={styles.skeleton} />;
};

export function LoadingCard() {
  const items = Array(3).fill(0);
  return (
    <View style={styles.container}>
      {items.map((_, index) => (
        <View key={index} style={styles.card}>
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
        </View>
      ))}
    </View>
  );
}

export function LoadingList() {
  return <LoadingCard />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.md,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
  skeleton: {
    backgroundColor: Colors.light,
    borderRadius: BorderRadius.md,
    height: 16,
    marginBottom: Spacing.sm,
  },
});
