/**
 * Fix deprecated SafeAreaView import from 'react-native' →
 * import from 'react-native-safe-area-context' instead.
 *
 * Handles two patterns:
 * 1. SafeAreaView included in a multi-import from 'react-native' → remove it, add separate import
 * 2. SafeAreaView as sole import from 'react-native' → replace entirely
 */
import { readdirSync, readFileSync, statSync, writeFileSync } from 'fs';
import { join, relative } from 'path';

const ROOT = process.cwd();
let modified = 0;

function findTsx(dir) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      results.push(...findTsx(full));
    } else if (entry.endsWith('.tsx') || entry.endsWith('.ts')) {
      results.push(full);
    }
  }
  return results;
}

const files = [
  ...findTsx(join(ROOT, 'app')),
  ...findTsx(join(ROOT, 'components')),
];

for (const file of files) {
  let content = readFileSync(file, 'utf-8');
  const rel = relative(ROOT, file);

  // Check if file imports SafeAreaView from 'react-native'
  if (!content.includes('SafeAreaView') || !content.match(/import\s+\{[^}]*SafeAreaView[^}]*\}\s+from\s+'react-native'/)) {
    continue;
  }

  let changed = false;

  // Pattern: import { ..., SafeAreaView, ... } from 'react-native';
  const importRegex = /import\s+\{([^}]*)\}\s+from\s+'react-native';/g;
  let match;

  while ((match = importRegex.exec(content)) !== null) {
    const imports = match[1];
    if (!imports.includes('SafeAreaView')) continue;

    // Remove SafeAreaView from the import list
    const importItems = imports.split(',').map(s => s.trim()).filter(Boolean);
    const remaining = importItems.filter(item => item !== 'SafeAreaView');

    if (remaining.length === 0) {
      // SafeAreaView was the only import — remove the entire line
      content = content.replace(match[0], '');
    } else {
      // Replace with remaining imports
      const newImport = `import { ${remaining.join(', ')} } from 'react-native';`;
      content = content.replace(match[0], newImport);
    }
    changed = true;
  }

  if (changed) {
    // Add the correct import if not already present
    if (!content.includes("from 'react-native-safe-area-context'")) {
      // Add after the last import
      const lines = content.split('\n');
      let lastImportIdx = -1;
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith('import ') || lines[i].match(/^import\s/)) lastImportIdx = i;
      }
      if (lastImportIdx >= 0) {
        lines.splice(lastImportIdx + 1, 0, "import { SafeAreaView } from 'react-native-safe-area-context';");
        content = lines.join('\n');
      }
    }

    // Clean up any double blank lines from removed import
    content = content.replace(/\n{3,}/g, '\n\n');

    writeFileSync(file, content);
    modified++;
    console.log(`  ✓ ${rel}`);
  }
}

console.log(`\nDone! Fixed ${modified} files.`);
