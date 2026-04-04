import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { useAuthStore } from '@store/index';
import { useAuth0 } from '@context/index';
import { Avatar, Card, Button, Header } from '@components/index';
import { Colors, Spacing, Typography } from '@constants/index';
import { getRoleDisplayName } from '@utils/index';

export function ProfileScreen() {
  const { user } = useAuthStore();
  const { logout } = useAuth0();

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>User not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Profile" subtitle="Your account information" />

      <ScrollView style={styles.content}>
        {/* Avatar Section */}
        <View style={styles.avatarSection}>
          <Avatar name={user.name} url={user.avatar} size="large" />
        </View>

        {/* User Info */}
        <Card elevated>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>{user.name}</Text>
        </Card>

        <Card elevated>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{user.email}</Text>
        </Card>

        <Card elevated>
          <Text style={styles.label}>Role</Text>
          <Text style={[styles.value, { color: Colors.primary }]}>
            {getRoleDisplayName(user.role)}
          </Text>
        </Card>

        {user.organisationId && (
          <Card elevated>
            <Text style={styles.label}>Organisation ID</Text>
            <Text style={styles.value}>{user.organisationId}</Text>
          </Card>
        )}

        <Card elevated>
          <Text style={styles.label}>Member Since</Text>
          <Text style={styles.value}>
            {new Date(user.createdAt).toLocaleDateString()}
          </Text>
        </Card>

        {/* Logout Button */}
        <Button
          title="Sign Out"
          onPress={logout}
          variant="danger"
          style={styles.logoutButton}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    padding: Spacing.md,
  },
  avatarSection: {
    alignItems: 'center',
    paddingVertical: Spacing.lg,
  },
  label: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  value: {
    ...Typography.body1,
    color: Colors.text,
  },
  logoutButton: {
    marginTop: Spacing.xl,
    marginBottom: Spacing.xl,
  },
});
