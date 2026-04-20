import { ENTITY_ICONS } from "@/constants/entity-icons";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { useCallback } from "react";
import { Linking, Pressable, Text, View } from 'react-native';

const I = ENTITY_ICONS;

export function AdminCard({ admin }: { admin: any }) {
  const colors = useThemeColors();
  const user = admin.user || {};
  const handleEmail = useCallback(() => {
    if (user.email) Linking.openURL(`mailto:${user.email}`);
  }, [user.email]);
  const handlePhone = useCallback(() => {
    if (user.phone) Linking.openURL(`tel:${user.phone}`);
  }, [user.phone]);
  return (
    <View
      style={{
        marginTop: 10,
        marginHorizontal: 14,
        borderRadius: 12,
        padding: 14,
        backgroundColor: colors.card,
        shadowColor: colors.text,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: colors.isDark ? 0.35 : 0.15,
        shadowRadius: 8,
        elevation: 8,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {user.image ? (
          <View style={{ width: 48, height: 48, borderRadius: 24, overflow: 'hidden', backgroundColor: colors.primary + '20', alignItems: 'center', justifyContent: 'center', marginRight: 14 }}>
            <I.user size={28} color={colors.primary} />
          </View>
        ) : (
          <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: colors.primary + '20', alignItems: 'center', justifyContent: 'center', marginRight: 14 }}>
            <Text style={{ fontSize: 24 }}>👤</Text>
          </View>
        )}
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: '700', color: colors.text }} numberOfLines={1}>{user.name || user.email || '-'}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
            <Pressable onPress={handleEmail} disabled={!user.email} style={{ marginRight: 12 }}>
              <Text style={{ color: colors.primary, textDecorationLine: 'underline', fontSize: 14 }}>{user.email || 'No email'}</Text>
            </Pressable>
            <Pressable onPress={handlePhone} disabled={!user.phone}>
              <Text style={{ color: colors.primary, textDecorationLine: 'underline', fontSize: 14 }}>{user.phone || 'No phone'}</Text>
            </Pressable>
          </View>
          <Text style={{ color: colors.sub, fontSize: 13, marginTop: 2 }}>{admin.role || 'Admin'}</Text>
        </View>
      </View>
      {admin.description ? (
        <Text style={{ color: colors.sub, fontSize: 13, marginTop: 8 }}>{admin.description}</Text>
      ) : null}
    </View>
  );
}