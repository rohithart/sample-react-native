export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  read?: boolean;
  reactions?: Record<string, string[]>;
  createdAt: string;
  updatedAt: string;
}
