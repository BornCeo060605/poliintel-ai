'use client';

import { useState, useMemo } from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { chartColors } from '@/lib/data/mock';

const BASE_TURNOUT = 72;
const BASE_MARGIN = 3.2;

export function TurnoutSimulator() {
  const [turnoutDelta, setTurnoutDelta] = useState(0);

  const projectedMargin = useMemo(() => {
    const sensitivity = 0.55;
    return Math.round((BASE_MARGIN + turnoutDelta * sensitivity) * 10) / 10;
  }, [turnoutDelta]);

  const simulatedData = useMemo(() => {
    return [
      { name: 'Baseline', turnout: BASE_TURNOUT, margin: BASE_MARGIN },
      {
        name: 'Simulated',
        turnout: Math.min(95, Math.max(50, BASE_TURNOUT + turnoutDelta)),
        margin: projectedMargin,
      },
    ];
  }, [turnoutDelta, projectedMargin]);

  const historicalWithProjection = useMemo(() => {
    const base = [
      { name: '2019', turnout: 65, margin: 2.1 },
      { name: '2020', turnout: 68, margin: 2.4 },
      { name: '2021', turnout: 72, margin: 2.8 },
      { name: '2022', turnout: 71, margin: 2.6 },
      { name: '2023', turnout: 69, margin: 2.5 },
      { name: '2024', turnout: 74, margin: 3.2 },
    ];
    const last = base[base.length - 1];
    return [
      ...base,
      {
        name: 'Projected',
        turnout: last.turnout + turnoutDelta,
        margin: projectedMargin,
      },
    ];
  }, [turnoutDelta, projectedMargin]);

  return (
    <div className="rounded-[12px] border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-sm font-semibold text-gray-900">
        Turnout modeling simulator
      </h3>
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Turnout delta: {turnoutDelta > 0 ? '+' : ''}{turnoutDelta}%</span>
          <span className="font-medium text-gray-900">
            Projected margin: {projectedMargin}%
          </span>
        </div>
        <input
          type="range"
          min={-10}
          max={10}
          step={1}
          value={turnoutDelta}
          onChange={(e) => setTurnoutDelta(Number(e.target.value))}
          className="mt-2 h-2 w-full appearance-none rounded-full bg-gray-200 accent-blue-600"
        />
        <div className="mt-1 flex justify-between text-xs text-gray-400">
          <span>-10%</span>
          <span>0</span>
          <span>+10%</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <RechartsLineChart
          data={historicalWithProjection}
          margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="#6b7280" />
          <YAxis yAxisId="left" tick={{ fontSize: 11 }} stroke="#6b7280" />
          <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} stroke="#6b7280" />
          <Tooltip
            contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
          />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="turnout"
            stroke={chartColors.primary}
            name="Turnout %"
            strokeWidth={2}
            dot={{ r: 3 }}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="margin"
            stroke={chartColors.amber}
            name="Margin %"
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}
