import { createClient } from "@supabase/supabase-js";
import { AlbumListType } from "@/app/main/page";

const fetchDetailSupabase = async (id: string): Promise<AlbumListType[]> => {
  if (!process.env.supabaseUrl || !process.env.supabaseKey) {
    throw new Error("Database Auth Error Occurred");
  }

  const supabase = createClient(
    process.env.supabaseUrl,
    process.env.supabaseKey,
  );

  const { data: albumList, error } = await supabase
    .from("hiphopAlbumList")
    .select()
    .eq("id", parseInt(id));

  if (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }

  return albumList || [];
};

export default fetchDetailSupabase;
