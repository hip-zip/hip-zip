"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import MusicVideoContainer from "@/app/components/atom/YoutubeEmbededVideo/YoutubeEmbededVideo";
import AlbumInformation from "@/app/components/molecule/AlbumInformation/AlbumInformation";
import SpinningAlbum from "@/app/components/atom/SpinningAlbum/SpinningAlbum";
import LikeDislike from "@/app/components/molecule/LikeDislike/LikeDislike";

interface AlbumDetailProps {
  detail: any; // 정의 예정
}

const AlbumDetail = ({ data }: any) => {
  const router = useRouter();

  useEffect(() => {
    window.addEventListener("popstate", function (event) {
      if (document?.startViewTransition) {
        document.startViewTransition(() => {});
      } // startViewTransition 적용
    });
  }, []);

  return (
    <div
      className={
        "w-full flex flex-col justify-center items-center border rounded border-slate-800"
      }
    >
      <SpinningAlbum image={data.album_image} />
      <AlbumInformation
        albumName={data.album_name}
        artistName={data.artist_name}
      />
      <LikeDislike onClick={() => alert("기능 개발 예정")} />
      <MusicVideoContainer src={data.music_video} />
      <div className={"h-48"} />
    </div>
  );
};

export default AlbumDetail;
