/**
 * Generate all service files + type files for the React Native app
 * based on Angular service patterns.
 */
import { mkdirSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';

const ROOT = process.cwd();
let created = 0;

function write(relPath, content) {
  const full = join(ROOT, relPath);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, content);
  created++;
  console.log(`  + ${relPath}`);
}

// ═══════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════

const types = {
  'types/workflow.ts': `export interface Workflow {
  id: string;
  orgId: string;
  name: string;
  description?: string;
  status: string;
  priority?: string;
  userId?: string;
  groupId?: string;
  categoryId?: string;
  archived?: boolean;
  flagged?: boolean;
  flagReason?: string;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}
`,
  'types/quote.ts': `export interface Quote {
  id: string;
  orgId: string;
  name: string;
  description?: string;
  status: string;
  vendorId?: string;
  workflowId?: string;
  amount?: number;
  currency?: string;
  archived?: boolean;
  flagged?: boolean;
  flagReason?: string;
  validUntil?: string;
  createdAt: string;
  updatedAt: string;
}
`,
  'types/invoice.ts': `export interface Invoice {
  id: string;
  orgId: string;
  name: string;
  description?: string;
  status: string;
  vendorId?: string;
  workflowId?: string;
  quoteId?: string;
  workorderId?: string;
  amount?: number;
  currency?: string;
  archived?: boolean;
  flagged?: boolean;
  flagReason?: string;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}
`,
  'types/workorder.ts': `export interface Workorder {
  id: string;
  orgId: string;
  name: string;
  description?: string;
  status: string;
  vendorId?: string;
  workflowId?: string;
  quoteId?: string;
  amount?: number;
  currency?: string;
  archived?: boolean;
  flagged?: boolean;
  flagReason?: string;
  createdAt: string;
  updatedAt: string;
}
`,
  'types/evidence.ts': `export interface Evidence {
  id: string;
  orgId: string;
  name: string;
  description?: string;
  status: string;
  vendorId?: string;
  workflowId?: string;
  archived?: boolean;
  flagged?: boolean;
  flagReason?: string;
  createdAt: string;
  updatedAt: string;
}
`,
  'types/vendor.ts': `export interface Vendor {
  id: string;
  orgId: string;
  name: string;
  description?: string;
  email?: string;
  phone?: string;
  address?: string;
  archived?: boolean;
  createdAt: string;
  updatedAt: string;
}
`,
  'types/user.ts': `export interface User {
  id: string;
  orgId?: string;
  name: string;
  email: string;
  role?: string;
  status?: string;
  profileImage?: string;
  archived?: boolean;
  createdAt: string;
  updatedAt: string;
}
`,
  'types/group.ts': `export interface Group {
  id: string;
  orgId: string;
  name: string;
  description?: string;
  archived?: boolean;
  memberCount?: number;
  createdAt: string;
  updatedAt: string;
}
`,
  'types/announcement.ts': `export interface Announcement {
  id: string;
  orgId: string;
  title: string;
  content: string;
  groupId?: string;
  createdAt: string;
  updatedAt: string;
}
`,
  'types/meeting.ts': `export interface Meeting {
  id: string;
  orgId: string;
  name: string;
  description?: string;
  groupId?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  archived?: boolean;
  createdAt: string;
  updatedAt: string;
}
`,
  'types/vote.ts': `export interface Vote {
  id: string;
  orgId: string;
  name: string;
  description?: string;
  groupId?: string;
  workflowId?: string;
  options?: VoteOption[];
  archived?: boolean;
  completed?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface VoteOption {
  id: string;
  label: string;
  count?: number;
}

export interface VoteCast {
  id: string;
  voteId: string;
  userId: string;
  optionId: string;
  createdAt: string;
}
`,
  'types/information.ts': `export interface Information {
  id: string;
  orgId: string;
  name: string;
  description?: string;
  content?: string;
  createdAt: string;
  updatedAt: string;
}
`,
  'types/booking.ts': `export interface Booking {
  id: string;
  orgId: string;
  name: string;
  description?: string;
  bookingTypeId?: string;
  status: string;
  startDate?: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
}
`,
  'types/booking-type.ts': `export interface BookingType {
  id: string;
  orgId: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}
`,
  'types/event.ts': `export interface Event {
  id: string;
  orgId: string;
  name: string;
  description?: string;
  eventTypeId?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
}
`,
  'types/event-type.ts': `export interface EventType {
  id: string;
  orgId: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}
`,
  'types/asset.ts': `export interface Asset {
  id: string;
  orgId: string;
  name: string;
  description?: string;
  assetTypeId?: string;
  status?: string;
  archived?: boolean;
  flagged?: boolean;
  flagReason?: string;
  createdAt: string;
  updatedAt: string;
}
`,
  'types/asset-type.ts': `export interface AssetType {
  id: string;
  orgId: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}
`,
  'types/document.ts': `export interface Document {
  id: string;
  orgId: string;
  name: string;
  description?: string;
  folderId?: string;
  archived?: boolean;
  flagged?: boolean;
  flagReason?: string;
  createdAt: string;
  updatedAt: string;
}
`,
  'types/budget.ts': `export interface Budget {
  id: string;
  orgId: string;
  name: string;
  description?: string;
  financialYearId?: string;
  amount?: number;
  approved?: boolean;
  createdAt: string;
  updatedAt: string;
}
`,
  'types/chart-of-account.ts': `export interface ChartOfAccount {
  id: string;
  orgId: string;
  name: string;
  code?: string;
  type?: string;
  parentId?: string;
  financialYearId?: string;
  createdAt: string;
  updatedAt: string;
}
`,
  'types/financial-year.ts': `export interface FinancialYear {
  id: string;
  orgId: string;
  name: string;
  startDate: string;
  endDate: string;
  isCurrent?: boolean;
  createdAt: string;
  updatedAt: string;
}
`,
  'types/transaction.ts': `export interface Transaction {
  id: string;
  orgId: string;
  name: string;
  description?: string;
  amount?: number;
  financialYearId?: string;
  archived?: boolean;
  createdAt: string;
  updatedAt: string;
}
`,
  'types/transaction-entry.ts': `export interface TransactionEntry {
  id: string;
  transactionId: string;
  chartOfAccountId?: string;
  debit?: number;
  credit?: number;
  createdAt: string;
  updatedAt: string;
}
`,
  'types/category.ts': `export interface Category {
  id: string;
  orgId: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}
`,
  'types/user-request.ts': `export interface UserRequest {
  id: string;
  orgId: string;
  name: string;
  description?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
`,
  'types/reminder.ts': `export interface Reminder {
  id: string;
  orgId: string;
  name: string;
  description?: string;
  date?: string;
  enabled?: boolean;
  createdAt: string;
  updatedAt: string;
}
`,
  'types/folder.ts': `export interface Folder {
  id: string;
  orgId: string;
  name: string;
  parentId?: string;
  createdAt: string;
  updatedAt: string;
}
`,
  'types/wall.ts': `export interface WallPost {
  id: string;
  orgId: string;
  content: string;
  userId?: string;
  likes?: string[];
  createdAt: string;
  updatedAt: string;
}
`,
  'types/comment.ts': `export interface Comment {
  id: string;
  orgId: string;
  content: string;
  userId?: string;
  entityType?: string;
  entityId?: string;
  createdAt: string;
  updatedAt: string;
}
`,
  'types/attachment.ts': `export interface Attachment {
  id: string;
  orgId: string;
  name: string;
  url: string;
  entityType?: string;
  entityId?: string;
  size?: number;
  mimeType?: string;
  createdAt: string;
  updatedAt: string;
}
`,
  'types/image.ts': `export interface AppImage {
  id: string;
  orgId?: string;
  url: string;
  entityType?: string;
  entityId?: string;
  createdAt: string;
}
`,
  'types/notification.ts': `export interface Notification {
  id: string;
  orgId: string;
  title: string;
  message: string;
  read?: boolean;
  createdAt: string;
}
`,
  'types/conversation.ts': `export interface Conversation {
  id: string;
  orgId?: string;
  groupId?: string;
  participants?: string[];
  createdAt: string;
  updatedAt: string;
}
`,
  'types/message.ts': `export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  read?: boolean;
  reactions?: Record<string, string[]>;
  createdAt: string;
  updatedAt: string;
}
`,
  'types/dashboard.ts': `export interface DashboardData {
  id?: string;
  orgId: string;
  stats: Record<string, number>;
  recentActivity?: any[];
}
`,
  'types/analytics.ts': `export interface AnalyticsData {
  id?: string;
  orgId: string;
  data: Record<string, any>;
  period?: string;
}
`,
  'types/search.ts': `export interface SearchResult {
  id: string;
  type: string;
  name: string;
  description?: string;
  score?: number;
}
`,
  'types/timeline.ts': `export interface TimelineEntry {
  id: string;
  entityType: string;
  entityId: string;
  action: string;
  userId?: string;
  details?: string;
  createdAt: string;
}
`,
  'types/history.ts': `export interface HistoryEntry {
  id: string;
  entityType: string;
  entityId: string;
  action: string;
  previousValue?: any;
  newValue?: any;
  userId?: string;
  createdAt: string;
}
`,
  'types/status.ts': `export interface StatusConfig {
  id: string;
  name: string;
  color?: string;
  order?: number;
}
`,
  'types/ai.ts': `export interface AITokenDetails {
  id?: string;
  orgId: string;
  tokensUsed: number;
  tokensRemaining: number;
  period: string;
}

export interface AIContent {
  id?: string;
  content: string;
  entityType: string;
  entityId: string;
}
`,
  'types/email.ts': `export interface EmailPayload {
  to?: string;
  subject?: string;
  body?: string;
  entityType?: string;
  entityId?: string;
}
`,
  'types/content.ts': `export interface Content {
  id: string;
  title: string;
  body: string;
  type: 'blog' | 'news';
  createdAt: string;
  updatedAt: string;
}
`,
  'types/token.ts': `export interface ApiToken {
  id: string;
  name?: string;
  token: string;
  createdAt: string;
}
`,
  'types/vendor-comment.ts': `export interface VendorComment {
  id: string;
  orgId: string;
  content: string;
  vendorId?: string;
  entityType?: string;
  entityId?: string;
  createdAt: string;
  updatedAt: string;
}
`,
  'types/vendor-submit.ts': `export interface VendorSubmission {
  id: string;
  vendorId: string;
  entityType: string;
  entityId: string;
  status?: string;
  data?: any;
  createdAt: string;
  updatedAt: string;
}
`,
  'types/alert.ts': `export interface Alert {
  id: string;
  type: string;
  message: string;
  severity?: string;
  createdAt: string;
}
`,
  'types/chart.ts': `export interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

export interface ChartDataset {
  label: string;
  data: number[];
  color?: string;
}
`,
  'types/pdf.ts': `// PDF service returns Blob data, no specific type needed
export type PdfBlob = Blob;
`,
};

// ═══════════════════════════════════════════════════════════════════════
// SERVICES — helper to generate standard CRUD+ services
// ═══════════════════════════════════════════════════════════════════════

