import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("booths")
      .select("*")

    if (error) {
      return NextResponse.json({ error: error.message })
    }

    return NextResponse.json({
      success: true,
      count: data.length,
      data
    })
  } catch (err: any) {
    return NextResponse.json({
      error: err.message
    })
  }
}