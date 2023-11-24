"use client";

import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import { AlbumListProps } from "@/app/main/page";

const AlbumList = ({ albumList }: AlbumListProps) => {
  const router = useRouter();

  return (
    <div className="h-full flex justify-center items-center overflow-hidden">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 overflow-auto max-h-full">
        {albumList?.map((item, index) => (
          <div key={item.id} className="flex justify-center items-center">
            <Image
              src={`${item.album_image}`}
              alt={`개발자에게 얼른 사진 넣어라고 전해주세요`}
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

export default AlbumList;
