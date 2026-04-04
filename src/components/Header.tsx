import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing, Typography } from '@constants/index';
import { NotificationType } from '@types/index';

interface HeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  onBackPress?: () => void;
}

export function Header({ title, subtitle, showBack = false, onBackPress }: HeaderProps) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

interface ToastProps {
  type: NotificationType;
  message: string;
}

export function Toast({ type, message }: ToastProps) {
  const typeColors = {
    success: Colors.success,
    error: Colors.error,
    warning: Colors.warning,
    info: Colors.info,
  };

  return (
    <View style={[styles.toast, { backgroundColor: typeColors[type] }]}>
      <Text style={styles.toastText}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.lg,
    backgroundColor: Colors.primary,
  },
  title: {
    ...Typography.h2,
    color: Colors.white,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    ...Typography.body2,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  toast: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 4,
    marginBottom: Spacing.md,
  },
  toastText: {
    ...Typography.body2,
    color: Colors.white,
  },
});