/**
 * Build a service file string.
 * @param {string} entityName - PascalCase name (e.g. 'Workflow')
 * @param {string} typeName - Type import name (e.g. 'Workflow')
 * @param {string} typeImportPath - where to import from (e.g. '@/types')
 * @param {string} basePath - API base path (e.g. '/workflow')
 * @param {string} keyPrefix - query key prefix (e.g. 'workflows')
 * @param {object} config - { queries: [...], mutations: [...] }
 */
function buildService({ entityName, typeName, typeImport = '@/types', basePath, keyPrefix, keys, apiFns, queryHooks, mutationHooks, extraImports = '' }) {
  return `import type { ${typeName} } from '${typeImport}';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api-client';${extraImports}

// ---------------------------------------------------------------------------
// Query keys
// ---------------------------------------------------------------------------
export const ${keyPrefix}Keys = {
${keys}
};

// ---------------------------------------------------------------------------
// API functions
// ---------------------------------------------------------------------------
const ${keyPrefix}Api = {
${apiFns}
};

// ---------------------------------------------------------------------------
// Query hooks
// ---------------------------------------------------------------------------
${queryHooks}

// ---------------------------------------------------------------------------
// Mutation hooks
// ---------------------------------------------------------------------------
${mutationHooks}
`;
}

// ═══════════════════════════════════════════════════════════════════════
// SERVICE DEFINITIONS
// ═══════════════════════════════════════════════════════════════════════

const services = {};

// ── Workflow ──────────────────────────────────────────────────────────
services['services/workflow.ts'] = buildService({
  entityName: 'Workflow', typeName: 'Workflow', basePath: '/workflow', keyPrefix: 'workflow',
  keys: `  all: (orgId: string) => ['workflows', orgId] as const,
  forUser: (orgId: string, userId: string) => ['workflows', orgId, 'user', userId] as const,
  forGroup: (orgId: string, groupId: string) => ['workflows', orgId, 'group', groupId] as const,
  archived: (orgId: string) => ['workflows', orgId, 'archived'] as const,
  active: (orgId: string) => ['workflows', orgId, 'active'] as const,
  forCategory: (categoryId: string) => ['workflows', 'category', categoryId] as const,
  detail: (id: string) => ['workflows', 'detail', id] as const,
  subWorkflows: (id: string) => ['workflows', 'sub', id] as const,`,
  apiFns: `  getAll: (orgId: string) => api.get<Workflow[]>(\`/workflow/org/\${orgId}\`),
  getAllForUser: (orgId: string, userId: string) => api.get<Workflow[]>(\`/workflow/org/\${orgId}/user/\${userId}\`),
  getAllForGroup: (orgId: string, groupId: string) => api.get<Workflow[]>(\`/workflow/org/\${orgId}/group/\${groupId}\`),
  getAllArchived: (orgId: string) => api.get<Workflow[]>(\`/workflow/org/archived/\${orgId}\`),
  getAllActive: (orgId: string) => api.get<Workflow[]>(\`/workflow/org/active/\${orgId}\`),
  getAllForCategory: (categoryId: string) => api.get<Workflow[]>(\`/workflow/category/\${categoryId}\`),
  get: (id: string) => api.get<Workflow>(\`/workflow/\${id}\`),
  getAllForWorkflow: (id: string) => api.get<Workflow[]>(\`/workflow/all/\${id}\`),
  create: (orgId: string, data: Partial<Workflow>) => api.post<Workflow>(\`/workflow/\${orgId}\`, data),
  update: (id: string, data: Partial<Workflow>) => api.put<Workflow>(\`/workflow/\${id}\`, data),
  delete: (id: string) => api.delete<boolean>(\`/workflow/\${id}\`),
  updateStatus: (id: string, data: { status: string }) => api.patch<Workflow>(\`/workflow/status/\${id}\`, data),
  updateUser: (id: string, data: { userId: string }) => api.patch<Workflow>(\`/workflow/user/\${id}\`, data),
  updateGroup: (id: string, data: { groupId: string }) => api.patch<Workflow>(\`/workflow/group/\${id}\`, data),
  updatePriority: (id: string, data: { priority: string }) => api.patch<Workflow>(\`/workflow/priority/\${id}\`, data),
  archive: (id: string) => api.patch<Workflow>(\`/workflow/archive/\${id}\`, {}),
  unarchive: (id: string) => api.patch<Workflow>(\`/workflow/unarchive/\${id}\`, {}),
  flag: (id: string, data: { reason: string }) => api.patch<Workflow>(\`/workflow/flag/\${id}\`, data),
  unflag: (id: string) => api.patch<Workflow>(\`/workflow/unflag/\${id}\`, {}),`,
  queryHooks: `export function useWorkflows(orgId: string) {
  return useQuery({ queryKey: workflowKeys.all(orgId), queryFn: () => workflowApi.getAll(orgId), enabled: !!orgId });
}

export function useWorkflowsForUser(orgId: string, userId: string) {
  return useQuery({ queryKey: workflowKeys.forUser(orgId, userId), queryFn: () => workflowApi.getAllForUser(orgId, userId), enabled: !!orgId && !!userId });
}

export function useArchivedWorkflows(orgId: string) {
  return useQuery({ queryKey: workflowKeys.archived(orgId), queryFn: () => workflowApi.getAllArchived(orgId), enabled: !!orgId });
}

export function useWorkflow(id: string) {
  return useQuery({ queryKey: workflowKeys.detail(id), queryFn: () => workflowApi.get(id), enabled: !!id });
}`,
  mutationHooks: `export function useCreateWorkflow(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (data: Partial<Workflow>) => workflowApi.create(orgId, data), onSuccess: () => qc.invalidateQueries({ queryKey: workflowKeys.all(orgId) }) });
}

export function useUpdateWorkflow(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Workflow> }) => workflowApi.update(id, data), onSuccess: (_, { id }) => { qc.invalidateQueries({ queryKey: workflowKeys.all(orgId) }); qc.invalidateQueries({ queryKey: workflowKeys.detail(id) }); } });
}

export function useDeleteWorkflow(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => workflowApi.delete(id), onSuccess: () => qc.invalidateQueries({ queryKey: workflowKeys.all(orgId) }) });
}

export function useArchiveWorkflow(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => workflowApi.archive(id), onSuccess: () => { qc.invalidateQueries({ queryKey: workflowKeys.all(orgId) }); qc.invalidateQueries({ queryKey: workflowKeys.archived(orgId) }); } });
}

export function useUnarchiveWorkflow(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => workflowApi.unarchive(id), onSuccess: () => { qc.invalidateQueries({ queryKey: workflowKeys.all(orgId) }); qc.invalidateQueries({ queryKey: workflowKeys.archived(orgId) }); } });
}`,
});

// I'll use a simpler pattern for most services to keep it digestible

function simpleCrudService({ name, typeName, basePath, keyPrefix, extraKeys = '', extraApi = '', extraQueries = '', extraMutations = '', hasArchive = false, hasFlag = false, hasStatus = false, typeImport = '@/types', extraImports = '' }) {
  const archiveKeys = hasArchive ? `\n  archived: (orgId: string) => ['${keyPrefix}', orgId, 'archived'] as const,` : '';
  const archiveApi = hasArchive ? `
  getAllArchived: (orgId: string) => api.get<${typeName}[]>(\`${basePath}/org/archived/\${orgId}\`),
  archive: (id: string) => api.patch<${typeName}>(\`${basePath}/archive/\${id}\`, {}),
  unarchive: (id: string) => api.patch<${typeName}>(\`${basePath}/unarchive/\${id}\`, {}),` : '';
  const flagApi = hasFlag ? `
  flag: (id: string, data: { reason: string }) => api.patch<${typeName}>(\`${basePath}/flag/\${id}\`, data),
  unflag: (id: string) => api.patch<${typeName}>(\`${basePath}/unflag/\${id}\`, {}),` : '';
  const statusApi = hasStatus ? `
  updateStatus: (id: string, data: { status: string }) => api.patch<${typeName}>(\`${basePath}/status/\${id}\`, data),` : '';
  const archiveMutations = hasArchive ? `
export function useArchive${name}(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => ${keyPrefix}Api.archive(id), onSuccess: () => { qc.invalidateQueries({ queryKey: ${keyPrefix}Keys.all(orgId) }); } });
}

export function useUnarchive${name}(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => ${keyPrefix}Api.unarchive(id), onSuccess: () => { qc.invalidateQueries({ queryKey: ${keyPrefix}Keys.all(orgId) }); } });
}` : '';

  return `import type { ${typeName} } from '${typeImport}';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api-client';${extraImports}

// ---------------------------------------------------------------------------
// Query keys
// ---------------------------------------------------------------------------
export const ${keyPrefix}Keys = {
  all: (orgId: string) => ['${keyPrefix}', orgId] as const,
  detail: (id: string) => ['${keyPrefix}', 'detail', id] as const,${archiveKeys}${extraKeys}
};

// ---------------------------------------------------------------------------
// API functions
// ---------------------------------------------------------------------------
const ${keyPrefix}Api = {
  getAll: (orgId: string) => api.get<${typeName}[]>(\`${basePath}/org/\${orgId}\`),
  get: (id: string) => api.get<${typeName}>(\`${basePath}/\${id}\`),
  create: (orgId: string, data: Partial<${typeName}>) => api.post<${typeName}>(\`${basePath}/\${orgId}\`, data),
  update: (id: string, data: Partial<${typeName}>) => api.put<${typeName}>(\`${basePath}/\${id}\`, data),
  delete: (id: string) => api.delete<boolean>(\`${basePath}/\${id}\`),${archiveApi}${flagApi}${statusApi}${extraApi}
};

// ---------------------------------------------------------------------------
// Query hooks
// ---------------------------------------------------------------------------
export function use${name}s(orgId: string) {
  return useQuery({ queryKey: ${keyPrefix}Keys.all(orgId), queryFn: () => ${keyPrefix}Api.getAll(orgId), enabled: !!orgId });
}

export function use${name}(id: string) {
  return useQuery({ queryKey: ${keyPrefix}Keys.detail(id), queryFn: () => ${keyPrefix}Api.get(id), enabled: !!id });
}${extraQueries}

// ---------------------------------------------------------------------------
// Mutation hooks
// ---------------------------------------------------------------------------
export function useCreate${name}(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (data: Partial<${typeName}>) => ${keyPrefix}Api.create(orgId, data), onSuccess: () => qc.invalidateQueries({ queryKey: ${keyPrefix}Keys.all(orgId) }) });
}

export function useUpdate${name}(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<${typeName}> }) => ${keyPrefix}Api.update(id, data), onSuccess: (_, { id }) => { qc.invalidateQueries({ queryKey: ${keyPrefix}Keys.all(orgId) }); qc.invalidateQueries({ queryKey: ${keyPrefix}Keys.detail(id) }); } });
}

export function useDelete${name}(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => ${keyPrefix}Api.delete(id), onSuccess: () => qc.invalidateQueries({ queryKey: ${keyPrefix}Keys.all(orgId) }) });
}${archiveMutations}${extraMutations}
`;
}

