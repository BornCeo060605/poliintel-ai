/**
 * GET /api/booths
 * Returns booths with health index
 * Query: ?constituencyId=uuid (optional)
 */

import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getBoothsWithHealth } from '@/lib/services/booth.service';
import type { ApiResponse, BoothWithHealthDto } from '@/lib/dto';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return Response.json(
        { success: false, error: 'Unauthorized' } satisfies ApiResponse,
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const constituencyId = searchParams.get('constituencyId') || undefined;

    const results = await getBoothsWithHealth(constituencyId);

    const data: BoothWithHealthDto[] = results.map((r) => ({
      id: r.booth_id,
      booth_number: r.booth_number,
      booth_name: null,
      constituency_id: r.constituency_id ?? '',
      voter_count: r.voter_count ?? 0,
      health_index: r.health_index,
      swing_pct: r.swing_pct,
      turnout_pct: r.turnout_pct,
      zone: r.zone,
    }));

    return Response.json({
      success: true,
      data,
    } satisfies ApiResponse<BoothWithHealthDto[]>);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    return Response.json(
      { success: false, error: message } satisfies ApiResponse,
      { status: 500 }
    );
  }
}
