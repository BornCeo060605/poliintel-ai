'use client';

import { CARD_RADIUS, SHADOW_SM } from '@/lib/constants';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  variant?: 'default' | 'blue' | 'red' | 'amber' | 'green';
  icon?: React.ReactNode;
}

const variantStyles = {
  default: 'border-gray-200',
  blue: 'border-blue-200 bg-blue-50/30',
  red: 'border-red-200 bg-red-50/30',
  amber: 'border-amber-200 bg-amber-50/30',
  green: 'border-green-200 bg-green-50/30',
};

const trendColors = {
  up: 'text-green-600',
  down: 'text-red-600',
  neutral: 'text-gray-500',
};

export function MetricCard({
  title,
  value,
  subtitle,
  trend,
  trendValue,
  variant = 'default',
  icon,
}: MetricCardProps) {
  return (
    <div
      className={`rounded-[12px] border bg-white p-5 transition-shadow hover:shadow-md ${variantStyles[variant]}`}
      style={{
        borderRadius: CARD_RADIUS,
        boxShadow: SHADOW_SM,
      }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-1 text-2xl font-semibold text-gray-900">{value}</p>
          {subtitle && (
            <p className="mt-0.5 text-xs text-gray-500">{subtitle}</p>
          )}
          {trend && trendValue && (
            <p
              className={`mt-1 text-sm font-medium ${trendColors[trend]}`}
            >
              {trend === 'up' && '↑ '}
              {trend === 'down' && '↓ '}
              {trendValue}
            </p>
          )}
        </div>
        {icon && (
          <div className="rounded-lg bg-gray-100 p-2 text-gray-600">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
