export interface AnalyticsData {
  id?: string;
  orgId: string;
  data: Record<string, any>;
  period?: string;
}
