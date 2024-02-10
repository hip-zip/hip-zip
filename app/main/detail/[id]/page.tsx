import fetchSupabase from "@/app/hook/fetchSupabase";
import { AlbumListType } from "@/app/main/page";
import fetchDetailSupabase from "@/app/hook/fetchDetailSupabase";
import AlbumDetail from "@/app/main/detail/[id]/AlbumDetail";
import { getAlbumDetail } from "@/app/api/fetch/api";
import { Suspense } from "react";

export const revalidate = 1; // album re-fetch issue

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const albumDetail = await getAlbumDetail(id);

  return (
    <Suspense>
      <AlbumDetail album={albumDetail} />
    </Suspense>
  ); // Server Component Fetching
}
