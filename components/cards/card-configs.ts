import type { EntityIconKey } from '@/constants/entity-icons';
import type { EntityCardConfig } from './entity-card';

// ---------------------------------------------------------------------------
// Helper — defaults to titleField:'title', subtitleField:'description'
// ---------------------------------------------------------------------------
function cfg(
  icon: EntityIconKey,
  detailRoute: (orgId: string, itemId: string) => string,
  overrides?: Partial<Pick<EntityCardConfig, 'titleField' | 'subtitleField' | 'imageField' | 'statusField'>>,
): EntityCardConfig {
  return { icon, titleField: 'title', subtitleField: 'description', ...overrides, detailRoute };
}

// ---------------------------------------------------------------------------
// Admin configs (26)
// ---------------------------------------------------------------------------
export const ADMIN_CONFIGS = {
  workflow: cfg('workflow', (o, i) => `/admin/workflow/${o}/${i}`, {
    statusField: 'status',
  }),
  task: cfg('task', (o, i) => `/admin/task/${o}/${i}`, {
    statusField: 'status',
  }),
  evidence: cfg('evidence', (o, i) => `/admin/evidence/${o}/${i}`, {
    statusField: 'status',
  }),
  category: cfg('category', (o, i) => `/admin/category/${o}/${i}`),
  vendor: cfg('vendor', (o, i) => `/admin/vendor/${o}/${i}`, {
    titleField: 'name',
    subtitleField: (item: any) => item.contactPerson || item.email,
  }),
  quote: cfg('quote', (o, i) => `/admin/quote/${o}/${i}`, {
    statusField: 'status',
  }),
  workorder: cfg('workorder', (o, i) => `/admin/workorder/${o}/${i}`, {
    statusField: 'status',
  }),
  invoice: cfg('invoice', (o, i) => `/admin/invoice/${o}/${i}`, {
    statusField: 'status',
  }),
  announcement: cfg('announcement', (o, i) => `/admin/announcement/${o}/${i}`),
  meeting: cfg('meeting', (o, i) => `/admin/meeting/${o}/${i}`, {
    subtitleField: 'agenda',
  }),
  vote: cfg('vote', (o, i) => `/admin/vote/${o}/${i}`, {
    titleField: 'question',
    subtitleField: undefined,
    statusField: (item: any) => (item.closed ? 'CLOSED' : 'OPEN'),
  }),
  userRequest: cfg('userRequest', (o, i) => `/admin/user-request/${o}/${i}`, {
    statusField: (item: any) =>
      item.isApproved ? 'APPROVED' : item.isRejected ? 'REJECTED' : 'PENDING',
  }),
  booking: cfg('booking', (o, i) => `/admin/booking/${o}/${i}`, {
    statusField: (item: any) =>
      item.isApproved ? 'APPROVED' : item.isRejected ? 'REJECTED' : 'PENDING',
  }),
  bookingType: cfg('bookingType', (o, i) => `/admin/booking-type/${o}/${i}`),
  asset: cfg('asset', (o, i) => `/admin/asset/${o}/${i}`),
  assetType: cfg('assetType', (o, i) => `/admin/asset-type/${o}/${i}`),
  document: cfg('document', (o, i) => `/admin/document/${o}/${i}`),
  event: cfg('event', (o, i) => `/admin/event/${o}/${i}`),
  eventType: cfg('eventType', (o, i) => `/admin/event-type/${o}/${i}`),
  information: cfg('information', (o, i) => `/admin/information/${o}/${i}`),
  group: cfg('group', (o, i) => `/admin/group/${o}/${i}`),
  user: cfg('user', (o, i) => `/admin/user/${o}/${i}`, {
    titleField: (item: any) => item.user?.name || item.user?.email || 'Unknown User',
    subtitleField: 'role',
    imageField: (item: any) => item.user?.image,
  }),
  financialYear: cfg('financialYear', (o, i) => `/admin/fy/${o}/${i}`, {
    titleField: (item: any) => {
      const from = item.from ? new Date(item.from).getFullYear() : '';
      const to = item.to ? new Date(item.to).getFullYear() : '';
      return from && to ? `FY ${from} – ${to}` : 'Financial Year';
    },
    subtitleField: undefined,
    statusField: (item: any) => (item.isCurrent ? 'CURRENT' : undefined),
  }),
  budget: cfg('budget', (o, i) => `/admin/budget/${o}/${i}`, {
    subtitleField: (item: any) =>
      item.amount != null ? `$${Number(item.amount).toLocaleString()}` : undefined,
    statusField: (item: any) => (item.isApproved ? 'APPROVED' : 'PENDING'),
  }),
  chartOfAccount: cfg('chartOfAccount', (o, i) => `/admin/coa/${o}/${i}`, {
    subtitleField: (item: any) => (item.code ? `Code: ${item.code}` : item.description),
    statusField: 'accountType',
  }),
  ledger: cfg('ledger', (o, i) => `/admin/ledger/${o}/${i}`),
};

// ---------------------------------------------------------------------------
// View configs (8)
// ---------------------------------------------------------------------------
export const VIEW_CONFIGS = {
  announcement: cfg('announcement', (o, i) => `/view/announcement/${o}/${i}`),
  meeting: cfg('meeting', (o, i) => `/view/meeting/${o}/${i}`, {
    subtitleField: 'agenda',
  }),
  vote: cfg('vote', (o, i) => `/view/vote/${o}/${i}`, {
    titleField: 'question',
    subtitleField: undefined,
    statusField: (item: any) => (item.closed ? 'CLOSED' : 'OPEN'),
  }),
  information: cfg('information', (o, i) => `/view/information/${o}/${i}`),
  event: cfg('event', (o, i) => `/view/event/${o}/${i}`),
  booking: cfg('booking', (o, i) => `/view/booking/${o}/${i}`, {
    statusField: (item: any) =>
      item.isApproved ? 'APPROVED' : item.isRejected ? 'REJECTED' : 'PENDING',
  }),
  group: cfg('group', (o, i) => `/view/group/${o}/${i}`),
  userRequest: cfg('userRequest', (o, i) => `/view/user-request/${o}/${i}`, {
    statusField: (item: any) =>
      item.isApproved ? 'APPROVED' : item.isRejected ? 'REJECTED' : 'PENDING',
  }),
};
