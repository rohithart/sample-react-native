export interface Conversation {
  id: string;
  orgId?: string;
  groupId?: string;
  participants?: string[];
  createdAt: string;
  updatedAt: string;
}
