import fs from 'fs';
import path from 'path';

const BASE = path.resolve('app');

// ─── Admin modules ───────────────────────────────────────────────────
// folder = plural (list URL), singularFolder = singular (detail/add/edit URL)
const adminModules = [
  { folder: 'users', singularFolder: 'user', title: 'Users', singular: 'User', hasEdit: true },
  { folder: 'groups', singularFolder: 'group', title: 'Groups', singular: 'Group', hasEdit: false },
  { folder: 'tasks', singularFolder: 'task', title: 'Tasks', singular: 'Task', hasEdit: true },
  { folder: 'quotes', singularFolder: 'quote', title: 'Quotes', singular: 'Quote', hasEdit: true },
  { folder: 'invoices', singularFolder: 'invoice', title: 'Invoices', singular: 'Invoice', hasEdit: true },
  { folder: 'workorders', singularFolder: 'workorder', title: 'Work Orders', singular: 'Work Order', hasEdit: true },
  { folder: 'evidences', singularFolder: 'evidence', title: 'Evidences', singular: 'Evidence', hasEdit: true },
  { folder: 'vendors', singularFolder: 'vendor', title: 'Vendors', singular: 'Vendor', hasEdit: true },
  { folder: 'categories', singularFolder: 'category', title: 'Categories', singular: 'Category', hasEdit: true },
  { folder: 'budgets', singularFolder: 'budget', title: 'Budgets', singular: 'Budget', hasEdit: false },
  { folder: 'chart-of-accounts', singularFolder: 'coa', title: 'Chart of Accounts', singular: 'Chart of Account', hasEdit: true },
  { folder: 'financial-years', singularFolder: 'fy', title: 'Financial Years', singular: 'Financial Year', hasEdit: false },
  { folder: 'ledgers', singularFolder: 'ledger', title: 'Ledgers', singular: 'Ledger', hasEdit: true },
  { folder: 'booking-types', singularFolder: 'booking-type', title: 'Booking Types', singular: 'Booking Type', hasEdit: true },
  { folder: 'user-requests', singularFolder: 'user-request', title: 'User Requests', singular: 'User Request', hasEdit: false },
  { folder: 'event-types', singularFolder: 'event-type', title: 'Event Types', singular: 'Event Type', hasEdit: true },
  { folder: 'events', singularFolder: 'event', title: 'Events', singular: 'Event', hasEdit: false },
  { folder: 'bookings', singularFolder: 'booking', title: 'Bookings', singular: 'Booking', hasEdit: false },
  { folder: 'announcements', singularFolder: 'announcement', title: 'Announcements', singular: 'Announcement', hasEdit: false },
  { folder: 'meetings', singularFolder: 'meeting', title: 'Meetings', singular: 'Meeting', hasEdit: true },
  { folder: 'votes', singularFolder: 'vote', title: 'Votes', singular: 'Vote', hasEdit: false },
  { folder: 'informations', singularFolder: 'information', title: 'Information', singular: 'Information', hasEdit: true },
  { folder: 'asset-types', singularFolder: 'asset-type', title: 'Asset Types', singular: 'Asset Type', hasEdit: true },
  { folder: 'assets', singularFolder: 'asset', title: 'Assets', singular: 'Asset', hasEdit: true },
  { folder: 'documents', singularFolder: 'document', title: 'Documents', singular: 'Document', hasEdit: true },
  { folder: 'workflows', singularFolder: 'workflow', title: 'Workflows', singular: 'Workflow', hasEdit: true },
];

// ─── User/view modules ──────────────────────────────────────────────
const viewModules = [
  { folder: 'announcements', singularFolder: 'announcement', title: 'Announcements', singular: 'Announcement', hasAdd: false, hasDetail: true },
  { folder: 'meetings', singularFolder: 'meeting', title: 'Meetings', singular: 'Meeting', hasAdd: false, hasDetail: true },
  { folder: 'votes', singularFolder: 'vote', title: 'Votes', singular: 'Vote', hasAdd: false, hasDetail: true },
  { folder: 'informations', singularFolder: 'information', title: 'Information', singular: 'Information', hasAdd: false, hasDetail: true },
  { folder: 'events', singularFolder: 'event', title: 'Events', singular: 'Event', hasAdd: false, hasDetail: true },
  { folder: 'bookings', singularFolder: 'booking', title: 'Bookings', singular: 'Booking', hasAdd: true, hasDetail: true },
  { folder: 'groups', singularFolder: 'group', title: 'Groups', singular: 'Group', hasAdd: false, hasDetail: true },
  { folder: 'user-requests', singularFolder: 'user-request', title: 'My Requests', singular: 'Request', hasAdd: true, hasDetail: true },
];

