/**
 * Batch-update all admin detail pages and edit pages to:
 * 1. Add isAdmin from useOrganisationContext
 * 2. Guard Edit, Archive, Delete actions behind isAdmin
 * 3. Add Unarchive action (shown when archived, Archive when not)
 * 4. Guard Delete button on edit pages behind isAdmin
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

// ═══════════════════════════════════════════════════════════════════════
// DETAIL PAGES  — app/admin/*/[orgId]/[id].tsx
// ═══════════════════════════════════════════════════════════════════════

const detailPages = findFiles(join(ROOT, 'app/admin'), /^\[id\]\.tsx$/)
  .filter(f => f.includes('[orgId]') && !f.includes('edit.tsx') && !f.includes('preview'));

console.log(`Found ${detailPages.length} detail pages\n`);

for (const file of detailPages) {
  let content = readFileSync(file, 'utf-8');
  const rel = relative(ROOT, file);
  let changed = false;

  // 1. Add import for useOrganisationContext if not present
  if (!content.includes('useOrganisationContext')) {
    // Add after the last import line
    const importLines = content.split('\n');
    let lastImportIdx = -1;
    for (let i = 0; i < importLines.length; i++) {
      if (importLines[i].startsWith('import ')) lastImportIdx = i;
    }
    if (lastImportIdx >= 0) {
      importLines.splice(lastImportIdx + 1, 0, "import { useOrganisationContext } from '@/context/organisation-context';");
      content = importLines.join('\n');
      changed = true;
    }
  }

  // 2. Add `const { isAdmin } = useOrganisationContext();` after `const colors = useThemeColors();`
  if (!content.includes('isAdmin') && content.includes('useThemeColors()')) {
    content = content.replace(
      /const colors = useThemeColors\(\);/,
      'const colors = useThemeColors();\n  const { isAdmin } = useOrganisationContext();'
    );
    changed = true;
  }

  // 3. Update confirmationType to include 'unarchive'
  if (content.includes("'delete' | 'archive' | null") && !content.includes("'unarchive'")) {
    content = content.replace(
      /'delete' \| 'archive' \| null/g,
      "'delete' | 'archive' | 'unarchive' | null"
    );
    changed = true;
  }

  // 4. Add handleUnarchive function after handleArchive (if handleArchive exists)
  if (content.includes('handleArchive') && !content.includes('handleUnarchive')) {
    // Find the entity name from the Alert message in handleArchive
    const archiveAlertMatch = content.match(/Alert\.alert\('Success',\s*'(.+?) archived successfully'\)/);
    const entityName = archiveAlertMatch ? archiveAlertMatch[1] : 'Item';

    const unarchiveHandler = `

  const handleUnarchive = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsLoading(false);
    setConfirmationType(null);
    Alert.alert('Success', '${entityName} unarchived successfully');
  };`;

    // Insert after the closing of handleArchive
    content = content.replace(
      /(const handleArchive = async \(\) => \{[\s\S]*?Alert\.alert\('Success',\s*'[^']+'\);\s*\};)/,
      `$1${unarchiveHandler}`
    );
    changed = true;
  }

  // 5. Filter actions behind isAdmin and add unarchive action
  // Wrap edit, archive, delete actions with isAdmin spread
  if (content.includes("const actions: ActionItem[]") && !content.includes('isAdmin ?')) {
    // Get the entity name from the file path
    const pathParts = rel.split('/');
    const entitySlug = pathParts[2]; // e.g. 'workflow', 'user-request'

    // Replace the edit action to be conditional on isAdmin
    content = content.replace(
      /(\s*)\{\s*\n\s*id: 'edit',\s*\n([\s\S]*?)\},/,
      `$1...(isAdmin ? [{\n      id: 'edit',\n$2}] : []),`
    );

    // Replace archive action with conditional archive/unarchive
    content = content.replace(
      /(\s*)\{\s*\n\s*id: 'archive',\s*\n\s*label: 'Archive',\s*\n\s*icon: <ArchiveRestore[^>]*>,\s*\n\s*onPress:[^}]*\},?\s*\n?\s*color: 'warning',\s*\n\s*\},/,
      `$1...(isAdmin ? [item.status === 'archived' ? {\n      id: 'unarchive',\n      label: 'Unarchive',\n      icon: <ArchiveRestore size={24} color={colors.success} />,\n      onPress: () => setConfirmationType('unarchive'),\n      color: 'success',\n    } : {\n      id: 'archive',\n      label: 'Archive',\n      icon: <ArchiveRestore size={24} color={colors.warning} />,\n      onPress: () => setConfirmationType('archive'),\n      color: 'warning',\n    }] : []),`
    );

    // Replace delete action to be conditional on isAdmin
    content = content.replace(
      /(\s*)\{\s*\n\s*id: 'delete',\s*\n\s*label: 'Delete',\s*\n\s*icon: <Trash2[^>]*>,\s*\n\s*onPress:[^}]*\},?\s*\n?\s*color: 'danger',\s*\n\s*\},/,
      `$1...(isAdmin ? [{\n      id: 'delete',\n      label: 'Delete',\n      icon: <Trash2 size={24} color={colors.danger} />,\n      onPress: () => setConfirmationType('delete'),\n      color: 'danger',\n    }] : []),`
    );

    changed = true;
  }

  // 6. Add ConfirmationDialog for unarchive after the archive dialog
  if (content.includes('handleUnarchive') && !content.includes("confirmationType === 'unarchive'")) {
    content = content.replace(
      /(<ConfirmationDialog\s*\n\s*isOpen=\{confirmationType === 'archive'\}[\s\S]*?type="archive"[\s\S]*?\/>)/,
      `$1\n      <ConfirmationDialog\n        isOpen={confirmationType === 'unarchive'}\n        onClose={() => setConfirmationType(null)}\n        onConfirm={handleUnarchive}\n        type="archive"\n        isLoading={isLoading}\n      />`
    );
    changed = true;
  }

  if (changed) {
    writeFileSync(file, content);
    modified++;
    console.log(`  ✓ ${rel}`);
  } else {
    console.log(`  - ${rel} (no changes needed)`);
  }
}