// ── Quote ─────────────────────────────────────────────────────────────
services['services/quote.ts'] = simpleCrudService({
  name: 'Quote', typeName: 'Quote', basePath: '/quote', keyPrefix: 'quote',
  hasArchive: true, hasFlag: true, hasStatus: true,
  extraKeys: `
  forWorkflow: (wId: string) => ['quote', 'workflow', wId] as const,
  forVendor: (vId: string) => ['quote', 'vendor', vId] as const,`,
  extraApi: `
  getAllForWorkflow: (wId: string) => api.get<Quote[]>(\`/quote/workflow/\${wId}\`),
  getAllForVendor: (vId: string) => api.get<Quote[]>(\`/quote/vendor/\${vId}\`),
  extend: (id: string) => api.patch<Quote>(\`/quote/extend/\${id}\`, {}),
  remind: (id: string) => api.patch<Quote>(\`/quote/remind/\${id}\`, {}),
  submit: (id: string) => api.patch<Quote>(\`/quote/submit/\${id}\`, {}),`,
});

// ── Invoice ───────────────────────────────────────────────────────────
services['services/invoice.ts'] = simpleCrudService({
  name: 'Invoice', typeName: 'Invoice', basePath: '/invoice', keyPrefix: 'invoice',
  hasArchive: true, hasFlag: true, hasStatus: true,
  extraKeys: `
  forWorkflow: (wId: string) => ['invoice', 'workflow', wId] as const,
  forVendor: (vId: string) => ['invoice', 'vendor', vId] as const,
  forQuote: (qId: string) => ['invoice', 'quote', qId] as const,
  forWorkorder: (woId: string) => ['invoice', 'workorder', woId] as const,`,
  extraApi: `
  getAllForWorkflow: (wId: string) => api.get<Invoice[]>(\`/invoice/workflow/\${wId}\`),
  getAllForVendor: (vId: string) => api.get<Invoice[]>(\`/invoice/vendor/\${vId}\`),
  getAllForQuote: (qId: string) => api.get<Invoice[]>(\`/invoice/quote/\${qId}\`),
  getAllForWorkorder: (woId: string) => api.get<Invoice[]>(\`/invoice/workorder/\${woId}\`),
  createForQuote: (qId: string, data: Partial<Invoice>) => api.post<Invoice>(\`/invoice/quote/\${qId}\`, data),
  createForWorkorder: (woId: string, data: Partial<Invoice>) => api.post<Invoice>(\`/invoice/workorder/\${woId}\`, data),
  submit: (id: string) => api.patch<Invoice>(\`/invoice/submit/\${id}\`, {}),
  remind: (id: string) => api.patch<Invoice>(\`/invoice/remind/\${id}\`, {}),`,
});

// ── Workorder ─────────────────────────────────────────────────────────
services['services/workorder.ts'] = simpleCrudService({
  name: 'Workorder', typeName: 'Workorder', basePath: '/workorder', keyPrefix: 'workorder',
  hasArchive: true, hasFlag: true, hasStatus: true,
  extraKeys: `
  forWorkflow: (wId: string) => ['workorder', 'workflow', wId] as const,
  forVendor: (vId: string) => ['workorder', 'vendor', vId] as const,
  forQuote: (qId: string) => ['workorder', 'quote', qId] as const,`,
  extraApi: `
  getAllForWorkflow: (wId: string) => api.get<Workorder[]>(\`/workorder/workflow/\${wId}\`),
  getAllForVendor: (vId: string) => api.get<Workorder[]>(\`/workorder/vendor/\${vId}\`),
  getAllForQuote: (qId: string) => api.get<Workorder[]>(\`/workorder/quote/\${qId}\`),
  createForQuote: (qId: string, data: Partial<Workorder>) => api.post<Workorder>(\`/workorder/quote/\${qId}\`, data),
  submit: (id: string) => api.patch<Workorder>(\`/workorder/submit/\${id}\`, {}),
  remind: (id: string) => api.patch<Workorder>(\`/workorder/remind/\${id}\`, {}),`,
});

// ── Evidence ──────────────────────────────────────────────────────────
services['services/evidence.ts'] = simpleCrudService({
  name: 'Evidence', typeName: 'Evidence', basePath: '/evidence', keyPrefix: 'evidence',
  hasArchive: true, hasFlag: true, hasStatus: true,
  extraKeys: `
  forWorkflow: (wId: string) => ['evidence', 'workflow', wId] as const,
  forVendor: (vId: string) => ['evidence', 'vendor', vId] as const,`,
  extraApi: `
  getAllForWorkflow: (wId: string) => api.get<Evidence[]>(\`/evidence/workflow/\${wId}\`),
  getAllForVendor: (vId: string) => api.get<Evidence[]>(\`/evidence/vendor/\${vId}\`),
  requestFromVendor: (id: string) => api.patch<Evidence>(\`/evidence/request/\${id}\`, {}),
  createForQuote: (qId: string, data: Partial<Evidence>) => api.post<Evidence>(\`/evidence/quote/\${qId}\`, data),
  createForWorkorder: (woId: string, data: Partial<Evidence>) => api.post<Evidence>(\`/evidence/workorder/\${woId}\`, data),
  submit: (id: string) => api.patch<Evidence>(\`/evidence/submit/\${id}\`, {}),`,
});

// ── Vendor ────────────────────────────────────────────────────────────
services['services/vendor.ts'] = simpleCrudService({
  name: 'Vendor', typeName: 'Vendor', basePath: '/vendor', keyPrefix: 'vendor',
  hasArchive: true,
});

// ── User ──────────────────────────────────────────────────────────────
services['services/user.ts'] = `import type { User } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api-client';

export const userKeys = {
  all: (orgId: string) => ['users', orgId] as const,
  admins: (orgId: string) => ['users', orgId, 'admins'] as const,
  detail: (id: string) => ['users', 'detail', id] as const,
  current: ['users', 'current'] as const,
  assignable: (orgId: string) => ['users', orgId, 'assignable'] as const,
};

const userApi = {
  getAll: (orgId: string) => api.get<User[]>(\`/user/org/\${orgId}\`),
  getAllAdmins: (orgId: string) => api.get<User[]>(\`/user/admins/\${orgId}\`),
  get: (id: string) => api.get<User>(\`/user/\${id}\`),
  getCurrentUser: () => api.get<User>('/user/user/current'),
  getUserRole: (orgId: string) => api.get<{ role: string }>(\`/user/role/\${orgId}\`),
  getAllAssignable: (orgId: string) => api.get<User[]>(\`/user/assign/\${orgId}\`),
  create: (orgId: string, data: Partial<User>) => api.post<User>(\`/user/\${orgId}\`, data),
  onboard: (orgCode: string, data: Partial<User>) => api.post<User>(\`/user/onboard/\${orgCode}\`, data),
  delete: (id: string) => api.delete<boolean>(\`/user/\${id}\`),
  archive: (id: string) => api.patch<User>(\`/user/archive/\${id}\`, {}),
  unarchive: (id: string) => api.patch<User>(\`/user/unarchive/\${id}\`, {}),
  updateStatus: (id: string, data: { status: string }) => api.patch<User>(\`/user/status/\${id}\`, data),
  updateProfile: (id: string, data: Partial<User>) => api.patch<User>(\`/user/profile/\${id}\`, data),
  updateRoleProfile: (id: string, data: any) => api.patch<User>(\`/user/role-profile/\${id}\`, data),
};

export function useUsers(orgId: string) {
  return useQuery({ queryKey: userKeys.all(orgId), queryFn: () => userApi.getAll(orgId), enabled: !!orgId });
}

export function useUser(id: string) {
  return useQuery({ queryKey: userKeys.detail(id), queryFn: () => userApi.get(id), enabled: !!id });
}

export function useCurrentUser() {
  return useQuery({ queryKey: userKeys.current, queryFn: () => userApi.getCurrentUser() });
}

export function useCreateUser(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (data: Partial<User>) => userApi.create(orgId, data), onSuccess: () => qc.invalidateQueries({ queryKey: userKeys.all(orgId) }) });
}

export function useDeleteUser(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => userApi.delete(id), onSuccess: () => qc.invalidateQueries({ queryKey: userKeys.all(orgId) }) });
}

export function useUpdateUserProfile(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<User> }) => userApi.updateProfile(id, data), onSuccess: (_, { id }) => { qc.invalidateQueries({ queryKey: userKeys.all(orgId) }); qc.invalidateQueries({ queryKey: userKeys.detail(id) }); } });
}
`;

// ── Group ─────────────────────────────────────────────────────────────
services['services/group.ts'] = `import type { Group } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api-client';

export const groupKeys = {
  all: (orgId: string) => ['groups', orgId] as const,
  detail: (id: string) => ['groups', 'detail', id] as const,
  users: (orgId: string) => ['groups', orgId, 'users'] as const,
  userGroups: (id: string) => ['groups', 'user-groups', id] as const,
};

const groupApi = {
  getAll: (orgId: string) => api.get<Group[]>(\`/group/org/\${orgId}\`),
  getAllUsers: (orgId: string) => api.get<any[]>(\`/group/users/\${orgId}\`),
  getAllUserGroup: (id: string) => api.get<Group[]>(\`/group/user-groups/\${id}\`),
  getCurrentUserGroup: (id: string) => api.get<Group>(\`/group/current-user/\${id}\`),
  getAllUnAssignedUsers: (orgId: string) => api.get<any[]>(\`/group/unassigned-users/\${orgId}\`),
  get: (id: string) => api.get<Group>(\`/group/\${id}\`),
  create: (orgId: string, data: Partial<Group>) => api.post<Group>(\`/group/\${orgId}\`, data),
  addUsers: (orgId: string, data: any) => api.put<Group>(\`/group/add/\${orgId}\`, data),
  removeUsers: (orgId: string, data: any) => api.put<Group>(\`/group/remove/\${orgId}\`, data),
  archive: (id: string) => api.patch<Group>(\`/group/archive/\${id}\`, {}),
  unarchive: (id: string) => api.patch<Group>(\`/group/unarchive/\${id}\`, {}),
  delete: (id: string) => api.delete<boolean>(\`/group/\${id}\`),
};

export function useGroups(orgId: string) {
  return useQuery({ queryKey: groupKeys.all(orgId), queryFn: () => groupApi.getAll(orgId), enabled: !!orgId });
}

export function useGroup(id: string) {
  return useQuery({ queryKey: groupKeys.detail(id), queryFn: () => groupApi.get(id), enabled: !!id });
}

export function useCreateGroup(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (data: Partial<Group>) => groupApi.create(orgId, data), onSuccess: () => qc.invalidateQueries({ queryKey: groupKeys.all(orgId) }) });
}

export function useDeleteGroup(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => groupApi.delete(id), onSuccess: () => qc.invalidateQueries({ queryKey: groupKeys.all(orgId) }) });
}
`;

// ── Simple CRUD services ──────────────────────────────────────────────
services['services/category.ts'] = simpleCrudService({ name: 'Category', typeName: 'Category', basePath: '/category', keyPrefix: 'category' });
services['services/information.ts'] = simpleCrudService({ name: 'Information', typeName: 'Information', basePath: '/information', keyPrefix: 'information' });
services['services/booking-type.ts'] = simpleCrudService({ name: 'BookingType', typeName: 'BookingType', basePath: '/booking-type', keyPrefix: 'bookingType' });
services['services/event-type.ts'] = simpleCrudService({ name: 'EventType', typeName: 'EventType', basePath: '/event-type', keyPrefix: 'eventType' });
services['services/asset-type.ts'] = simpleCrudService({ name: 'AssetType', typeName: 'AssetType', basePath: '/asset-type', keyPrefix: 'assetType' });

