import { ChartDataType, ChartType } from '../enum/chart';

export interface PropOrdoChart {
  workflows: PropOrdoChartOverview[];
  workorders: PropOrdoChartOverview[];
  tasks: PropOrdoChartOverview[];
  quotes: PropOrdoChartOverview[];
  invoices: PropOrdoChartOverview[];
  bookings: PropOrdoChartOverview[];
  requests: PropOrdoChartOverview[];
}

export interface PropOrdoChartOverview {
  dataType: ChartDataType;
  chartType: ChartType;
  title: string;
  subtitle: string;
  gridClass: string;
  chartData: PropOrdoChartData;
  metadata: any;
}

export interface PropOrdoChartData {
  labels: string[];
  datasets: PropOrdoChartDataSet[];
}

export interface PropOrdoChartDataSet {
  data: any;
  label?: string;
  backgroundColor?: string;
}
