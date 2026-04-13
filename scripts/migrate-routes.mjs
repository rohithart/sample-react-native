/**
 * Route migration script
 * Restructures Expo Router file paths to match Angular routing config for deep linking.
 *
 * Angular patterns:
 *   LIST:    admin/{plural}/:id           → app/admin/{plural}/[id].tsx         (KEEP as-is)
 *   DETAIL:  admin/{singular}/:orgId/:id  → app/admin/{singular}/[orgId]/[id].tsx
 *   ADD:     admin/{singular}/new/:id     → app/admin/{singular}/new/[id].tsx
 *   EDIT:    admin/{singular}/:orgId/:id/edit → app/admin/{singular}/[orgId]/[id]/edit.tsx
 *
 * Changes from current structure:
 *   1. detail/add/edit move from plural folder to NEW singular folder
 *   2. "add" renamed to "new"
 *   3. edit moves AFTER [orgId]/[id] instead of before
 *   4. [wid] renamed to [id] (second param), [id] renamed to [orgId] (first param)
 */

import { mkdirSync, existsSync, renameSync, readFileSync, writeFileSync, cpSync } from 'fs';
import { dirname, join } from 'path';
import { execSync } from 'child_process';

const ROOT = process.cwd();

// ── Module definitions ──────────────────────────────────────────────
// { plural, singular, prefix, hasEdit, hasAdd, special[] }

const ADMIN_MODULES = [
  { plural: 'workflows', singular: 'workflow', hasEdit: true, hasAdd: true, special: ['preview'] },
  { plural: 'tasks', singular: 'task', hasEdit: true, hasAdd: true },
  { plural: 'quotes', singular: 'quote', hasEdit: true, hasAdd: true, special: ['preview'] },
  { plural: 'invoices', singular: 'invoice', hasEdit: true, hasAdd: true, special: ['preview'] },
  { plural: 'workorders', singular: 'workorder', hasEdit: true, hasAdd: true, special: ['preview'] },
  { plural: 'evidences', singular: 'evidence', hasEdit: true, hasAdd: true, special: ['preview'] },
  { plural: 'vendors', singular: 'vendor', hasEdit: true, hasAdd: true },
  { plural: 'categories', singular: 'category', hasEdit: true, hasAdd: true },
  { plural: 'users', singular: 'user', hasEdit: true, hasAdd: true },
  { plural: 'groups', singular: 'group', hasAdd: true },
  { plural: 'announcements', singular: 'announcement', hasAdd: true },
  { plural: 'meetings', singular: 'meeting', hasEdit: true, hasAdd: true },
  { plural: 'votes', singular: 'vote', hasAdd: true },
  { plural: 'informations', singular: 'information', hasEdit: true, hasAdd: true },
  { plural: 'events', singular: 'event', hasAdd: true },
  { plural: 'bookings', singular: 'booking', hasAdd: true },
  { plural: 'booking-types', singular: 'booking-type', hasEdit: true, hasAdd: true },
  { plural: 'event-types', singular: 'event-type', hasEdit: true, hasAdd: true },
  { plural: 'asset-types', singular: 'asset-type', hasEdit: true, hasAdd: true },
  { plural: 'assets', singular: 'asset', hasEdit: true, hasAdd: true },
  { plural: 'documents', singular: 'document', hasEdit: true, hasAdd: true },
  { plural: 'budgets', singular: 'budget', hasAdd: true },
  { plural: 'chart-of-accounts', singular: 'coa', hasEdit: true, hasAdd: true },
  { plural: 'financial-years', singular: 'fy', hasAdd: true },
  { plural: 'ledgers', singular: 'ledger', hasEdit: true, hasAdd: true },
  { plural: 'user-requests', singular: 'user-request', hasAdd: true },
];

const VIEW_MODULES = [
  { plural: 'announcements', singular: 'announcement' },
  { plural: 'informations', singular: 'information' },
  { plural: 'meetings', singular: 'meeting' },
  { plural: 'votes', singular: 'vote' },
  { plural: 'events', singular: 'event' },
  { plural: 'bookings', singular: 'booking', hasAdd: true },
  { plural: 'groups', singular: 'group' },
  { plural: 'user-requests', singular: 'user-request', hasAdd: true },
];

// ── Helpers ─────────────────────────────────────────────────────────
function ensureDir(p) {
  mkdirSync(dirname(p), { recursive: true });
}

