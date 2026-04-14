import { Conversation } from './Conversation';
import { UserRole } from './UserRole';

export class MessageRead {
  email: string;
  readAt: Date;
}

export class Message {
  _id: string;
  conversation: Conversation;
  sender: UserRole;
  content: string;
  readBy: MessageRead[];
  reactions: Map<string, string[]>;
  isEdited: boolean;
  editedAt?: Date;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}
