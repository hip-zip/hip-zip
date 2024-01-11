"use client";

import React, { useLayoutEffect } from "react";
import { useSessionStorage } from "usehooks-ts";
import AlbumListContainer from "@/app/components/molecule/AlbumListContainer/AlbumListContainer";

interface AlbumListProps {
  albumList: {
    id: number;
    album_name: string;
    album_description: string;
    album_image: string;
    album_tracks: string[];
    album_release_date: string;
    music_video: string;
    artist_name: string;
    artist_image: string;
  }[];
}

const AlbumList = (props: AlbumListProps) => {
  const [scrollLocation, setScrollLocation] = useSessionStorage("scroll", 0);

  useLayoutEffect(() => {
    window.scrollTo(0, scrollLocation);
  }, [scrollLocation]);

  return <AlbumListContainer setScrollLocation={setScrollLocation} />;
};

export default AlbumList;
