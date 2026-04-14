import { Comment } from './Comment';
import { File } from './File';
import { Organisation } from './Organisation';
import { UserRole } from './UserRole';

export class Wall {
  _id: string;
  message: string;
  user: UserRole;
  likedByUsers: string[];
  comments: Comment[];
  files: File[];
  comment_count: number;
  organisation: Organisation;
  createdAt: string;
  updatedAt: string;
}