// ── Asset ─────────────────────────────────────────────────────────────
services['services/asset.ts'] = simpleCrudService({
  name: 'Asset', typeName: 'Asset', basePath: '/asset', keyPrefix: 'asset',
  hasArchive: true, hasFlag: true,
  extraKeys: `\n  forType: (typeId: string) => ['asset', 'type', typeId] as const,`,
  extraApi: `\n  getAllForAssetType: (typeId: string) => api.get<Asset[]>(\`/asset/type/\${typeId}\`),`,
});

// ── Document ──────────────────────────────────────────────────────────
services['services/document.ts'] = simpleCrudService({
  name: 'Document', typeName: 'Document', basePath: '/document', keyPrefix: 'document',
  hasArchive: true, hasFlag: true,
  extraKeys: `\n  forFolder: (folderId: string) => ['document', 'folder', folderId] as const,`,
  extraApi: `
  getAllFolder: (folderId: string) => api.get<Document[]>(\`/document/folder/\${folderId}\`),
  getAllArchivedFolder: (folderId: string) => api.get<Document[]>(\`/document/folder/archived/\${folderId}\`),
  move: (id: string, data: { folderId: string }) => api.patch<Document>(\`/document/move/\${id}\`, data),`,
});

// ── Event ─────────────────────────────────────────────────────────────
services['services/event.ts'] = simpleCrudService({
  name: 'Event', typeName: 'Event', basePath: '/event', keyPrefix: 'event',
  extraKeys: `\n  forType: (typeId: string) => ['event', 'type', typeId] as const,`,
  extraApi: `\n  getAllForEventType: (typeId: string) => api.get<Event[]>(\`/event/type/\${typeId}\`),`,
});

// ── Announcement ──────────────────────────────────────────────────────
services['services/announcement.ts'] = `import type { Announcement } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api-client';

export const announcementKeys = {
  all: (orgId: string) => ['announcements', orgId] as const,
  forUser: (orgId: string) => ['announcements', orgId, 'user'] as const,
  latest: (orgId: string) => ['announcements', orgId, 'latest'] as const,
  detail: (id: string) => ['announcements', 'detail', id] as const,
};

const announcementApi = {
  getAll: (orgId: string) => api.get<Announcement[]>(\`/announcement/org/\${orgId}\`),
  getAllForGroup: (orgId: string, groupId: string) => api.get<Announcement[]>(\`/announcement/org/\${orgId}/group/\${groupId}\`),
  getAllForUser: (orgId: string) => api.get<Announcement[]>(\`/announcement/user/\${orgId}\`),
  getLatest: (orgId: string) => api.get<Announcement[]>(\`/announcement/latest/\${orgId}\`),
  getForUser: (orgId: string, id: string) => api.get<Announcement>(\`/announcement/view/\${orgId}/\${id}\`),
  get: (id: string) => api.get<Announcement>(\`/announcement/\${id}\`),
  create: (orgId: string, data: Partial<Announcement>) => api.post<Announcement>(\`/announcement/\${orgId}\`, data),
  delete: (id: string) => api.delete<boolean>(\`/announcement/\${id}\`),
};

export function useAnnouncements(orgId: string) {
  return useQuery({ queryKey: announcementKeys.all(orgId), queryFn: () => announcementApi.getAll(orgId), enabled: !!orgId });
}

export function useAnnouncement(id: string) {
  return useQuery({ queryKey: announcementKeys.detail(id), queryFn: () => announcementApi.get(id), enabled: !!id });
}

export function useCreateAnnouncement(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (data: Partial<Announcement>) => announcementApi.create(orgId, data), onSuccess: () => qc.invalidateQueries({ queryKey: announcementKeys.all(orgId) }) });
}

export function useDeleteAnnouncement(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => announcementApi.delete(id), onSuccess: () => qc.invalidateQueries({ queryKey: announcementKeys.all(orgId) }) });
}
`;

// ── Meeting ───────────────────────────────────────────────────────────
services['services/meeting.ts'] = simpleCrudService({
  name: 'Meeting', typeName: 'Meeting', basePath: '/meeting', keyPrefix: 'meeting',
  hasArchive: true,
  extraKeys: `
  forUser: (orgId: string) => ['meeting', orgId, 'user'] as const,
  forGroup: (orgId: string, groupId: string) => ['meeting', orgId, 'group', groupId] as const,`,
  extraApi: `
  getAllForGroup: (orgId: string, groupId: string) => api.get<Meeting[]>(\`/meeting/org/\${orgId}/group/\${groupId}\`),
  getAllForUser: (orgId: string) => api.get<Meeting[]>(\`/meeting/user/\${orgId}\`),
  getForUser: (orgId: string, id: string) => api.get<Meeting>(\`/meeting/view/\${orgId}/\${id}\`),
  sendGoogleInvite: (id: string) => api.patch<Meeting>(\`/meeting/google-invite/\${id}\`, {}),
  remind: (id: string) => api.patch<Meeting>(\`/meeting/remind/\${id}\`, {}),`,
});

// ── Vote ──────────────────────────────────────────────────────────────
services['services/vote.ts'] = `import type { Vote, VoteCast } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api-client';

export const voteKeys = {
  all: (orgId: string) => ['votes', orgId] as const,
  archived: (orgId: string) => ['votes', orgId, 'archived'] as const,
  forUser: (orgId: string) => ['votes', orgId, 'user'] as const,
  forWorkflow: (wId: string) => ['votes', 'workflow', wId] as const,
  detail: (id: string) => ['votes', 'detail', id] as const,
  casted: (id: string) => ['votes', 'casted', id] as const,
};

const voteApi = {
  getAll: (orgId: string) => api.get<Vote[]>(\`/vote/org/\${orgId}\`),
  getAllForGroup: (orgId: string, groupId: string) => api.get<Vote[]>(\`/vote/org/\${orgId}/group/\${groupId}\`),
  getAllArchived: (orgId: string) => api.get<Vote[]>(\`/vote/org/archived/\${orgId}\`),
  getAllForUser: (orgId: string) => api.get<Vote[]>(\`/vote/user/\${orgId}\`),
  getForUser: (orgId: string, id: string) => api.get<Vote>(\`/vote/view/\${orgId}/\${id}\`),
  getAllForWorkflow: (wId: string) => api.get<Vote[]>(\`/vote/workflow/\${wId}\`),
  get: (id: string) => api.get<Vote>(\`/vote/\${id}\`),
  getAllCasted: (id: string) => api.get<VoteCast[]>(\`/vote/all-casted/\${id}\`),
  getCasted: (orgId: string, id: string) => api.get<VoteCast>(\`/vote/casted/\${orgId}/\${id}\`),
  create: (orgId: string, data: Partial<Vote>) => api.post<Vote>(\`/vote/\${orgId}\`, data),
  complete: (id: string) => api.patch<Vote>(\`/vote/finish/\${id}\`, {}),
  remind: (id: string) => api.patch<Vote>(\`/vote/remind/\${id}\`, {}),
  cast: (orgId: string, id: string, data: any) => api.patch<Vote>(\`/vote/cast/\${orgId}/\${id}\`, data),
  delete: (id: string) => api.delete<boolean>(\`/vote/\${id}\`),
};

export function useVotes(orgId: string) {
  return useQuery({ queryKey: voteKeys.all(orgId), queryFn: () => voteApi.getAll(orgId), enabled: !!orgId });
}

export function useVote(id: string) {
  return useQuery({ queryKey: voteKeys.detail(id), queryFn: () => voteApi.get(id), enabled: !!id });
}

export function useCreateVote(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (data: Partial<Vote>) => voteApi.create(orgId, data), onSuccess: () => qc.invalidateQueries({ queryKey: voteKeys.all(orgId) }) });
}

export function useDeleteVote(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => voteApi.delete(id), onSuccess: () => qc.invalidateQueries({ queryKey: voteKeys.all(orgId) }) });
}

export function useCastVote(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: any }) => voteApi.cast(orgId, id, data), onSuccess: (_, { id }) => { qc.invalidateQueries({ queryKey: voteKeys.all(orgId) }); qc.invalidateQueries({ queryKey: voteKeys.detail(id) }); } });
}
`;

// ── Booking ───────────────────────────────────────────────────────────
services['services/booking.ts'] = `import type { Booking } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api-client';

export const bookingKeys = {
  all: (orgId: string) => ['bookings', orgId] as const,
  forUser: (orgId: string) => ['bookings', orgId, 'user'] as const,
  forType: (typeId: string) => ['bookings', 'type', typeId] as const,
  detail: (id: string) => ['bookings', 'detail', id] as const,
};

const bookingApi = {
  getAll: (orgId: string) => api.get<Booking[]>(\`/booking/org/\${orgId}\`),
  getAllForUser: (orgId: string) => api.get<Booking[]>(\`/booking/user/\${orgId}\`),
  getForUser: (id: string) => api.get<Booking>(\`/booking/view/\${id}\`),
  get: (id: string) => api.get<Booking>(\`/booking/\${id}\`),
  getAllForBookingType: (typeId: string) => api.get<Booking[]>(\`/booking/type/\${typeId}\`),
  create: (orgId: string, data: Partial<Booking>) => api.post<Booking>(\`/booking/\${orgId}\`, data),
  update: (id: string, data: Partial<Booking>) => api.put<Booking>(\`/booking/\${id}\`, data),
  delete: (id: string) => api.delete<boolean>(\`/booking/\${id}\`),
  approve: (id: string) => api.patch<Booking>(\`/booking/approve/\${id}\`, {}),
  reject: (id: string) => api.patch<Booking>(\`/booking/reject/\${id}\`, {}),
};

export function useBookings(orgId: string) {
  return useQuery({ queryKey: bookingKeys.all(orgId), queryFn: () => bookingApi.getAll(orgId), enabled: !!orgId });
}

export function useBooking(id: string) {
  return useQuery({ queryKey: bookingKeys.detail(id), queryFn: () => bookingApi.get(id), enabled: !!id });
}

export function useCreateBooking(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (data: Partial<Booking>) => bookingApi.create(orgId, data), onSuccess: () => qc.invalidateQueries({ queryKey: bookingKeys.all(orgId) }) });
}

export function useUpdateBooking(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Booking> }) => bookingApi.update(id, data), onSuccess: (_, { id }) => { qc.invalidateQueries({ queryKey: bookingKeys.all(orgId) }); qc.invalidateQueries({ queryKey: bookingKeys.detail(id) }); } });
}

export function useDeleteBooking(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => bookingApi.delete(id), onSuccess: () => qc.invalidateQueries({ queryKey: bookingKeys.all(orgId) }) });
}

export function useApproveBooking(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => bookingApi.approve(id), onSuccess: () => qc.invalidateQueries({ queryKey: bookingKeys.all(orgId) }) });
}

export function useRejectBooking(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => bookingApi.reject(id), onSuccess: () => qc.invalidateQueries({ queryKey: bookingKeys.all(orgId) }) });
}
`;

