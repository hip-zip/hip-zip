import React from "react";
import Image from "next/image";
import { ArtistType } from "@/app/components/type";

export interface ArtistProps {
  artist: ArtistType;
  handleArtistClick: (item: ArtistType) => void;
}

const Artist = (props: ArtistProps) => {
  return (
    <Image
      key={props.artist.id}
      src={props.artist.image}
      alt={"개발자한테 사진 넣으라고 전해주세요"}
      width={250}
      height={250}
      className="rounded-md transition-transform hover:scale-95 hover:brightness-95"
      title={`${props.artist.name}`}
      onClick={() => {
        props.handleArtistClick(props.artist);
      }}
    />
  );
};

export default Artist;
