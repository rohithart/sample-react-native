/**
 * Operational Interfaces - Collaboration and workflow entities
 */

export interface Conversation {
  id: string;
  orgId: string;
  participantIds: string[];
  lastMessage?: string;
  isGroup: boolean;
  name?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  orgId: string;
  entityId: string;
  entityType: string;
  authorId: string;
  authorName: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface Workflow {
  id: string;
  orgId: string;
  name: string;
  description?: string;
  steps?: any[];
  status: 'active' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export interface Group {
  id: string;
  orgId: string;
  name: string;
  description?: string;
  memberIds: string[];
  status: 'active' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: string;
  orgId: string;
  bookingTypeId: string;
  userId: string;
  resourceId: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface Meeting {
  id: string;
  orgId: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  organizerId: string;
  attendeeIds: string[];
  location?: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface Event {
  id: string;
  orgId: string;
  eventTypeId: string;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  location?: string;
  attendeeIds: string[];
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface Folder {
  id: string;
  orgId: string;
  parentFolderId?: string;
  name: string;
  status: 'active' | 'archived';
  createdAt: string;
  updatedAt: string;
}
