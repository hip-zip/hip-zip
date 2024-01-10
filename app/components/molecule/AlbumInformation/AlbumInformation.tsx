"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import MusicVideoContainer from "@/app/components/atom/YoutubeEmbededVideo/YoutubeEmbededVideo";
import LikeDislike from "@/app/components/molecule/LikeDislike/LikeDislike";

interface AlbumInformationProps {
  albumName: string;
  artistName: string;
}

const AlbumInformation = (props: AlbumInformationProps) => {
  return (
    <>
      <div className="p-5 text-4xl text-amber-400 text-center">
        {props.albumName}
      </div>
      <div className="p-5 text-4xl text-center">BY</div>
      <div className="p-5 text-4xl text-amber-400 text-center">
        {props.artistName}
      </div>
    </>
  );
};

export default AlbumInformation;
