import { DetailScreenShell } from '@/components/ui/detail-screen-shell';
import { useDocument } from '@/services/document';
import { useLocalSearchParams } from 'expo-router';
import { useRefreshControl } from '@/hooks/use-refresh-control';
import { useThemeColors } from '@/hooks/use-theme-colors';
import React from 'react';
import { EntityType } from '@/enums';
import { downloadAndSharePdf } from '@/utils/pdf-download';
import { onShare } from '@/utils/share';
import { ENTITY_ICONS } from '@/constants/entity-icons';
import { HtmlContent, LinkedField } from '@/components/details';
import { VStack } from '@/components/ui/vstack';
import { SectionHeader } from '@/components/section-header';
import { View } from '@/components/ui/view';
import { resolveId } from '@/utils/resolve-ref';

const I = ENTITY_ICONS;

export default function DocumentDetailScreen() {
  const { orgId, id } = useLocalSearchParams<{ orgId: string; id: string }>();
  const colors = useThemeColors();
  const { data: item, isLoading, refetch, isRefetching } = useDocument(id || '');
  const refreshControl = useRefreshControl(refetch, isRefetching);

  return (
    <DetailScreenShell
      icon="file"
      title={item?.title || 'Loading...'}
      isLoading={isLoading}
      item={item}
      refreshControl={refreshControl}
      editRoute={`/admin/document/${orgId}/${id}/edit`}
      deleteRedirectRoute={`/admin/documents/${orgId}`}
      entityName="Document"
      extraActions={[{ id: 'pdf', label: 'Download PDF', icon: <I.fileDown size={24} color={colors.success} />, onPress: () => downloadAndSharePdf(EntityType.DOCUMENT, id || ''), color: 'success' as const }, { id: 'share', label: 'Share', icon: <I.share size={24} color={colors.success} />, onPress: () => onShare(`Document on DarthVader: ${item?.title}`, `/admin/document/${orgId}/${id}`), color: 'success' as const }]}
      features={['attachments', 'comments', 'images', 'timeline', 'history']}
      entityType={EntityType.DOCUMENT}
      entityId={id || ''}
      orgId={orgId || ''}
    >
      <View style={{ padding: 16, gap: 20 }}>
          {item.description && (
            <View style={{ backgroundColor: colors.card, padding: 16, borderRadius: 20, borderWidth: 1, borderColor: colors.border }}>
              <HtmlContent label="Description" html={item.description} />
            </View>
          )}
          <View style={{ backgroundColor: colors.card, borderRadius: 24, padding: 16, borderWidth: 1, borderColor: colors.border }}>
            <SectionHeader title="Classification" style={{ fontSize: 10, fontWeight: '700', marginBottom: 0 }} />
            <VStack space="lg">
              <LinkedField label="Folder" icon="document" value={item.folder?.title} route={`/admin/folder/${orgId}/${resolveId(item.folder)}`} />
            </VStack>
          </View>
        </View>
    </DetailScreenShell>
  );
}
