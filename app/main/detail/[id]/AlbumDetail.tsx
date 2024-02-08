"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import MusicVideoContainer from "@/app/components/atom/YoutubeEmbededVideo/YoutubeEmbededVideo";
import AlbumInformation from "@/app/components/molecule/AlbumInformation/AlbumInformation";
import SpinningAlbum from "@/app/components/atom/Images/SpinningAlbum";
import LikeDislike from "@/app/components/molecule/LikeDislike/LikeDislike";
import { AlbumDetailType } from "@/app/components/type";

interface AlbumDetailProps {
  album: AlbumDetailType;
}

const AlbumDetail = (props: AlbumDetailProps) => {
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
      <SpinningAlbum image={props.album.image} />
      <AlbumInformation
        albumName={props.album.name}
        artistName={props.album.artistResponse.name}
      />
      <LikeDislike onClick={() => alert("기능 개발 예정")} />
      <MusicVideoContainer src={props.album.musicVideo} />
      <div className={"h-48"} />
    </div>
  );
};

export default AlbumDetail;
