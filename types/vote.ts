export interface Vote {
  id: string;
  orgId: string;
  name: string;
  description?: string;
  groupId?: string;
  workflowId?: string;
  options?: VoteOption[];
  archived?: boolean;
  completed?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface VoteOption {
  id: string;
  label: string;
  count?: number;
}

export interface VoteCast {
  id: string;
  voteId: string;
  userId: string;
  optionId: string;
  createdAt: string;
}
