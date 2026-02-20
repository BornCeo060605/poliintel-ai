export type UserRole = 'consultant' | 'politician';

export type ViewMode = 'consultant' | 'leadership';

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  role: UserRole;
}

export interface Constituency {
  id: string;
  name: string;
  code: string | null;
  state: string | null;
  region: string | null;
}

export interface Booth {
  id: string;
  constituency_id: string;
  booth_number: string;
  booth_name: string | null;
  voter_count: number;
}

export interface ElectionData {
  id: string;
  booth_id: string;
  election_year: number;
  our_votes: number;
  opponent_votes: number;
  other_votes: number;
  total_turnout: number;
  swing_pct: number | null;
}

export interface AIRecommendation {
  id: string;
  constituency_id: string | null;
  recommendation_type: 'swing' | 'turnout' | 'risk' | 'opportunity' | 'campaign';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string | null;
}

export interface DashboardMetrics {
  seatHealth: number;
  riskBooths: number;
  opportunityBooths: number;
  avgSwing: number;
}
