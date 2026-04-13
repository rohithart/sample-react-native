import { useOrganisationContext } from '@/context/organisation-context';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { useCreateImage, useDeleteImage, useImages } from '@/services/image';
import type { AppImage } from '@/types';
import { ImageIcon, Plus, Trash2, X } from 'lucide-react-native';
import React, { useState } from 'react';
import { ActivityIndicator, FlatList, Image, Modal, Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

type ImageEntity = 'organisation' | 'user' | 'workflow' | 'task' | 'quote' | 'invoice' | 'workorder' | 'evidence' | 'document' | 'asset';

interface EntityImagesProps {
  isVisible: boolean;
  onClose: () => void;
  entity: ImageEntity;
  entityId: string;
  orgId: string;
}

export function EntityImages({ isVisible, onClose, entity, entityId, orgId }: EntityImagesProps) {
  const colors = useThemeColors();
  const { bottom } = useSafeAreaInsets();
  const { isAdmin } = useOrganisationContext();
  const { data: images, isLoading } = useImages(entity, entityId);
  const createMutation = useCreateImage(orgId, entity, entityId);
  const deleteMutation = useDeleteImage(entity, entityId);
  const [showAdd, setShowAdd] = useState(false);
  const [url, setUrl] = useState('');

  const handleAdd = () => {
    if (!url.trim()) return;
    createMutation.mutate({ url: url.trim() }, {
      onSuccess: () => { setUrl(''); setShowAdd(false); },
    });
  };

  const renderItem = ({ item }: { item: AppImage }) => (
    <View style={{ backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, borderRadius: 10, overflow: 'hidden' }}>
      {item.url ? (
        <Image source={{ uri: item.url }} style={{ width: '100%', height: 180 }} resizeMode="cover" />
      ) : (
        <View style={{ width: '100%', height: 180, backgroundColor: colors.shimmer, alignItems: 'center', justifyContent: 'center' }}>
          <ImageIcon size={36} color={colors.sub} />
        </View>
      )}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
        <Text style={{ color: colors.sub, fontSize: 11 }}>{new Date(item.createdAt).toLocaleDateString()}</Text>
        {isAdmin && (
          <Pressable onPress={() => deleteMutation.mutate(item.id)} style={{ padding: 4 }} disabled={deleteMutation.isPending}>
            {deleteMutation.isPending ? <ActivityIndicator size="small" color={colors.danger} /> : <Trash2 size={14} color={colors.danger} />}
          </Pressable>
        )}
      </View>
    </View>
  );

  if (!isVisible) return null;

  return (
    <Modal transparent animationType="slide" visible={isVisible} onRequestClose={onClose}>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
        {/* Header */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.border }}>
          <Text style={{ fontSize: 17, fontWeight: '700', color: colors.text }}>Images</Text>
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
              value={url}
              onChangeText={setUrl}
              placeholder="Image URL..."
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
            <Text style={{ color: colors.sub, fontSize: 14, marginTop: 10 }}>Loading images...</Text>
          </View>
        ) : !images?.length ? (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 }}>
            <ImageIcon size={48} color={colors.sub} strokeWidth={1.2} />
            <Text style={{ color: colors.sub, fontSize: 15, marginTop: 12, textAlign: 'center' }}>No images yet</Text>
          </View>
        ) : (
          <FlatList
            data={images}
            keyExtractor={(i) => i.id}
            renderItem={renderItem}
            contentContainerStyle={{ padding: 16, gap: 12, paddingBottom: bottom + 16 }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </SafeAreaView>
    </Modal>
  );
}
