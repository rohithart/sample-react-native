export interface Workorder {
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
