/**
 * Fix all route references after migration and clean up old files.
 * 
 * Pattern corrections:
 * 1. List pages: /{plural}/add/${id} → /{singular}/new/${id}
 * 2. List pages: /{plural}/${id}/${item.id} → /{singular}/${id}/${item.id}
 * 3. Detail pages: Fix ${id} → ${orgId} for org param references
 * 4. Detail pages: /{plural}/edit/${id}/${id} → /{singular}/${orgId}/${id}/edit
 * 5. Edit pages: /{plural}/${id}/${id} → /{singular}/${orgId}/${id} (success)
 * 6. Edit pages: Fix ${id} → ${orgId} for back-to-list references
 * 7. View detail pages: Fix ${id} → ${orgId} for back-to-list
 * 8. Delete old plural files that were copied (not actually moved)
 */

import { existsSync, readFileSync, writeFileSync, readdirSync, statSync, rmSync } from 'fs';
import { join } from 'path';

const ROOT = process.cwd();

const ADMIN_MODULES = [
  { plural: 'workflows', singular: 'workflow', hasEdit: true, hasAdd: true },
  { plural: 'tasks', singular: 'task', hasEdit: true, hasAdd: true },
  { plural: 'quotes', singular: 'quote', hasEdit: true, hasAdd: true },
  { plural: 'invoices', singular: 'invoice', hasEdit: true, hasAdd: true },
  { plural: 'workorders', singular: 'workorder', hasEdit: true, hasAdd: true },
  { plural: 'evidences', singular: 'evidence', hasEdit: true, hasAdd: true },
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

let totalFixed = 0;
let totalDeleted = 0;

function fixFile(relPath, replacements) {
  const fullPath = join(ROOT, relPath);
  if (!existsSync(fullPath)) return;
  
  let content = readFileSync(fullPath, 'utf8');
  let changed = false;
  
  for (const [from, to] of replacements) {
    if (content.includes(from)) {
      content = content.replaceAll(from, to);
      changed = true;
    }
  }
  
  if (changed) {
    writeFileSync(fullPath, content);
    totalFixed++;
    console.log(`  FIXED: ${relPath}`);
  }
}

function deleteFile(relPath) {
  const fullPath = join(ROOT, relPath);
  if (existsSync(fullPath)) {
    rmSync(fullPath);
    totalDeleted++;
    console.log(`  DELETE: ${relPath}`);
  }
}

function removeEmptyDirsRecursive(dir) {
  if (!existsSync(dir)) return;
  const entries = readdirSync(dir);
  for (const e of entries) {
    const full = join(dir, e);
    if (statSync(full).isDirectory()) {
      removeEmptyDirsRecursive(full);
    }
  }
  // Re-check after cleaning subdirs
  if (readdirSync(dir).length === 0) {
    rmSync(dir, { recursive: true });
    console.log(`  RMDIR: ${dir.replace(ROOT + '/', '')}`);
  }
}

function fixModule(prefix, mod) {
  console.log(`\n[${prefix}/${mod.plural}]`);
  
  const p = prefix; // 'admin' or 'view'
  const pl = mod.plural;
  const sg = mod.singular;
  
  // ── 1. Fix list page ──
  fixFile(`app/${p}/${pl}/[id].tsx`, [
    // Add button: /plural/add/${id} → /singular/new/${id}
    [`/${p}/${pl}/add/\${id}`, `/${p}/${sg}/new/\${id}`],
    // Detail nav: /plural/${id}/${item.id} → /singular/${id}/${item.id}
    [`/${p}/${pl}/\${id}/\${item.id}`, `/${p}/${sg}/\${id}/\${item.id}`],
  ]);
  
  // ── 2. Fix singular detail page ──
  const detailPath = `app/${p}/${sg}/[orgId]/[id].tsx`;
  if (existsSync(join(ROOT, detailPath))) {
    fixFile(detailPath, [
      // Edit button: /plural/edit/${id}/${id} → /singular/${orgId}/${id}/edit
      [`/${p}/${pl}/edit/\${id}/\${id}`, `/${p}/${sg}/\${orgId}/\${id}/edit`],
      // Back to list: /plural/${id}` → /plural/${orgId}`  (match backtick to be specific)
      [`/${p}/${pl}/\${id}\``, `/${p}/${pl}/\${orgId}\``],
    ]);
  }
  
  // ── 3. Fix singular edit page ──
  if (mod.hasEdit) {
    const editPath = `app/${p}/${sg}/[orgId]/[id]/edit.tsx`;
    if (existsSync(join(ROOT, editPath))) {
      fixFile(editPath, [
        // Success nav: /plural/${id}/${id} → /singular/${orgId}/${id}  (detail page)
        [`/${p}/${pl}/\${id}/\${id}`, `/${p}/${sg}/\${orgId}/\${id}`],
        // Delete back to list: /plural/${id}` → /plural/${orgId}`
        [`/${p}/${pl}/\${id}\``, `/${p}/${pl}/\${orgId}\``],
      ]);
    }
  }
  
  // ── 4. Fix singular add/new page ──
  // The new/[id].tsx page uses `id` which IS the orgId, so routes like
  // /plural/${id} are correct (id = orgId). No changes needed.
  
  // ── 5. Delete old plural files ──
  // Detail (old): plural/[id]/[wid].tsx
  deleteFile(`app/${p}/${pl}/[id]/[wid].tsx`);
  
  // Add (old): plural/add/[id].tsx
  if (mod.hasAdd) {
    deleteFile(`app/${p}/${pl}/add/[id].tsx`);
  }
  
  // Edit (old): plural/edit/[id]/[wid].tsx  
  if (mod.hasEdit) {
    deleteFile(`app/${p}/${pl}/edit/[id]/[wid].tsx`);
  }
  
  // Clean up empty dirs
  for (const subdir of ['[id]', 'add', 'edit']) {
    const dir = join(ROOT, `app/${p}/${pl}/${subdir}`);
    if (existsSync(dir) && statSync(dir).isDirectory()) {
      removeEmptyDirsRecursive(dir);
    }
  }
}

// ── Execute ──
console.log('=== FIXING ADMIN MODULES ===');
for (const mod of ADMIN_MODULES) {
  fixModule('admin', mod);
}

console.log('\n=== FIXING VIEW MODULES ===');
for (const mod of VIEW_MODULES) {
  fixModule('view', mod);
}

console.log(`\n=== SUMMARY ===`);
console.log(`Files fixed: ${totalFixed}`);
console.log(`Files deleted: ${totalDeleted}`);
