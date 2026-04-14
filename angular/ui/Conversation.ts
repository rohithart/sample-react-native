import { ConversationType } from '../enum';
import { Group } from './Group';
import { Organisation } from './Organisation';

export class Conversation {
  _id: string;
  type: ConversationType;
  group: Group;
  organisation: Organisation;
  createdAt: string;
  updatedAt: string;
}
