import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useLocalSearchParams } from 'expo-router';

import { useThemeColors } from '@/hooks/use-theme-colors';
import { PageHeader } from '@/components/ui/page-header';
import { DetailField, HtmlContent, AuditInfo } from '@/components/details';
import { ActionBottomSheet } from '@/components/sheets/action-bottom-sheet';
import { ActionItem } from '@/types/actionItem';
import { ENTITY_ICONS } from '@/constants/entity-icons';
import { useRefreshControl } from '@/hooks/use-refresh-control';
import { convertToLocalDateString } from '@/utils/date';
import { VStack } from '@/components/ui/vstack';
import { useReminder, useUpcomingReminders } from '@/services/reminder'; 
import { HStack } from '@/components/ui/hstack';

const I = ENTITY_ICONS;

export default function ReminderDetailsScreen() {
  const { orgId, id } = useLocalSearchParams<{ orgId: string; id: string }>();
  const colors = useThemeColors();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [showAudit, setShowAudit] = useState(false);

  
  const { data: item, isLoading, refetch, isRefetching } = useReminder(id || '');

  const { data: nextOccurrences } = useUpcomingReminders(id || '');
  const refreshControl = useRefreshControl(refetch, isRefetching);

  const actions: ActionItem[] = [
    { 
      id: 'audit', 
      label: 'Audit Info', 
      icon: <I.information size={24} color={colors.secondary} />, 
      onPress: () => setShowAudit(true), 
      color: 'primary' as const 
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <PageHeader 
        icon="reminder" 
        title={item?.title || 'Loading...'}
        rightAction={
          <Pressable 
            onPress={() => setIsBottomSheetOpen(true)} 
            style={{ padding: 8, backgroundColor: colors.primary + '10', borderRadius: 12 }}
          >
            <I.moreVertical size={20} color={colors.primary} />
          </Pressable>
        }
      />

      {isLoading || !item ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <ScrollView
          refreshControl={refreshControl}
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ padding: 16, gap: 20 }}>
            
            <View style={{ 
              backgroundColor: item.isActive ? colors.successBg : colors.dangerBg, 
              padding: 14, 
              borderRadius: 16, 
              flexDirection: 'row', 
              alignItems: 'center', 
              gap: 12 
            }}>
              <View style={{ 
                width: 10, height: 10, borderRadius: 5, 
                backgroundColor: item.isActive ? colors.success : colors.danger 
              }} />
              <Text style={{ 
                fontSize: 14, 
                fontWeight: '700', 
                color: item.isActive ? colors.success : colors.danger,
                textTransform: 'uppercase'
              }}>
                {item.isActive ? 'Active Reminder' : 'Inactive / Paused'}
              </Text>
            </View>

            {item.description && (
              <View style={{ backgroundColor: colors.card, padding: 16, borderRadius: 20, borderWidth: 1, borderColor: colors.border }}>
                <HtmlContent label="Reminder Note" html={item.description} />
              </View>
            )}

            <View style={{ backgroundColor: colors.card, borderRadius: 24, padding: 16, borderWidth: 1, borderColor: colors.border }}>
              <Text style={{ 
                fontSize: 12, 
                fontWeight: '800', 
                color: colors.sub, 
                marginBottom: 12, 
                textTransform: 'uppercase', 
                letterSpacing: 1 
              }}>
                Schedule & Frequency
              </Text>
              
              <VStack space="lg">
                <DetailField 
                  label="Start Date" 
                  value={convertToLocalDateString(item.startDate)} 
                />
                <DetailField 
                  label="Frequency" 
                  value={item.frequency} 
                />
                {item.additionalDate && (
                  <DetailField 
                    label="Additional Date" 
                    value={convertToLocalDateString(item.additionalDate)} 
                  />
                )}
              </VStack>
            </View>

            {nextOccurrences && nextOccurrences?.length > 0 && (
              <View style={{ backgroundColor: colors.card, borderRadius: 24, padding: 16, borderWidth: 1, borderColor: colors.border }}>
                <Text style={{ fontSize: 12, fontWeight: '800', color: colors.sub, marginBottom: 16, textTransform: 'uppercase', letterSpacing: 1 }}>
                  Upcoming Schedule
                </Text>
                
                <VStack space="md">
                  {nextOccurrences?.map((date, idx) => (
                    <HStack key={idx} space="md" style={{ alignItems: 'center' }}>
                      <View style={{ 
                        width: 32, height: 32, borderRadius: 8, 
                        backgroundColor: idx === 0 ? colors.primary : colors.primary + '10', 
                        alignItems: 'center', justifyContent: 'center' 
                      }}>
                        <I.calendar size={14} color={idx === 0 ? '#fff' : colors.primary} />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={{ 
                          fontSize: 14, 
                          fontWeight: idx === 0 ? '700' : '500', 
                          color: colors.text 
                        }}>
                          {date}
                        </Text>
                        {idx === 0 && (
                          <Text style={{ fontSize: 11, color: colors.primary, fontWeight: '600' }}>Next occurrence</Text>
                        )}
                      </View>
                    </HStack>
                  ))}
                </VStack>
              </View>
            )}
          </View>
        </ScrollView>
      )}

      <ActionBottomSheet 
        isVisible={isBottomSheetOpen} 
        onClose={() => setIsBottomSheetOpen(false)} 
        actions={actions} 
      />
      
      <AuditInfo 
        isVisible={showAudit} 
        onClose={() => setShowAudit(false)} 
        createdBy={item?.createdBy} 
        updatedBy={item?.updatedBy} 
        createdAt={item?.createdAt} 
        updatedAt={item?.updatedAt} 
      />
    </SafeAreaView>
  );
}
