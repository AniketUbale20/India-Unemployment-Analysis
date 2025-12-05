export interface UnemploymentData {
  id: string;
  date: string;
  state: string;
  region: 'Urban' | 'Rural';
  unemploymentRate: number;
  population: number;
  laborForce: number;
  estimatedUnemployed: number;
}

export interface StateData {
  state: string;
  avgUnemploymentRate: number;
  trend: 'increasing' | 'decreasing' | 'stable';
  dataPoints: number;
}

export interface TimeSeriesData {
  date: string;
  unemploymentRate: number;
  urban: number;
  rural: number;
}

export interface AnalysisMetrics {
  averageRate: number;
  peakRate: number;
  peakDate: string;
  lowestRate: number;
  lowestDate: string;
  totalDataPoints: number;
  statesAnalyzed: number;
}