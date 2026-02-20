/**
 * Constituency Service - fetches constituency and related data from Supabase
 */

import { createClient } from '@/lib/supabase/server';
import type { Constituency } from '@/types';

export async function getConstituencies(): Promise<Constituency[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('constituencies')
    .select('*')
    .order('name');

  if (error) throw error;
  return (data ?? []) as Constituency[];
}

export async function getConstituencyById(id: string): Promise<Constituency | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('constituencies')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }
  return data as Constituency;
}

export async function getConstituencyWithElectionData(constituencyId: string) {
  const supabase = await createClient();
  const { data: constituency, error: cErr } = await supabase
    .from('constituencies')
    .select('*')
    .eq('id', constituencyId)
    .single();

  if (cErr || !constituency) return null;

  const { data: booths, error: bErr } = await supabase
    .from('booths')
    .select('id, booth_number, booth_name, voter_count')
    .eq('constituency_id', constituencyId);

  if (bErr) throw bErr;

  const { data: electionData, error: eErr } = await supabase
    .from('election_data')
    .select('booth_id, election_year, our_votes, opponent_votes, other_votes, total_turnout, swing_pct')
    .in(
      'booth_id',
      (booths ?? []).map((b) => b.id)
    )
    .order('election_year', { ascending: false });

  if (eErr) throw eErr;

  const boothMap = new Map((booths ?? []).map((b) => [b.id, b]));
  const rows = (electionData ?? []).map((e) => {
    const booth = boothMap.get(e.booth_id);
    return {
      booth_id: e.booth_id,
      booth_number: booth?.booth_number ?? '?',
      our_votes: e.our_votes ?? 0,
      opponent_votes: e.opponent_votes ?? 0,
      total_turnout: e.total_turnout ?? 0,
      voter_count: booth?.voter_count ?? 0,
      swing_pct: e.swing_pct,
      region: (constituency as { region?: string }).region ?? null,
    };
  });

  return { constituency, booths: booths ?? [], electionRows: rows };
}
