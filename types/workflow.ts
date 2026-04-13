export interface Workflow {
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
