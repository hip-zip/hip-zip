"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import MusicVideoContainer from "@/app/components/atom/YoutubeEmbededVideo/YoutubeEmbededVideo";
import LikeDislike from "@/app/components/molecule/LikeDislike/LikeDislike";
import Label from "@/app/components/atom/Label/Label";

interface AlbumInformationProps {
  albumName: string;
  artistName: string;
}

const AlbumInformation = (props: AlbumInformationProps) => {
  return (
    <>
      <Label className={"text-hipzip-amber p-5"} message={props.albumName} />
      <Label className={"text-hipzip-white p-5"} message={"By"} />
      <Label className={"text-hipzip-amber p-5"} message={props.artistName} />
    </>
  );
};

export default AlbumInformation;