// ── UserRequest ───────────────────────────────────────────────────────
services['services/user-request.ts'] = `import type { UserRequest } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api-client';

export const userRequestKeys = {
  all: (orgId: string) => ['userRequests', orgId] as const,
  forUser: (orgId: string) => ['userRequests', orgId, 'user'] as const,
  detail: (id: string) => ['userRequests', 'detail', id] as const,
};

const userRequestApi = {
  getAll: (orgId: string) => api.get<UserRequest[]>(\`/user-request/org/\${orgId}\`),
  getAllForUser: (orgId: string) => api.get<UserRequest[]>(\`/user-request/user/\${orgId}\`),
  getForUser: (id: string) => api.get<UserRequest>(\`/user-request/view/\${id}\`),
  get: (id: string) => api.get<UserRequest>(\`/user-request/\${id}\`),
  create: (orgId: string, data: Partial<UserRequest>) => api.post<UserRequest>(\`/user-request/\${orgId}\`, data),
  update: (id: string, data: Partial<UserRequest>) => api.put<UserRequest>(\`/user-request/\${id}\`, data),
  delete: (id: string) => api.delete<boolean>(\`/user-request/\${id}\`),
  approve: (id: string) => api.patch<UserRequest>(\`/user-request/approve/\${id}\`, {}),
  reject: (id: string) => api.patch<UserRequest>(\`/user-request/reject/\${id}\`, {}),
};

export function useUserRequests(orgId: string) {
  return useQuery({ queryKey: userRequestKeys.all(orgId), queryFn: () => userRequestApi.getAll(orgId), enabled: !!orgId });
}

export function useUserRequest(id: string) {
  return useQuery({ queryKey: userRequestKeys.detail(id), queryFn: () => userRequestApi.get(id), enabled: !!id });
}

export function useCreateUserRequest(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (data: Partial<UserRequest>) => userRequestApi.create(orgId, data), onSuccess: () => qc.invalidateQueries({ queryKey: userRequestKeys.all(orgId) }) });
}

export function useUpdateUserRequest(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<UserRequest> }) => userRequestApi.update(id, data), onSuccess: (_, { id }) => { qc.invalidateQueries({ queryKey: userRequestKeys.all(orgId) }); qc.invalidateQueries({ queryKey: userRequestKeys.detail(id) }); } });
}

export function useDeleteUserRequest(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => userRequestApi.delete(id), onSuccess: () => qc.invalidateQueries({ queryKey: userRequestKeys.all(orgId) }) });
}

export function useApproveUserRequest(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => userRequestApi.approve(id), onSuccess: () => qc.invalidateQueries({ queryKey: userRequestKeys.all(orgId) }) });
}

export function useRejectUserRequest(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => userRequestApi.reject(id), onSuccess: () => qc.invalidateQueries({ queryKey: userRequestKeys.all(orgId) }) });
}
`;

// ── Budget ────────────────────────────────────────────────────────────
services['services/budget.ts'] = `import type { Budget } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api-client';

export const budgetKeys = {
  forFY: (fyId: string) => ['budgets', 'fy', fyId] as const,
  detail: (id: string) => ['budgets', 'detail', id] as const,
};

const budgetApi = {
  getByFinancialYear: (fyId: string) => api.get<Budget[]>(\`/budget/financial-year/\${fyId}\`),
  getOther: (id: string) => api.get<Budget[]>(\`/budget/other/\${id}\`),
  get: (id: string) => api.get<Budget>(\`/budget/\${id}\`),
  create: (orgId: string, data: Partial<Budget>) => api.post<Budget>(\`/budget/\${orgId}\`, data),
  approve: (id: string, data: any) => api.put<Budget>(\`/budget/approve/\${id}\`, data),
  delete: (id: string) => api.delete<boolean>(\`/budget/\${id}\`),
};

export function useBudgets(fyId: string) {
  return useQuery({ queryKey: budgetKeys.forFY(fyId), queryFn: () => budgetApi.getByFinancialYear(fyId), enabled: !!fyId });
}

export function useBudget(id: string) {
  return useQuery({ queryKey: budgetKeys.detail(id), queryFn: () => budgetApi.get(id), enabled: !!id });
}

export function useCreateBudget(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (data: Partial<Budget>) => budgetApi.create(orgId, data), onSuccess: () => qc.invalidateQueries({ queryKey: ['budgets'] }) });
}

export function useDeleteBudget() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => budgetApi.delete(id), onSuccess: () => qc.invalidateQueries({ queryKey: ['budgets'] }) });
}
`;

// ── ChartOfAccount ────────────────────────────────────────────────────
services['services/chart-of-account.ts'] = simpleCrudService({
  name: 'ChartOfAccount', typeName: 'ChartOfAccount', basePath: '/chart-of-account', keyPrefix: 'coa',
  extraKeys: `\n  forFY: (fyId: string, orgId: string) => ['coa', 'fy', fyId, orgId] as const,
  seed: (orgId: string) => ['coa', 'seed', orgId] as const,`,
  extraApi: `
  getByFinancialYear: (fyId: string, orgId: string) => api.get<ChartOfAccount[]>(\`/chart-of-account/financial-year/\${fyId}/\${orgId}\`),
  getSeed: (orgId: string) => api.get<any>(\`/chart-of-account/seed/\${orgId}\`),
  setSeed: (orgId: string, data: any) => api.post<any>(\`/chart-of-account/seed/\${orgId}\`, data),`,
});

// ── FinancialYear ─────────────────────────────────────────────────────
services['services/financial-year.ts'] = `import type { FinancialYear } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api-client';

export const fyKeys = {
  all: (orgId: string) => ['fy', orgId] as const,
  current: (orgId: string) => ['fy', orgId, 'current'] as const,
  detail: (id: string) => ['fy', 'detail', id] as const,
};

const fyApi = {
  getAll: (orgId: string) => api.get<FinancialYear[]>(\`/financial-year/org/\${orgId}\`),
  getCurrent: (orgId: string) => api.get<FinancialYear>(\`/financial-year/current/\${orgId}\`),
  get: (id: string) => api.get<FinancialYear>(\`/financial-year/\${id}\`),
  getDetails: (id: string) => api.get<any>(\`/financial-year/details/\${id}\`),
  create: (orgId: string, data: Partial<FinancialYear>) => api.post<FinancialYear>(\`/financial-year/\${orgId}\`, data),
  setCurrent: (id: string) => api.put<FinancialYear>(\`/financial-year/\${id}\`, {}),
  delete: (id: string) => api.delete<boolean>(\`/financial-year/\${id}\`),
};

export function useFinancialYears(orgId: string) {
  return useQuery({ queryKey: fyKeys.all(orgId), queryFn: () => fyApi.getAll(orgId), enabled: !!orgId });
}

export function useCurrentFinancialYear(orgId: string) {
  return useQuery({ queryKey: fyKeys.current(orgId), queryFn: () => fyApi.getCurrent(orgId), enabled: !!orgId });
}

export function useFinancialYear(id: string) {
  return useQuery({ queryKey: fyKeys.detail(id), queryFn: () => fyApi.get(id), enabled: !!id });
}

export function useCreateFinancialYear(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (data: Partial<FinancialYear>) => fyApi.create(orgId, data), onSuccess: () => qc.invalidateQueries({ queryKey: fyKeys.all(orgId) }) });
}

export function useDeleteFinancialYear(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => fyApi.delete(id), onSuccess: () => qc.invalidateQueries({ queryKey: fyKeys.all(orgId) }) });
}
`;

// ── Transaction ───────────────────────────────────────────────────────
services['services/transaction.ts'] = `import type { Transaction } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api-client';

export const transactionKeys = {
  forFY: (fyId: string) => ['transactions', 'fy', fyId] as const,
  archivedForFY: (fyId: string) => ['transactions', 'fy', fyId, 'archived'] as const,
  detail: (id: string) => ['transactions', 'detail', id] as const,
};

const transactionApi = {
  getByFinancialYear: (fyId: string) => api.get<Transaction[]>(\`/transaction/financial-year/\${fyId}\`),
  getByFinancialYearArchived: (fyId: string) => api.get<Transaction[]>(\`/transaction/financial-year/archived/\${fyId}\`),
  getForRange: (orgId: string, data: any) => api.patch<Transaction[]>(\`/transaction/range/\${orgId}\`, data),
  getForRangeArchived: (orgId: string, data: any) => api.patch<Transaction[]>(\`/transaction/range/archived/\${orgId}\`, data),
  get: (id: string) => api.get<Transaction>(\`/transaction/\${id}\`),
  create: (orgId: string, data: Partial<Transaction>) => api.post<Transaction>(\`/transaction/\${orgId}\`, data),
  update: (id: string, data: Partial<Transaction>) => api.put<Transaction>(\`/transaction/\${id}\`, data),
  archive: (id: string) => api.patch<Transaction>(\`/transaction/archive/\${id}\`, {}),
  delete: (id: string) => api.delete<boolean>(\`/transaction/\${id}\`),
};

export function useTransactions(fyId: string) {
  return useQuery({ queryKey: transactionKeys.forFY(fyId), queryFn: () => transactionApi.getByFinancialYear(fyId), enabled: !!fyId });
}

export function useTransaction(id: string) {
  return useQuery({ queryKey: transactionKeys.detail(id), queryFn: () => transactionApi.get(id), enabled: !!id });
}

export function useCreateTransaction(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (data: Partial<Transaction>) => transactionApi.create(orgId, data), onSuccess: () => qc.invalidateQueries({ queryKey: ['transactions'] }) });
}

export function useUpdateTransaction() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Transaction> }) => transactionApi.update(id, data), onSuccess: (_, { id }) => { qc.invalidateQueries({ queryKey: ['transactions'] }); qc.invalidateQueries({ queryKey: transactionKeys.detail(id) }); } });
}

export function useDeleteTransaction() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => transactionApi.delete(id), onSuccess: () => qc.invalidateQueries({ queryKey: ['transactions'] }) });
}
`;

// ── TransactionEntry ──────────────────────────────────────────────────
services['services/transaction-entry.ts'] = `import type { TransactionEntry } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api-client';

export const txEntryKeys = {
  forFY: (fyId: string) => ['txEntries', 'fy', fyId] as const,
  detail: (id: string) => ['txEntries', 'detail', id] as const,
};

const txEntryApi = {
  getByFinancialYear: (fyId: string) => api.get<TransactionEntry[]>(\`/transaction-entry/financial-year/\${fyId}\`),
  get: (id: string) => api.get<TransactionEntry>(\`/transaction-entry/\${id}\`),
  getRange: (orgId: string, data: any) => api.patch<TransactionEntry[]>(\`/transaction-entry/range/\${orgId}\`, data),
  create: (transactionId: string, data: Partial<TransactionEntry>) => api.post<TransactionEntry>(\`/transaction-entry/\${transactionId}\`, data),
};

export function useTransactionEntries(fyId: string) {
  return useQuery({ queryKey: txEntryKeys.forFY(fyId), queryFn: () => txEntryApi.getByFinancialYear(fyId), enabled: !!fyId });
}

export function useTransactionEntry(id: string) {
  return useQuery({ queryKey: txEntryKeys.detail(id), queryFn: () => txEntryApi.get(id), enabled: !!id });
}

export function useCreateTransactionEntry() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ transactionId, data }: { transactionId: string; data: Partial<TransactionEntry> }) => txEntryApi.create(transactionId, data), onSuccess: () => qc.invalidateQueries({ queryKey: ['txEntries'] }) });
}
`;

