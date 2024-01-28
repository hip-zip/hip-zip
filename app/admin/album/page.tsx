"use client";

import {
  AlbumDetailType,
  getAlbum,
  getAlbumDetail,
  searchAlbum,
} from "@/app/hook/util";
import Management from "@/app/components/template/Management/Management";

export interface AlbumImageGridType {
  id: number;
  name: string;
  image: string;
}

export default function Page() {
  return (
    <Management<AlbumImageGridType>
      label={"앨범"}
      type={"albums"}
      fetch={getAlbum}
      search={searchAlbum}
    />
  );
}
