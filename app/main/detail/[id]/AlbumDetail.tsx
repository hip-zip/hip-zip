"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import MusicVideoContainer from "@/app/main/detail/[id]/MusicVideoContainer";
import AlbumLabelContainer from "@/app/main/detail/[id]/AlbumLabelContainer";
import SpinningAlbum from "@/app/main/detail/[id]/SpinningAlbum";

const AlbumDetail = ({ detail }: any) => {
  const router = useRouter();

  useEffect(() => {
    window.addEventListener("popstate", function (event) {
      if (document?.startViewTransition) {
        document.startViewTransition(() => {});
      } // startViewTransition 적용
    });
  }, []);

  return (
    <div className={"w-full flex flex-col justify-center items-center"}>
      <SpinningAlbum albumImage={detail.album_image} />
      <AlbumLabelContainer
        albumName={detail.album_name}
        artistName={detail.artist_name}
      />
      <MusicVideoContainer src={detail.music_video} />
      <div className={"h-48"} />
    </div>
  );
};

export default AlbumDetail;
