import { useOrganisationContext } from '@/context/organisation-context';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { useAttachments, useCreateAttachment, useDeleteAttachment } from '@/services/attachment';
import type { Attachment } from '@/types';
import { FileText, Plus, Trash2, X } from 'lucide-react-native';
import React, { useState } from 'react';
import { ActivityIndicator, FlatList, Modal, Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

type AttachmentEntity = 'organisation' | 'workflow' | 'task' | 'quote' | 'invoice' | 'workorder' | 'evidence' | 'meeting' | 'document' | 'asset' | 'information' | 'transaction';

interface EntityAttachmentsProps {
  isVisible: boolean;
  onClose: () => void;
  entity: AttachmentEntity;
  entityId: string;
  orgId: string;
}

export function EntityAttachments({ isVisible, onClose, entity, entityId, orgId }: EntityAttachmentsProps) {
  const colors = useThemeColors();
  const { bottom } = useSafeAreaInsets();
  const { isAdmin } = useOrganisationContext();
  const { data: attachments, isLoading } = useAttachments(entity, entityId);
  const createMutation = useCreateAttachment(orgId, entity, entityId);
  const deleteMutation = useDeleteAttachment(entity, entityId);
  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState('');

  const handleAdd = () => {
    if (!name.trim()) return;
    createMutation.mutate({ name: name.trim(), url: '' }, {
      onSuccess: () => { setName(''); setShowAdd(false); },
    });
  };

  const renderItem = ({ item }: { item: Attachment }) => (
    <View style={{ backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, borderRadius: 10, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
      <View style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: colors.primary + '15', alignItems: 'center', justifyContent: 'center' }}>
        <FileText size={18} color={colors.primary} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ color: colors.text, fontWeight: '500', fontSize: 14 }} numberOfLines={1}>{item.name}</Text>
        {item.size != null && <Text style={{ color: colors.sub, fontSize: 12, marginTop: 2 }}>{formatSize(item.size)}</Text>}
        <Text style={{ color: colors.sub, fontSize: 11, marginTop: 2 }}>{new Date(item.createdAt).toLocaleDateString()}</Text>
      </View>
      {isAdmin && (
        <Pressable onPress={() => deleteMutation.mutate(item._id)} style={{ padding: 6 }} disabled={deleteMutation.isPending}>
          {deleteMutation.isPending ? <ActivityIndicator size="small" color={colors.danger} /> : <Trash2 size={16} color={colors.danger} />}
        </Pressable>
      )}
    </View>
  );

  if (!isVisible) return null;

  return (
    <Modal transparent animationType="slide" visible={isVisible} onRequestClose={onClose}>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
        {/* Header */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.border }}>
          <Text style={{ fontSize: 17, fontWeight: '700', color: colors.text }}>Attachments</Text>
          <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
            {isAdmin && (
              <Pressable onPress={() => setShowAdd(!showAdd)} style={{ padding: 4 }}>
                <Plus size={22} color={colors.primary} />
              </Pressable>
            )}
            <Pressable onPress={onClose} style={{ padding: 4 }}>
              <X size={22} color={colors.sub} />
            </Pressable>
          </View>
        </View>

        {/* Add form */}
        {showAdd && (
          <View style={{ flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 10, gap: 8, borderBottomWidth: 1, borderBottomColor: colors.border }}>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Attachment name..."
              placeholderTextColor={colors.sub}
              style={{ flex: 1, backgroundColor: colors.inputBg, borderWidth: 1, borderColor: colors.inputBorder, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8, color: colors.text, fontSize: 14 }}
            />
            <Pressable onPress={handleAdd} disabled={createMutation.isPending} style={{ backgroundColor: colors.primary, borderRadius: 8, paddingHorizontal: 16, justifyContent: 'center' }}>
              {createMutation.isPending ? <ActivityIndicator size="small" color="#fff" /> : <Text style={{ color: '#fff', fontWeight: '600', fontSize: 14 }}>Add</Text>}
            </Pressable>
          </View>
        )}

        {/* Content */}
        {isLoading ? (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={{ color: colors.sub, fontSize: 14, marginTop: 10 }}>Loading attachments...</Text>
          </View>
        ) : !attachments?.length ? (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 }}>
            <FileText size={48} color={colors.sub} strokeWidth={1.2} />
            <Text style={{ color: colors.sub, fontSize: 15, marginTop: 12, textAlign: 'center' }}>No attachments yet</Text>
          </View>
        ) : (
          <FlatList
            data={attachments}
            keyExtractor={(i) => i._id}
            renderItem={renderItem}
            contentContainerStyle={{ padding: 16, gap: 10, paddingBottom: bottom + 16 }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </SafeAreaView>
    </Modal>
  );
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
