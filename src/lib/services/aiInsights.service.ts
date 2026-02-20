/**
 * AI Insights Service - OpenAI integration and stored recommendations
 */

import { createClient } from '@/lib/supabase/server';
import type { AIRecommendation } from '@/types';
import type { InsightDto } from '@/lib/dto';

export async function getStoredRecommendations(
  constituencyId?: string | null
): Promise<InsightDto[]> {
  const supabase = await createClient();
  let query = supabase
    .from('ai_recommendations')
    .select('id, recommendation_type, priority, title, description, constituency_id')
    .order('priority', { ascending: true });

  if (constituencyId) {
    query = query.or(`constituency_id.eq.${constituencyId},constituency_id.is.null`);
  }

  const { data, error } = await query;

  if (error) throw error;

  return (data ?? []).map((r) => ({
    id: r.id,
    recommendation_type: r.recommendation_type ?? '',
    priority: r.priority ?? 'medium',
    title: r.title,
    description: r.description,
    constituency_id: r.constituency_id,
  })) as InsightDto[];
}

export async function generateStrategicSummary(context: {
  seatHealth: number;
  riskCount: number;
  opportunityCount: number;
  avgSwing: number;
  turnoutSensitivity: number;
  highRiskBooths: string[];
  opportunityZones: string[];
}): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return buildFallbackSummary(context);
  }

  try {
    const { default: OpenAI } = await import('openai');
    const openai = new OpenAI({ apiKey });

    const prompt = `You are a political strategist. Generate a concise strategic summary (2-4 sentences) for a constituency dashboard based on these metrics:
- Seat health: ${context.seatHealth}%
- Risk booths: ${context.riskCount}
- Opportunity booths: ${context.opportunityCount}
- Average swing: ${context.avgSwing}%
- Turnout sensitivity: ${context.turnoutSensitivity}
- High-risk booths: ${context.highRiskBooths.join(', ') || 'none'}
- Opportunity zones: ${context.opportunityZones.join(', ') || 'none'}

Write in professional, actionable tone. Focus on priorities and next steps.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 200,
      temperature: 0.7,
    });

    const text = completion.choices[0]?.message?.content?.trim();
    return text ?? buildFallbackSummary(context);
  } catch {
    return buildFallbackSummary(context);
  }
}

function buildFallbackSummary(context: {
  seatHealth: number;
  riskCount: number;
  opportunityCount: number;
  avgSwing: number;
  turnoutSensitivity: number;
  highRiskBooths: string[];
  opportunityZones: string[];
}): string {
  const parts: string[] = [];
  parts.push(
    `Seat health at ${context.seatHealth}%. ${context.riskCount} risk booths and ${context.opportunityCount} opportunity booths identified.`
  );
  if (context.avgSwing !== 0) {
    parts.push(`Average swing ${context.avgSwing > 0 ? '+' : ''}${context.avgSwing}%.`);
  }
  parts.push(
    `Turnout sensitivity ${context.turnoutSensitivity}; marginal booth focus recommended.`
  );
  if (context.highRiskBooths.length > 0) {
    parts.push(`Prioritise doorstep engagement in ${context.highRiskBooths.slice(0, 3).join(', ')}.`);
  }
  if (context.opportunityZones.length > 0) {
    parts.push(`Consolidate gains in ${context.opportunityZones.slice(0, 2).join(', ')}.`);
  }
  return parts.join(' ');
}
