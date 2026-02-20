/**
 * Booth Health Index Engine
 * Computes health scores from election data (swing, turnout, vote share)
 */

export interface BoothElectionRow {
  booth_id: string;
  booth_number: string;
  our_votes: number;
  opponent_votes: number;
  total_turnout: number;
  voter_count: number;
  swing_pct: number | null;
  region: string | null;
  constituency_id?: string;
}

export interface BoothHealthResult {
  booth_id: string;
  booth_number: string;
  health_index: number;
  swing_pct: number;
  turnout_pct: number;
  vote_share_pct: number;
  zone: string;
  constituency_id?: string;
  voter_count?: number;
}

const SWING_WEIGHT = 0.4;
const TURNOUT_WEIGHT = 0.3;
const VOTE_SHARE_WEIGHT = 0.3;

function swingToScore(swing: number): number {
  const clamped = Math.max(-20, Math.min(20, swing));
  return 50 + (clamped / 20) * 50;
}

function turnoutToScore(turnoutPct: number): number {
  return Math.min(100, Math.max(0, turnoutPct));
}

function voteShareToScore(voteSharePct: number): number {
  return Math.min(100, Math.max(0, voteSharePct));
}

export function computeBoothHealth(row: BoothElectionRow): BoothHealthResult {
  const totalVotes = row.our_votes + row.opponent_votes || 1;
  const voteSharePct = (row.our_votes / totalVotes) * 100;
  const turnoutPct =
    row.voter_count > 0 ? (row.total_turnout / row.voter_count) * 100 : 0;
  const swingPct = row.swing_pct ?? 0;

  const swingScore = swingToScore(swingPct);
  const turnoutScore = turnoutToScore(turnoutPct);
  const voteShareScore = voteShareToScore(voteSharePct);

  const health_index =
    swingScore * SWING_WEIGHT +
    turnoutScore * TURNOUT_WEIGHT +
    voteShareScore * VOTE_SHARE_WEIGHT;

  return {
    booth_id: row.booth_id,
    booth_number: row.booth_number,
    health_index: Math.round(health_index * 10) / 10,
    swing_pct: swingPct,
    turnout_pct: Math.round(turnoutPct * 10) / 10,
    vote_share_pct: Math.round(voteSharePct * 10) / 10,
    zone: row.region ?? 'Unknown',
    constituency_id: row.constituency_id,
    voter_count: row.voter_count,
  };
}

export function computeBoothHealthBatch(
  rows: BoothElectionRow[]
): BoothHealthResult[] {
  return rows.map(computeBoothHealth);
}

export function classifyBooth(
  health: number
): 'risk' | 'opportunity' | 'neutral' {
  if (health < 50) return 'risk';
  if (health >= 70) return 'opportunity';
  return 'neutral';
}
