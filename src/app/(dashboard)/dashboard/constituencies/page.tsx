'use client';

import Link from 'next/link';

const mockConstituencies = [
  { id: '1', name: 'Mumbai North Central', code: 'MNC', state: 'Maharashtra', seatHealth: 72, riskBooths: 5 },
  { id: '2', name: 'Delhi South', code: 'DS', state: 'Delhi', seatHealth: 65, riskBooths: 8 },
  { id: '3', name: 'Bangalore Central', code: 'BC', state: 'Karnataka', seatHealth: 78, riskBooths: 3 },
];

export default function ConstituenciesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Constituencies</h1>
        <p className="mt-1 text-sm text-gray-500">
          View and analyze constituency-level data
        </p>
      </div>

      <div className="overflow-hidden rounded-[12px] border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Constituency
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Code
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                State
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Seat Health
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Risk Booths
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {mockConstituencies.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                  {c.name}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {c.code}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {c.state}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      c.seatHealth >= 70
                        ? 'bg-green-100 text-green-800'
                        : c.seatHealth >= 50
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {c.seatHealth}%
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {c.riskBooths}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right">
                  <Link
                    href={`/dashboard/constituencies/${c.id}`}
                    className="text-sm font-medium text-blue-600 hover:text-blue-700"
                  >
                    View details →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
