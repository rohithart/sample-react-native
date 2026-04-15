import {
    EvidenceStatus,
    InvoiceStatus,
    QuoteStatus,
    TaskStatus,
    WorkflowStatus,
    WorkorderStatus,
} from '@/enums/status';

export interface StatusOption {
  label: string;
  value: string;
  color: string;
}

export const statusColors = {
  draft: '#B0BEC5',
  pending: '#FFE082',
  progress: '#90CAF9',
  requested: '#FFCCBC',
  received: '#A5D6A7',
  verified: '#81C784',
  blocked: '#EF9A9A',
  review: '#CE93D8',
  complete: '#C5E1A5',
  uploaded: '#B39DDB',
  paid: '#80CBC4',
  approved: '#b0e5b2',
  rejected: '#f1a0a0',
  expired: '#bcccd4',
  cancelled: '#E6EE9C',
} as const;

export const workflowStatuses: StatusOption[] = [
  { label: 'Draft', value: WorkflowStatus.DRAFT, color: statusColors.draft },
  { label: 'In Progress', value: WorkflowStatus.PROGRESS, color: statusColors.progress },
  { label: 'Blocked', value: WorkflowStatus.BLOCKED, color: statusColors.blocked },
  { label: 'Review', value: WorkflowStatus.REVIEW, color: statusColors.review },
  { label: 'Complete', value: WorkflowStatus.COMPLETE, color: statusColors.complete },
  { label: 'Rejected', value: WorkflowStatus.REJECTED, color: statusColors.rejected },
];

export const taskStatuses: StatusOption[] = [
  { label: 'Draft', value: TaskStatus.DRAFT, color: statusColors.draft },
  { label: 'In Progress', value: TaskStatus.PROGRESS, color: statusColors.progress },
  { label: 'Blocked', value: TaskStatus.BLOCKED, color: statusColors.blocked },
  { label: 'Review', value: TaskStatus.REVIEW, color: statusColors.review },
  { label: 'Complete', value: TaskStatus.COMPLETE, color: statusColors.complete },
  { label: 'Rejected', value: TaskStatus.REJECTED, color: statusColors.rejected },
];

export const evidenceStatuses: StatusOption[] = [
  { label: 'Pending', value: EvidenceStatus.PENDING, color: statusColors.pending },
  { label: 'Verified', value: EvidenceStatus.VERIFIED, color: statusColors.verified },
  { label: 'Approved', value: EvidenceStatus.APPROVED, color: statusColors.approved },
  { label: 'Rejected', value: EvidenceStatus.REJECTED, color: statusColors.rejected },
];

export const quoteStatuses: StatusOption[] = [
  { label: 'Draft', value: QuoteStatus.DRAFT, color: statusColors.draft },
  { label: 'Requested', value: QuoteStatus.REQUESTED, color: statusColors.requested },
  { label: 'Received', value: QuoteStatus.RECEIVED, color: statusColors.received },
  { label: 'Approved', value: QuoteStatus.APPROVED, color: statusColors.approved },
  { label: 'Rejected', value: QuoteStatus.REJECTED, color: statusColors.rejected },
  { label: 'Expired', value: QuoteStatus.EXPIRED, color: statusColors.expired },
];

export const invoiceStatuses: StatusOption[] = [
  { label: 'Draft', value: InvoiceStatus.DRAFT, color: statusColors.draft },
  { label: 'Requested', value: InvoiceStatus.REQUESTED, color: statusColors.requested },
  { label: 'Uploaded', value: InvoiceStatus.UPLOADED, color: statusColors.uploaded },
  { label: 'Paid', value: InvoiceStatus.PAID, color: statusColors.paid },
  { label: 'Cancelled', value: InvoiceStatus.CANCELLED, color: statusColors.cancelled },
];

export const workorderStatuses: StatusOption[] = [
  { label: 'Open', value: WorkorderStatus.OPEN, color: statusColors.draft },
  { label: 'Requested', value: WorkorderStatus.REQUESTED, color: statusColors.requested },
  { label: 'In Progress', value: WorkorderStatus.PROGRESS, color: statusColors.progress },
  { label: 'Complete', value: WorkorderStatus.COMPLETE, color: statusColors.complete },
  { label: 'Cancelled', value: WorkorderStatus.CANCELLED, color: statusColors.cancelled },
];
