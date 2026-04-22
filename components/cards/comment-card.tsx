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
  const userRole = (item as any).user || (item as any).user?.user;
  const commentText = (item as any).comment || (item as any).content || '';
  const I = ENTITY_ICONS;

  const reportMutation = useReportComment();

    const handleReport = useCallback((id: string, org: any) => {
    const data: any = {organisation: org}
    Alert.alert('Report Comment', 'Are you sure you want to report this comment?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Report', style: 'destructive', onPress: () => reportMutation.mutateAsync({ id, data }) },
    ]);
  }, [reportMutation]);

  return (
    <HStack space="sm" className="items-center">
      <UserAvatar userRole={userRole} />

      <HStack className="justify-between" style={{ backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, borderRadius: 12, padding: 10, flex: 1}}>
        <View>
          <Text style={{ fontSize: 13, fontWeight: '600', color: colors.text }}>{commentText}</Text>
          <Text style={{ fontSize: 11, color: colors.sub, marginTop: 4 }}>{convertToRelativeTime(item.createdAt)}</Text>
        </View>
        <HStack space="sm" className="items-center">
          <Pressable onPress={() => handleReport(item._id, item.organisation)} style={{ padding: 4 }} disabled={reportMutation.isPending}>
            {reportMutation.isPending ? <ActivityIndicator size="small" color={colors.danger} /> : <I.warning size={14} color={colors.warning} />}
          </Pressable>
          {isAdmin && (
          <Pressable onPress={() => handleDelete(item._id)} style={{ padding: 4 }}>
            <I.trash size={14} color={colors.danger} />
          </Pressable>
            )}
        </HStack>
      </HStack>
    </HStack>
  );
};