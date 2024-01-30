"use client";

import {
  AlbumDetailType,
  getAlbum,
  getAlbumDetail,
  searchAlbum,
} from "@/app/hook/util";
import Management from "@/app/components/template/Management/Management";
import { useState } from "react";
import AlbumPostModal from "@/app/components/organism/Modal/AlbumPostModal";

export interface AlbumImageGridType {
  id: number;
  name: string;
  image: string;
}

export default function Page() {
  const [albumPostModalOpen, setAlbumPostModalOpen] = useState<boolean>(false);
  const [albumModifyModalOpen, setAlbumModifyModalOpen] =
    useState<boolean>(false);

  const handlePostModalOpen = () => {
    setAlbumPostModalOpen(true);
  };

  const handleModifyModalOpen = () => {
    setAlbumModifyModalOpen(true);
  };

  return (
    <>
      <Management<AlbumImageGridType>
        label={"앨범"}
        type={"albums"}
        handlePostModalOpen={handlePostModalOpen}
        handleModifyModalOpen={handleModifyModalOpen}
        fetch={getAlbum}
        search={searchAlbum}
      />
      <AlbumPostModal
        open={albumPostModalOpen}
        setOpen={setAlbumPostModalOpen}
      />
    </>
  );
}
