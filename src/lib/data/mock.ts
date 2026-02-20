import type { DashboardMetrics } from '@/types';
import { COLORS } from '@/lib/constants';

export const mockMetrics: DashboardMetrics = {
  seatHealth: 72,
  riskBooths: 12,
  opportunityBooths: 8,
  avgSwing: 3.2,
};

/** Strategic Summary Grid (Consultant) */
export const strategicSummary = {
  seatHealthScore: 72,
  avgBoothHealthIndex: 68,
  riskZoneCount: 12,
  opportunityZoneCount: 8,
  cadrePerformanceIndex: 74,
  turnoutSensitivityScore: 6.2,
};

export const swingTrendData = [
  { name: 'Jan', swing: 2.1, projection: 2.5 },
  { name: 'Feb', swing: 2.4, projection: 2.8 },
  { name: 'Mar', swing: 2.8, projection: 3.0 },
  { name: 'Apr', swing: 3.0, projection: 3.2 },
  { name: 'May', swing: 3.2, projection: 3.5 },
  { name: 'Jun', swing: 3.2, projection: 3.4 },
];

export const voteShareProjectionData = [
  { name: 'Booth 1', ourVotes: 1250, opponentVotes: 980, projected: 1320 },
  { name: 'Booth 2', ourVotes: 1100, opponentVotes: 1050, projected: 1180 },
  { name: 'Booth 3', ourVotes: 980, opponentVotes: 1200, projected: 1050 },
  { name: 'Booth 4', ourVotes: 1450, opponentVotes: 890, projected: 1520 },
  { name: 'Booth 5', ourVotes: 1320, opponentVotes: 1000, projected: 1380 },
];

export const voteShareData = voteShareProjectionData.map(
  ({ name, ourVotes, opponentVotes }) => ({ name, ourVotes, opponentVotes })
);

export const turnoutData = [
  { name: '2019', turnout: 65 },
  { name: '2020', turnout: 68 },
  { name: '2021', turnout: 72 },
  { name: '2022', turnout: 71 },
  { name: '2023', turnout: 69 },
  { name: '2024', turnout: 74 },
];

export const sentimentShiftData = [
  { name: 'W1', favorable: 42, neutral: 38, unfavorable: 20 },
  { name: 'W2', favorable: 44, neutral: 36, unfavorable: 20 },
  { name: 'W3', favorable: 46, neutral: 34, unfavorable: 20 },
  { name: 'W4', favorable: 45, neutral: 35, unfavorable: 20 },
  { name: 'W5', favorable: 48, neutral: 32, unfavorable: 20 },
];

export const cadrePerformanceData = [
  { name: 'Zone A', performance: 82, target: 75 },
  { name: 'Zone B', performance: 71, target: 75 },
  { name: 'Zone C', performance: 78, target: 75 },
  { name: 'Zone D', performance: 69, target: 75 },
  { name: 'Zone E', performance: 76, target: 75 },
];

/** Risk heat: grid of booths, value 0-100 (higher = more risk) */
export const riskHeatGridData = [
  [12, 45, 78, 34, 22, 56, 88, 15],
  [28, 62, 91, 41, 38, 72, 55, 29],
  [18, 52, 68, 25, 44, 61, 79, 33],
  [35, 71, 85, 48, 19, 54, 66, 42],
];

export const highRiskBooths = [
  { booth: 'B-12', zone: 'North', swing: -4.2, turnout: 62, health: 38 },
  { booth: 'B-18', zone: 'Central', swing: -3.8, turnout: 58, health: 42 },
  { booth: 'B-23', zone: 'South', swing: -3.1, turnout: 65, health: 45 },
  { booth: 'B-07', zone: 'North', swing: -2.9, turnout: 59, health: 48 },
  { booth: 'B-29', zone: 'East', swing: -2.6, turnout: 61, health: 51 },
];

export const opportunityClusters = [
  { cluster: 'C1 (Booths 3,4,5)', booths: 3, avgSwing: 4.2, potential: 'High' },
  { cluster: 'C2 (Booths 8,9)', booths: 2, avgSwing: 3.8, potential: 'High' },
  { cluster: 'C3 (Booths 15,16,17)', booths: 3, avgSwing: 3.2, potential: 'Medium' },
];

export const genderGapAlerts = [
  { booth: 'B-12', maleLead: 8.2, femaleLead: 2.1, gap: 6.1, priority: 'High' },
  { booth: 'B-18', maleLead: 5.4, femaleLead: 1.8, gap: 3.6, priority: 'Medium' },
  { booth: 'B-23', maleLead: 4.1, femaleLead: 2.0, gap: 2.1, priority: 'Medium' },
];

export const aiStrategicSummary = `Seat remains in favourable position with 72% health. Prioritise 12 risk booths (North/Central clusters) for doorstep and local leader engagement. Opportunity clusters C1 and C2 show strong positive swing—recommend consolidating with visibility events. Turnout sensitivity is 6.2; +2% turnout in marginal booths could add ~1.1% seat margin. Gender gap in B-12 and B-18 requires targeted women outreach. Cadre Zone B below target; recommend capacity review.`;

export const chartColors = {
  primary: COLORS.primary[500],
  red: COLORS.red[500],
  green: COLORS.green[500],
  amber: COLORS.amber[500],
};
