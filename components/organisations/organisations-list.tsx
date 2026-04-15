import { ORGANISATION_CONFIG } from '@/components/cards/card-configs';
import { EntityCard } from '@/components/cards/entity-card';
import { LoadingList } from '@/components/skeleton';
import { useOrganisationContext } from '@/context/organisation-context';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { useOrganisations } from '@/services/organisations';
import { useRouter } from 'expo-router';
import { Building2 } from 'lucide-react-native';
import { ScrollView, Text, View } from 'react-native';

export function OrganisationsList() {
  const colors = useThemeColors();
  const { data: organisations, isPending, isError } = useOrganisations();
  const { selectOrganisation } = useOrganisationContext();
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
        <Building2 size={48} color={colors.inactive} />
        <Text style={{ fontSize: 18, fontWeight: '600', textAlign: 'center', color: colors.text }}>
          No Organisations Yet
        </Text>
        <Text style={{ fontSize: 14, textAlign: 'center', color: colors.sub }}>
          Tap "Add New" below to create your first organisation.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingVertical: 8 }}
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
