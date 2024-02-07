import React from "react";
import Image from "next/image";
import { AlbumType, ArtistType } from "@/app/components/type";

export interface ArtistProps {
  key: number;
  album: AlbumType;
  handleAlbumClick: (item: ArtistType) => void;
}

const Album = (props: ArtistProps) => {
  return (
    <Image
      key={props.album.id}
      src={props.album.image}
      alt={"개발자한테 사진 넣으라고 전해주세요"}
      width={250}
      height={250}
      className="rounded-md transition-transform hover:scale-95 hover:brightness-95"
      title={`${props.album.name}`}
      onClick={() => {
        props.handleAlbumClick(props.album);
      }}
    />
  );
};

export default Album;
