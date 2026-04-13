export interface Evidence {
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
