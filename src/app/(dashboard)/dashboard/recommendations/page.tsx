'use client';

import { motion } from 'framer-motion';
import { useViewMode } from '@/contexts/ViewModeContext';

const mockRecommendations = [
  {
    id: '1',
    type: 'swing' as const,
    priority: 'high' as const,
    title: 'Focus swing campaigns on Booth 12-18 cluster',
    simpleTitle: 'Focus on Booths 12–18',
    oneLiner: 'Spend more time in these areas—they need your presence.',
    description:
      'Booths 12, 14, 16, and 18 show consistent negative swing. Recommend targeted door-to-door campaign and local leader engagement in this cluster.',
  },
  {
    id: '2',
    type: 'turnout' as const,
    priority: 'medium' as const,
    title: 'Increase polling day mobilization in low-turnout booths',
    simpleTitle: 'Get more people to vote in low-turnout areas',
    oneLiner: 'Add volunteers and help on polling day in Booths 5, 7, 9.',
    description:
      'Booths 5, 7, 9 historically have 15-20% lower turnout. Deploy additional volunteers for voter assistance and transport on polling day.',
  },
  {
    id: '3',
    type: 'opportunity' as const,
    priority: 'high' as const,
    title: 'Capitalize on Booth 3 and 4 momentum',
    simpleTitle: 'Double down on Booths 3 and 4',
    oneLiner: 'You’re winning here—more rallies and visibility will help lock it in.',
    description:
      'Strong positive swing in these booths. Consider organizing larger rallies and increasing visibility to consolidate gains.',
  },
  {
    id: '4',
    type: 'risk' as const,
    priority: 'low' as const,
    title: 'Monitor Booth 22 demographic shifts',
    simpleTitle: 'Keep an eye on Booth 22',
    oneLiner: 'Voter mix is changing; consider a local survey later.',
    description:
      'Early signs of demographic change. Recommend commissioning a localized survey to understand voter sentiment shifts.',
  },
];

const typeColors: Record<string, string> = {
  swing: 'bg-blue-100 text-blue-800',
  turnout: 'bg-green-100 text-green-800',
  opportunity: 'bg-amber-100 text-amber-800',
  risk: 'bg-red-100 text-red-800',
  campaign: 'bg-gray-100 text-gray-800',
};

const priorityColors: Record<string, string> = {
  high: 'border-l-red-500',
  medium: 'border-l-amber-500',
  low: 'border-l-gray-400',
};

export default function RecommendationsPage() {
  const { viewMode } = useViewMode();
  const isLeadership = viewMode === 'leadership';

  const displayed = isLeadership
    ? mockRecommendations.filter((r) => r.priority === 'high')
    : mockRecommendations;

  if (isLeadership) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mx-auto max-w-2xl space-y-8 pb-12"
      >
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900">
            What to do next
          </h1>
          <p className="mt-1 text-gray-600">
            Your top priorities in plain language
          </p>
        </div>
        <div className="space-y-4">
          {displayed.map((rec, i) => (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`rounded-[12px] border border-l-4 bg-white p-6 shadow-sm ${priorityColors[rec.priority]}`}
            >
              <p className="text-xl font-semibold text-gray-900">
                {rec.simpleTitle}
              </p>
              <p className="mt-2 text-gray-600">{rec.oneLiner}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          AI Recommendations
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Strategic campaign recommendations based on booth and constituency data
        </p>
      </div>

      <div className="space-y-4">
        {displayed.map((rec) => (
          <div
            key={rec.id}
            className={`rounded-[12px] border border-l-4 bg-white p-6 shadow-sm ${priorityColors[rec.priority]}`}
          >
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${typeColors[rec.type]}`}
              >
                {rec.type}
              </span>
              <span className="text-xs text-gray-500 capitalize">
                {rec.priority} priority
              </span>
            </div>
            <h3 className="font-semibold text-gray-900">{rec.title}</h3>
            {rec.description && (
              <p className="mt-2 text-sm text-gray-600">{rec.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
