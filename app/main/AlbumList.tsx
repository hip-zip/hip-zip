"use client";

import Image from "next/image";
import React from "react";
import useFetch from "@/app/hooks/useFetch";

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
  albumList: AlbumListType[];
}

const AlbumList: React.FC = async () => {
  const albumList: AlbumListType[] = await useFetch();

  return (
    <div className="grid grid-cols-2 gap-4">
      {albumList?.map((item, index) => (
        <div
          key={index}
          className="relative overflow-hidden shadow-md hover:shadow-lg rounded-md hover:scale-120"
        >
          <Image
            src={`${item.album_image}`}
            alt={`개발자에게 얼른 사진 넣어라고 전해주세요`}
            width={500}
            height={500}
            className="transform transition-transform rounded-md"
          />
        </div>
      ))}
    </div>
  );
};

export default AlbumList;
