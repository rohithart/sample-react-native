export interface Invoice {
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
