import fetchSupabase from "@/app/hooks/fetchSupabase";
import { AlbumListType } from "@/app/main/page";
import fetchDetailSupabase from "@/app/hooks/fetchDetailSupabase";
import AlbumDetail from "@/app/main/detail/[id]/AlbumDetail";

export const revalidate = 1; // album re-fetch issue

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const detail = await fetchDetailSupabase(id);

  return (
    <div className={"h-full w-full"}>
      <AlbumDetail detail={detail[0]} />
    </div>
  ); // Server Component Fetching
}
