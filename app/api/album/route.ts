import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const year = searchParams?.get("year");
  const page = parseInt(searchParams?.get("page") || "1", 10); // Parse and provide a default value

  if (!process.env.supabaseUrl || !process.env.supabaseKey) {
    throw new Error("Database Auth Error Occurred");
  }

  const supabase = createClient(
    process.env.supabaseUrl,
    process.env.supabaseKey,
  );

  if (year === null || year === "null") {
    let nextCursor;

    const { data: albumList, error } = await supabase
      .from("hiphopAlbumList")
      .select()
      .order("album_release_date", { ascending: false })
      .range(40 * page - 40, 40 * page - 1);

    if (albumList.length === 0) {
      nextCursor = undefined;
    } else {
      nextCursor = page + 1;
    }

    return Response.json({ data: albumList, nextCursor: nextCursor });
  } else {
    const startDate = new Date(parseInt(year), 0, 1); // 해당 년도의 1월 1일
    const endDate = new Date(parseInt(year), 11, 31); // 해당 년도의 12월 31일

    let nextCursor;

    const { data: albumList, error } = await supabase
      .from("hiphopAlbumList")
      .select()
      .gte("album_release_date", startDate.toISOString())
      .lte("album_release_date", endDate.toISOString())
      .order("album_release_date", { ascending: false })
      .range(40 * page - 40, 40 * page - 1);

    if (albumList.length === 0) {
      nextCursor = undefined;
    } else {
      nextCursor = page + 1;
    }

    return Response.json({ data: albumList, nextCursor: nextCursor });
  }
}
