export interface WallPost {
  id: string;
  orgId: string;
  content: string;
  userId?: string;
  likes?: string[];
  createdAt: string;
  updatedAt: string;
}
