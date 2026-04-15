/**
 * Script to fix foreign key references across all detail pages.
 * 
 * 1. Replaces `item.xxx?._id` in LinkedField routes with `resolveId(item.xxx)`
 * 2. Fixes computed values that assume FK is expanded (budget financialYear)
 * 3. Adds `import { resolveId } from '@/utils/resolve-ref'` where needed
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// All detail page files that have LinkedField with routes containing ?._id
const targetFiles = [
  'app/admin/workflow/[orgId]/[id].tsx',
  'app/admin/budget/[orgId]/[id].tsx',
  'app/admin/vote/[orgId]/[id].tsx',
  'app/admin/evidence/[orgId]/[id].tsx',
  'app/admin/quote/[orgId]/[id].tsx',
  'app/admin/asset/[orgId]/[id].tsx',
  'app/admin/booking/[orgId]/[id].tsx',
  'app/admin/invoice/[orgId]/[id].tsx',
  'app/admin/workorder/[orgId]/[id].tsx',
  'app/admin/task/[orgId]/[id].tsx',
  'app/admin/announcement/[orgId]/[id].tsx',
  'app/admin/meeting/[orgId]/[id].tsx',
  'app/admin/event/[orgId]/[id].tsx',
];

let totalReplacements = 0;
let filesModified = 0;

for (const relPath of targetFiles) {
  const filePath = path.join(ROOT, relPath);
  if (!fs.existsSync(filePath)) {
    console.log(`SKIP (not found): ${relPath}`);
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf-8');
  const original = content;

  // 1. Replace route patterns: ${item.xxx?._id} → ${resolveId(item.xxx)}
  //    Matches: ${item.fieldName?._id}
  const routeRegex = /\$\{item\.(\w+)\?\._id\}/g;
  const routeMatches = content.match(routeRegex);
  if (routeMatches) {
    content = content.replace(routeRegex, (match, field) => {
      return `\${resolveId(item.${field})}`;
    });
    totalReplacements += routeMatches.length;
  }

  // 2. Special fix for budget financialYear value computation
  //    item.financialYear ? fmt(item.financialYear.from) + ... → isPopulated(item.financialYear) ? ...
  if (relPath.includes('budget')) {
    content = content.replace(
      /item\.financialYear \? fmt\(item\.financialYear\.from\)/,
      'isPopulated(item.financialYear) ? fmt(item.financialYear.from)'
    );
  }

  // 3. Add import if file was modified and doesn't already have it
  if (content !== original) {
    if (!content.includes("from '@/utils/resolve-ref'")) {
      // Determine what to import
      const needsIsPopulated = relPath.includes('budget');
      const importStatement = needsIsPopulated
        ? "import { resolveId, isPopulated } from '@/utils/resolve-ref';"
        : "import { resolveId } from '@/utils/resolve-ref';";

      // Insert after the last import line
      const lines = content.split('\n');
      let lastImportIndex = -1;
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith('import ') || lines[i].startsWith("import {")) {
          lastImportIndex = i;
        }
      }
      if (lastImportIndex >= 0) {
        lines.splice(lastImportIndex + 1, 0, importStatement);
        content = lines.join('\n');
      }
    }

    fs.writeFileSync(filePath, content, 'utf-8');
    filesModified++;
    console.log(`UPDATED: ${relPath} (${routeMatches?.length || 0} route fixes)`);
  } else {
    console.log(`NO CHANGES: ${relPath}`);
  }
}

console.log(`\nDone: ${filesModified} files modified, ${totalReplacements} route references fixed.`);
