"use client";

import ContentsManagement from "@/app/components/template/Management/ContentsManagement";
import { getArtist, getArtistDetail, searchArtist } from "@/app/api/fetch/api";
import ArtistPostModal from "@/app/components/organism/Modal/ArtistPostModal";
import { Suspense, useState } from "react";
import ArtistModifyModal from "@/app/components/organism/Modal/ArtistModifyModal";
import GroupModifyModal from "@/app/components/organism/Modal/GroupModifyModal";
import { ArtistType } from "@/app/components/type";

export default function Page() {
  const [artistDetailId, setArtistDetailId] = useState<number>(-1);
  const [postModalOpen, setPostModalOpen] = useState<boolean>(false);
  const [artistModifyModalOpen, setArtistModifyModalOpen] =
    useState<boolean>(false);
  const [groupModifyModalOpen, setGroupModifyModalOpen] =
    useState<boolean>(false);

  const handlePostModalOpen = () => {
    setPostModalOpen(true);
  };

  const handleModifyModalOpen = (artist: ArtistType) => {
    console.log("page.tsx:24 - artist = ", artist);
    setArtistDetailId(artist.id);

    if (artist.artistType === "SOLO") {
      setArtistModifyModalOpen(true);
      return;
    }
    if (artist.artistType === "GROUP") {
      setGroupModifyModalOpen(true);
      return;
    }
  };

  return (
    <>
      <ContentsManagement<ArtistType>
        label={"아티스트"}
        type={"artists"}
        handlePostModalOpen={handlePostModalOpen}
        handleModifyModalOpen={handleModifyModalOpen}
        fetch={getArtist}
        search={searchArtist}
        // detail={getArtistDetail}
      />
      <ArtistPostModal open={postModalOpen} setOpen={setPostModalOpen} />
      <ArtistModifyModal
        id={artistDetailId}
        open={artistModifyModalOpen}
        setOpen={setArtistModifyModalOpen}
      />
      <GroupModifyModal
        id={artistDetailId}
        open={groupModifyModalOpen}
        setOpen={setGroupModifyModalOpen}
      />
    </>
  );
}
