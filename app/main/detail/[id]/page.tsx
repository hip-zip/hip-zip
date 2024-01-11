import fetchSupabase from "@/app/hook/fetchSupabase";
import { AlbumListType } from "@/app/main/page";
import fetchDetailSupabase from "@/app/hook/fetchDetailSupabase";
import AlbumDetail from "@/app/main/detail/[id]/AlbumDetail";

export const revalidate = 1; // album re-fetch issue

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const detail = await fetchDetailSupabase(id);

  return <AlbumDetail data={detail[0]} />; // Server Component Fetching
}