// ── Reminder ──────────────────────────────────────────────────────────
services['services/reminder.ts'] = `import type { Reminder } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api-client';

export const reminderKeys = {
  all: (orgId: string) => ['reminders', orgId] as const,
  upcoming: (orgId: string) => ['reminders', orgId, 'upcoming'] as const,
  detail: (id: string) => ['reminders', 'detail', id] as const,
};

const reminderApi = {
  getAll: (orgId: string) => api.get<Reminder[]>(\`/reminder/organisation/\${orgId}\`),
  get: (id: string) => api.get<Reminder>(\`/reminder/\${id}\`),
  getUpcoming: (orgId: string) => api.get<Reminder[]>(\`/reminder/upcoming/\${orgId}\`),
  create: (orgId: string, data: Partial<Reminder>) => api.post<Reminder>(\`/reminder/\${orgId}\`, data),
  update: (id: string, data: Partial<Reminder>) => api.put<Reminder>(\`/reminder/\${id}\`, data),
  delete: (id: string) => api.delete<boolean>(\`/reminder/\${id}\`),
  enable: (id: string) => api.patch<Reminder>(\`/reminder/enable/\${id}\`, {}),
  disable: (id: string) => api.patch<Reminder>(\`/reminder/disable/\${id}\`, {}),
};

export function useReminders(orgId: string) {
  return useQuery({ queryKey: reminderKeys.all(orgId), queryFn: () => reminderApi.getAll(orgId), enabled: !!orgId });
}

export function useUpcomingReminders(orgId: string) {
  return useQuery({ queryKey: reminderKeys.upcoming(orgId), queryFn: () => reminderApi.getUpcoming(orgId), enabled: !!orgId });
}

export function useReminder(id: string) {
  return useQuery({ queryKey: reminderKeys.detail(id), queryFn: () => reminderApi.get(id), enabled: !!id });
}

export function useCreateReminder(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (data: Partial<Reminder>) => reminderApi.create(orgId, data), onSuccess: () => qc.invalidateQueries({ queryKey: reminderKeys.all(orgId) }) });
}

export function useUpdateReminder(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Reminder> }) => reminderApi.update(id, data), onSuccess: (_, { id }) => { qc.invalidateQueries({ queryKey: reminderKeys.all(orgId) }); qc.invalidateQueries({ queryKey: reminderKeys.detail(id) }); } });
}

export function useDeleteReminder(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => reminderApi.delete(id), onSuccess: () => qc.invalidateQueries({ queryKey: reminderKeys.all(orgId) }) });
}
`;

// ── Folder ────────────────────────────────────────────────────────────
services['services/folder.ts'] = `import type { Folder } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api-client';

export const folderKeys = {
  all: (orgId: string) => ['folders', orgId] as const,
  recursive: (orgId: string) => ['folders', orgId, 'recursive'] as const,
  detail: (id: string) => ['folders', 'detail', id] as const,
};

const folderApi = {
  getAll: (orgId: string) => api.get<Folder[]>(\`/folder/org/\${orgId}\`),
  getAllRecursive: (orgId: string) => api.get<Folder[]>(\`/folder/org/recursive/\${orgId}\`),
  get: (id: string) => api.get<Folder>(\`/folder/\${id}\`),
  getAllSubfolder: (orgId: string) => api.get<Folder[]>(\`/folder/subfolder/\${orgId}\`),
  move: (id: string, data: { parentId: string }) => api.patch<Folder>(\`/folder/move/\${id}\`, data),
  create: (orgId: string, data: Partial<Folder>) => api.post<Folder>(\`/folder/\${orgId}\`, data),
  delete: (id: string) => api.delete<boolean>(\`/folder/\${id}\`),
};

export function useFolders(orgId: string) {
  return useQuery({ queryKey: folderKeys.all(orgId), queryFn: () => folderApi.getAll(orgId), enabled: !!orgId });
}

export function useFolder(id: string) {
  return useQuery({ queryKey: folderKeys.detail(id), queryFn: () => folderApi.get(id), enabled: !!id });
}

export function useCreateFolder(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (data: Partial<Folder>) => folderApi.create(orgId, data), onSuccess: () => qc.invalidateQueries({ queryKey: folderKeys.all(orgId) }) });
}

export function useDeleteFolder(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => folderApi.delete(id), onSuccess: () => qc.invalidateQueries({ queryKey: folderKeys.all(orgId) }) });
}
`;

// ── Wall ──────────────────────────────────────────────────────────────
services['services/wall.ts'] = `import type { WallPost } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api-client';

export const wallKeys = {
  all: (orgId: string) => ['wall', orgId] as const,
};

const wallApi = {
  getAll: (orgId: string) => api.get<WallPost[]>(\`/wall/org/\${orgId}\`),
  getAllForUser: (orgId: string, userId: string) => api.get<WallPost[]>(\`/wall/org/\${orgId}/user/\${userId}\`),
  create: (orgId: string, data: Partial<WallPost>) => api.post<WallPost>(\`/wall/\${orgId}\`, data),
  delete: (id: string) => api.delete<boolean>(\`/wall/\${id}\`),
  like: (orgId: string, id: string) => api.patch<WallPost>(\`/wall/like/\${orgId}/\${id}\`, {}),
  unlike: (orgId: string, id: string) => api.patch<WallPost>(\`/wall/unlike/\${orgId}/\${id}\`, {}),
};

export function useWallPosts(orgId: string) {
  return useQuery({ queryKey: wallKeys.all(orgId), queryFn: () => wallApi.getAll(orgId), enabled: !!orgId });
}

export function useCreateWallPost(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (data: Partial<WallPost>) => wallApi.create(orgId, data), onSuccess: () => qc.invalidateQueries({ queryKey: wallKeys.all(orgId) }) });
}

export function useDeleteWallPost(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => wallApi.delete(id), onSuccess: () => qc.invalidateQueries({ queryKey: wallKeys.all(orgId) }) });
}

export function useLikeWallPost(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => wallApi.like(orgId, id), onSuccess: () => qc.invalidateQueries({ queryKey: wallKeys.all(orgId) }) });
}
`;

// ── Comment ───────────────────────────────────────────────────────────
services['services/comment.ts'] = `import type { Comment } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api-client';

export const commentKeys = {
  forEntity: (entity: string, id: string) => ['comments', entity, id] as const,
};

type Entity = 'workflow' | 'task' | 'quote' | 'invoice' | 'workorder' | 'evidence' | 'vendor' | 'document' | 'asset' | 'booking' | 'request' | 'meeting' | 'transaction' | 'financial-year';

const commentApi = {
  getForEntity: (entity: Entity, id: string) => api.get<Comment[]>(\`/comment/\${entity}/\${id}\`),
  create: (orgId: string, data: Partial<Comment>) => api.post<Comment>(\`/comment/\${orgId}\`, data),
  createUserComment: (orgId: string, data: Partial<Comment>) => api.post<Comment>(\`/comment/user/\${orgId}\`, data),
  createWallComment: (orgId: string, data: Partial<Comment>) => api.post<Comment>(\`/comment/wall/\${orgId}\`, data),
  delete: (id: string) => api.delete<boolean>(\`/comment/\${id}\`),
};

export function useComments(entity: Entity, id: string) {
  return useQuery({ queryKey: commentKeys.forEntity(entity, id), queryFn: () => commentApi.getForEntity(entity, id), enabled: !!id });
}

export function useCreateComment(orgId: string, entity: Entity, entityId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (data: Partial<Comment>) => commentApi.create(orgId, data), onSuccess: () => qc.invalidateQueries({ queryKey: commentKeys.forEntity(entity, entityId) }) });
}

export function useDeleteComment(entity: Entity, entityId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => commentApi.delete(id), onSuccess: () => qc.invalidateQueries({ queryKey: commentKeys.forEntity(entity, entityId) }) });
}
`;

// ── Attachment ────────────────────────────────────────────────────────
services['services/attachment.ts'] = `import type { Attachment } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api-client';

export const attachmentKeys = {
  forEntity: (entity: string, id: string) => ['attachments', entity, id] as const,
  all: (orgId: string) => ['attachments', orgId] as const,
};

type Entity = 'organisation' | 'workflow' | 'task' | 'quote' | 'invoice' | 'workorder' | 'evidence' | 'meeting' | 'document' | 'asset' | 'information' | 'transaction';

const attachmentApi = {
  getAll: (orgId: string) => api.get<Attachment[]>(\`/attachment/org/\${orgId}\`),
  getForEntity: (entity: Entity, id: string) => api.get<Attachment[]>(\`/attachment/\${entity}/\${id}\`),
  create: (orgId: string, entityId: string, entity: Entity, data: any) => api.post<Attachment>(\`/attachment/\${orgId}/\${entityId}/\${entity}\`, data),
  delete: (id: string) => api.delete<boolean>(\`/attachment/\${id}\`),
};

export function useAttachments(entity: Entity, id: string) {
  return useQuery({ queryKey: attachmentKeys.forEntity(entity, id), queryFn: () => attachmentApi.getForEntity(entity, id), enabled: !!id });
}

export function useCreateAttachment(orgId: string, entity: Entity, entityId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (data: any) => attachmentApi.create(orgId, entityId, entity, data), onSuccess: () => qc.invalidateQueries({ queryKey: attachmentKeys.forEntity(entity, entityId) }) });
}

export function useDeleteAttachment(entity: Entity, entityId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => attachmentApi.delete(id), onSuccess: () => qc.invalidateQueries({ queryKey: attachmentKeys.forEntity(entity, entityId) }) });
}
`;

// ── Image ─────────────────────────────────────────────────────────────
services['services/image.ts'] = `import type { AppImage } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api-client';

export const imageKeys = {
  forEntity: (entity: string, id: string) => ['images', entity, id] as const,
  all: (orgId: string) => ['images', orgId] as const,
};

type Entity = 'organisation' | 'user' | 'workflow' | 'task' | 'quote' | 'invoice' | 'workorder' | 'evidence' | 'document' | 'asset';

const imageApi = {
  getAll: (orgId: string) => api.get<AppImage[]>(\`/image/org/\${orgId}\`),
  getForEntity: (entity: Entity, id: string) => api.get<AppImage[]>(\`/image/\${entity}/\${id}\`),
  create: (orgId: string, entityId: string, entity: Entity, data: any) => api.post<AppImage>(\`/image/\${orgId}/\${entityId}/\${entity}\`, data),
  delete: (id: string) => api.delete<boolean>(\`/image/\${id}\`),
};

export function useImages(entity: Entity, id: string) {
  return useQuery({ queryKey: imageKeys.forEntity(entity, id), queryFn: () => imageApi.getForEntity(entity, id), enabled: !!id });
}

export function useCreateImage(orgId: string, entity: Entity, entityId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (data: any) => imageApi.create(orgId, entityId, entity, data), onSuccess: () => qc.invalidateQueries({ queryKey: imageKeys.forEntity(entity, entityId) }) });
}

export function useDeleteImage(entity: Entity, entityId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => imageApi.delete(id), onSuccess: () => qc.invalidateQueries({ queryKey: imageKeys.forEntity(entity, entityId) }) });
}
`;

