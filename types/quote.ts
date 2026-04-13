export interface Quote {
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
