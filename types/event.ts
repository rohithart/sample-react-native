export interface Event {
  id: string;
  orgId: string;
  name: string;
  description?: string;
  eventTypeId?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
}
