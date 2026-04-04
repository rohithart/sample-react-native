import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { useFetch } from '@hooks/index';
import { dashboardService } from '@services/dashboard.service';
import { useOrganisationStore } from '@store/index';
import { useAuthStore } from '@store/index';
import { Card, LoadingList, Header } from '@components/index';
import { Colors, Spacing, Typography } from '@constants/index';
import { canAccess, isAdmin } from '@utils/index';
import { UserRole } from '@types/index';

export function DashboardScreen() {
  const { selectedOrganisation } = useOrganisationStore();
  const { user } = useAuthStore();

  const { data: dashboards, isLoading } = useFetch(
    async () => {
      if (!selectedOrganisation) return [];
      const response = await dashboardService.getDashboards(selectedOrganisation.id);
      return response.success ? response.data || [] : [];
    },
    {}
  );

  if (isLoading) {
    return <LoadingList />;
  }

  const userIsAdmin = user ? isAdmin(user.role) : false;

  return (
    <View style={styles.container}>
      <Header 
        title="Dashboard" 
        subtitle={`Welcome, ${user?.name || 'User'}`} 
      />

      <ScrollView style={styles.content}>
        {/* Admin Dashboard Section */}
        {userIsAdmin && (
          <>
            <Text style={styles.sectionTitle}>Admin Dashboard</Text>
            <Card elevated>
              <Text style={styles.cardTitle}>User Management</Text>
              <Text style={styles.cardText}>Manage users and permissions</Text>
            </Card>
            <Card elevated>
              <Text style={styles.cardTitle}>Organization Settings</Text>
              <Text style={styles.cardText}>Configure your organization</Text>
            </Card>
            <Card elevated>
              <Text style={styles.cardTitle}>Reports</Text>
              <Text style={styles.cardText}>View analytics and reports</Text>
            </Card>
          </>
        )}

        {/* User Dashboard Section */}
        {!userIsAdmin && (
          <>
            <Text style={styles.sectionTitle}>My Dashboard</Text>
            <Card elevated>
              <Text style={styles.cardTitle}>Tasks</Text>
              <Text style={styles.cardText}>Your pending tasks</Text>
            </Card>
            <Card elevated>
              <Text style={styles.cardTitle}>Messages</Text>
              <Text style={styles.cardText}>Your conversations</Text>
            </Card>
            <Card elevated>
              <Text style={styles.cardTitle}>Documents</Text>
              <Text style={styles.cardText}>Your files and documents</Text>
            </Card>
          </>
        )}

        {/* Common Widgets */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <Card elevated>
          <Text style={styles.statLabel}>Organization</Text>
          <Text style={styles.statValue}>{selectedOrganisation?.name || 'N/A'}</Text>
        </Card>
        <Card elevated>
          <Text style={styles.statLabel}>Your Role</Text>
          <Text style={styles.statValue}>{user?.role || 'N/A'}</Text>
        </Card>
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
  sectionTitle: {
    ...Typography.h3,
    color: Colors.text,
    marginTop: Spacing.lg,
    marginBottom: Spacing.md,
  },
  cardTitle: {
    ...Typography.subtitle1,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  cardText: {
    ...Typography.body2,
    color: Colors.textSecondary,
  },
  statLabel: {
    ...Typography.body2,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  statValue: {
    ...Typography.h3,
    color: Colors.primary,
  },
});
