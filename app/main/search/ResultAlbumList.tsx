"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import { AlbumListType } from "@/app/main/page";
import { useRouter } from "next/navigation";

const ResultAlbumList = (props: { albumList: AlbumListType[] }) => {
  const router = useRouter();

  return (
    <div className="h-full pt-10 flex justify-center items-center overflow-hidden">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 overflow-auto max-h-full">
        {props.albumList?.map((item) => (
          <div key={item.id} className="flex justify-center items-center">
            <Image
              src={`${item.album_image}`}
              alt={"개발자한테 사진 넣으라고 전해주세요"}
              width={250}
              height={250}
              className="rounded-md transition-transform hover:scale-95 hover:brightness-95"
              title={`${item.album_name} - ${item.artist_name}`}
              onClick={() => {
                if (document?.startViewTransition) {
                  document.startViewTransition(() => {
                    router.push(`/main/detail/${item.id}`);
                  });
                } else {
                  router.push(`/main/detail/${item.id}`);
                }
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultAlbumList;
