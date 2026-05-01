import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { Text } from '@/components/ui/text';
import { useOrganisation } from '@/context/organisation-context';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { ENTITY_ICONS } from '@/constants/entity-icons';
import { PageHeader } from '@/components/ui/page-header';
import { Pressable } from '@/components/ui/pressable';
import { ScrollView } from '@/components/ui/scroll-view';
import { Image } from '@/components/ui/image';

const I = ENTITY_ICONS;

export default function ProfileScreen() {
  const colors = useThemeColors();
  const { userRole, organisation, isAdmin, canAccessAdmin } = useOrganisation();

  const InfoRow = ({ icon: Icon, label, value, isLast = false }: any) => (
    <View style={{ 
      flexDirection: 'row', 
      alignItems: 'center', 
      paddingVertical: 12,
      borderBottomWidth: isLast ? 0 : 1,
      borderBottomColor: colors.border,
    }}>
      <View style={{ 
        width: 36, 
        height: 36, 
        borderRadius: 10, 
        backgroundColor: colors.primary + '10', 
        alignItems: 'center', 
        justifyContent: 'center',
        marginRight: 12 
      }}>
        <Icon size={18} color={colors.primary} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 11, color: colors.sub, fontWeight: '600', textTransform: 'uppercase' }}>{label}</Text>
        <Text style={{ fontSize: 15, fontWeight: '500', color: colors.text }}>{value}</Text>
      </View>
    </View>
  );

  const userName = userRole?.user?.name || 'John Doe';
  const userEmail = userRole?.user?.email || 'john@example.com';
  const userPhone = userRole?.user?.phone || 'Not provided';
  const userRole_name = userRole?.role || 'User';
  const userDescription = userRole?.description || '--';
  const orgName = organisation?.name || 'No organization selected';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: 'Profile',
          headerBackTitle: 'Back',
          headerTintColor: colors.primary,
          headerShadowVisible: false,
          headerStyle: { backgroundColor: colors.bg },
          headerTitleStyle: { color: colors.text, fontWeight: '600' },
        }}
      />

      <Stack.Screen options={{ headerShown: false }} />
      <PageHeader icon="user" title="Profile" />

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={{ 
          backgroundColor: colors.primary + '08', 
          paddingTop: 80, 
          paddingBottom: 30, 
          alignItems: 'center',
          borderBottomLeftRadius: 32,
          borderBottomRightRadius: 32,
        }}>
          <View style={{ 
            shadowColor: '#000', 
            shadowOffset: { width: 0, height: 10 }, 
            shadowOpacity: 0.1, 
            shadowRadius: 15,
            elevation: 5 
          }}>
            {userRole?.user?.image ? (
              <Image
                source={{ uri: userRole.user.image }}
                style={{ width: 110, height: 110, borderRadius: 55, borderWidth: 4, borderColor: colors.bg }}
              />
            ) : (
              <View style={{ 
                width: 110, 
                height: 110, 
                borderRadius: 55, 
                backgroundColor: colors.card, 
                alignItems: 'center', 
                justifyContent: 'center',
                borderWidth: 4,
                borderColor: colors.bg 
              }}>
                <Text style={{ fontSize: 40 }}>👤</Text>
              </View>
            )}
            <Pressable style={{ 
              position: 'absolute', 
              bottom: 0, 
              right: 0, 
              backgroundColor: colors.primary, 
              padding: 8, 
              borderRadius: 20,
              borderWidth: 3,
              borderColor: colors.bg
            }}>
              <I.edit size={14} color="#fff" />
            </Pressable>
          </View>

          <Text style={{ fontSize: 24, fontWeight: '800', color: colors.text, marginTop: 16 }}>{userName}</Text>
          <View style={{ 
            marginTop: 8, 
            paddingHorizontal: 12, 
            paddingVertical: 4, 
            backgroundColor: colors.primary + '15', 
            borderRadius: 20 
          }}>
            <Text style={{ fontSize: 12, fontWeight: '700', color: colors.primary }}>{userRole_name.toUpperCase()}</Text>
          </View>
        </View>

        <View style={{ padding: 20, gap: 20 }}>
          <View style={{ 
            backgroundColor: colors.card, 
            borderRadius: 20, 
            padding: 16,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.05,
            shadowRadius: 10,
            elevation: 2,
            borderWidth: 1,
            borderColor: colors.border
          }}>
            <Text style={{ fontSize: 16, fontWeight: '700', color: colors.text, marginBottom: 8 }}>Details</Text>
            <InfoRow icon={I.mail} label="Email" value={userEmail} />
            <InfoRow icon={I.phone} label="Phone" value={userPhone} />
            <InfoRow icon={I.shield} label="Bio" value={userDescription} isLast={true} />
          </View>

          {organisation && (
            <View style={{ 
              backgroundColor: colors.card, 
              borderRadius: 20, 
              padding: 16,
              borderWidth: 1,
              borderColor: colors.border
            }}>
              <InfoRow icon={I.organisation} label="Organisation" value={orgName} isLast={true} />
            </View>
          )}

          <View style={{ 
            flexDirection: 'row', 
            alignItems: 'center', 
            backgroundColor: isAdmin ? colors.dangerBg : colors.successBg,
            padding: 14,
            borderRadius: 16,
            gap: 12
          }}>
            <I.shield size={20} color={isAdmin ? colors.danger : colors.success} />
            <View>
              <Text style={{ fontSize: 13, fontWeight: '700', color: isAdmin ? colors.danger : colors.success }}>
                {canAccessAdmin ? (isAdmin ? 'Admin Access' : 'Management Access') : 'Standard Access'}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
