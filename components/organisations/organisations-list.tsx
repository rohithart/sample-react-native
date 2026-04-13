import { LoadingList } from '@/components/skeleton';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { useOrganisations } from '@/services/organisations';
import type { Organisation } from '@/types/organisation';
import { useRouter } from 'expo-router';
import { Building2, Calendar, ChevronRight, Users } from 'lucide-react-native';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';

export function OrganisationsList() {
  const colors = useThemeColors();
  const { data: organisations, isPending, isError } = useOrganisations();
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
      contentContainerStyle={{ padding: 16, gap: 14 }}
      showsVerticalScrollIndicator={false}
    >
      {organisations.map((org) => (
        <OrganisationCard
          key={org.id}
          org={org}
          colors={colors}
          onPress={() => router.push(`/view/${org.id}` as any)}
        />
      ))}
    </ScrollView>
  );
}

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return '';
  }
}

function OrganisationCard({
  org,
  colors,
  onPress,
}: {
  org: Organisation;
  colors: import('@/hooks/use-theme-colors').ThemeColors;
  onPress: () => void;
}) {
  const hasLogo = !!org.logoUrl;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        borderRadius: 16,
        backgroundColor: pressed ? colors.pressed : colors.card,
        borderWidth: 1,
        borderColor: pressed ? colors.primary + '40' : colors.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: colors.isDark ? 0.15 : 0.06,
        shadowRadius: 6,
        elevation: 3,
        overflow: 'hidden',
      })}
    >
      {/* Top accent bar */}
      <View
        style={{
          height: 3,
          backgroundColor: colors.primary,
          opacity: 0.7,
        }}
      />

      <View style={{ padding: 16, gap: 14 }}>
        {/* Header row: avatar + name + arrow */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
          {/* Logo / Initials avatar */}
          {hasLogo ? (
            <Image
              source={{ uri: org.logoUrl }}
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                backgroundColor: colors.border,
              }}
            />
          ) : (
            <View
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                backgroundColor: colors.cardPrimaryBg,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: colors.primary + '25',
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '700',
                  color: colors.primary,
                  letterSpacing: 0.5,
                }}
              >
                {getInitials(org.name)}
              </Text>
            </View>
          )}

          <View style={{ flex: 1, gap: 2 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '700',
                color: colors.text,
              }}
              numberOfLines={1}
            >
              {org.name}
            </Text>
            {org.description ? (
              <Text
                style={{
                  fontSize: 13,
                  color: colors.sub,
                  lineHeight: 18,
                }}
                numberOfLines={2}
              >
                {org.description}
              </Text>
            ) : null}
          </View>

          <View
            style={{
              width: 32,
              height: 32,
              borderRadius: 10,
              backgroundColor: colors.primary + '12',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ChevronRight size={16} color={colors.primary} />
          </View>
        </View>

        {/* Divider */}
        <View style={{ height: 1, backgroundColor: colors.border, opacity: 0.6 }} />

        {/* Footer: stats chips */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <View
              style={{
                width: 26,
                height: 26,
                borderRadius: 7,
                backgroundColor: colors.secondary + '18',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Users size={13} color={colors.secondary} />
            </View>
            <Text style={{ fontSize: 13, fontWeight: '600', color: colors.text }}>
              {org.memberCount}
            </Text>
            <Text style={{ fontSize: 12, color: colors.sub }}>
              {org.memberCount === 1 ? 'member' : 'members'}
            </Text>
          </View>

          {org.createdAt ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <View
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 7,
                  backgroundColor: colors.primary + '12',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Calendar size={13} color={colors.primary} />
              </View>
              <Text style={{ fontSize: 12, color: colors.sub }}>
                {formatDate(org.createdAt)}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
}
