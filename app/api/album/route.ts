import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const param = searchParams?.get("year");

  if (param === null) {
    throw new Error("Param Missing");
  }

  const searchYear = parseInt(param);

  if (!process.env.supabaseUrl || !process.env.supabaseKey) {
    throw new Error("Database Auth Error Occurred");
  }

  const supabase = createClient(
    process.env.supabaseUrl,
    process.env.supabaseKey,
  );

  const startDate = new Date(searchYear, 0, 1); // 해당 년도의 1월 1일
  const endDate = new Date(searchYear, 11, 31); // 해당 년도의 12월 31일

  const { data: albumList, error } = await supabase
    .from("hiphopAlbumList")
    .select()
    .gte("album_release_date", startDate.toISOString())
    .lte("album_release_date", endDate.toISOString())
    .order("album_release_date", { ascending: false });

  if (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }

  return Response.json({ data: albumList });
}
