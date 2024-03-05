import React, { Suspense } from "react";
import AlbumList from "@/app/components/organism/AlbumList/AlbumList";
import fetchSupabase from "@/app/hook/fetchSupabase";

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
  // const albumList = await fetchSupabase(0); // 첫 로드 시에만 40개 정도 가져오는 방식으로 사용 예정
  // TODO: Deprecated

  return (
    <Suspense>
      <AlbumList />
    </Suspense>
  );
} // server -> client
