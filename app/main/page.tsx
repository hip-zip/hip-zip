import React, { Suspense } from "react";
import AlbumList from "@/app/main/AlbumList";
import fetchSupabase from "@/app/hooks/fetchSupabase";

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
  albumList: AlbumListType[];
}

export const revalidate = 100;

export default async function Page() {
  const albumList = await fetchSupabase();

  return <AlbumList albumList={albumList} />;
}
