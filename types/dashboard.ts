export interface DashboardData {
  id?: string;
  orgId: string;
  stats: Record<string, number>;
  recentActivity?: any[];
}
