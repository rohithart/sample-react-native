/**
 * Fix: wrap archive/delete actions with isAdmin guard
 * and make archive/unarchive conditional on item.status
 */
import { readdirSync, readFileSync, statSync, writeFileSync } from 'fs';
import { join, relative } from 'path';

const ROOT = process.cwd();
let modified = 0;

function findFiles(dir, pattern) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      results.push(...findFiles(full, pattern));
    } else if (pattern.test(entry)) {
      results.push(full);
    }
  }
  return results;
}

const detailPages = findFiles(join(ROOT, 'app/admin'), /^\[id\]\.tsx$/)
  .filter(f => f.includes('[orgId]') && !f.includes('edit.tsx') && !f.includes('preview'));

console.log(`Processing ${detailPages.length} detail pages\n`);

for (const file of detailPages) {
  let content = readFileSync(file, 'utf-8');
  const rel = relative(ROOT, file);
  let changed = false;

  // Fix archive action block - replace the static archive block with conditional archive/unarchive
  // Pattern: standalone archive action (not already wrapped in isAdmin spread)
  const archiveBlock = `    {
      id: 'archive',
      label: 'Archive',
      icon: <ArchiveRestore size={24} color={colors.warning} />,
      onPress: () => setConfirmationType('archive'),
      color: 'warning',
    },`;

  const archiveReplacement = `    ...(isAdmin ? [item.status === 'archived' ? {
      id: 'unarchive',
      label: 'Unarchive',
      icon: <ArchiveRestore size={24} color={colors.success} />,
      onPress: () => setConfirmationType('unarchive'),
      color: 'success',
    } : {
      id: 'archive',
      label: 'Archive',
      icon: <ArchiveRestore size={24} color={colors.warning} />,
      onPress: () => setConfirmationType('archive'),
      color: 'warning',
    }] : []),`;

  if (content.includes(archiveBlock)) {
    content = content.replace(archiveBlock, archiveReplacement);
    changed = true;
  }

  // Fix delete action block
  const deleteBlock = `    {
      id: 'delete',
      label: 'Delete',
      icon: <Trash2 size={24} color={colors.danger} />,
      onPress: () => setConfirmationType('delete'),
      color: 'danger',
    },`;

  const deleteReplacement = `    ...(isAdmin ? [{
      id: 'delete',
      label: 'Delete',
      icon: <Trash2 size={24} color={colors.danger} />,
      onPress: () => setConfirmationType('delete'),
      color: 'danger',
    }] : []),`;

  if (content.includes(deleteBlock)) {
    content = content.replace(deleteBlock, deleteReplacement);
    changed = true;
  }

  if (changed) {
    writeFileSync(file, content);
    modified++;
    console.log(`  ✓ ${rel}`);
  } else {
    console.log(`  - ${rel} (already fixed or different pattern)`);
  }
}

console.log(`\nDone! Fixed ${modified} files.`);
