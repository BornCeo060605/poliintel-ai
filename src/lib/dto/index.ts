/**
 * DTOs for API responses - frontend-compatible structure
 */

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface StrategicSummaryDto {
  seatHealthScore: number;
  avgBoothHealthIndex: number;
  riskZoneCount: number;
  opportunityZoneCount: number;
  cadrePerformanceIndex: number;
  turnoutSensitivityScore: number;
}

export interface SwingTrendPointDto {
  name: string;
  swing: number;
  projection: number;
}

export interface VoteShareProjectionPointDto {
  name: string;
  ourVotes: number;
  opponentVotes: number;
  projected: number;
}

export interface TurnoutPointDto {
  name: string;
  turnout: number;
}

export interface SentimentPointDto {
  name: string;
  favorable: number;
  neutral: number;
  unfavorable: number;
}

export interface CadrePerformancePointDto {
  name: string;
  performance: number;
  target: number;
}

export interface HighRiskBoothDto {
  booth: string;
  zone: string;
  swing: number;
  turnout: number;
  health: number;
}

export interface OpportunityClusterDto {
  cluster: string;
  booths: number;
  avgSwing: number;
  potential: 'High' | 'Medium' | 'Low';
}

export interface GenderGapAlertDto {
  booth: string;
  maleLead: number;
  femaleLead: number;
  gap: number;
  priority: 'High' | 'Medium' | 'Low';
}

export interface DashboardSummaryDto {
  strategicSummary: StrategicSummaryDto;
  swingTrendData: SwingTrendPointDto[];
  voteShareProjectionData: VoteShareProjectionPointDto[];
  turnoutData: TurnoutPointDto[];
  sentimentShiftData: SentimentPointDto[];
  cadrePerformanceData: CadrePerformancePointDto[];
  riskHeatGridData: number[][];
  highRiskBooths: HighRiskBoothDto[];
  opportunityClusters: OpportunityClusterDto[];
  genderGapAlerts: GenderGapAlertDto[];
  aiStrategicSummary: string;
}

export interface BoothWithHealthDto {
  id: string;
  booth_number: string;
  booth_name: string | null;
  constituency_id: string;
  voter_count: number;
  health_index: number;
  swing_pct: number | null;
  turnout_pct: number | null;
  zone: string;
}

export interface InsightDto {
  id: string;
  recommendation_type: string;
  priority: string;
  title: string;
  description: string | null;
  constituency_id: string | null;
}