function toFnName(str) {
  return str.replace(/[^a-zA-Z]/g, '');
}

// ─── Templates using UI components ──────────────────────────────────

function listTemplate(prefix, folder, singularFolder, title, singular, hasAdd) {
  const plusImport = hasAdd !== false ? "import { Plus } from 'lucide-react-native';\n" : '';
  const addHandler = hasAdd !== false
    ? `\n  const handleAdd = () => {\n    router.push(\`/${prefix}/${singularFolder}/new/\${id}\`);\n  };\n`
    : '';
  const addButton = hasAdd !== false
    ? `\n          rightAction={\n            <Pressable\n              onPress={handleAdd}\n              style={{ padding: 8, backgroundColor: colors.primary, borderRadius: 8 }}\n            >\n              <Plus size={20} color="#ffffff" />\n            </Pressable>\n          }`
    : '';

  return `import { useThemeColors } from '@/hooks/use-theme-colors';
import { PageHeader } from '@/components/ui/page-header';
import { ListItemCard } from '@/components/ui/list-item-card';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
${plusImport}import React, { useState } from 'react';
import { FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { generateDummyList } from '@/utils/dummy-data';

export default function ${toFnName(title)}ListScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const colors = useThemeColors();
  const [items] = useState(() => generateDummyList(12));
${addHandler}
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <Stack.Screen options={{ headerShown: false }} />
      <PageHeader
          title="${title}"${addButton}
      />
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <ListItemCard
            title={item.name}
            description={item.description}
            status={item.status}
            onPress={() => router.push(\`/${prefix}/${singularFolder}/\${id}/\${item.id}\`)}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 12 }}
        scrollIndicatorInsets={{ right: 1 }}
      />
    </SafeAreaView>
  );
}
`;
}

