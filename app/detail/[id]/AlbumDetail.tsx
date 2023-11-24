"use client";

import Image from "next/image";
import { AlbumListType } from "@/app/main/page";
import React, { useEffect, useRef } from "react";

const AlbumDetail = ({ detail }: any) => {
  const musicVideoRef = useRef(null);

  useEffect(() => {});

  return (
    <div className={"w-full flex flex-col justify-center items-center"}>
      <div className="relative p-10">
        <Image
          src={`${detail.album_image}`}
          alt={`개발자에게 얼른 사진 넣어라고 전해주세요`}
          width={350}
          height={350}
          className="rounded-full transition-transform hover:scale-95 hover:brightness-95 animate-spin-slow cd-image sd-md sd-white shadow-lg shadow-amber-800"
        />
        <svg
          className="absolute inset-0 rounded-full"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <mask id="cd-mask" x="0" y="0" width="100%" height="100%">
              <circle cx="50" cy="50" r="15" fill="#fff" />
            </mask>
          </defs>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="#000"
            mask="url(#cd-mask)"
          />
        </svg>
      </div>
      <div className="p-5 text-8xl text-amber-400 text-center">
        {detail.album_name}
      </div>

      {/*<div className="text-xl">{detail.album_release_date}</div>*/}
      {/*<div className="text-sm">{detail.album_description}</div>*/}
      <div className="p-5 text-8xl text-center">BY</div>
      <div className="p-5 text-8xl text-amber-400 text-center">
        {detail.artist_name}
      </div>
      {/*<Image*/}
      {/*  src={`${detail.artist_image}`}*/}
      {/*  alt={`개발자에게 얼른 사진 넣어라고 전해주세요`}*/}
      {/*  width={250}*/}
      {/*  height={250}*/}
      {/*  className="rounded-md transition-transform hover:scale-95 hover:brightness-95 rounded-full"*/}
      {/*/>*/}
      {/*<div className="text-2xl">{detail.artist_name}</div>*/}
      <div
        style={{
          position: "relative",
          width: "80%",
          paddingBottom: "56.25%" /* 16:9 비율 */,
        }}
      >
        <iframe
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
          }}
          src={detail.music_video}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className={"pt-10"}
        ></iframe>
      </div>
    </div>
  );
};

export default AlbumDetail;
