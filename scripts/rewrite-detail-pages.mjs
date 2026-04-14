/**
 * Rewrites all admin + view detail pages with the new detail component system.
 * Run: node scripts/rewrite-detail-pages.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE = path.resolve(__dirname, '..');

// ── Entity features ──────────────────────────────────────────────
// features: attachments, comments, images, pdf, timeline, history
const FULL_FEATURES = ['attachments', 'comments', 'images', 'pdf', 'timeline', 'history'];
const NO_ENTITY_MODS = []; // no entity modals

// ── Helper: format date util ─────────────────────────────────────
const FMT = `function fmt(d) { if (!d) return '—'; return new Date(d).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' }); }`;

// ── Admin detail page definitions ────────────────────────────────
const ADMIN_PAGES = [
  {
    file: 'app/admin/workflow/[orgId]/[id].tsx',
    name: 'Workflow',
    entityKey: 'workflow',
    hook: 'useWorkflow',
    hookImport: '@/services/workflow',
    listRoute: (o) => `/admin/workflows/${o}`,
    editRoute: (o, i) => `/admin/workflow/${o}/${i}/edit`,
    titleField: 'title',
    features: FULL_FEATURES,
    sections: (item, orgId) => [
      { type: 'status', field: 'status' },
      { type: 'html', field: 'description', label: 'Description' },
      { type: 'section', title: 'Details', fields: [
        { type: 'field', label: 'Priority', value: `item.priority` },
        { type: 'field', label: 'Archived', value: `item.archived ? 'Yes' : 'No'` },
        { type: 'field', label: 'Flagged', value: `item.isFlagged ? 'Yes' : 'No'` },
      ]},
      { type: 'section', title: 'Relationships', fields: [
        { type: 'linked', label: 'Category', icon: 'category', value: `item.category?.title`, route: `\`/admin/category/\${orgId}/\${item.category?._id}\`` },
        { type: 'linked', label: 'Assigned User', icon: 'user', value: `item.user?.user?.name || item.user?.user?.email`, route: `\`/admin/user/\${orgId}/\${item.user?._id}\`` },
        { type: 'linked', label: 'Group', icon: 'group', value: `item.group?.title`, route: `\`/admin/group/\${orgId}/\${item.group?._id}\`` },
      ]},
    ],
  },
  {
    file: 'app/admin/task/[orgId]/[id].tsx',
    name: 'Task',
    entityKey: 'task',
    hook: 'useTask',
    hookImport: '@/services/task',
    listRoute: (o) => `/admin/tasks/${o}`,
    editRoute: (o, i) => `/admin/task/${o}/${i}/edit`,
    titleField: 'title',
    features: FULL_FEATURES,
    sections: () => [
      { type: 'status', field: 'status' },
      { type: 'html', field: 'description', label: 'Description' },
      { type: 'section', title: 'Details', fields: [
        { type: 'field', label: 'Archived', value: `item.archived ? 'Yes' : 'No'` },
        { type: 'field', label: 'Flagged', value: `item.isFlagged ? 'Yes' : 'No'` },
      ]},
      { type: 'section', title: 'Relationships', fields: [
        { type: 'linked', label: 'Assigned User', icon: 'user', value: `item.user?.user?.name || item.user?.user?.email`, route: `\`/admin/user/\${orgId}/\${item.user?._id}\`` },
        { type: 'linked', label: 'Workflow', icon: 'workflow', value: `item.workflow?.title`, route: `\`/admin/workflow/\${orgId}/\${item.workflow?._id}\`` },
      ]},
    ],
  },
  {
    file: 'app/admin/evidence/[orgId]/[id].tsx',
    name: 'Evidence',
    entityKey: 'evidence',
    hook: 'useEvidence',
    hookImport: '@/services/evidence',
    listRoute: (o) => `/admin/evidences/${o}`,
    editRoute: (o, i) => `/admin/evidence/${o}/${i}/edit`,
    titleField: 'title',
    features: FULL_FEATURES,
    sections: () => [
      { type: 'status', field: 'status' },
      { type: 'html', field: 'description', label: 'Description' },
      { type: 'section', title: 'Details', fields: [
        { type: 'field', label: 'For Resolution', value: `item.forResolution ? 'Yes' : 'No'` },
        { type: 'field', label: 'Archived', value: `item.archived ? 'Yes' : 'No'` },
        { type: 'field', label: 'Flagged', value: `item.isFlagged ? 'Yes' : 'No'` },
      ]},
      { type: 'section', title: 'Relationships', fields: [
        { type: 'linked', label: 'Vendor', icon: 'vendor', value: `item.vendor?.name`, route: `\`/admin/vendor/\${orgId}/\${item.vendor?._id}\`` },
        { type: 'linked', label: 'Workflow', icon: 'workflow', value: `item.workflow?.title`, route: `\`/admin/workflow/\${orgId}/\${item.workflow?._id}\`` },
      ]},
    ],
  },
  {
    file: 'app/admin/category/[orgId]/[id].tsx',
    name: 'Category',
    entityKey: 'category',
    hook: 'useCategory',
    hookImport: '@/services/category',
    listRoute: (o) => `/admin/categories/${o}`,
    editRoute: (o, i) => `/admin/category/${o}/${i}/edit`,
    titleField: 'title',
    features: NO_ENTITY_MODS,
    sections: () => [
      { type: 'html', field: 'description', label: 'Description' },
    ],
  },
  {
    file: 'app/admin/vendor/[orgId]/[id].tsx',
    name: 'Vendor',
    entityKey: 'vendor',
    hook: 'useVendor',
    hookImport: '@/services/vendor',
    listRoute: (o) => `/admin/vendors/${o}`,
    editRoute: (o, i) => `/admin/vendor/${o}/${i}/edit`,
    titleField: 'name',
    features: ['comments', 'timeline'],
    sections: () => [
      { type: 'section', title: 'Contact', fields: [
        { type: 'field', label: 'Email', value: `item.email` },
        { type: 'field', label: 'Contact Person', value: `item.contactPerson` },
        { type: 'field', label: 'Contact Number', value: `item.contactNumber` },
        { type: 'field', label: 'Address', value: `item.address` },
      ]},
      { type: 'section', title: 'Business', fields: [
        { type: 'field', label: 'Tax Number', value: `item.tax` },
        { type: 'field', label: 'Reference', value: `item.ref` },
        { type: 'field', label: 'Archived', value: `item.archived ? 'Yes' : 'No'` },
      ]},
    ],
  },
  {
    file: 'app/admin/quote/[orgId]/[id].tsx',
    name: 'Quote',
    entityKey: 'quote',
    hook: 'useQuote',
    hookImport: '@/services/quote',
    listRoute: (o) => `/admin/quotes/${o}`,
    editRoute: (o, i) => `/admin/quote/${o}/${i}/edit`,
    titleField: 'title',
    features: FULL_FEATURES,
    sections: () => [
      { type: 'status', field: 'status' },
      { type: 'html', field: 'description', label: 'Description' },
      { type: 'html', field: 'vendorDescription', label: 'Vendor Description' },
      { type: 'section', title: 'Financial', fields: [
        { type: 'field', label: 'Budget', value: `item.budget != null ? '$' + Number(item.budget).toLocaleString() : null` },
        { type: 'field', label: 'Amount', value: `item.amount != null ? '$' + Number(item.amount).toLocaleString() : null` },
        { type: 'field', label: 'Submitted', value: `fmt(item.submittedAt)` },
        { type: 'field', label: 'Approved', value: `fmt(item.approvedAt)` },
        { type: 'field', label: 'Approved By', value: `item.approvedBy` },
      ]},
      { type: 'section', title: 'Details', fields: [
        { type: 'field', label: 'Archived', value: `item.archived ? 'Yes' : 'No'` },
        { type: 'field', label: 'Flagged', value: `item.isFlagged ? 'Yes' : 'No'` },
      ]},
      { type: 'section', title: 'Relationships', fields: [
        { type: 'linked', label: 'Vendor', icon: 'vendor', value: `item.vendor?.name`, route: `\`/admin/vendor/\${orgId}/\${item.vendor?._id}\`` },
        { type: 'linked', label: 'Workflow', icon: 'workflow', value: `item.workflow?.title`, route: `\`/admin/workflow/\${orgId}/\${item.workflow?._id}\`` },
      ]},
    ],
  },
  {
    file: 'app/admin/workorder/[orgId]/[id].tsx',
    name: 'Work Order',
    entityKey: 'workorder',
    hook: 'useWorkorder',
    hookImport: '@/services/workorder',
    listRoute: (o) => `/admin/workorders/${o}`,
    editRoute: (o, i) => `/admin/workorder/${o}/${i}/edit`,
    titleField: 'title',
    features: FULL_FEATURES,
    sections: () => [
      { type: 'status', field: 'status' },
      { type: 'html', field: 'description', label: 'Description' },
      { type: 'section', title: 'Schedule', fields: [
        { type: 'field', label: 'Start Date', value: `fmt(item.startDate)` },
        { type: 'field', label: 'End Date', value: `fmt(item.endDate)` },
      ]},
      { type: 'section', title: 'Details', fields: [
        { type: 'field', label: 'Archived', value: `item.archived ? 'Yes' : 'No'` },
        { type: 'field', label: 'Flagged', value: `item.isFlagged ? 'Yes' : 'No'` },
      ]},
      { type: 'section', title: 'Relationships', fields: [
        { type: 'linked', label: 'Vendor', icon: 'vendor', value: `item.vendor?.name`, route: `\`/admin/vendor/\${orgId}/\${item.vendor?._id}\`` },
        { type: 'linked', label: 'Quote', icon: 'quote', value: `item.quote?.title`, route: `\`/admin/quote/\${orgId}/\${item.quote?._id}\`` },
        { type: 'linked', label: 'Workflow', icon: 'workflow', value: `item.workflow?.title`, route: `\`/admin/workflow/\${orgId}/\${item.workflow?._id}\`` },
      ]},
    ],
  },
  {
    file: 'app/admin/invoice/[orgId]/[id].tsx',
    name: 'Invoice',
    entityKey: 'invoice',
    hook: 'useInvoice',
    hookImport: '@/services/invoice',
    listRoute: (o) => `/admin/invoices/${o}`,
    editRoute: (o, i) => `/admin/invoice/${o}/${i}/edit`,
    titleField: 'title',
    features: FULL_FEATURES,
    sections: () => [
      { type: 'status', field: 'status' },
      { type: 'html', field: 'description', label: 'Description' },
      { type: 'section', title: 'Financial', fields: [
        { type: 'field', label: 'Total Amount', value: `item.totalAmount != null ? '$' + Number(item.totalAmount).toLocaleString() : null` },
        { type: 'field', label: 'Is Expense', value: `item.isExpense ? 'Yes' : 'No'` },
        { type: 'field', label: 'Due Date', value: `fmt(item.dueDate)` },
        { type: 'field', label: 'Paid At', value: `fmt(item.paidAt)` },
        { type: 'field', label: 'Link', value: `item.link` },
      ]},
      { type: 'section', title: 'Details', fields: [
        { type: 'field', label: 'Archived', value: `item.archived ? 'Yes' : 'No'` },
        { type: 'field', label: 'Flagged', value: `item.isFlagged ? 'Yes' : 'No'` },
      ]},
      { type: 'section', title: 'Relationships', fields: [
        { type: 'linked', label: 'Vendor', icon: 'vendor', value: `item.vendor?.name`, route: `\`/admin/vendor/\${orgId}/\${item.vendor?._id}\`` },
        { type: 'linked', label: 'Quote', icon: 'quote', value: `item.quote?.title`, route: `\`/admin/quote/\${orgId}/\${item.quote?._id}\`` },
        { type: 'linked', label: 'Work Order', icon: 'workorder', value: `item.workorder?.title`, route: `\`/admin/workorder/\${orgId}/\${item.workorder?._id}\`` },
        { type: 'linked', label: 'Workflow', icon: 'workflow', value: `item.workflow?.title`, route: `\`/admin/workflow/\${orgId}/\${item.workflow?._id}\`` },
        { type: 'linked', label: 'Transaction', icon: 'financialYear', value: `item.transaction?.description`, route: null },
      ]},
    ],
  },
  {
    file: 'app/admin/announcement/[orgId]/[id].tsx',
    name: 'Announcement',
    entityKey: 'announcement',
    hook: 'useAnnouncement',
    hookImport: '@/services/announcement',
    listRoute: (o) => `/admin/announcements/${o}`,
    editRoute: (o, i) => `/admin/announcement/${o}/${i}/edit`,
    titleField: 'title',
    features: NO_ENTITY_MODS,
    sections: () => [
      { type: 'html', field: 'description', label: 'Description' },
      { type: 'section', title: 'Details', fields: [
        { type: 'field', label: 'All Users', value: `item.allUsers ? 'Yes' : 'No'` },
      ]},
      { type: 'section', title: 'Relationships', fields: [
        { type: 'linked', label: 'Group', icon: 'group', value: `item.group?.title`, route: `\`/admin/group/\${orgId}/\${item.group?._id}\`` },
      ]},
    ],
  },
  {
    file: 'app/admin/meeting/[orgId]/[id].tsx',
    name: 'Meeting',
    entityKey: 'meeting',
    hook: 'useMeeting',
    hookImport: '@/services/meeting',
    listRoute: (o) => `/admin/meetings/${o}`,
    editRoute: (o, i) => `/admin/meeting/${o}/${i}/edit`,
    titleField: 'title',
    features: ['attachments', 'comments', 'pdf'],
    sections: () => [
      { type: 'html', field: 'agenda', label: 'Agenda' },
      { type: 'html', field: 'details', label: 'Details' },
      { type: 'html', field: 'mom', label: 'Minutes of Meeting' },
      { type: 'section', title: 'Schedule', fields: [
        { type: 'field', label: 'Date', value: `fmt(item.meetingDate)` },
        { type: 'field', label: 'Time', value: `fmt(item.meetingTime)` },
        { type: 'field', label: 'Duration', value: `item.duration ? item.duration + ' min' : null` },
      ]},
      { type: 'section', title: 'Links', fields: [
        { type: 'field', label: 'Teams Link', value: `item.teamsLink` },
        { type: 'field', label: 'Meet Link', value: `item.meetLink` },
      ]},
      { type: 'section', title: 'Details', fields: [
        { type: 'field', label: 'All Users', value: `item.allUsers ? 'Yes' : 'No'` },
        { type: 'field', label: 'Archived', value: `item.archived ? 'Yes' : 'No'` },
      ]},
      { type: 'section', title: 'Relationships', fields: [
        { type: 'linked', label: 'Group', icon: 'group', value: `item.group?.title`, route: `\`/admin/group/\${orgId}/\${item.group?._id}\`` },
      ]},
    ],
  },
  {
    file: 'app/admin/vote/[orgId]/[id].tsx',
    name: 'Vote',
    entityKey: 'vote',
    hook: 'useVote',
    hookImport: '@/services/vote',
    listRoute: (o) => `/admin/votes/${o}`,
    editRoute: (o, i) => `/admin/vote/${o}/${i}/edit`,
    titleField: 'question',
    features: ['timeline'],
    sections: () => [
      { type: 'section', title: 'Details', fields: [
        { type: 'field', label: 'Options', value: `item.options` },
        { type: 'field', label: 'Status', value: `item.closed ? 'Closed' : 'Open'` },
        { type: 'field', label: 'All Users', value: `item.allUsers ? 'Yes' : 'No'` },
        { type: 'field', label: 'End Date', value: `fmt(item.endDate)` },
      ]},
      { type: 'section', title: 'Relationships', fields: [
        { type: 'linked', label: 'Group', icon: 'group', value: `item.group?.title`, route: `\`/admin/group/\${orgId}/\${item.group?._id}\`` },
        { type: 'linked', label: 'Workflow', icon: 'workflow', value: `item.workflow?.title`, route: `\`/admin/workflow/\${orgId}/\${item.workflow?._id}\`` },
      ]},
    ],
  },
  {
    file: 'app/admin/user-request/[orgId]/[id].tsx',
    name: 'User Request',
    entityKey: 'userRequest',
    hook: 'useUserRequest',
    hookImport: '@/services/user-request',
    listRoute: (o) => `/admin/user-requests/${o}`,
    editRoute: (o, i) => `/admin/user-request/${o}/${i}/edit`,
    titleField: 'title',
    features: NO_ENTITY_MODS,
    sections: () => [
      { type: 'html', field: 'description', label: 'Description' },
      { type: 'section', title: 'Status', fields: [
        { type: 'field', label: 'Approved', value: `item.isApproved ? 'Yes' : 'No'` },
        { type: 'field', label: 'Approved By', value: `item.approvedBy` },
        { type: 'field', label: 'Rejected', value: `item.isRejected ? 'Yes' : 'No'` },
        { type: 'field', label: 'Rejected By', value: `item.rejectedBy` },
      ]},
    ],
  },
  {
    file: 'app/admin/booking/[orgId]/[id].tsx',
    name: 'Booking',
    entityKey: 'booking',
    hook: 'useBooking',
    hookImport: '@/services/booking',
    listRoute: (o) => `/admin/bookings/${o}`,
    editRoute: (o, i) => `/admin/booking/${o}/${i}/edit`,
    titleField: 'title',
    features: NO_ENTITY_MODS,
    sections: () => [
      { type: 'html', field: 'description', label: 'Description' },
      { type: 'section', title: 'Schedule', fields: [
        { type: 'field', label: 'From', value: `fmt(item.bookingDateFrom)` },
        { type: 'field', label: 'Time From', value: `fmt(item.bookingTimeFrom)` },
        { type: 'field', label: 'To', value: `fmt(item.bookingDateTo)` },
        { type: 'field', label: 'Time To', value: `fmt(item.bookingTimeTo)` },
        { type: 'field', label: 'Full Day', value: `item.isFullDay ? 'Yes' : 'No'` },
      ]},
      { type: 'section', title: 'Approval', fields: [
        { type: 'field', label: 'Approved', value: `item.isApproved ? 'Yes' : 'No'` },
        { type: 'field', label: 'Approved By', value: `item.approvedBy` },
        { type: 'field', label: 'Rejected', value: `item.isRejected ? 'Yes' : 'No'` },
        { type: 'field', label: 'Rejected By', value: `item.rejectedBy` },
      ]},
      { type: 'section', title: 'Relationships', fields: [
        { type: 'linked', label: 'Booking Type', icon: 'bookingType', value: `item.bookingType?.title`, route: `\`/admin/booking-type/\${orgId}/\${item.bookingType?._id}\`` },
      ]},
    ],
  },
  {
    file: 'app/admin/booking-type/[orgId]/[id].tsx',
    name: 'Booking Type',
    entityKey: 'bookingType',
    hook: 'useBookingType',
    hookImport: '@/services/booking-type',
    listRoute: (o) => `/admin/booking-types/${o}`,
    editRoute: (o, i) => `/admin/booking-type/${o}/${i}/edit`,
    titleField: 'title',
    features: NO_ENTITY_MODS,
    sections: () => [
      { type: 'html', field: 'description', label: 'Description' },
    ],
  },
  {
    file: 'app/admin/asset/[orgId]/[id].tsx',
    name: 'Asset',
    entityKey: 'asset',
    hook: 'useAsset',
    hookImport: '@/services/asset',
    listRoute: (o) => `/admin/assets/${o}`,
    editRoute: (o, i) => `/admin/asset/${o}/${i}/edit`,
    titleField: 'title',
    features: ['attachments', 'comments', 'images', 'pdf', 'timeline'],
    sections: () => [
      { type: 'html', field: 'description', label: 'Description' },
      { type: 'section', title: 'Specifications', fields: [
        { type: 'field', label: 'Location', value: `item.location` },
        { type: 'field', label: 'Type', value: `item.type` },
        { type: 'field', label: 'Model', value: `item.model` },
        { type: 'field', label: 'Serial', value: `item.serial` },
        { type: 'field', label: 'Lifespan', value: `item.lifespan` },
        { type: 'field', label: 'Mfg Date', value: `fmt(item.mfgDate)` },
        { type: 'field', label: 'Expiry Date', value: `fmt(item.expiryDate)` },
        { type: 'field', label: 'Other', value: `item.other` },
      ]},
      { type: 'section', title: 'Details', fields: [
        { type: 'field', label: 'Archived', value: `item.archived ? 'Yes' : 'No'` },
        { type: 'field', label: 'Flagged', value: `item.isFlagged ? 'Yes' : 'No'` },
      ]},
      { type: 'section', title: 'Relationships', fields: [
        { type: 'linked', label: 'Asset Type', icon: 'assetType', value: `item.assetType?.title`, route: `\`/admin/asset-type/\${orgId}/\${item.assetType?._id}\`` },
      ]},
    ],
  },
  {
    file: 'app/admin/asset-type/[orgId]/[id].tsx',
    name: 'Asset Type',
    entityKey: 'assetType',
    hook: 'useAssetType',
    hookImport: '@/services/asset-type',
    listRoute: (o) => `/admin/asset-types/${o}`,
    editRoute: (o, i) => `/admin/asset-type/${o}/${i}/edit`,
    titleField: 'title',
    features: NO_ENTITY_MODS,
    sections: () => [
      { type: 'html', field: 'description', label: 'Description' },
    ],
  },
  {
    file: 'app/admin/document/[orgId]/[id].tsx',
    name: 'Document',
    entityKey: 'document',
    hook: 'useDocument',
    hookImport: '@/services/document',
    listRoute: (o) => `/admin/documents/${o}`,
    editRoute: (o, i) => `/admin/document/${o}/${i}/edit`,
    titleField: 'title',
    features: ['attachments', 'comments', 'images', 'pdf', 'timeline'],
    sections: () => [
      { type: 'html', field: 'description', label: 'Description' },
      { type: 'section', title: 'Details', fields: [
        { type: 'field', label: 'Archived', value: `item.archived ? 'Yes' : 'No'` },
        { type: 'field', label: 'Flagged', value: `item.isFlagged ? 'Yes' : 'No'` },
      ]},
      { type: 'section', title: 'Relationships', fields: [
        { type: 'linked', label: 'Folder', icon: 'document', value: `item.folder?.name`, route: null },
      ]},
    ],
  },
  {
    file: 'app/admin/event/[orgId]/[id].tsx',
    name: 'Event',
    entityKey: 'event',
    hook: 'useEvent',
    hookImport: '@/services/event',
    listRoute: (o) => `/admin/events/${o}`,
    editRoute: (o, i) => `/admin/event/${o}/${i}/edit`,
    titleField: 'title',
    features: NO_ENTITY_MODS,
    sections: () => [
      { type: 'html', field: 'description', label: 'Description' },
      { type: 'section', title: 'Schedule', fields: [
        { type: 'field', label: 'From', value: `fmt(item.eventDateFrom)` },
        { type: 'field', label: 'Time From', value: `fmt(item.eventTimeFrom)` },
        { type: 'field', label: 'To', value: `fmt(item.eventDateTo)` },
        { type: 'field', label: 'Time To', value: `fmt(item.eventTimeTo)` },
        { type: 'field', label: 'Full Day', value: `item.isFullDay ? 'Yes' : 'No'` },
      ]},
      { type: 'section', title: 'Recurrence', fields: [
        { type: 'field', label: 'Recurring', value: `item.isRecurring ? 'Yes' : 'No'` },
        { type: 'field', label: 'Frequency', value: `item.frequency` },
        { type: 'field', label: 'Interval', value: `item.interval ? String(item.interval) : null` },
      ]},
      { type: 'section', title: 'Relationships', fields: [
        { type: 'linked', label: 'Event Type', icon: 'eventType', value: `item.eventType?.title`, route: `\`/admin/event-type/\${orgId}/\${item.eventType?._id}\`` },
      ]},
    ],
  },
  {
    file: 'app/admin/event-type/[orgId]/[id].tsx',
    name: 'Event Type',
    entityKey: 'eventType',
    hook: 'useEventType',
    hookImport: '@/services/event-type',
    listRoute: (o) => `/admin/event-types/${o}`,
    editRoute: (o, i) => `/admin/event-type/${o}/${i}/edit`,
    titleField: 'title',
    features: NO_ENTITY_MODS,
    sections: () => [
      { type: 'html', field: 'description', label: 'Description' },
      { type: 'section', title: 'Details', fields: [
        { type: 'field', label: 'Color', value: `item.color` },
      ]},
    ],
  },
  {
    file: 'app/admin/information/[orgId]/[id].tsx',
    name: 'Information',
    entityKey: 'information',
    hook: 'useInformation',
    hookImport: '@/services/information',
    listRoute: (o) => `/admin/informations/${o}`,
    editRoute: (o, i) => `/admin/information/${o}/${i}/edit`,
    titleField: 'title',
    features: ['attachments', 'pdf'],
    sections: () => [
      { type: 'html', field: 'description', label: 'Description' },
    ],
  },
  {
    file: 'app/admin/group/[orgId]/[id].tsx',
    name: 'Group',
    entityKey: 'group',
    hook: 'useGroup',
    hookImport: '@/services/group',
    listRoute: (o) => `/admin/groups/${o}`,
    editRoute: (o, i) => `/admin/group/${o}/${i}/edit`,
    titleField: 'title',
    features: NO_ENTITY_MODS,
    sections: () => [
      { type: 'html', field: 'description', label: 'Description' },
      { type: 'section', title: 'Details', fields: [
        { type: 'field', label: 'Archived', value: `item.archived ? 'Yes' : 'No'` },
      ]},
    ],
  },
  {
    file: 'app/admin/user/[orgId]/[id].tsx',
    name: 'User',
    entityKey: 'user',
    hook: 'useUserRole',
    hookImport: '@/services/user',
    listRoute: (o) => `/admin/users/${o}`,
    editRoute: (o, i) => `/admin/user/${o}/${i}/edit`,
    titleField: `item.user?.name || item.user?.email || 'User'`,
    titleFieldIsExpr: true,
    features: NO_ENTITY_MODS,
    sections: () => [
      { type: 'section', title: 'User Info', fields: [
        { type: 'field', label: 'Name', value: `item.user?.name` },
        { type: 'field', label: 'Email', value: `item.user?.email` },
        { type: 'field', label: 'Phone', value: `item.user?.phone` },
        { type: 'field', label: 'Address', value: `item.user?.address` },
      ]},
      { type: 'section', title: 'Role', fields: [
        { type: 'field', label: 'Role', value: `item.role` },
        { type: 'field', label: 'Description', value: `item.description` },
        { type: 'field', label: 'Reference', value: `item.reference` },
        { type: 'field', label: 'Archived', value: `item.archived ? 'Yes' : 'No'` },
      ]},
    ],
  },
  {
    file: 'app/admin/fy/[orgId]/[id].tsx',
    name: 'Financial Year',
    entityKey: 'financialYear',
    hook: 'useFinancialYear',
    hookImport: '@/services/financial-year',
    listRoute: (o) => `/admin/financial-years/${o}`,
    editRoute: (o, i) => `/admin/fy/${o}/${i}/edit`,
    titleField: 'Financial Year',
    titleFieldIsExpr: false,
    titleIsStatic: true,
    features: NO_ENTITY_MODS,
    sections: () => [
      { type: 'section', title: 'Period', fields: [
        { type: 'field', label: 'From', value: `fmt(item.from)` },
        { type: 'field', label: 'To', value: `fmt(item.to)` },
        { type: 'field', label: 'Current', value: `item.isCurrent ? 'Yes' : 'No'` },
      ]},
    ],
  },
  {
    file: 'app/admin/coa/[orgId]/[id].tsx',
    name: 'Chart of Account',
    entityKey: 'chartOfAccount',
    hook: 'useChartOfAccount',
    hookImport: '@/services/chart-of-account',
    listRoute: (o) => `/admin/chart-of-accounts/${o}`,
    editRoute: (o, i) => `/admin/coa/${o}/${i}/edit`,
    titleField: 'title',
    features: NO_ENTITY_MODS,
    sections: () => [
      { type: 'html', field: 'description', label: 'Description' },
      { type: 'section', title: 'Account', fields: [
        { type: 'field', label: 'Code', value: `item.code` },
        { type: 'field', label: 'Account Type', value: `item.accountType` },
      ]},
    ],
  },
  {
    file: 'app/admin/budget/[orgId]/[id].tsx',
    name: 'Budget',
    entityKey: 'budget',
    hook: 'useBudget',
    hookImport: '@/services/budget',
    listRoute: (o) => `/admin/budgets/${o}`,
    editRoute: (o, i) => `/admin/budget/${o}/${i}/edit`,
    titleField: 'title',
    features: NO_ENTITY_MODS,
    sections: () => [
      { type: 'section', title: 'Financial', fields: [
        { type: 'field', label: 'Amount', value: `item.amount != null ? '$' + Number(item.amount).toLocaleString() : null` },
        { type: 'field', label: 'Approved', value: `item.isApproved ? 'Yes' : 'No'` },
      ]},
      { type: 'section', title: 'Relationships', fields: [
        { type: 'linked', label: 'Chart of Account', icon: 'chartOfAccount', value: `item.chartOfAccount?.title`, route: `\`/admin/coa/\${orgId}/\${item.chartOfAccount?._id}\`` },
        { type: 'linked', label: 'Financial Year', icon: 'financialYear', value: `item.financialYear ? fmt(item.financialYear.from) + ' – ' + fmt(item.financialYear.to) : null`, route: `\`/admin/fy/\${orgId}/\${item.financialYear?._id}\`` },
      ]},
    ],
  },
  {
    file: 'app/admin/ledger/[orgId]/[id].tsx',
    name: 'Ledger',
    entityKey: 'ledger',
    hook: 'useChartOfAccount',
    hookImport: '@/services/chart-of-account',
    listRoute: (o) => `/admin/ledgers/${o}`,
    editRoute: (o, i) => `/admin/ledger/${o}/${i}/edit`,
    titleField: 'title',
    features: NO_ENTITY_MODS,
    sections: () => [
      { type: 'html', field: 'description', label: 'Description' },
      { type: 'section', title: 'Account', fields: [
        { type: 'field', label: 'Code', value: `item.code` },
        { type: 'field', label: 'Account Type', value: `item.accountType` },
      ]},
    ],
  },
];

// ── View detail page definitions ─────────────────────────────────
const VIEW_PAGES = [
  {
    file: 'app/view/announcement/[orgId]/[id].tsx',
    name: 'Announcement',
    entityKey: 'announcement',
    hook: 'useAnnouncement',
    hookImport: '@/services/announcement',
    listRoute: (o) => `/view/announcements/${o}`,
    titleField: 'title',
    sections: () => [
      { type: 'html', field: 'description', label: 'Description' },
      { type: 'section', title: 'Details', fields: [
        { type: 'field', label: 'All Users', value: `item.allUsers ? 'Yes' : 'No'` },
      ]},
    ],
  },
  {
    file: 'app/view/meeting/[orgId]/[id].tsx',
    name: 'Meeting',
    entityKey: 'meeting',
    hook: 'useMeeting',
    hookImport: '@/services/meeting',
    listRoute: (o) => `/view/meetings/${o}`,
    titleField: 'title',
    sections: () => [
      { type: 'html', field: 'agenda', label: 'Agenda' },
      { type: 'html', field: 'details', label: 'Details' },
      { type: 'html', field: 'mom', label: 'Minutes of Meeting' },
      { type: 'section', title: 'Schedule', fields: [
        { type: 'field', label: 'Date', value: `fmt(item.meetingDate)` },
        { type: 'field', label: 'Time', value: `fmt(item.meetingTime)` },
        { type: 'field', label: 'Duration', value: `item.duration ? item.duration + ' min' : null` },
      ]},
      { type: 'section', title: 'Links', fields: [
        { type: 'field', label: 'Teams Link', value: `item.teamsLink` },
        { type: 'field', label: 'Meet Link', value: `item.meetLink` },
      ]},
    ],
  },
  {
    file: 'app/view/vote/[orgId]/[id].tsx',
    name: 'Vote',
    entityKey: 'vote',
    hook: 'useVote',
    hookImport: '@/services/vote',
    listRoute: (o) => `/view/votes/${o}`,
    titleField: 'question',
    sections: () => [
      { type: 'section', title: 'Details', fields: [
        { type: 'field', label: 'Options', value: `item.options` },
        { type: 'field', label: 'Status', value: `item.closed ? 'Closed' : 'Open'` },
        { type: 'field', label: 'All Users', value: `item.allUsers ? 'Yes' : 'No'` },
        { type: 'field', label: 'End Date', value: `fmt(item.endDate)` },
      ]},
    ],
  },
  {
    file: 'app/view/information/[orgId]/[id].tsx',
    name: 'Information',
    entityKey: 'information',
    hook: 'useInformation',
    hookImport: '@/services/information',
    listRoute: (o) => `/view/informations/${o}`,
    titleField: 'title',
    sections: () => [
      { type: 'html', field: 'description', label: 'Description' },
    ],
  },
  {
    file: 'app/view/event/[orgId]/[id].tsx',
    name: 'Event',
    entityKey: 'event',
    hook: 'useEvent',
    hookImport: '@/services/event',
    listRoute: (o) => `/view/events/${o}`,
    titleField: 'title',
    sections: () => [
      { type: 'html', field: 'description', label: 'Description' },
      { type: 'section', title: 'Schedule', fields: [
        { type: 'field', label: 'From', value: `fmt(item.eventDateFrom)` },
        { type: 'field', label: 'To', value: `fmt(item.eventDateTo)` },
        { type: 'field', label: 'Full Day', value: `item.isFullDay ? 'Yes' : 'No'` },
      ]},
    ],
  },
  {
    file: 'app/view/booking/[orgId]/[id].tsx',
    name: 'Booking',
    entityKey: 'booking',
    hook: 'useBooking',
    hookImport: '@/services/booking',
    listRoute: (o) => `/view/bookings/${o}`,
    titleField: 'title',
    sections: () => [
      { type: 'html', field: 'description', label: 'Description' },
      { type: 'section', title: 'Schedule', fields: [
        { type: 'field', label: 'From', value: `fmt(item.bookingDateFrom)` },
        { type: 'field', label: 'To', value: `fmt(item.bookingDateTo)` },
        { type: 'field', label: 'Full Day', value: `item.isFullDay ? 'Yes' : 'No'` },
      ]},
      { type: 'section', title: 'Status', fields: [
        { type: 'field', label: 'Approved', value: `item.isApproved ? 'Yes' : 'No'` },
        { type: 'field', label: 'Rejected', value: `item.isRejected ? 'Yes' : 'No'` },
      ]},
    ],
  },
  {
    file: 'app/view/group/[orgId]/[id].tsx',
    name: 'Group',
    entityKey: 'group',
    hook: 'useGroup',
    hookImport: '@/services/group',
    listRoute: (o) => `/view/groups/${o}`,
    titleField: 'title',
    sections: () => [
      { type: 'html', field: 'description', label: 'Description' },
    ],
  },
  {
    file: 'app/view/user-request/[orgId]/[id].tsx',
    name: 'User Request',
    entityKey: 'userRequest',
    hook: 'useUserRequest',
    hookImport: '@/services/user-request',
    listRoute: (o) => `/view/user-requests/${o}`,
    titleField: 'title',
    sections: () => [
      { type: 'html', field: 'description', label: 'Description' },
      { type: 'section', title: 'Status', fields: [
        { type: 'field', label: 'Approved', value: `item.isApproved ? 'Yes' : 'No'` },
        { type: 'field', label: 'Rejected', value: `item.isRejected ? 'Yes' : 'No'` },
      ]},
    ],
  },
];

// ─────────────────────────────────────────────────────────────────
// Generate body sections
// ─────────────────────────────────────────────────────────────────
function renderSections(sectionsDef) {
  const sections = typeof sectionsDef === 'function' ? sectionsDef() : sectionsDef;
  const lines = [];

  for (const sec of sections) {
    if (sec.type === 'status') {
      lines.push(`        <StatusBadge status={item.${sec.field}} />`);
    } else if (sec.type === 'html') {
      lines.push(`        {item.${sec.field} ? <HtmlContent label="${sec.label}" html={item.${sec.field}} /> : null}`);
    } else if (sec.type === 'section') {
      lines.push(`        <DetailSection title="${sec.title}">`);
      for (const f of sec.fields) {
        if (f.type === 'field') {
          lines.push(`          <DetailField label="${f.label}" value={${f.value}} />`);
        } else if (f.type === 'linked') {
          const routeStr = f.route ? `route={${f.route}}` : '';
          lines.push(`          <LinkedField label="${f.label}" icon="${f.icon}" value={${f.value}} ${routeStr} />`);
        }
      }
      lines.push(`        </DetailSection>`);
    }
  }
  return lines.join('\n');
}

// ─────────────────────────────────────────────────────────────────
// Feature-related imports, states, actions, and modals
// ─────────────────────────────────────────────────────────────────
function featureImports(features) {
  const imports = [];
  if (features.includes('attachments')) imports.push(`import { EntityAttachments } from '@/components/entity/entity-attachments';`);
  if (features.includes('comments')) imports.push(`import { EntityComments } from '@/components/entity/entity-comments';`);
  if (features.includes('images')) imports.push(`import { EntityImages } from '@/components/entity/entity-images';`);
  if (features.includes('pdf')) imports.push(`import { downloadAndSharePdf } from '@/utils/pdf-download';`);
  if (features.includes('timeline')) imports.push(`import { EntityTimeline } from '@/components/entity/entity-timeline';`);
  if (features.includes('history')) imports.push(`import { EntityHistory } from '@/components/entity/entity-history';`);
  return imports.join('\n');
}

function featureStates(features) {
  const states = [];
  if (features.includes('attachments')) states.push(`  const [showAttachments, setShowAttachments] = useState(false);`);
  if (features.includes('comments')) states.push(`  const [showComments, setShowComments] = useState(false);`);
  if (features.includes('images')) states.push(`  const [showImages, setShowImages] = useState(false);`);
  if (features.includes('timeline')) states.push(`  const [showTimeline, setShowTimeline] = useState(false);`);
  if (features.includes('history')) states.push(`  const [showHistory, setShowHistory] = useState(false);`);
  return states.join('\n');
}

function featureActions(features, entityKey, colors) {
  const actions = [];
  if (features.includes('attachments')) actions.push(`    { id: 'attachments', label: 'Attachments', icon: <Paperclip size={24} color={colors.primary} />, onPress: () => setShowAttachments(true), color: 'primary' as const },`);
  if (features.includes('comments')) actions.push(`    { id: 'comments', label: 'Comments', icon: <MessageSquare size={24} color={colors.primary} />, onPress: () => setShowComments(true), color: 'primary' as const },`);
  if (features.includes('images')) actions.push(`    { id: 'images', label: 'Images', icon: <ImageIcon size={24} color={colors.primary} />, onPress: () => setShowImages(true), color: 'primary' as const },`);
  if (features.includes('pdf')) actions.push(`    { id: 'pdf', label: 'Download PDF', icon: <FileDown size={24} color={colors.success} />, onPress: () => downloadAndSharePdf('${entityKey}', id || ''), color: 'success' as const },`);
  if (features.includes('timeline')) actions.push(`    { id: 'timeline', label: 'Timeline', icon: <Clock size={24} color={colors.secondary} />, onPress: () => setShowTimeline(true), color: 'primary' as const },`);
  if (features.includes('history')) actions.push(`    { id: 'history', label: 'History', icon: <History size={24} color={colors.secondary} />, onPress: () => setShowHistory(true), color: 'primary' as const },`);
  return actions.join('\n');
}

function featureModals(features, entityKey) {
  const modals = [];
  if (features.includes('attachments')) modals.push(`      <EntityAttachments isVisible={showAttachments} onClose={() => setShowAttachments(false)} entity={'${entityKey}'} entityId={id || ''} orgId={orgId || ''} />`);
  if (features.includes('comments')) modals.push(`      <EntityComments isVisible={showComments} onClose={() => setShowComments(false)} entity={'${entityKey}'} entityId={id || ''} orgId={orgId || ''} />`);
  if (features.includes('images')) modals.push(`      <EntityImages isVisible={showImages} onClose={() => setShowImages(false)} entity={'${entityKey}'} entityId={id || ''} orgId={orgId || ''} />`);
  if (features.includes('timeline')) modals.push(`      <EntityTimeline isVisible={showTimeline} onClose={() => setShowTimeline(false)} entity={'${entityKey}'} entityId={id || ''} />`);
  if (features.includes('history')) modals.push(`      <EntityHistory isVisible={showHistory} onClose={() => setShowHistory(false)} entity={'${entityKey}'} entityId={id || ''} />`);
  return modals.join('\n');
}

function featureIconImports(features) {
  const icons = new Set();
  if (features.includes('attachments')) icons.add('Paperclip');
  if (features.includes('comments')) icons.add('MessageSquare');
  if (features.includes('images')) icons.add('ImageIcon');
  if (features.includes('pdf')) icons.add('FileDown');
  if (features.includes('timeline')) icons.add('Clock');
  if (features.includes('history')) icons.add('History');
  return [...icons];
}

// ─────────────────────────────────────────────────────────────────
// Generate admin detail page
// ─────────────────────────────────────────────────────────────────
function generateAdminPage(def) {
  const featureIcons = featureIconImports(def.features);
  const allIcons = ['MoreVertical', 'Edit', 'ArchiveRestore', 'Share2', 'Trash2', 'Info', ...featureIcons];
  const uniqueIcons = [...new Set(allIcons)];

  const usesLinked = def.sections().some(s => s.fields?.some(f => f.type === 'linked'));
  const usesHtml = def.sections().some(s => s.type === 'html');
  const usesField = def.sections().some(s => s.fields?.some(f => f.type === 'field'));
  const usesSection = def.sections().some(s => s.type === 'section');
  const usesStatus = def.sections().some(s => s.type === 'status');
  const needsFmt = JSON.stringify(def.sections()).includes('fmt(');

  const detailImports = [];
  if (usesField) detailImports.push('DetailField');
  if (usesSection) detailImports.push('DetailSection');
  if (usesLinked) detailImports.push('LinkedField');
  if (usesHtml) detailImports.push('HtmlContent');
  detailImports.push('AuditInfo');

  let titleExpr;
  if (def.titleIsStatic) titleExpr = `'${def.titleField}'`;
  else if (def.titleFieldIsExpr) titleExpr = def.titleField;
  else titleExpr = `item?.${def.titleField} || item?.title || item?.name`;

  return `import { useThemeColors } from '@/hooks/use-theme-colors';
import { PageHeader } from '@/components/ui/page-header';
${usesStatus ? `import { StatusBadge } from '@/components/ui/status-badge';\n` : ''}import { ${detailImports.join(', ')} } from '@/components/details';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { ${uniqueIcons.join(', ')} } from 'lucide-react-native';
import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActionBottomSheet, ActionItem } from '@/components/sheets/action-bottom-sheet';
import { ConfirmationDialog } from '@/components/dialogs/confirmation-dialog';
import { useOrganisationContext } from '@/context/organisation-context';
${featureImports(def.features)}
import { ${def.hook} } from '${def.hookImport}';
import { useRefreshControl } from '@/hooks/use-refresh-control';
${needsFmt ? `\nfunction fmt(d: string | Date | undefined | null) { if (!d) return '—'; return new Date(d).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' }); }\n` : ''}
export default function ${def.name.replace(/\s+/g, '')}DetailScreen() {
  const { orgId, id } = useLocalSearchParams<{ orgId: string; id: string }>();
  const router = useRouter();
  const colors = useThemeColors();
  const { isAdmin } = useOrganisationContext();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [confirmationType, setConfirmationType] = useState<'delete' | 'archive' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAudit, setShowAudit] = useState(false);
${featureStates(def.features)}

  const { data: item, isLoading: isLoadingItem, refetch, isRefetching } = ${def.hook}(id || '');
  const refreshControl = useRefreshControl(refetch, isRefetching);

  const handleDelete = async () => {
    setIsProcessing(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsProcessing(false);
    setConfirmationType(null);
    router.push(\`${def.listRoute('${orgId}')}\`);
  };

  const handleArchive = async () => {
    setIsProcessing(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsProcessing(false);
    setConfirmationType(null);
    Alert.alert('Success', '${def.name} archived successfully');
  };

  const actions: ActionItem[] = [
    ...(isAdmin ? [{
      id: 'edit',
      label: 'Edit',
      icon: <Edit size={24} color={colors.primary} />,
      onPress: () => router.push(\`${def.editRoute('${orgId}', '${id}')}\`),
      color: 'primary' as const,
    }] : []),
    ...(isAdmin ? [{
      id: 'archive',
      label: 'Archive',
      icon: <ArchiveRestore size={24} color={colors.warning} />,
      onPress: () => setConfirmationType('archive'),
      color: 'warning' as const,
    }] : []),
${featureActions(def.features, def.entityKey)}
    { id: 'audit', label: 'Audit Info', icon: <Info size={24} color={colors.secondary} />, onPress: () => setShowAudit(true), color: 'primary' as const },
    {
      id: 'share',
      label: 'Share',
      icon: <Share2 size={24} color={colors.success} />,
      onPress: () => Alert.alert('Share', 'Share functionality coming soon'),
      color: 'success' as const,
    },
    ...(isAdmin ? [{
      id: 'delete',
      label: 'Delete',
      icon: <Trash2 size={24} color={colors.danger} />,
      onPress: () => setConfirmationType('delete'),
      color: 'danger' as const,
    }] : []),
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <Stack.Screen options={{ headerShown: false }} />
      <PageHeader
        title={${titleExpr} || 'Loading...'}
        rightAction={
          <Pressable onPress={() => setIsBottomSheetOpen(true)} style={{ padding: 8 }}>
            <MoreVertical size={20} color={colors.primary} />
          </Pressable>
        }
      />

      {isLoadingItem || !item ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={{ color: colors.sub, fontSize: 14, marginTop: 10 }}>Loading...</Text>
        </View>
      ) : (
      <ScrollView
        refreshControl={refreshControl}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 8, paddingBottom: 24, gap: 14 }}
        showsVerticalScrollIndicator={false}
      >
${renderSections(def.sections)}
      </ScrollView>
      )}

      <ActionBottomSheet isVisible={isBottomSheetOpen} onClose={() => setIsBottomSheetOpen(false)} actions={actions} />
      <ConfirmationDialog isOpen={confirmationType === 'delete'} onClose={() => setConfirmationType(null)} onConfirm={handleDelete} type="delete" isLoading={isProcessing} />
      <ConfirmationDialog isOpen={confirmationType === 'archive'} onClose={() => setConfirmationType(null)} onConfirm={handleArchive} type="archive" isLoading={isProcessing} />
      <AuditInfo isVisible={showAudit} onClose={() => setShowAudit(false)} createdBy={item?.createdBy} updatedBy={item?.updatedBy} createdAt={item?.createdAt} updatedAt={item?.updatedAt} />
${featureModals(def.features, def.entityKey)}
    </SafeAreaView>
  );
}
`;
}

// ─────────────────────────────────────────────────────────────────
// Generate view detail page (read-only, no admin actions)
// ─────────────────────────────────────────────────────────────────
function generateViewPage(def) {
  const usesLinked = def.sections().some(s => s.fields?.some(f => f.type === 'linked'));
  const usesHtml = def.sections().some(s => s.type === 'html');
  const usesField = def.sections().some(s => s.fields?.some(f => f.type === 'field'));
  const usesSection = def.sections().some(s => s.type === 'section');
  const usesStatus = def.sections().some(s => s.type === 'status');
  const needsFmt = JSON.stringify(def.sections()).includes('fmt(');

  const detailImports = [];
  if (usesField) detailImports.push('DetailField');
  if (usesSection) detailImports.push('DetailSection');
  if (usesLinked) detailImports.push('LinkedField');
  if (usesHtml) detailImports.push('HtmlContent');
  detailImports.push('AuditInfo');

  const icons = ['MoreVertical', 'Share2', 'Info'];

  return `import { useThemeColors } from '@/hooks/use-theme-colors';
import { PageHeader } from '@/components/ui/page-header';
${usesStatus ? `import { StatusBadge } from '@/components/ui/status-badge';\n` : ''}import { ${detailImports.join(', ')} } from '@/components/details';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { ${icons.join(', ')} } from 'lucide-react-native';
import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActionBottomSheet, ActionItem } from '@/components/sheets/action-bottom-sheet';
import { ${def.hook} } from '${def.hookImport}';
import { useRefreshControl } from '@/hooks/use-refresh-control';
${needsFmt ? `\nfunction fmt(d: string | Date | undefined | null) { if (!d) return '—'; return new Date(d).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' }); }\n` : ''}
export default function ${def.name.replace(/\s+/g, '')}DetailScreen() {
  const { orgId, id } = useLocalSearchParams<{ orgId: string; id: string }>();
  const router = useRouter();
  const colors = useThemeColors();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [showAudit, setShowAudit] = useState(false);

  const { data: item, isLoading: isLoadingItem, refetch, isRefetching } = ${def.hook}(id || '');
  const refreshControl = useRefreshControl(refetch, isRefetching);

  const actions: ActionItem[] = [
    { id: 'audit', label: 'Audit Info', icon: <Info size={24} color={colors.secondary} />, onPress: () => setShowAudit(true), color: 'primary' as const },
    {
      id: 'share',
      label: 'Share',
      icon: <Share2 size={24} color={colors.success} />,
      onPress: () => Alert.alert('Share', 'Share functionality coming soon'),
      color: 'success' as const,
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <Stack.Screen options={{ headerShown: false }} />
      <PageHeader
        title={item?.${def.titleField} || 'Loading...'}
        rightAction={
          <Pressable onPress={() => setIsBottomSheetOpen(true)} style={{ padding: 8 }}>
            <MoreVertical size={20} color={colors.primary} />
          </Pressable>
        }
      />

      {isLoadingItem || !item ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={{ color: colors.sub, fontSize: 14, marginTop: 10 }}>Loading...</Text>
        </View>
      ) : (
      <ScrollView
        refreshControl={refreshControl}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 8, paddingBottom: 24, gap: 14 }}
        showsVerticalScrollIndicator={false}
      >
${renderSections(def.sections)}
      </ScrollView>
      )}

      <ActionBottomSheet isVisible={isBottomSheetOpen} onClose={() => setIsBottomSheetOpen(false)} actions={actions} />
      <AuditInfo isVisible={showAudit} onClose={() => setShowAudit(false)} createdBy={item?.createdBy} updatedBy={item?.updatedBy} createdAt={item?.createdAt} updatedAt={item?.updatedAt} />
    </SafeAreaView>
  );
}
`;
}

// ─────────────────────────────────────────────────────────────────
// Write all
// ─────────────────────────────────────────────────────────────────
let updated = 0;

for (const def of ADMIN_PAGES) {
  const filePath = path.join(BASE, def.file);
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, generateAdminPage(def));
  console.log(`✓ ADMIN ${def.file}`);
  updated++;
}

for (const def of VIEW_PAGES) {
  const filePath = path.join(BASE, def.file);
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, generateViewPage(def));
  console.log(`✓ VIEW  ${def.file}`);
  updated++;
}

console.log(`\nDone: ${updated} detail pages rewritten`);
