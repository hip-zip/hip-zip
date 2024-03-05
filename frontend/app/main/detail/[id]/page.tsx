import AlbumDetail from "@/app/main/detail/[id]/AlbumDetail";
import { Suspense } from "react";
import { getAlbumDetail } from "@/app/api/Server/requests";

export const revalidate = 1; // album re-Client issue

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const albumDetail = await getAlbumDetail(id);

  return (
    <Suspense>
      <AlbumDetail album={albumDetail} />
    </Suspense>
  ); // Server Component Fetching
}
