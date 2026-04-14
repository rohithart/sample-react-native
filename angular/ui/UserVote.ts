import { Organisation } from './Organisation';
import { UserRole } from './UserRole';
import { Vote } from './Vote';

export class UserVote {
  _id: string;
  vote: Vote;
  voteIndex: number;
  user: UserRole;
  organisation: Organisation;
  createdAt: string;
  updatedAt: string;
}
