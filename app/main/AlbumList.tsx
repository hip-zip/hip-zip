"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import fetchSupabase from "@/app/hooks/fetchSupabase";

export const revalidate = 100;

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

const AlbumList: React.FC = () => {
  const [albumList, setAlbumList] = useState<AlbumListType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const albums: AlbumListType[] = await fetchSupabase();
      setAlbumList(albums);
    };

    fetchData();
  }, []); // Empty dependency array means this effect will run once when the component mounts.

  return (
    <div className="flex justify-center items-center h-screen overflow-hidden">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 overflow-auto max-h-full">
        {albumList?.map((item, index) => (
          <div key={item.id} className="flex justify-center items-center">
            <Image
              src={`${item.album_image}`}
              alt={`개발자에게 얼른 사진 넣어라고 전해주세요`}
              width={250}
              height={250}
              className="rounded-md transition-transform hover:scale-95 hover:brightness-95"
              title={`${item.album_name} - ${item.artist_name}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlbumList;
