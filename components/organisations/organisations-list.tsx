import { ORGANISATION_CONFIG } from '@/components/cards/card-configs';
import { EntityCard } from '@/components/cards/entity-card';
import { LoadingList } from '@/components/skeleton';
import { useOrganisation } from '@/context/organisation-context';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { useOrganisations } from '@/services/organisations';
import { useRouter } from 'expo-router';

import { Text, View } from 'react-native';
import { ENTITY_ICONS } from '@/constants/entity-icons';
import { ScrollView } from '@/components/ui/scroll-view';

const I = ENTITY_ICONS;

export function OrganisationsList() {
  const colors = useThemeColors();
  const { data: organisations, isPending, isError } = useOrganisations();
  const { selectOrganisation } = useOrganisation();
  const router = useRouter();

  if (isPending) {
    return <LoadingList count={5} />;
  }

  if (isError) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 }}>
        <Text style={{ color: colors.sub, textAlign: 'center' }}>
          Failed to load organisations. Please try again.
        </Text>
      </View>
    );
  }

  if (!organisations || organisations.length === 0) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32, gap: 12 }}>
        <I.organisation size={48} color={colors.inactive} />
        <Text style={{ fontSize: 18, fontWeight: '600', textAlign: 'center', color: colors.text }}>
          No Organisations Yet
        </Text>
        <Text style={{ fontSize: 14, textAlign: 'center', color: colors.sub }}>
          Tap &quot;Add New&quot; below to create your first organisation.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ gap: 6 }}
      showsVerticalScrollIndicator={false}
    >
      {organisations.map((org) => (
        <EntityCard
          key={org._id}
          item={org as any}
          config={ORGANISATION_CONFIG}
          orgId={org._id}
          onPress={async () => {
            await selectOrganisation(org);
            router.push(`/view/${org._id}` as any);
          }}
        />
      ))}
    </ScrollView>
  );
}