function moveFile(from, to) {
  const src = join(ROOT, from);
  const dst = join(ROOT, to);
  if (!existsSync(src)) {
    console.log(`  SKIP (not found): ${from}`);
    return false;
  }
  ensureDir(dst);
  // Read, transform param names, write to new location
  let content = readFileSync(src, 'utf8');
  // If moving from [wid] to [id], update useLocalSearchParams
  if (from.includes('[wid]') && to.includes('[orgId]/[id]')) {
    content = content.replace(
      /useLocalSearchParams<\{\s*id:\s*string;\s*wid:\s*string\s*\}>/g,
      'useLocalSearchParams<{ orgId: string; id: string }>'
    );
    content = content.replace(/const \{ id, wid \}/g, 'const { orgId, id }');
    // In route references, replace ${id} with ${orgId} where it's the org param
    // and ${wid} with ${id} where it's the item param
    content = content.replace(/\$\{wid\s*\|\|\s*'1'\}/g, "${id || '1'}");
    content = content.replace(/wid\b/g, 'id');
  }
  // If moving from add/[id] to new/[id], no param changes needed
  writeFileSync(dst, content);
  console.log(`  MOVE: ${from} → ${to}`);
  return true;
}

function createStubPage(filePath, title, prefix) {
  const fullPath = join(ROOT, filePath);
  if (existsSync(fullPath)) {
    console.log(`  EXISTS: ${filePath}`);
    return;
  }
  ensureDir(fullPath);

  // Determine if this is a detail-like or list-like page
  const hasOrgId = filePath.includes('[orgId]');
  const params = hasOrgId ? "{ orgId: string; id: string }" : "{ id: string }";
  const paramDestructure = hasOrgId ? "const { orgId, id } = useLocalSearchParams<" + params + ">();" : "const { id } = useLocalSearchParams<" + params + ">();";
  const subtitle = hasOrgId ? `ID \${id}` : `Org \${id}`;

  const content = `import { useThemeColors } from '@/hooks/use-theme-colors';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Screen() {
  ${paramDestructure}
  const colors = useThemeColors();
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderColor: colors.border, backgroundColor: colors.card }}>
        <Pressable onPress={() => router.back()} style={{ padding: 4, marginRight: 12 }}>
          <Text style={{ fontSize: 24, color: colors.text }}>‹</Text>
        </Pressable>
        <Text style={{ fontSize: 18, fontWeight: '700', color: colors.text }}>${title}</Text>
      </View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 }}>
        <Text style={{ fontSize: 48 }}>🚧</Text>
        <Text style={{ fontSize: 20, fontWeight: '700', color: colors.text }}>${title}</Text>
        <Text style={{ fontSize: 14, color: colors.sub }}>${subtitle}</Text>
      </View>
    </SafeAreaView>
  );
}
`;
  writeFileSync(fullPath, content);
  console.log(`  CREATE: ${filePath}`);
}

// ── Migration ───────────────────────────────────────────────────────
function migrateModule(prefix, mod) {
  console.log(`\n[${prefix}/${mod.plural}] → singular: ${mod.singular}`);

  const listFile = `app/${prefix}/${mod.plural}/[id].tsx`;
  if (!existsSync(join(ROOT, listFile))) {
    console.log(`  WARNING: List page missing: ${listFile}`);
  } else {
    console.log(`  OK: List page: ${listFile}`);
  }

  // Detail: plural/[id]/[wid].tsx → singular/[orgId]/[id].tsx
  const oldDetail = `app/${prefix}/${mod.plural}/[id]/[wid].tsx`;
  const newDetail = `app/${prefix}/${mod.singular}/[orgId]/[id].tsx`;
  if (!moveFile(oldDetail, newDetail)) {
    // Check if singular already exists
    if (!existsSync(join(ROOT, newDetail))) {
      const displayName = mod.singular.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
      createStubPage(newDetail, `${displayName} Details`, prefix);
    }
  }

  // Add: plural/add/[id].tsx → singular/new/[id].tsx
  if (mod.hasAdd) {
    const oldAdd = `app/${prefix}/${mod.plural}/add/[id].tsx`;
    const newAdd = `app/${prefix}/${mod.singular}/new/[id].tsx`;
    if (!moveFile(oldAdd, newAdd)) {
      if (!existsSync(join(ROOT, newAdd))) {
        const displayName = mod.singular.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
        createStubPage(newAdd, `New ${displayName}`, prefix);
      }
    }
  }

  // Edit: plural/edit/[id]/[wid].tsx → singular/[orgId]/[id]/edit.tsx
  if (mod.hasEdit) {
    const oldEdit = `app/${prefix}/${mod.plural}/edit/[id]/[wid].tsx`;
    const newEdit = `app/${prefix}/${mod.singular}/[orgId]/[id]/edit.tsx`;
    if (!moveFile(oldEdit, newEdit)) {
      if (!existsSync(join(ROOT, newEdit))) {
        const displayName = mod.singular.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
        createStubPage(newEdit, `Edit ${displayName}`, prefix);
      }
    }
  }

  // Special routes (preview, etc.)
  if (mod.special) {
    for (const s of mod.special) {
      const specialPath = `app/${prefix}/${mod.singular}/${s}/[orgId]/[id].tsx`;
      if (!existsSync(join(ROOT, specialPath))) {
        const displayName = mod.singular.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
        createStubPage(specialPath, `${s.charAt(0).toUpperCase() + s.slice(1)} ${displayName}`, prefix);
      } else {
        console.log(`  EXISTS: ${specialPath}`);
      }
    }
  }
}

