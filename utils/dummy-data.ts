// Dummy data generators for consistent test data across all modules

export interface DummyItem {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'archived' | 'pending';
  createdAt: string;
  updatedAt: string;
  [key: string]: any;
}

const statuses: Array<'active' | 'inactive' | 'archived' | 'pending'> = [
  'active',
  'inactive',
  'pending',
];
const adjectives = ['Efficient', 'Smart', 'Quick', 'Professional', 'Advanced', 'Dynamic'];
const nouns = [
  'Workflow',
  'Task',
  'Category',
  'Item',
  'Process',
  'System',
  'Service',
  'Module',
];

export function generateDummyId(): string {
  return `item_${Math.random().toString(36).substr(2, 9)}`;
}

export function generateDummyName(): string {
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${adj} ${noun}`;
}

export function generateDummyDescription(): string {
  const descriptions = [
    'This is a sample item with standardized workflow.',
    'Automated process for handling requests.',
    'Manages multiple stages and stakeholders.',
    'Includes validation and approval steps.',
    'Real-time tracking and notifications.',
  ];
  return descriptions[Math.floor(Math.random() * descriptions.length)];
}

export function generateDummyDate(daysAgo: number = 0): string {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString();
}

export function generateDummyItem(
  overrides?: Partial<DummyItem>
): DummyItem {
  const now = new Date().toISOString();
  return {
    id: generateDummyId(),
    name: generateDummyName(),
    description: generateDummyDescription(),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    createdAt: generateDummyDate(Math.floor(Math.random() * 30)),
    updatedAt: now,
    ...overrides,
  };
}

export function generateDummyList(count: number, overrides?: Partial<DummyItem>): DummyItem[] {
  return Array.from({ length: count }, (_, i) => 
    generateDummyItem({ ...overrides, id: `item_${i + 1}` })
  );
}

// Module-specific generators
export function generateWorkflows(count: number = 10): DummyItem[] {
  return generateDummyList(count, { name: 'Workflow' });
}

export function generateTasks(count: number = 15): DummyItem[] {
  return generateDummyList(count, { name: 'Task' });
}

export function generateCategories(count: number = 8): DummyItem[] {
  return generateDummyList(count, { name: 'Category' });
}

export function generateVendors(count: number = 12): DummyItem[] {
  return generateDummyList(count, { name: 'Vendor' });
}

export function generateUsers(count: number = 20): DummyItem[] {
  return generateDummyList(count).map((item, i) => ({
    ...item,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: ['admin', 'member', 'viewer'][Math.floor(Math.random() * 3)],
  }));
}

export function generateDummyItemWithDetails(id: string): DummyItem & Record<string, any> {
  const base = generateDummyItem({ id });
  return {
    ...base,
    detailedDescription: 'This is a comprehensive description for the item. It includes all relevant information.',
    metadata: {
      version: '1.0',
      priority: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)],
      owner: 'John Doe',
      assignees: ['Jane Smith', 'Bob Johnson'],
      tags: ['important', 'urgent', 'review'],
    },
    attachments: [
      { name: 'document.pdf', size: '2.4 MB', type: 'pdf' },
      { name: 'image.png', size: '1.2 MB', type: 'image' },
    ],
    comments: [
      { author: 'John Doe', text: 'This looks good, let\'s proceed.', date: new Date().toISOString() },
      { author: 'Jane Smith', text: 'Agreed, moving forward.', date: new Date().toISOString() },
    ],
    history: [
      { action: 'created', by: 'John Doe', date: base.createdAt },
      { action: 'updated', by: 'Jane Smith', date: generateDummyDate(5) },
    ],
  };
}
