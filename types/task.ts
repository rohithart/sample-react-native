export interface Task {
  id: string;
  orgId: string;
  name: string;
  description?: string;
  status: string;
  priority?: string;
  userId?: string;
  workflowId?: string;
  archived?: boolean;
  flagged?: boolean;
  flagReason?: string;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}