// ── Notification ──────────────────────────────────────────────────────
services['services/notification.ts'] = `import type { Notification } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api-client';

export const notificationKeys = {
  all: (orgId: string) => ['notifications', orgId] as const,
};

const notificationApi = {
  getAll: (orgId: string) => api.get<Notification[]>(\`/notification/\${orgId}\`),
  markRead: (id: string) => api.patch<Notification>(\`/notification/read/\${id}\`, {}),
  markReadAll: (orgId: string) => api.patch<void>(\`/notification/readAll/\${orgId}\`, {}),
  delete: (id: string) => api.delete<boolean>(\`/notification/\${id}\`),
  deleteAll: (orgId: string) => api.delete<boolean>(\`/notification/all/\${orgId}\`),
};

export function useNotifications(orgId: string) {
  return useQuery({ queryKey: notificationKeys.all(orgId), queryFn: () => notificationApi.getAll(orgId), enabled: !!orgId });
}

export function useMarkNotificationRead(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => notificationApi.markRead(id), onSuccess: () => qc.invalidateQueries({ queryKey: notificationKeys.all(orgId) }) });
}

export function useMarkAllNotificationsRead(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: () => notificationApi.markReadAll(orgId), onSuccess: () => qc.invalidateQueries({ queryKey: notificationKeys.all(orgId) }) });
}

export function useDeleteNotification(orgId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => notificationApi.delete(id), onSuccess: () => qc.invalidateQueries({ queryKey: notificationKeys.all(orgId) }) });
}
`;

// ── Conversation ──────────────────────────────────────────────────────
services['services/conversation.ts'] = `import type { Conversation } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api-client';

export const conversationKeys = {
  forGroup: (groupId: string, orgId: string) => ['conversations', 'group', groupId, orgId] as const,
  detail: (id: string) => ['conversations', 'detail', id] as const,
};

const conversationApi = {
  getForGroup: (groupId: string, orgId: string) => api.get<Conversation>(\`/conversation/group/\${groupId}/\${orgId}\`),
  get: (id: string) => api.get<Conversation>(\`/conversation/\${id}\`),
  create: (id: string, data: Partial<Conversation>) => api.post<Conversation>(\`/conversation/\${id}\`, data),
};

export function useConversation(id: string) {
  return useQuery({ queryKey: conversationKeys.detail(id), queryFn: () => conversationApi.get(id), enabled: !!id });
}

export function useCreateConversation() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Conversation> }) => conversationApi.create(id, data), onSuccess: () => qc.invalidateQueries({ queryKey: ['conversations'] }) });
}
`;

// ── Message ───────────────────────────────────────────────────────────
services['services/message.ts'] = `import type { Message } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api-client';

export const messageKeys = {
  forConversation: (conversationId: string) => ['messages', conversationId] as const,
  detail: (id: string) => ['messages', 'detail', id] as const,
};

const messageApi = {
  getForConversation: (conversationId: string, limit = 50, skip = 0) => api.get<Message[]>(\`/message/conversation/\${conversationId}?limit=\${limit}&skip=\${skip}\`),
  get: (id: string) => api.get<Message>(\`/message/\${id}\`),
  send: (conversationId: string, data: { content: string }) => api.post<Message>(\`/message/send/\${conversationId}\`, data),
  markRead: (orgId: string, conversationId: string) => api.put<void>(\`/message/read/\${orgId}/\${conversationId}\`, {}),
  toggleReaction: (messageId: string, data: any) => api.put<Message>(\`/message/react/\${messageId}\`, data),
  delete: (id: string) => api.delete<boolean>(\`/message/\${id}\`),
};

export function useMessages(conversationId: string) {
  return useQuery({ queryKey: messageKeys.forConversation(conversationId), queryFn: () => messageApi.getForConversation(conversationId), enabled: !!conversationId });
}

export function useSendMessage(conversationId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (data: { content: string }) => messageApi.send(conversationId, data), onSuccess: () => qc.invalidateQueries({ queryKey: messageKeys.forConversation(conversationId) }) });
}

export function useDeleteMessage(conversationId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => messageApi.delete(id), onSuccess: () => qc.invalidateQueries({ queryKey: messageKeys.forConversation(conversationId) }) });
}
`;

// ── Search ────────────────────────────────────────────────────────────
services['services/search.ts'] = `import type { SearchResult } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { api } from './api-client';

const searchApi = {
  search: (orgId: string, data: { query: string }) => api.post<SearchResult[]>(\`/search/\${orgId}\`, data),
};

export function useSearch(orgId: string) {
  return useMutation({ mutationFn: (query: string) => searchApi.search(orgId, { query }) });
}
`;

// ── Dashboard ─────────────────────────────────────────────────────────
services['services/dashboard.ts'] = `import type { DashboardData } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { api } from './api-client';

export const dashboardKeys = {
  admin: (orgId: string) => ['dashboard', 'admin', orgId] as const,
  user: (orgId: string) => ['dashboard', 'user', orgId] as const,
};

const dashboardApi = {
  getAdmin: (orgId: string) => api.get<DashboardData>(\`/dashboard/org/\${orgId}\`),
  getUser: (orgId: string) => api.get<DashboardData>(\`/dashboard/user/\${orgId}\`),
};

export function useAdminDashboard(orgId: string) {
  return useQuery({ queryKey: dashboardKeys.admin(orgId), queryFn: () => dashboardApi.getAdmin(orgId), enabled: !!orgId });
}

export function useUserDashboard(orgId: string) {
  return useQuery({ queryKey: dashboardKeys.user(orgId), queryFn: () => dashboardApi.getUser(orgId), enabled: !!orgId });
}
`;

// ── Analytics ─────────────────────────────────────────────────────────
services['services/analytics.ts'] = `import type { AnalyticsData } from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from './api-client';

export const analyticsKeys = {
  forYear: (orgId: string) => ['analytics', 'year', orgId] as const,
  forFY: (orgId: string) => ['analytics', 'fy', orgId] as const,
};

const analyticsApi = {
  getForYear: (orgId: string) => api.get<AnalyticsData>(\`/analytics/current/\${orgId}\`),
  getForFinancialYear: (orgId: string) => api.get<AnalyticsData>(\`/analytics/financial/\${orgId}\`),
  getForRange: (orgId: string, data: any) => api.patch<AnalyticsData>(\`/analytics/range/\${orgId}\`, data),
  getFinancialStatement: (orgId: string, data: any) => api.patch<AnalyticsData>(\`/analytics/income-expense/\${orgId}\`, data),
  getBalanceSheet: (orgId: string, data: any) => api.patch<AnalyticsData>(\`/analytics/balance-sheet/\${orgId}\`, data),
};

export function useAnalyticsForYear(orgId: string) {
  return useQuery({ queryKey: analyticsKeys.forYear(orgId), queryFn: () => analyticsApi.getForYear(orgId), enabled: !!orgId });
}

export function useAnalyticsForFY(orgId: string) {
  return useQuery({ queryKey: analyticsKeys.forFY(orgId), queryFn: () => analyticsApi.getForFinancialYear(orgId), enabled: !!orgId });
}

export function useAnalyticsRange(orgId: string) {
  return useMutation({ mutationFn: (data: any) => analyticsApi.getForRange(orgId, data) });
}

export function useFinancialStatement(orgId: string) {
  return useMutation({ mutationFn: (data: any) => analyticsApi.getFinancialStatement(orgId, data) });
}

export function useBalanceSheet(orgId: string) {
  return useMutation({ mutationFn: (data: any) => analyticsApi.getBalanceSheet(orgId, data) });
}
`;

// ── Chart ─────────────────────────────────────────────────────────────
services['services/chart.ts'] = `import type { ChartData } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { api } from './api-client';

export const chartKeys = {
  admin: (orgId: string) => ['chart', 'admin', orgId] as const,
  user: (orgId: string) => ['chart', 'user', orgId] as const,
};

const chartApi = {
  getAdmin: (orgId: string) => api.get<ChartData>(\`/chart/org/\${orgId}\`),
  getUser: (orgId: string) => api.get<ChartData>(\`/chart/user/\${orgId}\`),
};

export function useAdminChart(orgId: string) {
  return useQuery({ queryKey: chartKeys.admin(orgId), queryFn: () => chartApi.getAdmin(orgId), enabled: !!orgId });
}

export function useUserChart(orgId: string) {
  return useQuery({ queryKey: chartKeys.user(orgId), queryFn: () => chartApi.getUser(orgId), enabled: !!orgId });
}
`;

// ── Status ────────────────────────────────────────────────────────────
services['services/status.ts'] = `import type { StatusConfig } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { api } from './api-client';

export const statusKeys = {
  workflow: (id: string) => ['statuses', 'workflow', id] as const,
  vendor: (id: string) => ['statuses', 'vendor', id] as const,
};

const statusApi = {
  getWorkflowStatuses: (id: string) => api.get<StatusConfig[]>(\`/status/workflow/\${id}\`),
  getVendorStatuses: (id: string) => api.get<StatusConfig[]>(\`/status/vendor/\${id}\`),
};

export function useWorkflowStatuses(id: string) {
  return useQuery({ queryKey: statusKeys.workflow(id), queryFn: () => statusApi.getWorkflowStatuses(id), enabled: !!id });
}

export function useVendorStatuses(id: string) {
  return useQuery({ queryKey: statusKeys.vendor(id), queryFn: () => statusApi.getVendorStatuses(id), enabled: !!id });
}
`;

// ── Timeline ──────────────────────────────────────────────────────────
services['services/timeline.ts'] = `import type { TimelineEntry } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { api } from './api-client';

export const timelineKeys = {
  forEntity: (entity: string, id: string) => ['timeline', entity, id] as const,
};

type Entity = 'user' | 'workflow' | 'task' | 'quote' | 'invoice' | 'workorder' | 'evidence' | 'vote' | 'vendor' | 'document' | 'asset' | 'financial-year';

const timelineApi = {
  get: (entity: Entity, id: string) => api.get<TimelineEntry[]>(\`/timeline/\${entity}/\${id}\`),
};

export function useTimeline(entity: Entity, id: string) {
  return useQuery({ queryKey: timelineKeys.forEntity(entity, id), queryFn: () => timelineApi.get(entity, id), enabled: !!id });
}
`;

// ── History ───────────────────────────────────────────────────────────
services['services/history.ts'] = `import type { HistoryEntry } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api-client';

export const historyKeys = {
  forEntity: (entity: string, id: string) => ['history', entity, id] as const,
};

type Entity = 'workflow' | 'task' | 'quote' | 'invoice' | 'workorder' | 'evidence';

const historyApi = {
  get: (entity: Entity, id: string) => api.get<HistoryEntry[]>(\`/history/\${entity}/\${id}\`),
  delete: (entity: Entity, id: string) => api.delete<boolean>(\`/history/\${entity}/\${id}\`),
};

export function useHistory(entity: Entity, id: string) {
  return useQuery({ queryKey: historyKeys.forEntity(entity, id), queryFn: () => historyApi.get(entity, id), enabled: !!id });
}

export function useDeleteHistory(entity: Entity, entityId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => historyApi.delete(entity, id), onSuccess: () => qc.invalidateQueries({ queryKey: historyKeys.forEntity(entity, entityId) }) });
}
`;

