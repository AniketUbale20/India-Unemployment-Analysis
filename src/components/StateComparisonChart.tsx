import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { StateData } from '../types';

interface StateComparisonChartProps {
  data: StateData[];
  height?: number;
}

export const StateComparisonChart: React.FC<StateComparisonChartProps> = ({ data, height = 400 }) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900">{`State: ${label}`}</p>
          <p className="text-orange-600">
            {`Avg Rate: ${payload[0].value.toFixed(2)}%`}
          </p>
          <p className="text-sm text-gray-600">
            {`Trend: ${data.trend}`}
          </p>
          <p className="text-xs text-gray-500">
            {`Data Points: ${data.dataPoints}`}
          </p>
        </div>
      );
    }
    return null;
  };

  const getBarColor = (trend: string) => {
    switch (trend) {
      case 'decreasing':
        return '#138808'; // Green for improving
      case 'increasing':
        return '#dc2626'; // Red for worsening
      default:
        return '#ff7f00'; // Orange for stable
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        State-wise Average Unemployment Rates
      </h3>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="state" 
            stroke="#666"
            fontSize={12}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis 
            stroke="#666"
            fontSize={12}
            label={{ value: 'Unemployment Rate (%)', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="avgUnemploymentRate" 
            fill={(entry: any) => getBarColor(entry.trend)}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4 flex justify-center space-x-6 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-600 rounded"></div>
          <span className="text-gray-600">Decreasing Trend</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-orange-500 rounded"></div>
          <span className="text-gray-600">Stable Trend</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-red-600 rounded"></div>
          <span className="text-gray-600">Increasing Trend</span>
        </div>
      </div>
    </div>
  );
};