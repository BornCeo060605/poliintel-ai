/**
 * GET /api/dashboard-summary
 * Returns full dashboard summary (strategic metrics, charts, intelligence panels)
 * Query: ?constituencyId=uuid (optional)
 */

import { getDashboardSummary } from "@/lib/services/dashboard.service"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const constituencyId = searchParams.get("constituencyId")

    if (!constituencyId) {
      return Response.json({ success: false, error: "Missing constituencyId" })
    }

    const data = await getDashboardSummary(constituencyId)

    return Response.json({ success: true, data })
  } catch (error: any) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
