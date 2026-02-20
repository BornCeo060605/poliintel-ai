import { createClient } from "@/lib/supabase/client"

export async function getDashboardSummary(constituencyId: string) {
    const supabase =createClient()


  const { data: booths, error } = await supabase
    .from("booths")
    .select("*")
    .eq("constituency_id", constituencyId)

  if (error) throw error

  if (!booths || booths.length === 0) {
    return {
      strategicSummary: {
        seatHealthScore: 0,
        avgBoothHealthIndex: 0,
        riskZoneCount: 0,
        opportunityZoneCount: 0,
        cadrePerformanceIndex: 0,
        turnoutSensitivityScore: 0
      },
      swingTrendData: [],
      voteShareProjectionData: [],
      turnoutModelData: [],
      sentimentData: [],
      cadrePerformanceData: [],
      riskHeatGridData: []
    }
  }

  const avgHealth =
    booths.reduce((sum, b) => sum + (b.booth_health_index || 0), 0) /
    booths.length

  return {
    strategicSummary: {
      seatHealthScore: Math.round(avgHealth),
      avgBoothHealthIndex: Math.round(avgHealth),
      riskZoneCount: booths.filter(b => b.booth_health_index < 50).length,
      opportunityZoneCount: booths.filter(b => b.booth_health_index >= 50 && b.booth_health_index < 70).length,
      cadrePerformanceIndex: 65,
      turnoutSensitivityScore: 72
    },
    swingTrendData: [],
    voteShareProjectionData: [],
    turnoutModelData: [],
    sentimentData: [],
    cadrePerformanceData: [],
    riskHeatGridData: []
  }
}