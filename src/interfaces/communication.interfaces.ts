/**
 * Communication Interfaces - Organization-wide communication systems
 */

export interface Announcement {
  id: string;
  orgId: string;
  title: string;
  content: string;
  priority: 'low' | 'medium' | 'high';
  startDate: string;
  endDate?: string;
  targetAudience?: string[];
  status: 'active' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export interface Newsletter {
  id: string;
  orgId: string;
  subject: string;
  content: string;
  recipients: string[];
  status: 'draft' | 'sent' | 'archived';
  sentAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Email {
  id: string;
  orgId: string;
  recipientEmail: string;
  subject: string;
  body: string;
  status: 'pending' | 'sent' | 'failed';
  sentAt?: string;
  error?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Wall {
  id: string;
  orgId: string;
  posterId: string;
  content: string;
  likes: number;
  comments: number;
  status: 'active' | 'deleted';
  createdAt: string;
  updatedAt: string;
}

export interface Vote {
  id: string;
  orgId: string;
  pollId: string;
  userId: string;
  optionId: string;
  createdAt: string;
}

export interface Poll {
  id: string;
  orgId: string;
  question: string;
  options: string[];
  votes: Vote[];
  status: 'active' | 'closed';
  createdAt: string;
  updatedAt: string;
}
