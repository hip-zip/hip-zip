"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { IArtistDetail } from "@/app/components/type";
import { useRouter } from "next/navigation";

interface ArtistDetailPageProps {
  artist: IArtistDetail;
}

const ArtistDetailPage = (props: ArtistDetailPageProps) => {
  useEffect(() => {}, []);

  const router = useRouter();

  return (
    <div className={"h-screen flex flex-col items-center"}>
      <Image
        src={props.artist.image}
        alt={"개발자한테 이미지 삽입 요청 부탁드립니다 .."}
        className="rounded-md mt-10"
        width={300}
        height={300}
      />
      <div className={"mt-10 text-center"}>{props.artist.name}</div>
      <div className={"mt-10 flex flex-col items-center justify-center gap-6"}>
        <div className={"text-xl"}>참여한 앨범</div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {props.artist.albumResponses.map((album) => (
            <div
              key={album.id}
              className="flex flex-col gap-3 justify-center items-center truncate"
            >
              <Image
                src={album.image}
                className="rounded-md cursor-pointer"
                alt="이미지 없음"
                width={150}
                height={150}
                onClick={() => router.push(`/main/detail/album/${album.id}`)}
              />
              <div className="text-base truncate">{album.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtistDetailPage;
