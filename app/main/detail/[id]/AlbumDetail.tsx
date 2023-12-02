"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import MusicVideoContainer from "@/app/main/detail/[id]/MusicVideoContainer";
import AlbumLabelContainer from "@/app/main/detail/[id]/AlbumLabelContainer";
import SpinningAlbum from "@/app/main/detail/[id]/SpinningAlbum";
import LikeDislike from "@/app/main/detail/[id]/LikeDislike";

const AlbumDetail = ({ detail }: any) => {
  const [isiPhone, setIsiPhone] = useState(false);
  const [cdVector, setCdVector] = useState({
    cx: "",
    cy: "",
    r: "",
    fill: "#fff",
  });
  const router = useRouter();

  useEffect(() => {
    const userAgent = navigator.userAgent;
    const iPhoneRegex = /iphone/i;

    window.addEventListener("popstate", function (event) {
      if (document?.startViewTransition) {
        document.startViewTransition(() => {});
      } else {
        router.push(`/main`);
      }
    });

    setIsiPhone(iPhoneRegex.test(userAgent));

    if (!iPhoneRegex.test(userAgent)) {
      setCdVector((prev) => ({
        ...prev,
        cx: "50%",
        cy: "50%",
        r: "15%",
      }));
    } else {
      setCdVector((prev) => ({
        ...prev,
        cx: "64%",
        cy: "64%",
        r: "15%",
      }));
    }
  }, []);

  return (
    <div className={"w-full flex flex-col justify-center items-center"}>
      <SpinningAlbum albumImage={detail.album_image} cdVector={cdVector} />
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
