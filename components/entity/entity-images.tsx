import { HStack } from '@/components/ui/hstack';
import { useOrganisationContext } from '@/context/organisation-context';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { useCreateImage, useDeleteImage, useImages } from '@/services/image';
import type { AppImage } from '@/types';

import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, Dimensions, FlatList, Image, Modal, Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ENTITY_ICONS } from '@/constants/entity-icons';

const I = ENTITY_ICONS;

type ImageEntity = 'organisation' | 'user' | 'workflow' | 'task' | 'quote' | 'invoice' | 'workorder' | 'evidence' | 'document' | 'asset';

interface EntityImagesProps {
  isVisible: boolean;
  onClose: () => void;
  entity: ImageEntity;
  entityId: string;
  orgId: string;
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const GAP = 8;
const PADDING = 16;
const THUMB_SIZE = (SCREEN_WIDTH - PADDING * 2 - GAP * 2) / 3;

export function EntityImages({ isVisible, onClose, entity, entityId, orgId }: EntityImagesProps) {
  const colors = useThemeColors();
  const { bottom } = useSafeAreaInsets();
  const { isAdmin } = useOrganisationContext();
  const { data: images, isLoading } = useImages(entity, entityId);
  const createMutation = useCreateImage(orgId, entity, entityId);
  const deleteMutation = useDeleteImage(entity, entityId);
  const [showAdd, setShowAdd] = useState(false);
  const [url, setUrl] = useState('');
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);

  const handleAdd = () => {
    if (!url.trim()) return;
    createMutation.mutate({ url: url.trim() }, {
      onSuccess: () => { setUrl(''); setShowAdd(false); },
    });
  };

  const handleDelete = useCallback((id: string) => {
    Alert.alert('Delete Image', 'Are you sure you want to delete this image?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete', style: 'destructive', onPress: () => {
          deleteMutation.mutate(id);
          setViewerIndex(null);
        },
      },
    ]);
  }, [deleteMutation]);

  const viewerImage = viewerIndex !== null && images ? images[viewerIndex] : null;

  const renderThumb = ({ item, index }: { item: AppImage; index: number }) => (
    <Pressable onPress={() => setViewerIndex(index)} style={{ width: THUMB_SIZE, height: THUMB_SIZE, borderRadius: 10, overflow: 'hidden', backgroundColor: colors.shimmer }}>
      {item.url ? (
        <Image source={{ uri: item.url }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
      ) : (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <I.gallery size={24} color={colors.sub} />
        </View>
      )}
    </Pressable>
  );

  if (!isVisible) return null;

  return (
    <Modal transparent animationType="slide" visible={isVisible} onRequestClose={onClose}>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
        <HStack className="items-center justify-between" style={{ paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.border }}>
          <Text style={{ fontSize: 17, fontWeight: '700', color: colors.text }}>Images</Text>
          <HStack space="md" className="items-center">
            {isAdmin && (
              <Pressable onPress={() => setShowAdd(!showAdd)} style={{ padding: 4 }}>
                <I.plus size={22} color={colors.primary} />
              </Pressable>
            )}
            <Pressable onPress={onClose} style={{ padding: 4 }}>
              <I.close size={22} color={colors.sub} />
            </Pressable>
          </HStack>
        </HStack>

        {showAdd && (
          <HStack space="sm" style={{ paddingHorizontal: 16, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.border }}>
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
          </HStack>
        )}

        {isLoading ? (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={{ color: colors.sub, fontSize: 14, marginTop: 10 }}>Loading images...</Text>
          </View>
        ) : !images?.length ? (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 }}>
            <I.gallery size={48} color={colors.sub} strokeWidth={1.2} />
            <Text style={{ color: colors.sub, fontSize: 15, marginTop: 12, textAlign: 'center' }}>No images yet</Text>
          </View>
        ) : (
          <FlatList
            data={images}
            keyExtractor={(i) => i._id}
            renderItem={renderThumb}
            numColumns={3}
            contentContainerStyle={{ padding: PADDING, gap: GAP, paddingBottom: bottom + 16 }}
            columnWrapperStyle={{ gap: GAP }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </SafeAreaView>

      {viewerImage && (
        <Modal transparent animationType="fade" visible={!!viewerImage} onRequestClose={() => setViewerIndex(null)}>
          <View style={{ flex: 1, backgroundColor: '#000' }}>
            <SafeAreaView style={{ flex: 1 }}>
              <HStack className="items-center justify-between" style={{ paddingHorizontal: 16, paddingVertical: 10 }}>
                <Text style={{ color: '#fff', fontSize: 14, fontWeight: '600' }}>
                  {(viewerIndex ?? 0) + 1} / {images?.length ?? 0}
                </Text>
                <HStack space="lg" className="items-center">
                  {isAdmin && (
                    <Pressable onPress={() => handleDelete(viewerImage._id)} style={{ padding: 6 }}>
                      <I.trash size={20} color="#ef4444" />
                    </Pressable>
                  )}
                  <Pressable onPress={() => setViewerIndex(null)} style={{ padding: 6 }}>
                    <I.close size={22} color="#fff" />
                  </Pressable>
                </HStack>
              </HStack>

              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {viewerImage.url ? (
                  <Image source={{ uri: viewerImage.url }} style={{ width: SCREEN_WIDTH, height: SCREEN_WIDTH }} resizeMode="contain" />
                ) : (
                  <I.gallery size={64} color="#666" />
                )}
              </View>

              <HStack className="justify-between" style={{ paddingHorizontal: 16, paddingBottom: 20 }}>
                <Pressable
                  onPress={() => setViewerIndex(Math.max(0, (viewerIndex ?? 0) - 1))}
                  disabled={(viewerIndex ?? 0) === 0}
                  style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center', opacity: (viewerIndex ?? 0) === 0 ? 0.3 : 1 }}
                >
                  <I.back size={24} color="#fff" />
                </Pressable>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11 }}>
                    {new Date(viewerImage.createdAt).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </Text>
                </View>
                <Pressable
                  onPress={() => setViewerIndex(Math.min((images?.length ?? 1) - 1, (viewerIndex ?? 0) + 1))}
                  disabled={(viewerIndex ?? 0) >= (images?.length ?? 1) - 1}
                  style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center', opacity: (viewerIndex ?? 0) >= (images?.length ?? 1) - 1 ? 0.3 : 1 }}
                >
                  <I.chevronRight size={24} color="#fff" />
                </Pressable>
              </HStack>
            </SafeAreaView>
          </View>
        </Modal>
      )}
    </Modal>
  );
}
