import React, { Suspense } from "react";
import AlbumList from "@/app/main/AlbumList";
import fetchSupabase from "@/app/hooks/fetchSupabase";

export const revalidate = 10;

export interface AlbumListType {
  id: number;
  album_name: string;
  album_description: string;
  album_image: string;
  album_tracks: string[];
  album_release_date: string;
  music_video: string;
  artist_name: string;
  artist_image: string;
}

export interface AlbumListProps {
  data: AlbumListType[];
  nextCursor: number;
}

export default async function Page() {
  const albumList = await fetchSupabase(0); // no use - planning to delete
  const yearArray = [2023, 2022, 2021, 2020];

  return (
    <Suspense>
      <AlbumList albumList={albumList} />
    </Suspense>
  );
} // server -> client
