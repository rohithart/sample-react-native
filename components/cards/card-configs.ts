import type { EntityIconKey } from '@/constants/entity-icons';
import type { EntityCardConfig } from './entity-card';
import { convertToLocalDateTimeString } from '@/utils/date';

function cfg(
  icon: EntityIconKey,
  detailRoute: (orgId: string, itemId: string) => string,
  overrides?: Partial<Pick<EntityCardConfig, 'titleField' | 'subtitleField' | 'imageField' | 'statusField'>>,
): EntityCardConfig {
  return { icon, titleField: 'title', subtitleField: 'description', ...overrides, detailRoute };
}

export const ADMIN_CONFIGS = {
  workflow: cfg('workflow', (o, i) => `/admin/workflow/${o}/${i}`, {
    subtitleField: (item: any) => {
      const u = typeof item.user === 'object' ? item.user?.user : undefined;
      return typeof u === 'object' ? (u?.name || u?.email || 'Unassigned') : 'Unassigned';
    },
    statusField: 'status',
  }),
  task: cfg('task', (o, i) => `/admin/task/${o}/${i}`, {
    subtitleField: (item: any) => {
      const u = typeof item.user === 'object' ? item.user?.user : undefined;
      return typeof u === 'object' ? (u?.name || u?.email || 'Unassigned') : 'Unassigned';
    },
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
    subtitleField: (item: any) =>
      typeof item.vendor === 'object' ? item.vendor?.name : undefined,
    statusField: 'status',
  }),
  workorder: cfg('workorder', (o, i) => `/admin/workorder/${o}/${i}`, {
    subtitleField: (item: any) =>
      typeof item.vendor === 'object' ? item.vendor?.name : undefined,
    statusField: 'status',
  }),
  invoice: cfg('invoice', (o, i) => `/admin/invoice/${o}/${i}`, {
    subtitleField: (item: any) =>
      typeof item.vendor === 'object' ? item.vendor?.name : undefined,
    statusField: 'status',
  }),
  announcement: cfg('announcement', (o, i) => `/admin/announcement/${o}/${i}`, {
    subtitleField: (item: any) => (item.group?.title ?? 'Everyone'),
  }),
  meeting: cfg('meeting', (o, i) => `/admin/meeting/${o}/${i}`, {
    subtitleField: (item) => item.meetingDate ? convertToLocalDateTimeString(item.meetingDate) : '',
  }),
  vote: cfg('vote', (o, i) => `/admin/vote/${o}/${i}`, {
    titleField: 'question',
    subtitleField: (item: any) => (item.group?.title ?? 'Everyone'),
    statusField: (item: any) => (item.closed ? 'CLOSED' : 'OPEN'),
  }),
  userRequest: cfg('userRequest', (o, i) => `/admin/user-request/${o}/${i}`, {
    statusField: (item: any) =>
      item.isApproved ? 'APPROVED' : item.isRejected ? 'REJECTED' : 'PENDING',
  }),
  booking: cfg('booking', (o, i) => `/admin/booking/${o}/${i}`, {
    subtitleField: (item: any) => {
      const from = item.bookingDateFrom ? convertToLocalDateTimeString(item.bookingDateFrom) : '';
      const to = item.bookingDateTo ? convertToLocalDateTimeString(item.bookingDateTo) : '';
      return from && to ? `${from} – ${to}` : from || to || 'Event';
    },
    statusField: (item: any) =>
      item.isApproved ? 'APPROVED' : item.isRejected ? 'REJECTED' : 'PENDING',
  }),
  bookingType: cfg('bookingType', (o, i) => `/admin/booking-type/${o}/${i}`),
  asset: cfg('asset', (o, i) => `/admin/asset/${o}/${i}`),
  assetType: cfg('assetType', (o, i) => `/admin/asset-type/${o}/${i}`),
  document: cfg('document', (o, i) => `/admin/document/${o}/${i}`),
  event: cfg('event', (o, i) => `/admin/event/${o}/${i}`, {
    subtitleField(item) {
      const from = item.eventDateFrom ? convertToLocalDateTimeString(item.eventDateFrom) : '';
      const to = item.eventDateTo ? convertToLocalDateTimeString(item.eventDateTo) : '';
      return from && to ? `${from} – ${to}` : from || to || 'Event';
    },
  }),
  eventType: cfg('eventType', (o, i) => `/admin/event-type/${o}/${i}`),
  information: cfg('information', (o, i) => `/admin/information/${o}/${i}`, {
    subtitleField: (item: any) => convertToLocalDateTimeString(item.createdAt),
  }),
  group: cfg('group', (o, i) => `/admin/group/${o}/${i}`),
  user: cfg('user', (o, i) => `/admin/user/${o}/${i}`, {
    titleField: (item: any) => item.user?.name || item.user?.email || '-',
    subtitleField: 'role',
    imageField: (item: any) => item.user?.image,
  }),
  financialYear: cfg('financialYear', (o, i) => `/admin/fy/${o}/${i}`, {
    titleField: (item: any) => {
      const from = item.from ? convertToLocalDateTimeString(item.from) : '';
      const to = item.to ? convertToLocalDateTimeString(item.to) : '';
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

export const ORGANISATION_CONFIG: EntityCardConfig = {
  icon: 'organisation',
  titleField: 'name',
  subtitleField: 'address',
  imageField: 'image',
  statusField: (item: any) => (item.isActive ? 'ACTIVE' : 'INACTIVE'),
  detailRoute: (_orgId: string, itemId: string) => `/view/${itemId}`,
};
export const VIEW_CONFIGS = {
  announcement: cfg('announcement', (o, i) => `/view/announcement/${o}/${i}`, {
    subtitleField: (item: any) => (item.group?.title ?? 'Everyone'),
  }),
  meeting: cfg('meeting', (o, i) => `/view/meeting/${o}/${i}`, {
    subtitleField: (item) => item.meetingDate ? convertToLocalDateTimeString(item.meetingDate) : '',
  }),
  vote: cfg('vote', (o, i) => `/view/vote/${o}/${i}`, {
    titleField: 'question',
    subtitleField: (item: any) => (item.group?.title ?? 'Everyone'),
    statusField: (item: any) => (item.closed ? 'CLOSED' : 'OPEN'),
  }),
  information: cfg('information', (o, i) => `/view/information/${o}/${i}`, {
    subtitleField: (item: any) => convertToLocalDateTimeString(item.createdAt),
  }),
  event: cfg('event', (o, i) => `/view/event/${o}/${i}`, {
    subtitleField: (item: any) => {
      const from = item.eventDateFrom ? convertToLocalDateTimeString(item.eventDateFrom) : '';
      const to = item.eventDateTo ? convertToLocalDateTimeString(item.eventDateTo) : '';
      return from && to ? `${from} – ${to}` : from || to || 'Event';
    }
  }),
  booking: cfg('booking', (o, i) => `/view/booking/${o}/${i}`, {
    subtitleField: (item: any) => {
      const from = item.bookingDateFrom ? convertToLocalDateTimeString(item.bookingDateFrom) : '';
      const to = item.bookingDateTo ? convertToLocalDateTimeString(item.bookingDateTo) : '';
      return from && to ? `${from} – ${to}` : from || to || 'Event';
    },
    statusField: (item: any) =>
      item.isApproved ? 'APPROVED' : item.isRejected ? 'REJECTED' : 'PENDING',
  }),
  group: cfg('group', (o, i) => `/view/chat/${o}/${i}`),
  userRequest: cfg('userRequest', (o, i) => `/view/user-request/${o}/${i}`, {
    subtitleField: () => undefined,
    statusField: (item: any) =>
      item.isApproved ? 'APPROVED' : item.isRejected ? 'REJECTED' : 'PENDING',
  }),
};
