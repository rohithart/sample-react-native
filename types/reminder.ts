export interface Reminder {
  id: string;
  orgId: string;
  name: string;
  description?: string;
  date?: string;
  enabled?: boolean;
  createdAt: string;
  updatedAt: string;
}
