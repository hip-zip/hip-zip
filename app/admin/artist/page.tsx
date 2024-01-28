"use client";

import Management from "@/app/components/template/Management/Management";
import {
  ArtistDetailType,
  getArtist,
  getArtistDetail,
  searchArtist,
} from "@/app/hook/util";
import ArtistPostModal from "@/app/components/organism/Modal/ArtistPostModal";
import { Suspense, useState } from "react";
import ArtistModifyModal from "@/app/components/organism/Modal/ArtistModifyModal";
import GroupModifyModal from "@/app/components/organism/Modal/GroupModifyModal";

export interface ArtistImageGridType {
  id: number;
  name: string;
  image: string;
  artistType: string;
}

export default function Page() {
  const [detailId, setDetailId] = useState<number>(-1);
  const [postModalOpen, setPostModalOpen] = useState<boolean>(false);
  const [artistModifyModalOpen, setArtistModifyModalOpen] =
    useState<boolean>(false);
  const [groupModifyModalOpen, setGroupModifyModalOpen] =
    useState<boolean>(false);

  const handlePostModalOpen = () => {
    setPostModalOpen(true);
  };

  const handleModifyModalOpen = (artist: ArtistImageGridType) => {
    setDetailId(artist.id);

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
      <Management<ArtistImageGridType>
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
        id={detailId}
        open={artistModifyModalOpen}
        setOpen={setArtistModifyModalOpen}
      />
      <GroupModifyModal
        id={detailId}
        open={groupModifyModalOpen}
        setOpen={setGroupModifyModalOpen}
      />
    </>
  );
}
