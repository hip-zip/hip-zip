import { createClient } from "@supabase/supabase-js";
import { AlbumListType } from "@/app/main/page";

const getYearAlbumSupabase = async (year: number): Promise<AlbumListType[]> => {
  if (!process.env.supabaseUrl || !process.env.supabaseKey) {
    throw new Error("Database Auth Error Occurred");
  }

  const supabase = createClient(
    process.env.supabaseUrl,
    process.env.supabaseKey,
  );

  const startDate = new Date(year, 0, 1); // 해당 년도의 1월 1일
  const endDate = new Date(year, 11, 31); // 해당 년도의 12월 31일

  const { data: albumList, error } = await supabase
    .from("hiphopAlbumList")
    .select()
    .gte("album_release_date", startDate.toISOString())
    .lte("album_release_date", endDate.toISOString())
    .order("album_release_date", { ascending: false });

  if (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }

  return albumList || [];
};

export default getYearAlbumSupabase;
