"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import MusicVideoContainer from "@/app/main/detail/[id]/MusicVideoContainer";
import LikeDislike from "@/app/main/detail/[id]/LikeDislike";

function AlbumLabelContainer(props: { albumName: string; artistName: string }) {
  return (
    <>
      <div className="p-5 text-4xl text-amber-400 text-center">
        {props.albumName}
      </div>
      <div className="p-5 text-4xl text-center">BY</div>
      <div className="p-5 text-4xl text-amber-400 text-center">
        {props.artistName}
      </div>
      <LikeDislike onClick={() => alert("기능 개발 예정")} />
    </>
  );
}

export default AlbumLabelContainer;
