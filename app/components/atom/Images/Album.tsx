import React from "react";
import Image from "next/image";

import { useRouter } from "next/navigation";

export interface AlbumType {
  item: {
    id: number;
    album_name: string;
    album_description: string;
    album_image: string;
    album_tracks: string[];
    album_release_date: string;
    music_video: string;
    artist_name: string;
    artist_image: string;
  };
}

interface AlbumProps extends AlbumType {
  key: number;
  setScrollLocation: React.Dispatch<React.SetStateAction<number>>;
}

export const Album = (props: AlbumProps) => {
  const router = useRouter();

  return (
    <div key={props.key} className="flex justify-center items-center">
      <Image
        src={props.item.album_image}
        alt={"개발자한테 사진 넣으라고 전해주세요"}
        width={250}
        height={250}
        className="rounded-md transition-transform hover:scale-95 hover:brightness-95"
        title={`${props.item.album_name} - ${props.item.artist_name}`}
        onClick={() => {
          if (document?.startViewTransition) {
            document.startViewTransition(() => {
              props.setScrollLocation(window.scrollY);
              router.push(`/main/detail/${props.item.id}`);
            });
          } else {
            props.setScrollLocation(window.scrollY);
            router.push(`/main/detail/${props.item.id}`);
          }
        }}
      />
    </div>
  );
};
