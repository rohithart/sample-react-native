export interface Notification {
  id: string;
  orgId: string;
  title: string;
  message: string;
  read?: boolean;
  createdAt: string;
}
