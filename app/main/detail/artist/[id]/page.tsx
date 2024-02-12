import { getAlbumDetail, getArtistDetail } from "@/app/api/fetch/api";
import React from "react";
import ArtistDetailPage from "@/app/components/template/Detail/ArtistDetailPage";

export const revalidate = 1; // album re-fetch issue

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const artist = await getArtistDetail(id);

  return <ArtistDetailPage artist={artist} />; // Server Component Fetching
}
