'use client';

import { useViewMode } from '@/contexts/ViewModeContext';
import LeadershipMode from '@/components/LeadershipMode';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { LineChart } from '@/components/dashboard/charts/LineChart';
import { BarChart } from '@/components/dashboard/charts/BarChart';
import { AreaChart } from '@/components/dashboard/charts/AreaChart';
import { CollapsibleSection } from '@/components/dashboard/CollapsibleSection';
import { TurnoutSimulator } from '@/components/dashboard/TurnoutSimulator';
import { RiskHeatGrid } from '@/components/dashboard/RiskHeatGrid';
import {
  strategicSummary,
  swingTrendData,
  voteShareProjectionData,
  turnoutData,
  sentimentShiftData,
  cadrePerformanceData,
  riskHeatGridData,
  highRiskBooths,
  opportunityClusters,
  genderGapAlerts,
  aiStrategicSummary,
  chartColors,
} from '@/lib/data/mock';

const SPACING = 'gap-6';

export default function DashboardPage() {
  const { viewMode } = useViewMode();
  const isLeadership = viewMode === 'leadership';

  if (isLeadership) {
    return <LeadershipMode />;
  }

  return (
    <div className={`mx-auto max-w-[1280px] ${SPACING} py-2`}>
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Consultant Dashboard
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Strategic analytics and booth-level intelligence
        </p>
      </div>

      {/* 1. Strategic Summary Grid */}
      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
          Strategic Summary
        </h2>
        <div className={`grid ${SPACING} sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6`}>
          <MetricCard
            title="Seat Health Score"
            value={`${strategicSummary.seatHealthScore}%`}
            subtitle="Overall constituency"
            variant="green"
          />
          <MetricCard
            title="Avg Booth Health Index"
            value={strategicSummary.avgBoothHealthIndex}
            subtitle="0–100 scale"
            variant="blue"
          />
          <MetricCard
            title="Risk Zone Count"
            value={strategicSummary.riskZoneCount}
            subtitle="Booths to prioritise"
            variant="red"
          />
          <MetricCard
            title="Opportunity Zone Count"
            value={strategicSummary.opportunityZoneCount}
            subtitle="High-potential"
            variant="green"
          />
          <MetricCard
            title="Cadre Performance Index"
            value={`${strategicSummary.cadrePerformanceIndex}%`}
            subtitle="Vs target"
            variant="amber"
          />
          <MetricCard
            title="Turnout Sensitivity Score"
            value={strategicSummary.turnoutSensitivityScore}
            subtitle="Margin impact per % turnout"
            variant="default"
          />
        </div>
      </section>

      {/* 2. Interactive Analytics */}
      <CollapsibleSection
        title="Interactive Analytics"
        subtitle="Swing, vote share, turnout simulator, sentiment, cadre, risk heat"
        defaultOpen={true}
      >
        <div className={SPACING}>
          <div className="grid gap-6 lg:grid-cols-2">
            <LineChart
              data={swingTrendData}
              lines={[
                { dataKey: 'swing', color: chartColors.primary, name: 'Swing %' },
                {
                  dataKey: 'projection',
                  color: chartColors.amber,
                  name: 'Projection',
                },
              ]}
              title="Swing Trend with Projection"
              height={280}
            />
            <BarChart
              data={voteShareProjectionData}
              bars={[
                { dataKey: 'ourVotes', color: chartColors.primary, name: 'Our Votes' },
                { dataKey: 'opponentVotes', color: chartColors.red, name: 'Opponent' },
                { dataKey: 'projected', color: chartColors.green, name: 'Projected' },
              ]}
              title="Vote Share Projection Model"
              height={280}
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <TurnoutSimulator />
            <AreaChart
              data={sentimentShiftData}
              areas={[
                { dataKey: 'favorable', color: chartColors.green, name: 'Favorable' },
                { dataKey: 'neutral', color: chartColors.amber, name: 'Neutral' },
                { dataKey: 'unfavorable', color: chartColors.red, name: 'Unfavorable' },
              ]}
              title="Sentiment Shift Tracker"
              height={260}
              stacked
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <BarChart
              data={cadrePerformanceData}
              bars={[
                { dataKey: 'performance', color: chartColors.primary, name: 'Performance' },
                { dataKey: 'target', color: chartColors.amber, name: 'Target' },
              ]}
              title="Cadre Performance Comparison"
              height={260}
            />
            <RiskHeatGrid data={riskHeatGridData} />
          </div>
        </div>
      </CollapsibleSection>

      {/* 3. Intelligence Panels */}
      <CollapsibleSection
        title="Intelligence Panels"
        subtitle="AI summary, high-risk booths, opportunity clusters, gender gap alerts"
        defaultOpen={true}
      >
        <div className={SPACING}>
          <div className="rounded-[12px] border border-gray-200 bg-blue-50/30 p-5">
            <h3 className="mb-3 text-sm font-semibold text-gray-900">
              AI Strategic Summary
            </h3>
            <p className="text-sm leading-relaxed text-gray-700">
              {aiStrategicSummary}
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[12px] border border-gray-200 bg-white shadow-sm">
              <h3 className="border-b border-gray-200 px-5 py-3 text-sm font-semibold text-gray-900">
                High-Risk Booths
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">
                        Booth
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">
                        Zone
                      </th>
                      <th className="px-4 py-2 text-right text-xs font-medium uppercase text-gray-500">
                        Swing
                      </th>
                      <th className="px-4 py-2 text-right text-xs font-medium uppercase text-gray-500">
                        Turnout
                      </th>
                      <th className="px-4 py-2 text-right text-xs font-medium uppercase text-gray-500">
                        Health
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {highRiskBooths.map((row) => (
                      <tr key={row.booth} className="hover:bg-gray-50">
                        <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900">
                          {row.booth}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600">
                          {row.zone}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-right text-sm text-red-600">
                          {row.swing}%
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-right text-sm text-gray-600">
                          {row.turnout}%
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-right text-sm text-gray-600">
                          {row.health}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-[12px] border border-gray-200 bg-white shadow-sm">
              <h3 className="border-b border-gray-200 px-5 py-3 text-sm font-semibold text-gray-900">
                Opportunity Clusters
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">
                        Cluster
                      </th>
                      <th className="px-4 py-2 text-right text-xs font-medium uppercase text-gray-500">
                        Booths
                      </th>
                      <th className="px-4 py-2 text-right text-xs font-medium uppercase text-gray-500">
                        Avg Swing
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">
                        Potential
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {opportunityClusters.map((row) => (
                      <tr key={row.cluster} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">
                          {row.cluster}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-right text-sm text-gray-600">
                          {row.booths}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-right text-sm text-green-600">
                          +{row.avgSwing}%
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600">
                          {row.potential}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="rounded-[12px] border border-amber-200 bg-amber-50/50 shadow-sm">
            <h3 className="border-b border-amber-200 px-5 py-3 text-sm font-semibold text-gray-900">
              Gender Gap Alerts
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-amber-200">
                <thead className="bg-amber-50/50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">
                      Booth
                    </th>
                    <th className="px-4 py-2 text-right text-xs font-medium uppercase text-gray-500">
                      Male lead %
                    </th>
                    <th className="px-4 py-2 text-right text-xs font-medium uppercase text-gray-500">
                      Female lead %
                    </th>
                    <th className="px-4 py-2 text-right text-xs font-medium uppercase text-gray-500">
                      Gap
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">
                      Priority
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-200 bg-white">
                  {genderGapAlerts.map((row) => (
                    <tr key={row.booth} className="hover:bg-amber-50/30">
                      <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900">
                        {row.booth}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-right text-sm text-gray-600">
                        {row.maleLead}%
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-right text-sm text-gray-600">
                        {row.femaleLead}%
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-right text-sm font-medium text-amber-700">
                        {row.gap}%
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600">
                        {row.priority}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </CollapsibleSection>
    </div>
  );
}
