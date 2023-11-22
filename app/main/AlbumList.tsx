"use client";

import Image from "next/image";
import React from "react";
import useFetch from "@/app/hooks/useFetch";

export const revalidate = 1; //
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

const AlbumList: React.FC = async () => {
  const albumList: AlbumListType[] = await useFetch();

  return (
    <div className="p-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {albumList?.map((item, index) => (
        <Image
          src={`${item.album_image}`}
          alt={`개발자에게 얼른 사진 넣어라고 전해주세요`}
          width={250}
          height={250}
          className="rounded-md hover:filter hover:brightness-75"
          title={`${item.album_name} - ${item.artist_name}`}
        />
      ))}
    </div>
  );
};

export default AlbumList;
