import { createClient } from "@supabase/supabase-js";
import { ISupabaseAlbumList } from "@/app/components/organism/SearchForm/SearchForm";

const fetchDetailSupabase = async (
  id: string,
): Promise<ISupabaseAlbumList[]> => {
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
  }

  return albumList || [];
};

export default fetchDetailSupabase;
