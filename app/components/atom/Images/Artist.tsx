import React from "react";
import Image from "next/image";

import { useRouter } from "next/navigation";

export interface ArtistImageType {
  item: {
    id: number;
    name: string;
    image: string;
  };
}

export interface ArtistDetailType {
  name: string;
  image: string;
  artistType: string;
  group: {
    id: number;
    name: string;
    image: string;
  };
  groupMembers: {
    id: number;
    name: string;
    image: string;
  }[];
  hashtag: string[];
}

export interface ArtistProps extends ArtistImageType {
  handleArtistClick: (id: number) => void;
}

const Artist = (props: ArtistProps) => {
  return (
    <Image
      key={props.item.id}
      src={props.item.image}
      alt={"개발자한테 사진 넣으라고 전해주세요"}
      width={250}
      height={250}
      className="rounded-md transition-transform hover:scale-95 hover:brightness-95"
      title={`${props.item.name}`}
      onClick={() => {
        props.handleArtistClick(props.item.id);
      }}
    />
  );
};

export default Artist;