// ── PDF ───────────────────────────────────────────────────────────────
services['services/pdf.ts'] = `import { api } from './api-client';

type PdfEntity = 'workflow' | 'task' | 'quote' | 'invoice' | 'workorder' | 'evidence' | 'meeting' | 'document' | 'asset' | 'information' | 'balance-sheet' | 'income-expense';

export const pdfApi = {
  get: (entity: PdfEntity, id: string) => api.get<Blob>(\`/pdf/\${entity}/\${id}\`),
};
`;

// ── AI ────────────────────────────────────────────────────────────────
services['services/ai.ts'] = `import type { AITokenDetails, AIContent } from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from './api-client';

export const aiKeys = {
  yearlyTokens: (orgId: string) => ['ai', 'tokens', 'year', orgId] as const,
  monthlyTokens: (orgId: string) => ['ai', 'tokens', 'month', orgId] as const,
  forEntity: (entity: string, id: string) => ['ai', entity, id] as const,
};

type Entity = 'workflow' | 'task' | 'quote' | 'invoice' | 'workorder' | 'evidence' | 'meeting' | 'document' | 'asset';

const aiApi = {
  getYearlyTokens: (orgId: string) => api.get<AITokenDetails>(\`/ai/token/year/\${orgId}\`),
  getMonthlyTokens: (orgId: string) => api.get<AITokenDetails>(\`/ai/token/month/\${orgId}\`),
  get: (entity: Entity, id: string) => api.get<AIContent>(\`/ai/\${entity}/\${id}\`),
  create: (entity: Entity, id: string) => api.post<AIContent>(\`/ai/\${entity}/\${id}\`, {}),
};

export function useAIContent(entity: Entity, id: string) {
  return useQuery({ queryKey: aiKeys.forEntity(entity, id), queryFn: () => aiApi.get(entity, id), enabled: !!id });
}

export function useGenerateAIContent(entity: Entity) {
  return useMutation({ mutationFn: (id: string) => aiApi.create(entity, id) });
}

export function useAIYearlyTokens(orgId: string) {
  return useQuery({ queryKey: aiKeys.yearlyTokens(orgId), queryFn: () => aiApi.getYearlyTokens(orgId), enabled: !!orgId });
}
`;

// ── Alert ─────────────────────────────────────────────────────────────
services['services/alert.ts'] = `import type { Alert } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { api } from './api-client';

export const alertKeys = { all: ['alerts'] as const };

export function useAlerts() {
  return useQuery({ queryKey: alertKeys.all, queryFn: () => api.get<Alert[]>('/alert/web') });
}
`;

// ── Email ─────────────────────────────────────────────────────────────
services['services/email.ts'] = `import type { EmailPayload } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { api } from './api-client';

const emailApi = {
  sendReport: (orgId: string, data: EmailPayload) => api.post<void>(\`/admin-email/report/\${orgId}\`, data),
  sendReportComment: (id: string, data: EmailPayload) => api.post<void>(\`/admin-email/report-comment/\${id}\`, data),
  sendReportWall: (id: string, data: EmailPayload) => api.post<void>(\`/admin-email/report-wall/\${id}\`, data),
  sendContact: (orgId: string, data: EmailPayload) => api.post<void>(\`/admin-email/contact-admin/\${orgId}\`, data),
  sendFeedback: (data: EmailPayload) => api.post<void>('/email/feedback', data),
};

export function useSendReport(orgId: string) {
  return useMutation({ mutationFn: (data: EmailPayload) => emailApi.sendReport(orgId, data) });
}

export function useSendFeedback() {
  return useMutation({ mutationFn: (data: EmailPayload) => emailApi.sendFeedback(data) });
}

export function useSendContact(orgId: string) {
  return useMutation({ mutationFn: (data: EmailPayload) => emailApi.sendContact(orgId, data) });
}
`;

// ── Content ───────────────────────────────────────────────────────────
services['services/content.ts'] = `import type { Content } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api-client';

export const contentKeys = {
  blogs: ['content', 'blogs'] as const,
  news: ['content', 'news'] as const,
  detail: (id: string) => ['content', 'detail', id] as const,
};

const contentApi = {
  get: (id: string) => api.get<Content>(\`/content/\${id}\`),
  getAllBlogs: () => api.get<Content[]>('/content/blogs/all'),
  getAllNews: () => api.get<Content[]>('/content/news/all'),
  create: (data: Partial<Content>) => api.post<Content>('/content', data),
  update: (id: string, data: Partial<Content>) => api.put<Content>(\`/content/\${id}\`, data),
  delete: (id: string) => api.delete<boolean>(\`/content/\${id}\`),
};

export function useBlogs() {
  return useQuery({ queryKey: contentKeys.blogs, queryFn: contentApi.getAllBlogs });
}

export function useNews() {
  return useQuery({ queryKey: contentKeys.news, queryFn: contentApi.getAllNews });
}

export function useContent(id: string) {
  return useQuery({ queryKey: contentKeys.detail(id), queryFn: () => contentApi.get(id), enabled: !!id });
}

export function useCreateContent() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (data: Partial<Content>) => contentApi.create(data), onSuccess: () => { qc.invalidateQueries({ queryKey: contentKeys.blogs }); qc.invalidateQueries({ queryKey: contentKeys.news }); } });
}

export function useDeleteContent() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => contentApi.delete(id), onSuccess: () => { qc.invalidateQueries({ queryKey: contentKeys.blogs }); qc.invalidateQueries({ queryKey: contentKeys.news }); } });
}
`;

// ── Token ─────────────────────────────────────────────────────────────
services['services/token.ts'] = `import type { ApiToken } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api-client';

export const tokenKeys = { all: ['tokens'] as const };

const tokenApi = {
  get: () => api.get<ApiToken[]>('/token'),
  create: (data: Partial<ApiToken>) => api.post<ApiToken>('/token', data),
  delete: (id: string) => api.delete<boolean>(\`/token/\${id}\`),
};

export function useTokens() {
  return useQuery({ queryKey: tokenKeys.all, queryFn: tokenApi.get });
}

export function useCreateToken() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (data: Partial<ApiToken>) => tokenApi.create(data), onSuccess: () => qc.invalidateQueries({ queryKey: tokenKeys.all }) });
}

export function useDeleteToken() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => tokenApi.delete(id), onSuccess: () => qc.invalidateQueries({ queryKey: tokenKeys.all }) });
}
`;

// ── VendorComment ─────────────────────────────────────────────────────
services['services/vendor-comment.ts'] = `import type { VendorComment } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api-client';

export const vendorCommentKeys = {
  all: (id: string) => ['vendorComments', id] as const,
  forEntity: (entity: string, id: string) => ['vendorComments', entity, id] as const,
};

type Entity = 'quote' | 'invoice' | 'workorder' | 'evidence';

const vendorCommentApi = {
  getAll: (id: string) => api.get<VendorComment[]>(\`/vendor-comment/\${id}\`),
  getForEntity: (entity: Entity, id: string) => api.get<VendorComment[]>(\`/vendor-comment/\${entity}/\${id}\`),
  create: (orgId: string, data: Partial<VendorComment>) => api.post<VendorComment>(\`/vendor-comment/\${orgId}\`, data),
  delete: (id: string) => api.delete<boolean>(\`/vendor-comment/\${id}\`),
};

export function useVendorComments(id: string) {
  return useQuery({ queryKey: vendorCommentKeys.all(id), queryFn: () => vendorCommentApi.getAll(id), enabled: !!id });
}

export function useVendorCommentsForEntity(entity: Entity, id: string) {
  return useQuery({ queryKey: vendorCommentKeys.forEntity(entity, id), queryFn: () => vendorCommentApi.getForEntity(entity, id), enabled: !!id });
}

export function useCreateVendorComment(orgId: string, entityId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (data: Partial<VendorComment>) => vendorCommentApi.create(orgId, data), onSuccess: () => qc.invalidateQueries({ queryKey: vendorCommentKeys.all(entityId) }) });
}

export function useDeleteVendorComment(entityId: string) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => vendorCommentApi.delete(id), onSuccess: () => qc.invalidateQueries({ queryKey: vendorCommentKeys.all(entityId) }) });
}
`;

// ── VendorSubmit ──────────────────────────────────────────────────────
services['services/vendor-submit.ts'] = `import type { VendorSubmission } from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from './api-client';

export const vendorSubmitKeys = {
  forEntity: (entity: string, id: string) => ['vendorSubmit', entity, id] as const,
};

type Entity = 'evidence' | 'quote' | 'invoice' | 'workorder';

const vendorSubmitApi = {
  getForVendor: (entity: Entity, id: string) => api.patch<VendorSubmission>(\`/vendor-submit/\${entity}/\${id}\`, {}),
  getFiles: (entity: Entity, id: string) => api.get<any[]>(\`/vendor-submit/\${entity}/files/\${id}\`),
  getImages: (entity: Entity, id: string) => api.get<any[]>(\`/vendor-submit/\${entity}/images/\${id}\`),
  getComments: (entity: Entity, id: string) => api.get<any[]>(\`/vendor-submit/\${entity}/comment/\${id}\`),
  update: (entity: Entity, id: string, data: any) => api.post<VendorSubmission>(\`/vendor-submit/\${entity}/\${id}\`, data),
  submit: (entity: Entity, id: string) => api.post<VendorSubmission>(\`/vendor-submit/\${entity}/submit/\${id}\`, {}),
  uploadFile: (entity: Entity, orgId: string, id: string, data: any) => api.post<any>(\`/vendor-submit/\${entity}/file/\${orgId}/\${id}\`, data),
  createComment: (id: string, data: any) => api.post<any>(\`/vendor-submit/comment/\${id}\`, data),
};

export function useVendorSubmission(entity: Entity, id: string) {
  return useQuery({ queryKey: vendorSubmitKeys.forEntity(entity, id), queryFn: () => vendorSubmitApi.getForVendor(entity, id), enabled: !!id });
}

export function useVendorSubmitFiles(entity: Entity, id: string) {
  return useQuery({ queryKey: [...vendorSubmitKeys.forEntity(entity, id), 'files'], queryFn: () => vendorSubmitApi.getFiles(entity, id), enabled: !!id });
}

export function useUpdateVendorSubmission(entity: Entity) {
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: any }) => vendorSubmitApi.update(entity, id, data) });
}

export function useSubmitVendorSubmission(entity: Entity) {
  return useMutation({ mutationFn: (id: string) => vendorSubmitApi.submit(entity, id) });
}
`;

// ═══════════════════════════════════════════════════════════════════════
// WRITE ALL FILES
// ═══════════════════════════════════════════════════════════════════════

console.log('=== TYPES ===');
for (const [path, content] of Object.entries(types)) {
  write(path, content);
}

console.log('\n=== SERVICES ===');
for (const [path, content] of Object.entries(services)) {
  write(path, content);
}

console.log(`\nDone! Created ${created} files.`);
