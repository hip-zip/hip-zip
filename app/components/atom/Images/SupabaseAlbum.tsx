import React from "react";
import Image from "next/image";

import { useRouter } from "next/navigation";

export interface AlbumType {
  //  스프링 체제 들어오면 수정 될 듯
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
} // 변경될 스키마

interface AlbumProps extends AlbumType {
  // onClick도 props로 받아서 진행해야 할 것 같음
  // 재사용성 향상 목적
  key: number;
  item: AlbumType["item"];
  setScrollLocation: React.Dispatch<React.SetStateAction<number>>;
}

export const SupabaseAlbum = (props: AlbumProps) => {
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
