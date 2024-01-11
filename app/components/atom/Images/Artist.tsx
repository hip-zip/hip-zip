import React from "react";
import Image from "next/image";

import { useRouter } from "next/navigation";

export interface ArtistType {
  item: {
    id: number;
    name: string;
    image: string;
  };
}

export interface ArtistProps extends ArtistType {
  handleArtistClick: (id: number) => void;
}

const Artist = (props: ArtistProps) => {
  return (
    <Image
      src={props.item.image}
      alt={"개발자한테 사진 넣으라고 전해주세요"}
      width={250}
      height={250}
      className="rounded-md transition-transform hover:scale-95 hover:brightness-95"
      title={`${props.item.name}`}
      onClick={() => {}}
    />
  );
};

export default Artist;
