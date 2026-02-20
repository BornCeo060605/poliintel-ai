'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { BarChart } from '@/components/dashboard/charts/BarChart';
import { AreaChart } from '@/components/dashboard/charts/AreaChart';
import { voteShareData, turnoutData, chartColors } from '@/lib/data/mock';

const mockConstituency = {
  id: '1',
  name: 'Mumbai North Central',
  code: 'MNC',
  state: 'Maharashtra',
  seatHealth: 72,
  riskBooths: 5,
  opportunityBooths: 8,
  avgSwing: 3.2,
};

export default function ConstituencyDetailPage() {
  const params = useParams();
  const id = params.id as string;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/constituencies"
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          ← Back to constituencies
        </Link>
      </div>

      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          {mockConstituency.name}
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          {mockConstituency.code} • {mockConstituency.state}
        </p>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Seat Health"
          value={`${mockConstituency.seatHealth}%`}
          variant="green"
        />
        <MetricCard
          title="Risk Booths"
          value={mockConstituency.riskBooths}
          variant="red"
        />
        <MetricCard
          title="Opportunity Booths"
          value={mockConstituency.opportunityBooths}
          variant="blue"
        />
        <MetricCard
          title="Avg Swing"
          value={`${mockConstituency.avgSwing}%`}
          variant="amber"
        />
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <BarChart
          data={voteShareData}
          bars={[
            { dataKey: 'ourVotes', color: chartColors.primary, name: 'Our Votes' },
            {
              dataKey: 'opponentVotes',
              color: chartColors.red,
              name: 'Opponent',
            },
          ]}
          title="Top Booths - Vote Share"
        />
        <AreaChart
          data={turnoutData}
          areas={[
            { dataKey: 'turnout', color: chartColors.primary, name: 'Turnout %' },
          ]}
          title="Turnout Trend"
        />
      </div>

      {/* Risk Booths List */}
      <div className="rounded-[12px] border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-sm font-semibold text-gray-900">Risk Booths</h2>
        <div className="space-y-3">
          {[
            { booth: 'Booth 12', swing: -4.2, votes: 980 },
            { booth: 'Booth 18', swing: -3.1, votes: 1050 },
            { booth: 'Booth 23', swing: -2.8, votes: 890 },
          ].map((b, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-lg border border-gray-100 bg-red-50/30 px-4 py-3"
            >
              <div>
                <p className="font-medium text-gray-900">{b.booth}</p>
                <p className="text-sm text-gray-500">{b.votes} avg votes</p>
              </div>
              <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                {b.swing}% swing
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
