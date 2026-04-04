import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Colors, Spacing, BorderRadius, Typography } from '@constants/index';

interface AvatarProps {
  name: string;
  url?: string;
  size?: 'small' | 'medium' | 'large';
}

export function Avatar({ name, url, size = 'medium' }: AvatarProps) {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase();

  const sizeStyles = {
    small: { width: 32, height: 32, fontSize: 12 },
    medium: { width: 48, height: 48, fontSize: 16 },
    large: { width: 64, height: 64, fontSize: 20 },
  };

  const selectedSize = sizeStyles[size];

  if (url) {
    return (
      <Image
        source={{ uri: url }}
        style={[styles.avatar, selectedSize]}
      />
    );
  }

  return (
    <View
      style={[
        styles.avatarPlaceholder,
        selectedSize,
        { width: selectedSize.width, height: selectedSize.height },
      ]}
    >
      <Text style={[styles.initialsText, { fontSize: selectedSize.fontSize as number }]}>
        {initials}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    borderRadius: BorderRadius.full,
  },
  avatarPlaceholder: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialsText: {
    color: Colors.white,
    fontWeight: '600',
  },
});