function detailTemplate(prefix, folder, singularFolder, title, singular, hasEdit) {
  const editImport = hasEdit ? 'Edit, ' : '';
  const editAction = hasEdit
    ? `    {\n      id: 'edit',\n      label: 'Edit',\n      icon: <Edit size={24} color={colors.primary} />,\n      onPress: () => router.push(\`/${prefix}/${singularFolder}/\${orgId}/\${id}/edit\`),\n      color: 'primary',\n    },`
    : '';

  return `import { useThemeColors } from '@/hooks/use-theme-colors';
import { PageHeader } from '@/components/ui/page-header';
import { StatusBadge } from '@/components/ui/status-badge';
import { MetadataCard } from '@/components/ui/metadata-card';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { MoreVertical, ${editImport}ArchiveRestore, Share2, Trash2 } from 'lucide-react-native';
import React, { useState } from 'react';
import { ScrollView, Text, View, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActionBottomSheet, ActionItem } from '@/components/sheets/action-bottom-sheet';
import { ConfirmationDialog } from '@/components/dialogs/confirmation-dialog';
import { generateDummyItemWithDetails } from '@/utils/dummy-data';

export default function ${toFnName(singular)}DetailScreen() {
  const { orgId, id } = useLocalSearchParams<{ orgId: string; id: string }>();
  const router = useRouter();
  const colors = useThemeColors();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [confirmationType, setConfirmationType] = useState<'delete' | 'archive' | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const item = generateDummyItemWithDetails(id || '1');

  const handleDelete = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsLoading(false);
    setConfirmationType(null);
    router.push(\`/${prefix}/${folder}/\${orgId}\`);
  };

  const handleArchive = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsLoading(false);
    setConfirmationType(null);
    Alert.alert('Success', '${singular} archived successfully');
  };

  const actions: ActionItem[] = [
${editAction}
    {
      id: 'archive',
      label: 'Archive',
      icon: <ArchiveRestore size={24} color={colors.warning} />,
      onPress: () => setConfirmationType('archive'),
      color: 'warning',
    },
    {
      id: 'share',
      label: 'Share',
      icon: <Share2 size={24} color={colors.success} />,
      onPress: () => Alert.alert('Share', 'Share functionality coming soon'),
      color: 'success',
    },
    {
      id: 'delete',
      label: 'Delete',
      icon: <Trash2 size={24} color={colors.danger} />,
      onPress: () => setConfirmationType('delete'),
      color: 'danger',
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <Stack.Screen options={{ headerShown: false }} />
      <PageHeader
        title={item.name}
        rightAction={
          <Pressable onPress={() => setIsBottomSheetOpen(true)} style={{ padding: 8 }}>
            <MoreVertical size={20} color={colors.primary} />
          </Pressable>
        }
      />

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16, gap: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <StatusBadge status={item.status} />

        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: colors.text }}>Description</Text>
          <Text style={{ fontSize: 14, color: colors.sub, lineHeight: 20 }}>{item.description}</Text>
        </View>

        <MetadataCard
          rows={[
            { label: 'Owner', value: item.metadata?.owner || 'N/A' },
            { label: 'Priority', value: item.metadata?.priority || 'N/A' },
            { label: 'Created', value: new Date(item.createdAt).toLocaleDateString() },
            { label: 'Updated', value: new Date(item.updatedAt).toLocaleDateString() },
          ]}
        />

        {item.attachments && item.attachments.length > 0 && (
          <View style={{ gap: 8 }}>
            <Text style={{ fontSize: 14, fontWeight: '600', color: colors.text }}>
              Attachments ({item.attachments.length})
            </Text>
            {item.attachments.map((attachment: any, idx: number) => (
              <View
                key={idx}
                style={{
                  backgroundColor: colors.card,
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 8,
                  padding: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <View>
                  <Text style={{ color: colors.text, fontWeight: '500' }}>{attachment.name}</Text>
                  <Text style={{ color: colors.sub, fontSize: 12, marginTop: 2 }}>{attachment.size}</Text>
                </View>
                <Text style={{ color: colors.primary, fontWeight: '600' }}>↓</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      <ActionBottomSheet
        isVisible={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
        actions={actions}
      />
      <ConfirmationDialog
        isOpen={confirmationType === 'delete'}
        onClose={() => setConfirmationType(null)}
        onConfirm={handleDelete}
        type="delete"
        isLoading={isLoading}
      />
      <ConfirmationDialog
        isOpen={confirmationType === 'archive'}
        onClose={() => setConfirmationType(null)}
        onConfirm={handleArchive}
        type="archive"
        isLoading={isLoading}
      />
    </SafeAreaView>
  );
}
`;
}

function addTemplate(prefix, folder, singularFolder, title, singular) {
  return `import { useThemeColors } from '@/hooks/use-theme-colors';
import { PageHeader } from '@/components/ui/page-header';
import { FormField } from '@/components/ui/form-field';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, SafeAreaView, Text, Pressable, Alert } from 'react-native';

export default function Add${toFnName(singular)}Screen() {
  const { id } = useLocalSearchParams<{ id: string }>();
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
    Alert.alert('Success', '${singular} created successfully', [
      { text: 'OK', onPress: () => router.push(\`/${prefix}/${folder}/\${id}\`) },
    ]);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <Stack.Screen options={{ headerShown: false }} />
      <PageHeader title="Add New ${singular}" />

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16, gap: 16 }}
        showsVerticalScrollIndicator={false}
      >
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
            {isSubmitting ? 'Creating...' : 'Create ${singular}'}
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
`;
}

