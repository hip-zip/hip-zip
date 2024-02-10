"use client";

import { getAlbum, getAlbumDetail, searchAlbum } from "@/app/api/fetch/api";
import ContentsManagement from "@/app/components/template/Management/ContentsManagement";
import React, { useState } from "react";
import AlbumPostModal from "@/app/components/organism/Modal/AlbumPostModal";
import AlbumModifyModal from "@/app/components/organism/Modal/AlbumModifyModal";

export interface AlbumType {
  id: number;
  name: string;
  image: string;
}

export default function Page() {
  const [albumDetailId, setAlbumDetailId] = useState<number>(-1);
  const [albumPostModalOpen, setAlbumPostModalOpen] = useState<boolean>(false);
  const [albumModifyModalOpen, setAlbumModifyModalOpen] =
    useState<boolean>(false);

  const handlePostModalOpen = () => {
    setAlbumPostModalOpen(true);
  };

  const handleModifyModalOpen = (album: AlbumType) => {
    setAlbumDetailId(album.id);
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
      <AlbumModifyModal
        id={albumDetailId}
        open={albumModifyModalOpen}
        setOpen={setAlbumModifyModalOpen}
      />
    </>
  );
}
