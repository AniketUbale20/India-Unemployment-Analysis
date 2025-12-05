import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { TimeSeriesData } from '../types';

interface TimeSeriesChartProps {
  data: TimeSeriesData[];
  height?: number;
}

export const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({ data, height = 400 }) => {
  const formatDate = (dateStr: string) => {
    const [year, month] = dateStr.split('-');
    return `${year}-${month.padStart(2, '0')}`;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900">{`Date: ${formatDate(label)}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {`${entry.name}: ${entry.value.toFixed(2)}%`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Unemployment Rate Trends Over Time
      </h3>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="date" 
            tickFormatter={formatDate}
            stroke="#666"
            fontSize={12}
          />
          <YAxis 
            stroke="#666"
            fontSize={12}
            label={{ value: 'Unemployment Rate (%)', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="unemploymentRate"
            stroke="#ff7f00"
            strokeWidth={3}
            dot={{ fill: '#ff7f00', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, fill: '#ff7f00' }}
            name="Overall Rate"
          />
          <Line
            type="monotone"
            dataKey="urban"
            stroke="#138808"
            strokeWidth={2}
            dot={{ fill: '#138808', strokeWidth: 2, r: 3 }}
            activeDot={{ r: 5, fill: '#138808' }}
            name="Urban Rate"
          />
          <Line
            type="monotone"
            dataKey="rural"
            stroke="#000080"
            strokeWidth={2}
            dot={{ fill: '#000080', strokeWidth: 2, r: 3 }}
            activeDot={{ r: 5, fill: '#000080' }}
            name="Rural Rate"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};