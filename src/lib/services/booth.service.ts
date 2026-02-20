/**
 * Booth Service - booth and election data from Supabase
 */

import { createClient } from '@/lib/supabase/server';
import type { Booth } from '@/types';
import {
  computeBoothHealthBatch,
  type BoothElectionRow,
  type BoothHealthResult,
} from '@/lib/analytics/boothHealth';

export interface BoothElectionRowDb extends BoothElectionRow {
  constituency_region: string | null;
}

export async function getBoothsByConstituency(
  constituencyId: string
): Promise<Booth[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('booths')
    .select('*')
    .eq('constituency_id', constituencyId)
    .order('booth_number');

  if (error) throw error;
  return (data ?? []) as Booth[];
}

export async function getBoothsWithHealth(constituencyId?: string): Promise<BoothHealthResult[]> {
  const supabase = await createClient();

  const { data: edData, error: edErr } = await supabase
    .from('election_data')
    .select('booth_id, our_votes, opponent_votes, total_turnout, swing_pct')
    .order('election_year', { ascending: false })
    .limit(1000);

  if (edErr) throw edErr;
  if (!edData?.length) return [];

  const boothIds = [...new Set((edData as { booth_id: string }[]).map((r) => r.booth_id))];
  const { data: boothData, error: bErr } = await supabase
    .from('booths')
    .select('id, booth_number, booth_name, voter_count, constituency_id')
    .in('id', boothIds);

  if (bErr) throw bErr;

  let constituencyIds = (boothData ?? []).map((b) => (b as { constituency_id: string }).constituency_id);
  if (constituencyId) {
    constituencyIds = constituencyIds.filter((id) => id === constituencyId);
    if (constituencyIds.length === 0) return [];
  }
  constituencyIds = [...new Set(constituencyIds)];

  const { data: constData } = await supabase
    .from('constituencies')
    .select('id, region')
    .in('id', constituencyIds);

  const regionMap = new Map(
    (constData ?? []).map((c) => [(c as { id: string }).id, (c as { region?: string }).region ?? null])
  );
  const boothMap = new Map(
    (boothData ?? []).map((b) => [
      (b as { id: string }).id,
      {
        booth_number: (b as { booth_number: string }).booth_number,
        voter_count: (b as { voter_count: number }).voter_count ?? 0,
        constituency_id: (b as { constituency_id: string }).constituency_id,
      },
    ])
  );

  const latestByBooth = new Map<string, (typeof edData)[0]>();
  for (const row of edData) {
    const bid = (row as { booth_id: string }).booth_id;
    if (!latestByBooth.has(bid)) latestByBooth.set(bid, row);
    if (constituencyId) {
      const booth = boothMap.get(bid);
      if (booth?.constituency_id !== constituencyId) latestByBooth.delete(bid);
    }
  }

  const mapped = Array.from(latestByBooth.values()).map((r) => {
    const booth = boothMap.get((r as { booth_id: string }).booth_id);
    if (!booth) return null;
    const region = regionMap.get(booth.constituency_id) ?? null;
    return {
      booth_id: (r as { booth_id: string }).booth_id,
      booth_number: booth.booth_number,
      our_votes: (r as { our_votes: number }).our_votes ?? 0,
      opponent_votes: (r as { opponent_votes: number }).opponent_votes ?? 0,
      total_turnout: (r as { total_turnout: number }).total_turnout ?? 0,
      voter_count: booth.voter_count,
      swing_pct: (r as { swing_pct: number | null }).swing_pct,
      region,
      constituency_id: booth.constituency_id,
    };
  });
  const rows = mapped.filter((x): x is NonNullable<typeof x> => x !== null) as BoothElectionRow[];

  return computeBoothHealthBatch(rows);
}

export function mapToHighRiskBooths(
  results: BoothHealthResult[],
  limit = 10
): Array<{ booth: string; zone: string; swing: number; turnout: number; health: number }> {
  return results
    .filter((r) => r.health_index < 55)
    .sort((a, b) => a.health_index - b.health_index)
    .slice(0, limit)
    .map((r) => ({
      booth: `B-${r.booth_number}`,
      zone: r.zone,
      swing: Math.round(r.swing_pct * 10) / 10,
      turnout: Math.round(r.turnout_pct),
      health: Math.round(r.health_index),
    }));
}

export function mapToOpportunityClusters(
  results: BoothHealthResult[],
  clusterSize = 3
): Array<{ cluster: string; booths: number; avgSwing: number; potential: 'High' | 'Medium' | 'Low' }> {
  const byZone = new Map<string, BoothHealthResult[]>();
  for (const r of results) {
    if (r.health_index < 65) continue;
    const list = byZone.get(r.zone) ?? [];
    list.push(r);
    byZone.set(r.zone, list);
  }

  const clusters: Array<{ cluster: string; booths: number; avgSwing: number; potential: 'High' | 'Medium' | 'Low' }> = [];
  let idx = 1;
  for (const [zone, list] of byZone.entries()) {
    if (list.length < 2) continue;
    const avgSwing = list.reduce((s, b) => s + b.swing_pct, 0) / list.length;
    const potential: 'High' | 'Medium' | 'Low' =
      avgSwing >= 4 ? 'High' : avgSwing >= 2.5 ? 'Medium' : 'Low';
    clusters.push({
      cluster: `C${idx} (${zone}, ${list.length} booths)`,
      booths: list.length,
      avgSwing: Math.round(avgSwing * 10) / 10,
      potential,
    });
    idx++;
  }
  return clusters.slice(0, 5);
}