// ── Execute ─────────────────────────────────────────────────────────
console.log('=== ADMIN MODULES ===');
for (const mod of ADMIN_MODULES) {
  migrateModule('admin', mod);
}

console.log('\n=== VIEW MODULES ===');
for (const mod of VIEW_MODULES) {
  migrateModule('view', mod);
}

// ── Missing Angular routes not in module pattern ────────────────────
console.log('\n=== SPECIAL ROUTES ===');

// admin/:id/edit (edit organisation)
createStubPage('app/admin/[id]/edit.tsx', 'Edit Organisation', 'admin');

// admin/status/:type/:id
createStubPage('app/admin/status/[type]/[id].tsx', 'Status', 'admin');

// admin/reminders (not in current modules)
createStubPage('app/admin/reminders/[id].tsx', 'Reminders', 'admin');
createStubPage('app/admin/reminder/[orgId]/[id].tsx', 'Reminder Details', 'admin');
createStubPage('app/admin/reminder/new/[id].tsx', 'New Reminder', 'admin');
createStubPage('app/admin/reminder/[orgId]/[id]/edit.tsx', 'Edit Reminder', 'admin');

// admin/folder routes
createStubPage('app/admin/folder/new/[id].tsx', 'New Folder', 'admin');
createStubPage('app/admin/folder/new/[id]/[fId].tsx', 'New Folder in Parent', 'admin');
createStubPage('app/admin/folder/[orgId]/[id].tsx', 'Folder', 'admin');

// view/admins/:id (security)
createStubPage('app/view/admins/[id].tsx', 'Security', 'view');

// view/chat/:orgId/:id
createStubPage('app/view/chat/[orgId]/[id].tsx', 'Chat', 'view');

// admin/me uses :orgId not :id
// Check current
const meFile = join(ROOT, 'app/admin/me/[id].tsx');
if (existsSync(meFile)) {
  // Rename [id] to [orgId] to match Angular's me/:orgId
  const meDst = join(ROOT, 'app/admin/me/[orgId].tsx');
  if (!existsSync(meDst)) {
    let content = readFileSync(meFile, 'utf8');
    content = content.replace(
      /useLocalSearchParams<\{\s*id:\s*string\s*\}>/g,
      'useLocalSearchParams<{ orgId: string }>'
    );
    content = content.replace(/const \{ id \}/g, 'const { orgId }');
    writeFileSync(meDst, content);
    console.log(`  MOVE: app/admin/me/[id].tsx → app/admin/me/[orgId].tsx`);
  }
}

console.log('\n=== CLEANUP ===');
// Remove empty old directories (detail/add/edit under plural folders)
// We can't remove them yet because the list pages are still there
// Just report what can be cleaned
const { readdirSync, statSync, rmSync } = await import('fs');

function removeEmptyDirs(dir) {
  if (!existsSync(dir)) return;
  const entries = readdirSync(dir);
  for (const e of entries) {
    const full = join(dir, e);
    if (statSync(full).isDirectory()) {
      removeEmptyDirs(full);
      // After recursion, check if empty
      if (readdirSync(full).length === 0) {
        rmSync(full, { recursive: true });
        console.log(`  REMOVED empty dir: ${full.replace(ROOT + '/', '')}`);
      }
    }
  }
}

// Remove old add/ and edit/ dirs that should now be empty
for (const mod of [...ADMIN_MODULES]) {
  const addDir = join(ROOT, `app/admin/${mod.plural}/add`);
  const editDir = join(ROOT, `app/admin/${mod.plural}/edit`);
  const detailDir = join(ROOT, `app/admin/${mod.plural}/[id]`);
  for (const d of [addDir, editDir, detailDir]) {
    if (existsSync(d) && statSync(d).isDirectory()) {
      const files = readdirSync(d);
      if (files.length === 0 || (files.every(f => statSync(join(d, f)).isDirectory()))) {
        removeEmptyDirs(d);
        if (existsSync(d) && readdirSync(d).length === 0) {
          rmSync(d, { recursive: true });
          console.log(`  REMOVED: ${d.replace(ROOT + '/', '')}`);
        }
      }
    }
  }
}

for (const mod of [...VIEW_MODULES]) {
  const addDir = join(ROOT, `app/view/${mod.plural}/add`);
  const detailDir = join(ROOT, `app/view/${mod.plural}/[id]`);
  for (const d of [addDir, detailDir]) {
    if (existsSync(d) && statSync(d).isDirectory()) {
      removeEmptyDirs(d);
      if (existsSync(d) && readdirSync(d).length === 0) {
        rmSync(d, { recursive: true });
        console.log(`  REMOVED: ${d.replace(ROOT + '/', '')}`);
      }
    }
  }
}

console.log('\n=== DONE ===');
