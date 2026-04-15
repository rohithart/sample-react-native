import { EvidenceStatus, InvoiceStatus, QuoteStatus, TaskStatus, WorkflowStatus, WorkorderStatus } from '@propordo/models/dist/enum';

enum statusColor {
  DRAFT = '#B0BEC5',
  PENDING = '#FFE082',
  PROGRESS = '#90CAF9',
  REQUESTED = '#FFCCBC',
  RECEIVED = '#A5D6A7',
  VERIFIED = '#81C784',
  BLOCKED = '#EF9A9A',
  REVIEW = '#CE93D8',
  COMPLETE = '#C5E1A5',
  UPLOADED = '#B39DDB',
  PAID = '#80CBC4',
  APPROVED = '#b0e5b2',
  REJECTED = '#f1a0a0',
  EXPIRED = '#bcccd4',
  CANCELLED = '#E6EE9C'
}

export const workflowStatuses = [
  { label: 'Draft', value: WorkflowStatus.DRAFT, color: statusColor.DRAFT },
  { label: 'In Progress', value: WorkflowStatus.PROGRESS, color: statusColor.PROGRESS },
  { label: 'Blocked', value: WorkflowStatus.BLOCKED, color: statusColor.BLOCKED },
  { label: 'Review', value: WorkflowStatus.REVIEW, color: statusColor.REVIEW },
  { label: 'Complete', value: WorkflowStatus.COMPLETE, color: statusColor.COMPLETE },
  { label: 'Rejected', value: WorkflowStatus.REJECTED, color: statusColor.REJECTED }
];

export const taskStatuses = [
  { label: 'Draft', value: TaskStatus.DRAFT, color: statusColor.DRAFT },
  { label: 'In Progress', value: TaskStatus.PROGRESS, color: statusColor.PROGRESS },
  { label: 'Blocked', value: TaskStatus.BLOCKED, color: statusColor.BLOCKED },
  { label: 'Review', value: TaskStatus.REVIEW, color: statusColor.REVIEW },
  { label: 'Complete', value: TaskStatus.COMPLETE, color: statusColor.COMPLETE },
  { label: 'Rejected', value: TaskStatus.REJECTED, color: statusColor.REJECTED }
];

export const evidenceStatuses = [
  { label: 'Pending', value: EvidenceStatus.PENDING, color: statusColor.PENDING },
  { label: 'Verified', value: EvidenceStatus.VERIFIED, color: statusColor.VERIFIED },
  { label: 'Approved', value: EvidenceStatus.APPROVED, color: statusColor.APPROVED },
  { label: 'Rejected', value: EvidenceStatus.REJECTED, color: statusColor.REJECTED }
];

export const quoteStatuses = [
  { label: 'Draft', value: QuoteStatus.DRAFT, color: statusColor.DRAFT },
  { label: 'Requested', value: QuoteStatus.REQUESTED, color: statusColor.REQUESTED },
  { label: 'Received', value: QuoteStatus.RECEIVED, color: statusColor.RECEIVED },
  { label: 'Approved', value: QuoteStatus.APPROVED, color: statusColor.APPROVED },
  { label: 'Rejected', value: QuoteStatus.REJECTED, color: statusColor.REJECTED },
  { label: 'Expired', value: QuoteStatus.EXPIRED, color: statusColor.EXPIRED }
];

export const invoiceStatuses = [
  { label: 'Draft', value: InvoiceStatus.DRAFT, color: statusColor.DRAFT },
  { label: 'Requested', value: InvoiceStatus.REQUESTED, color: statusColor.REQUESTED },
  { label: 'Uploaded', value: InvoiceStatus.UPLOADED, color: statusColor.UPLOADED },
  { label: 'Paid', value: InvoiceStatus.PAID, color: statusColor.PAID },
  { label: 'Cancelled', value: InvoiceStatus.CANCELLED, color: statusColor.CANCELLED }
];

export const workorderStatuses = [
  { label: 'Open', value: WorkorderStatus.OPEN, color: statusColor.DRAFT },
  { label: 'Requested', value: WorkorderStatus.REQUESTED, color: statusColor.REQUESTED },
  { label: 'In Progress', value: WorkorderStatus.PROGRESS, color: statusColor.PROGRESS },
  { label: 'Complete', value: WorkorderStatus.COMPLETE, color: statusColor.COMPLETE },
  { label: 'Cancelled', value: WorkorderStatus.CANCELLED, color: statusColor.CANCELLED }
];
