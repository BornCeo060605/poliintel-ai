/**
 * Dashboard Analytics Engine
 * Aggregates booth health and election data into dashboard metrics
 */

import type { BoothHealthResult } from './boothHealth';

const RISK_THRESHOLD = 50;
const OPPORTUNITY_THRESHOLD = 70;
const TURNOUT_SENSITIVITY_BASE = 0.55;
const CADRE_TARGET = 75;

export interface SeatMetrics {
  seatHealthScore: number;
  avgBoothHealthIndex: number;
  riskZoneCount: number;
  opportunityZoneCount: number;
  cadrePerformanceIndex: number;
  turnoutSensitivityScore: number;
}

export interface SwingTrendInput {
  period: string;
  swing: number;
  projection?: number;
}

export interface VoteShareInput {
  booth_name: string;
  our_votes: number;
  opponent_votes: number;
  projected?: number;
}

export interface TurnoutInput {
  year: string;
  turnout: number;
}

export function computeSeatMetrics(boothResults: BoothHealthResult[]): SeatMetrics {
  if (boothResults.length === 0) {
    return {
      seatHealthScore: 0,
      avgBoothHealthIndex: 0,
      riskZoneCount: 0,
      opportunityZoneCount: 0,
      cadrePerformanceIndex: 0,
      turnoutSensitivityScore: 0,
    };
  }

  const avgHealth =
    boothResults.reduce((s, b) => s + b.health_index, 0) / boothResults.length;
  const riskCount = boothResults.filter((b) => b.health_index < RISK_THRESHOLD).length;
  const opportunityCount = boothResults.filter(
    (b) => b.health_index >= OPPORTUNITY_THRESHOLD
  ).length;

  const avgSwing =
    boothResults.reduce((s, b) => s + b.swing_pct, 0) / boothResults.length;
  const seatHealth = Math.min(100, Math.max(0, 50 + avgSwing * 5 + avgHealth * 0.3));

  const cadreIndex = Math.min(
    100,
    Math.max(0, (avgHealth / CADRE_TARGET) * 100)
  );
  const turnoutSensitivity = Math.round((TURNOUT_SENSITIVITY_BASE + avgSwing * 0.01) * 10) / 10;

  return {
    seatHealthScore: Math.round(seatHealth * 10) / 10,
    avgBoothHealthIndex: Math.round(avgHealth * 10) / 10,
    riskZoneCount: riskCount,
    opportunityZoneCount: opportunityCount,
    cadrePerformanceIndex: Math.round(cadreIndex * 10) / 10,
    turnoutSensitivityScore: turnoutSensitivity,
  };
}

export function buildSwingTrend(periods: SwingTrendInput[]) {
  return periods.map((p) => ({
    name: p.period,
    swing: p.swing,
    projection: p.projection ?? p.swing,
  }));
}

export function buildVoteShareProjection(items: VoteShareInput[]) {
  return items.map((v) => ({
    name: v.booth_name,
    ourVotes: v.our_votes,
    opponentVotes: v.opponent_votes,
    projected: v.projected ?? Math.round(v.our_votes * 1.05),
  }));
}

export function buildTurnoutData(items: TurnoutInput[]) {
  return items.map((t) => ({
    name: t.year,
    turnout: t.turnout,
  }));
}

export function buildSentimentFromSwing(swingByPeriod: { period: string; swing: number }[]) {
  return swingByPeriod.map((s, i) => {
    const delta = i > 0 ? s.swing - swingByPeriod[i - 1].swing : 0;
    const favorable = Math.min(60, Math.max(30, 45 + delta * 5));
    const unfavorable = Math.min(30, Math.max(10, 20 - delta * 2));
    const neutral = 100 - favorable - unfavorable;
    return {
      name: s.period,
      favorable: Math.round(favorable),
      neutral: Math.round(neutral),
      unfavorable: Math.round(unfavorable),
    };
  });
}

export function buildCadrePerformance(regions: { name: string; avgHealth: number }[]) {
  return regions.map((r) => ({
    name: r.name,
    performance: Math.round(r.avgHealth),
    target: CADRE_TARGET,
  }));
}

export function buildRiskHeatGrid(
  boothResults: BoothHealthResult[],
  cols = 8
): number[][] {
  const riskScores = boothResults.map((b) =>
    Math.round(100 - b.health_index)
  );
  const rows: number[][] = [];
  for (let i = 0; i < riskScores.length; i += cols) {
    rows.push(riskScores.slice(i, i + cols));
  }
  return rows.length > 0 ? rows : [[0]];
}
