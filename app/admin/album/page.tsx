"use client";

import { getAlbum, getAlbumDetail, searchAlbum } from "@/app/api/fetch/api";
import ContentsManagement from "@/app/components/template/Management/ContentsManagement";
import { useState } from "react";
import AlbumPostModal from "@/app/components/organism/Modal/AlbumPostModal";

export interface AlbumType {
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
      <ContentsManagement<AlbumType>
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
