"use client";

import React from "react";
import Image from "next/image";
import { IArtistDetail } from "@/app/components/type";

interface ArtistDetailPageProps {
  artist: IArtistDetail;
}

const ArtistDetailPage = (props: ArtistDetailPageProps) => {
  return (
    <div className={"h-screen"}>
      <Image
        src={props.artist.image}
        alt={"개발자한테 이미지 삽입 요청 부탁드립니다 .."}
        className="rounded-md mt-10"
        width={300}
        height={300}
      />
      <div className={"mt-10 text-center"}>{props.artist.name}</div>
    </div>
  );
};

export default ArtistDetailPage;
