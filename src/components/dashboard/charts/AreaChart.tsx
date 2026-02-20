'use client';

import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface DataPoint {
  name: string;
  [key: string]: string | number;
}

interface AreaChartProps {
  data: DataPoint[];
  areas: { dataKey: string; color: string; name?: string }[];
  title?: string;
  height?: number;
  stacked?: boolean;
}

export function AreaChart({ data, areas, title, height = 300, stacked }: AreaChartProps) {
  return (
    <div className="rounded-[12px] border border-gray-200 bg-white p-5 shadow-sm">
      {title && (
        <h3 className="mb-4 text-sm font-semibold text-gray-900">{title}</h3>
      )}
      <ResponsiveContainer width="100%" height={height}>
        <RechartsAreaChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#6b7280" />
          <YAxis tick={{ fontSize: 12 }} stroke="#6b7280" />
          <Tooltip
            contentStyle={{
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
            }}
          />
          <Legend />
          {areas.map((area) => (
            <Area
              key={area.dataKey}
              type="monotone"
              dataKey={area.dataKey}
              stroke={area.color}
              fill={area.color}
              fillOpacity={0.3}
              name={area.name || area.dataKey}
              strokeWidth={2}
              stackId={stacked ? 'stack' : undefined}
            />
          ))}
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  );
}
