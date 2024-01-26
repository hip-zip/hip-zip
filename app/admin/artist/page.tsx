"use client";

import Management from "@/app/components/template/Management/Management";
import {
  ArtistDetailType,
  getArtist,
  getArtistDetail,
  searchArtist,
} from "@/app/hook/util";

export interface ArtistImageGridType {
  id: number;
  name: string;
  image: string;
  artistType: string;
}

export default function Page() {
  return (
    <Management<ArtistImageGridType, ArtistDetailType>
      label={"아티스트"}
      type={"artists"}
      fetch={getArtist}
      search={searchArtist}
      detail={getArtistDetail}
    />
  );
}
