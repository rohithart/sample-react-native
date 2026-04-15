import { useOrganisationContext } from '@/context/organisation-context';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { useAttachments, useCreateAttachment, useDeleteAttachment } from '@/services/attachment';
import type { Attachment } from '@/types';
import { Download, File, FileImage, FileSpreadsheet, FileText, FileVideo, Plus, Trash2, X } from 'lucide-react-native';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Linking, Modal, Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

type AttachmentEntity = 'organisation' | 'workflow' | 'task' | 'quote' | 'invoice' | 'workorder' | 'evidence' | 'meeting' | 'document' | 'asset' | 'information' | 'transaction';

interface EntityAttachmentsProps {
  isVisible: boolean;
  onClose: () => void;
  entity: AttachmentEntity;
  entityId: string;
  orgId: string;
}

function getFileIcon(name?: string) {
  if (!name) return File;
  const ext = name.split('.').pop()?.toLowerCase();
  if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'].includes(ext ?? '')) return FileImage;
  if (['mp4', 'mov', 'avi', 'mkv', 'webm'].includes(ext ?? '')) return FileVideo;
  if (['xls', 'xlsx', 'csv'].includes(ext ?? '')) return FileSpreadsheet;
  if (['pdf', 'doc', 'docx', 'txt', 'rtf'].includes(ext ?? '')) return FileText;
  return File;
}

function formatSize(bytes: string | number | undefined): string | null {
  if (bytes == null) return null;
  const n = typeof bytes === 'string' ? parseInt(bytes, 10) : bytes;
  if (isNaN(n)) return null;
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' });
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

  const handleDownload = useCallback(async (item: Attachment) => {
    const url = (item as any).location || (item as any).url || (item as any).key;
    if (!url) {
      Alert.alert('No URL', 'This attachment does not have a download URL.');
      return;
    }
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Cannot open', 'Unable to open this file.');
      }
    } catch {
      Alert.alert('Error', 'Failed to open the file.');
    }
  }, []);

  const handleDelete = useCallback((id: string) => {
    Alert.alert('Delete Attachment', 'Are you sure you want to delete this attachment?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteMutation.mutate(id) },
    ]);
  }, [deleteMutation]);

  const renderItem = ({ item }: { item: Attachment }) => {
    const Icon = getFileIcon(item.name);
    const size = formatSize((item as any).size);
    const uploader = (item as any).user?.name || (item as any).user?.user?.name;

    return (
      <View style={{ backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, borderRadius: 12, padding: 12, gap: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <View style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: colors.primary + '15', alignItems: 'center', justifyContent: 'center' }}>
            <Icon size={20} color={colors.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ color: colors.text, fontWeight: '600', fontSize: 14 }} numberOfLines={2}>{item.name}</Text>
            <View style={{ flexDirection: 'row', gap: 8, marginTop: 3, flexWrap: 'wrap' }}>
              {size && (
                <View style={{ backgroundColor: colors.primary + '12', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 2 }}>
                  <Text style={{ fontSize: 11, color: colors.primary, fontWeight: '500' }}>{size}</Text>
                </View>
              )}
              <Text style={{ fontSize: 11, color: colors.sub }}>{fmtDate(item.createdAt)}</Text>
            </View>
          </View>
        </View>

        {uploader && (
          <Text style={{ fontSize: 11, color: colors.sub }}>Uploaded by {uploader}</Text>
        )}

        {/* Action row */}
        <View style={{ flexDirection: 'row', gap: 8, borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 10 }}>
          <Pressable
            onPress={() => handleDownload(item)}
            style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: colors.primary + '12', borderRadius: 8, paddingVertical: 8 }}
          >
            <Download size={16} color={colors.primary} />
            <Text style={{ color: colors.primary, fontSize: 13, fontWeight: '600' }}>Download</Text>
          </Pressable>
          {isAdmin && (
            <Pressable
              onPress={() => handleDelete(item._id)}
              disabled={deleteMutation.isPending}
              style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: colors.dangerBg, borderRadius: 8, paddingVertical: 8, paddingHorizontal: 16 }}
            >
              {deleteMutation.isPending ? (
                <ActivityIndicator size="small" color={colors.danger} />
              ) : (
                <>
                  <Trash2 size={14} color={colors.danger} />
                  <Text style={{ color: colors.danger, fontSize: 13, fontWeight: '600' }}>Delete</Text>
                </>
              )}
            </Pressable>
          )}
        </View>
      </View>
    );
  };

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
            contentContainerStyle={{ padding: 16, gap: 12, paddingBottom: bottom + 16 }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </SafeAreaView>
    </Modal>
  );
}
