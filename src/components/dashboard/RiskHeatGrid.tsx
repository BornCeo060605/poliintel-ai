'use client';

interface RiskHeatGridProps {
  data: number[][];
  label?: string;
}

function getRiskColor(value: number) {
  if (value >= 80) return 'bg-red-600 text-white';
  if (value >= 60) return 'bg-red-400 text-white';
  if (value >= 40) return 'bg-amber-400 text-gray-900';
  if (value >= 20) return 'bg-amber-200 text-gray-900';
  return 'bg-green-200 text-gray-800';
}

export function RiskHeatGrid({ data, label = 'Booth risk index' }: RiskHeatGridProps) {
  return (
    <div className="rounded-[12px] border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-sm font-semibold text-gray-900">
        Risk heat visualization
      </h3>
      <p className="mb-4 text-xs text-gray-500">{label}</p>
      <div className="overflow-x-auto">
        <div className="inline-block min-w-0">
          {data.map((row, i) => (
            <div key={i} className="flex gap-1">
              {row.map((cell, j) => (
                <div
                  key={j}
                  className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded text-xs font-medium ${getRiskColor(cell)}`}
                  title={`Cell ${i + 1}-${j + 1}: ${cell}`}
                >
                  {cell}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex items-center gap-4 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <span className="h-3 w-3 rounded bg-green-200" /> Low
        </span>
        <span className="flex items-center gap-1">
          <span className="h-3 w-3 rounded bg-amber-300" /> Medium
        </span>
        <span className="flex items-center gap-1">
          <span className="h-3 w-3 rounded bg-red-400" /> High
        </span>
      </div>
    </div>
  );
}
