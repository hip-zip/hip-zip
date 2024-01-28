import React from "react";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { ArtistImageGridType } from "@/app/admin/artist/page";

export interface ArtistImageType {
  id: number;
  name: string;
  image: string;
}

export interface ArtistProps {
  data: ArtistImageGridType;
  handleArtistClick: (item: ArtistImageGridType) => void;
}

const Artist = (props: ArtistProps) => {
  return (
    <Image
      key={props.data.id}
      src={props.data.image}
      alt={"개발자한테 사진 넣으라고 전해주세요"}
      width={250}
      height={250}
      className="rounded-md transition-transform hover:scale-95 hover:brightness-95"
      title={`${props.data.name}`}
      onClick={() => {
        props.handleArtistClick(props.data);
      }}
    />
  );
};

export default Artist;
