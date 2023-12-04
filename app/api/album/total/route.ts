import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const year = searchParams?.get("year");

  if (!process.env.supabaseUrl || !process.env.supabaseKey) {
    throw new Error("Database Auth Error Occurred");
  }

  const supabase = createClient(
    process.env.supabaseUrl,
    process.env.supabaseKey,
  );

  if (year === null || year === "null") {
    const { count: total, error } = await supabase
      .from("hiphopAlbumList")
      .select("*", { count: "exact" });

    return Response.json({ count: total });
  } else {
    const startDate = new Date(parseInt(year), 0, 1); // 해당 년도의 1월 1일
    const endDate = new Date(parseInt(year), 11, 31); // 해당 년도의 12월 31일

    const { count: total, error } = await supabase
      .from("hiphopAlbumList")
      .select("*", { count: "exact" })
      .gte("album_release_date", startDate.toISOString())
      .lte("album_release_date", endDate.toISOString());

    return Response.json({ count: total });
  }
}
