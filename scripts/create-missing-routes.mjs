/**
 * Create missing contextual "add" route pages.
 * These are "add" variants that receive an extra context parameter,
 * e.g., creating a task from within a specific workflow.
 */

import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';

const ROOT = process.cwd();
let created = 0;

function ensureDir(p) {
  mkdirSync(dirname(p), { recursive: true });
}

function createPage(relPath, title, params, contextLabel) {
  const fullPath = join(ROOT, relPath);
  if (existsSync(fullPath)) {
    console.log(`  EXISTS: ${relPath}`);
    return;
  }
  ensureDir(fullPath);

  const paramType = params.map(p => `${p}: string`).join('; ');
  const paramDestructure = params.join(', ');

  const content = `import { useThemeColors } from '@/hooks/use-theme-colors';
import { PageHeader } from '@/components/ui/page-header';
import { FormField } from '@/components/ui/form-field';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, SafeAreaView, Text, Pressable, Alert, View } from 'react-native';

export default function Screen() {
  const { ${paramDestructure} } = useLocalSearchParams<{ ${paramType} }>();
  const router = useRouter();
  const colors = useThemeColors();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim()) {
      Alert.alert('Validation Error', 'Please enter a name');
      return;
    }
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    Alert.alert('Success', '${title} created successfully', [
      { text: 'OK', onPress: () => router.back() },
    ]);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <Stack.Screen options={{ headerShown: false }} />
      <PageHeader title="${title}" />

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16, gap: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, borderRadius: 8, padding: 12 }}>
          <Text style={{ fontSize: 12, color: colors.sub }}>Context: ${contextLabel}</Text>
        </View>

        <FormField
          label="Name"
          required
          placeholder="Enter name"
          value={name}
          onChangeText={setName}
        />

        <FormField
          label="Description"
          placeholder="Enter description"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
        />

        <Pressable
          onPress={handleSubmit}
          disabled={isSubmitting}
          style={({ pressed }) => ({
            backgroundColor: colors.primary,
            paddingVertical: 12,
            borderRadius: 8,
            alignItems: 'center',
            opacity: pressed || isSubmitting ? 0.7 : 1,
            marginTop: 8,
          })}
        >
          <Text style={{ fontSize: 16, fontWeight: '600', color: '#ffffff' }}>
            {isSubmitting ? 'Creating...' : 'Create'}
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
`;
  writeFileSync(fullPath, content);
  created++;
  console.log(`  CREATE: ${relPath}`);
}

// All missing contextual add routes from Angular routing
const pages = [
  // workflow/new/:id/category/:cId
  ['app/admin/workflow/new/[id]/category/[cId].tsx', 'New Workflow', ['id', 'cId'], 'Category: ${cId}'],
  // task/new/:id/workflow/:wId
  ['app/admin/task/new/[id]/workflow/[wId].tsx', 'New Task', ['id', 'wId'], 'Workflow: ${wId}'],
  // quote/new/:id/workflow/:wId
  ['app/admin/quote/new/[id]/workflow/[wId].tsx', 'New Quote', ['id', 'wId'], 'Workflow: ${wId}'],
  // invoice/new/:id/workflow/:wId
  ['app/admin/invoice/new/[id]/workflow/[wId].tsx', 'New Invoice', ['id', 'wId'], 'Workflow: ${wId}'],
  // invoice/new/:id/quote/:qId
  ['app/admin/invoice/new/[id]/quote/[qId].tsx', 'New Invoice', ['id', 'qId'], 'Quote: ${qId}'],
  // invoice/new/:id/workorder/:woId
  ['app/admin/invoice/new/[id]/workorder/[woId].tsx', 'New Invoice', ['id', 'woId'], 'Work Order: ${woId}'],
  // workorder/new/:id/workflow/:wId
  ['app/admin/workorder/new/[id]/workflow/[wId].tsx', 'New Work Order', ['id', 'wId'], 'Workflow: ${wId}'],
  // workorder/new/:id/quote/:qId
  ['app/admin/workorder/new/[id]/quote/[qId].tsx', 'New Work Order', ['id', 'qId'], 'Quote: ${qId}'],
  // evidence/new/:id/workflow/:wId
  ['app/admin/evidence/new/[id]/workflow/[wId].tsx', 'New Evidence', ['id', 'wId'], 'Workflow: ${wId}'],
  // ledger/new/:id/invoice/:oId
  ['app/admin/ledger/new/[id]/invoice/[oId].tsx', 'New Ledger Entry', ['id', 'oId'], 'Invoice: ${oId}'],
  // event/new/:id/type/:tId
  ['app/admin/event/new/[id]/type/[tId].tsx', 'New Event', ['id', 'tId'], 'Event Type: ${tId}'],
  // vote/new/:id/workflow/:wId
  ['app/admin/vote/new/[id]/workflow/[wId].tsx', 'New Vote', ['id', 'wId'], 'Workflow: ${wId}'],
  // vote/new/:id/quote/:qId
  ['app/admin/vote/new/[id]/quote/[qId].tsx', 'New Vote', ['id', 'qId'], 'Quote: ${qId}'],
  // vote/new/:id/invoice/:iId
  ['app/admin/vote/new/[id]/invoice/[iId].tsx', 'New Vote', ['id', 'iId'], 'Invoice: ${iId}'],
  // asset/new/:id/type/:tId
  ['app/admin/asset/new/[id]/type/[tId].tsx', 'New Asset', ['id', 'tId'], 'Asset Type: ${tId}'],
  // document/new/:id/:fId
  ['app/admin/document/new/[id]/[fId].tsx', 'New Document', ['id', 'fId'], 'Folder: ${fId}'],
];

console.log('=== Creating missing contextual add routes ===\n');
for (const [path, title, params, ctx] of pages) {
  createPage(path, title, params, ctx);
}
console.log(`\nDone! Created ${created} files.`);
