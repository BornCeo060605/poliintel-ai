/**
 * GET /api/insights
 * Returns AI recommendations (stored + optionally generated summary)
 * Query: ?constituencyId=uuid (optional)
 */

import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getStoredRecommendations } from '@/lib/services/aiInsights.service';
import type { ApiResponse, InsightDto } from '@/lib/dto';

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

    const data = await getStoredRecommendations(constituencyId || null);

    return Response.json({
      success: true,
      data,
    } satisfies ApiResponse<InsightDto[]>);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    return Response.json(
      { success: false, error: message } satisfies ApiResponse,
      { status: 500 }
    );
  }
}
