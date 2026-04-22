import { convertToRelativeTime } from "@/utils/date";
import { View, Pressable, ActivityIndicator, Text, Alert } from "react-native";
import { HStack } from "../ui/hstack";
import { UserAvatar } from "../user-avatar";
import { useOrganisationContext } from "@/context/organisation-context";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { useReportComment } from "@/services/email";
import type { Comment } from '@/types';
import { useCallback } from "react";
import { ENTITY_ICONS } from "@/constants/entity-icons";

export const CommentCard = ({ item, handleDelete }: { item: Comment; handleDelete: (id: string) => void }) => {
  const colors = useThemeColors();
  const { isAdmin } = useOrganisationContext();
  const I = ENTITY_ICONS;

  const userRole = (item as any).user || (item as any).user?.user;
  const commentText = (item as any).comment || (item as any).content || '';

  const reportMutation = useReportComment();

  const handleReport = useCallback((id: string, org: any) => {
    const data: any = { organisation: org };
    Alert.alert('Report Comment', 'Are you sure you want to report this comment?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Report', style: 'destructive', onPress: () => reportMutation.mutateAsync({ id, data }) },
    ]);
  }, [reportMutation]);

  return (
    <View style={{ marginBottom: 12 }}>
      <HStack space="sm" style={{ alignItems: 'flex-start' }}>
        <View style={{ marginTop: 2 }}>
          <UserAvatar userRole={userRole} />
        </View>

        <View style={{ flex: 1 }}>
          <View 
            style={{ 
              backgroundColor: colors.bg,
              borderRadius: 14, 
              paddingHorizontal: 12, 
              paddingVertical: 8, 
              borderWidth: 1, 
              borderColor: colors.border 
            }}
          >
            <HStack style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
              <Text style={{ fontSize: 12, fontWeight: '700', color: colors.text }}>
                {userRole?.name || 'User'}
              </Text>
              
              <HStack space="xs" style={{ alignItems: 'center' }}>
                <Pressable 
                  onPress={() => handleReport(item._id, item.organisation)} 
                  style={{ padding: 2, opacity: 0.5 }} 
                  disabled={reportMutation.isPending}
                >
                  {reportMutation.isPending ? (
                    <ActivityIndicator size="small" color={colors.danger} />
                  ) : (
                    <I.warning size={12} color={colors.sub} />
                  )}
                </Pressable>
                
                {isAdmin && (
                  <Pressable onPress={() => handleDelete(item._id)} style={{ padding: 2, opacity: 0.5 }}>
                    <I.trash size={12} color={colors.danger} />
                  </Pressable>
                )}
              </HStack>
            </HStack>

            <Text style={{ fontSize: 14, color: colors.text, lineHeight: 18 }}>
              {commentText}
            </Text>
          </View>

          <Text style={{ fontSize: 10, color: colors.sub, marginTop: 4, marginLeft: 4 }}>
            {convertToRelativeTime(item.createdAt)}
          </Text>
        </View>
      </HStack>
    </View>
  );
};
