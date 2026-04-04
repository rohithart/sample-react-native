import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useOrganisationStore } from '@store/index';
import { useFetch } from '@hooks/index';
import { organisationService } from '@services/organisation.service';
import { Card, LoadingList, Header } from '@components/index';
import { Colors, Spacing, Typography } from '@constants/index';
import { Organisation } from '@types/index';

interface HomeScreenProps {
  navigation: any;
}

export function HomeScreen({ navigation }: HomeScreenProps) {
  const { setOrganisations, setSelectedOrganisation, organisations } = useOrganisationStore();
  const { data: orgs, isLoading } = useFetch(
    async () => {
      const response = await organisationService.getOrganisations();
      if (response.success && response.data) {
        setOrganisations(response.data);
        return response.data;
      }
      return [];
    },
    { refetchInterval: 10000 }
  );

  const handleSelectOrganisation = (org: Organisation) => {
    setSelectedOrganisation(org);
    navigation.navigate('Dashboard');
  };

  if (isLoading) {
    return <LoadingList />;
  }

  return (
    <View style={styles.container}>
      <Header title="Organisations" subtitle="Select an organisation to continue" />

      <ScrollView style={styles.content}>
        {organisations.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No organisations available</Text>
          </View>
        ) : (
          organisations.map((org) => (
            <TouchableOpacity
              key={org.id}
              onPress={() => handleSelectOrganisation(org)}
              activeOpacity={0.7}
            >
              <Card elevated>
                <Text style={styles.orgName}>{org.name}</Text>
                {org.description && (
                  <Text style={styles.orgDescription}>{org.description}</Text>
                )}
              </Card>
            </TouchableOpacity>
          ))
        )}
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
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Spacing.xl,
  },
  emptyText: {
    ...Typography.body1,
    color: Colors.textSecondary,
  },
  orgName: {
    ...Typography.subtitle1,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  orgDescription: {
    ...Typography.body2,
    color: Colors.textSecondary,
  },
});