function editTemplate(prefix, folder, singularFolder, title, singular) {
  return `import { useThemeColors } from '@/hooks/use-theme-colors';
import { PageHeader } from '@/components/ui/page-header';
import { FormField } from '@/components/ui/form-field';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Trash2 } from 'lucide-react-native';
import React, { useState } from 'react';
import { ScrollView, SafeAreaView, Text, Pressable, Alert } from 'react-native';

export default function Edit${toFnName(singular)}Screen() {
  const { orgId, id } = useLocalSearchParams<{ orgId: string; id: string }>();
  const router = useRouter();
  const colors = useThemeColors();
  const [name, setName] = useState('Sample ${singular}');
  const [description, setDescription] = useState('This is a sample ${singular.toLowerCase()} description.');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim()) {
      Alert.alert('Validation Error', 'Please enter a name');
      return;
    }
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    Alert.alert('Success', '${singular} updated successfully', [
      { text: 'OK', onPress: () => router.push(\`/${prefix}/${singularFolder}/\${orgId}/\${id}\`) },
    ]);
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete ${singular}',
      'This action cannot be reversed. The ${singular.toLowerCase()} will be permanently deleted.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            setIsSubmitting(true);
            await new Promise((resolve) => setTimeout(resolve, 500));
            setIsSubmitting(false);
            router.push(\`/${prefix}/${folder}/\${orgId}\`);
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <Stack.Screen options={{ headerShown: false }} />
      <PageHeader title="Edit ${singular}" />

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16, gap: 16 }}
        showsVerticalScrollIndicator={false}
      >
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
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </Text>
        </Pressable>

        <Pressable
          onPress={handleDelete}
          disabled={isSubmitting}
          style={({ pressed }) => ({
            backgroundColor: colors.danger + '20',
            borderWidth: 1,
            borderColor: colors.danger,
            paddingVertical: 12,
            borderRadius: 8,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            opacity: pressed || isSubmitting ? 0.7 : 1,
          })}
        >
          <Trash2 size={18} color={colors.danger} />
          <Text style={{ fontSize: 16, fontWeight: '600', color: colors.danger }}>
            Delete ${singular}
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
`;
}

// ─── Generate files ──────────────────────────────────────────────────

let created = 0;
let replaced = 0;

function writeFile(filePath, content) {
  const dir = path.dirname(filePath);
  fs.mkdirSync(dir, { recursive: true });
  const existed = fs.existsSync(filePath);
  fs.writeFileSync(filePath, content);
  if (existed) {
    replaced++;
    console.log(`  ↻ replaced: ${path.relative(BASE, filePath)}`);
  } else {
    created++;
    console.log(`  + created:  ${path.relative(BASE, filePath)}`);
  }
}

console.log('\n═══ Generating Admin pages (with UI components) ═══\n');

for (const mod of adminModules) {
  const listDir = path.join(BASE, 'admin', mod.folder);
  const singularDir = path.join(BASE, 'admin', mod.singularFolder);
  console.log(`\n── ${mod.title} ──`);

  writeFile(path.join(listDir, '[id].tsx'), listTemplate('admin', mod.folder, mod.singularFolder, mod.title, mod.singular, true));
  writeFile(path.join(singularDir, '[orgId]', '[id].tsx'), detailTemplate('admin', mod.folder, mod.singularFolder, mod.title, mod.singular, mod.hasEdit));
  writeFile(path.join(singularDir, 'new', '[id].tsx'), addTemplate('admin', mod.folder, mod.singularFolder, mod.title, mod.singular));
  if (mod.hasEdit) {
    writeFile(path.join(singularDir, '[orgId]', '[id]', 'edit.tsx'), editTemplate('admin', mod.folder, mod.singularFolder, mod.title, mod.singular));
  }
}

console.log('\n═══ Generating View pages (with UI components) ═══\n');

for (const mod of viewModules) {
  const listDir = path.join(BASE, 'view', mod.folder);
  const singularDir = path.join(BASE, 'view', mod.singularFolder);
  console.log(`\n── ${mod.title} ──`);

  writeFile(path.join(listDir, '[id].tsx'), listTemplate('view', mod.folder, mod.singularFolder, mod.title, mod.singular, mod.hasAdd));
  if (mod.hasDetail) {
    writeFile(path.join(singularDir, '[orgId]', '[id].tsx'), detailTemplate('view', mod.folder, mod.singularFolder, mod.title, mod.singular, false));
  }
  if (mod.hasAdd) {
    writeFile(path.join(singularDir, 'new', '[id].tsx'), addTemplate('view', mod.folder, mod.singularFolder, mod.title, mod.singular));
  }
}

console.log(`\n═══ Done! Created ${created} new, replaced ${replaced} existing ═══\n`);