// ═══════════════════════════════════════════════════════════════════════
// EDIT PAGES — app/admin/*/[orgId]/[id]/edit.tsx
// ═══════════════════════════════════════════════════════════════════════

console.log('\n--- Edit Pages ---\n');

const editPages = findFiles(join(ROOT, 'app/admin'), /^edit\.tsx$/)
  .filter(f => f.includes('[orgId]'));

console.log(`Found ${editPages.length} edit pages\n`);

for (const file of editPages) {
  let content = readFileSync(file, 'utf-8');
  const rel = relative(ROOT, file);
  let changed = false;

  // 1. Add import
  if (!content.includes('useOrganisationContext')) {
    const importLines = content.split('\n');
    let lastImportIdx = -1;
    for (let i = 0; i < importLines.length; i++) {
      if (importLines[i].startsWith('import ')) lastImportIdx = i;
    }
    if (lastImportIdx >= 0) {
      importLines.splice(lastImportIdx + 1, 0, "import { useOrganisationContext } from '@/context/organisation-context';");
      content = importLines.join('\n');
      changed = true;
    }
  }

  // 2. Add isAdmin after colors
  if (!content.includes('isAdmin') && content.includes('useThemeColors()')) {
    content = content.replace(
      /const colors = useThemeColors\(\);/,
      'const colors = useThemeColors();\n  const { isAdmin } = useOrganisationContext();'
    );
    changed = true;
  }

  // 3. Wrap the delete button Pressable with {isAdmin && (...)}
  // Find the Delete Pressable block and wrap it
  if (content.includes('isAdmin') && content.includes('handleDelete') && !content.includes('{isAdmin && (')) {
    // The delete button pattern: <Pressable onPress={handleDelete} ... > ... Delete ... </Pressable>
    const deleteButtonRegex = /(\s*)(<Pressable\s*\n\s*onPress=\{handleDelete\}[\s\S]*?<\/Pressable>)/;
    const match = content.match(deleteButtonRegex);
    if (match) {
      const indent = match[1];
      const button = match[2];
      content = content.replace(
        deleteButtonRegex,
        `${indent}{isAdmin && (\n${indent}${button}\n${indent})}`
      );
      changed = true;
    }
  }

  if (changed) {
    writeFileSync(file, content);
    modified++;
    console.log(`  ✓ ${rel}`);
  } else {
    console.log(`  - ${rel} (no changes needed)`);
  }
}

console.log(`\nDone! Modified ${modified} files.`);
