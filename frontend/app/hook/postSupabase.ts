import { createClient } from "@supabase/supabase-js";

const postSupabase = async (paramObj: any): Promise<any[]> => {
  if (!process.env.supabaseUrl || !process.env.supabaseKey) {
    throw new Error("Database Auth Error Occurred");
  }

  const supabase = createClient(
    process.env.supabaseUrl,
    process.env.supabaseKey,
  );

  const { data: albumList, error } = await supabase
    .from("hiphopAlbumList")
    .insert(paramObj);

  if (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }

  return albumList || [];
};

export default postSupabase;
