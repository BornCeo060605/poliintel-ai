'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { mockMetrics } from '@/lib/data/mock';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

function getSeatStatus(health: number) {
  if (health >= 70) return { label: 'Good shape', color: 'green', emoji: '✓' };
  if (health >= 50) return { label: 'Needs attention', color: 'amber', emoji: '!' };
  return { label: 'At risk', color: 'red', emoji: '!' };
}

export default function LeadershipMode() {
  const status = getSeatStatus(mockMetrics.seatHealth);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="mx-auto max-w-2xl space-y-10 pb-12"
    >
      {/* One clear headline */}
      <motion.section variants={item} className="text-center">
        <p className="text-sm font-medium uppercase tracking-wider text-gray-500">
          Your seat at a glance
        </p>
        <h1 className="mt-2 text-4xl font-semibold text-gray-900 sm:text-5xl">
          Your seat is in{' '}
          <span
            className={
              status.color === 'green'
                ? 'text-green-600'
                : status.color === 'amber'
                ? 'text-amber-600'
                : 'text-red-600'
            }
          >
            {status.label}
          </span>
        </h1>
        <div className="mt-6 flex justify-center">
          <div
            className={`flex h-24 w-24 items-center justify-center rounded-full text-4xl ${
              status.color === 'green'
                ? 'bg-green-100 text-green-700'
                : status.color === 'amber'
                ? 'bg-amber-100 text-amber-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {mockMetrics.seatHealth}%
          </div>
        </div>
        <p className="mt-2 text-lg text-gray-600">Seat health score</p>
      </motion.section>

      {/* Three simple insight cards - no charts */}
      <motion.section variants={item} className="space-y-4">
        <h2 className="text-center text-sm font-medium uppercase tracking-wider text-gray-500">
          What you need to know
        </h2>

        <div className="rounded-[12px] border border-red-200 bg-red-50/50 p-6 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wider text-red-700">
            Watch out
          </p>
          <p className="mt-2 text-xl font-semibold text-gray-900">
            {mockMetrics.riskBooths} booths need your attention
          </p>
          <p className="mt-1 text-gray-600">
            Focus campaign efforts here to protect your margin.
          </p>
        </div>

        <div className="rounded-[12px] border border-blue-200 bg-blue-50/50 p-6 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wider text-blue-700">
            Opportunity
          </p>
          <p className="mt-2 text-xl font-semibold text-gray-900">
            {mockMetrics.opportunityBooths} booths where you can gain
          </p>
          <p className="mt-1 text-gray-600">
            Best places to invest time and resources for more votes.
          </p>
        </div>

        <div className="rounded-[12px] border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
            Trend
          </p>
          <p className="mt-2 text-xl font-semibold text-gray-900">
            Swing is +{mockMetrics.avgSwing}% in your favour
          </p>
          <p className="mt-1 text-gray-600">
            Momentum is positive; keep the current strategy.
          </p>
        </div>
      </motion.section>

      {/* Single CTA */}
      <motion.section variants={item} className="text-center">
        <p className="text-gray-600">See detailed recommendations</p>
        <Link
          href="/dashboard/recommendations"
          className="mt-3 inline-block rounded-[12px] bg-blue-600 px-6 py-3 font-medium text-white shadow-sm transition hover:bg-blue-700"
        >
          View what to do next →
        </Link>
      </motion.section>
    </motion.div>
  );
}
