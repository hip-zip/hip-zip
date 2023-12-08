import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const search = searchParams?.get("search");

  if (!process.env.supabaseUrl || !process.env.supabaseKey) {
    throw new Error("Database Auth Error Occurred");
  }

  const supabase = createClient(
    process.env.supabaseUrl,
    process.env.supabaseKey,
  );

  const { data: albumList, error: errorAlbumList } = await supabase
    .from("hiphopAlbumList")
    .select()
    .ilike("artist_name", `%${search}%`)
    .order("album_release_date", { ascending: false });

  const { data: additionalList, error: errorAdditionalList } = await supabase
    .from("hiphopAlbumList")
    .select()
    .ilike("album_name", `%${search}%`)
    .order("album_release_date", { ascending: false });

  let result = [];

  if (!errorAlbumList && !errorAdditionalList) {
    result = [
      ...albumList,
      ...additionalList.filter(
        (item) => !albumList.some((album) => album.id === item.id),
      ),
    ];
  }

  // 결과 배열 정렬
  const sortedResult = result.sort((a, b) => {
    const dateA = new Date(a.album_release_date).getTime();
    const dateB = new Date(b.album_release_date).getTime();

    // 내림차순 정렬 (최신 날짜가 먼저 오도록)
    return dateB - dateA;
  });

  return Response.json({ data: sortedResult });
}
