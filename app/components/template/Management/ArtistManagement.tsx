"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Input from "@/app/components/atom/Input/Input";
import useDebouncedSearch from "@/app/hook/useDebouncedSearch";
import {
  ArtistDetailType,
  getArtist,
  getArtistDetail,
  searchArtist,
} from "@/app/hook/util";
import ArtistPostModal from "@/app/components/organism/Modal/ArtistPostModal";
import AlbumModal from "../../organism/Modal/AlbumModal";
import ArtistImageGrid from "@/app/components/molecule/ImageGrid/ArtistImageGrid";
import ArtistModifyModal from "@/app/components/organism/Modal/ArtistModifyModal";
import useIntersectionObserver from "@/app/hook/useIntersectionObserver";
import GroupModifyModal from "@/app/components/organism/Modal/GroupModifyModal";
import { ArtistImageType } from "@/app/components/atom/Images/Artist";

interface ManagementProps {
  type: "artists" | "albums";
}

export interface ArtistImageGridType {
  id: number;
  name: string;
  image: string;
  artistType: string;
}

const ArtistManagement = (props: ManagementProps) => {
  const [response, onSearchQueryChange] = useDebouncedSearch<
    ArtistImageGridType[]
  >(
    (query: string): Promise<ArtistImageGridType[]> => searchArtist(query),
    300,
  );
  const [initialData, setInitialData] = useState<ArtistImageGridType[]>([]);
  const [modifyModalStatus, setModifyModalStatus] = useState<boolean>(false);
  const [detailData, setDetailData] = useState<ArtistDetailType | undefined>();
  const [searchStatus, setSearchStatus] = useState<boolean>(false);
  const target = useRef(null);
  const [id, setId] = useState<number>(0);
  const [page, setPage] = useState<number>(-1);
  const [keepFetch, setKeepFetch] = useState<boolean>(true);
  const [renderBlock, setRenderBlock] = useState<boolean>(true);

  const [observe, unobserve] = useIntersectionObserver(() => {
    setPage((prev) => prev + 1);
  });

  const handleImageClick = async (id: number) => {
    const response = await getArtistDetail(id);
    setDetailData(response);
    setId(id);
    setModifyModalStatus(true);
  };

  useEffect(() => {
    setRenderBlock(false);
  }, []);

  useEffect(() => {
    observe(target.current);
    return () => unobserve(target.current);
  }, [observe, unobserve]);

  useEffect(() => {
    if (page === -1) return;
    const fetch = async () => {
      if (!keepFetch) return;
      const response = await getArtist(page);
      if (response.length === 0) setKeepFetch(false);
      setInitialData((prev) => [...prev, ...response]);
    };
    fetch();
  }, [page]);

  return (
    <div className={"w-full h-full p-4"}>
      <Input
        className={"text-center text-base mb-4"}
        type={"text"}
        placeholder={"아티스트를 입력하세요"} // props로 받아서 처리 예정
        onChange={(e) => {
          if (e.target.value === "") {
            setSearchStatus(false);
            return;
          }
          onSearchQueryChange(e);
          setSearchStatus(true);
        }}
      />
      <ArtistImageGrid
        data={!searchStatus ? initialData : response}
        handleImageClick={handleImageClick}
      />
      {props.type === "artists" && <ArtistPostModal />}
      {detailData?.artistType === "SOLO" && (
        <ArtistModifyModal
          open={modifyModalStatus}
          setOpen={setModifyModalStatus}
          detailData={detailData}
          id={id}
        />
      )}
      {detailData?.artistType === "GROUP" && (
        <GroupModifyModal
          open={modifyModalStatus}
          setOpen={setModifyModalStatus}
          detailData={detailData}
          id={id}
        />
      )}
      {!renderBlock && (
        <div
          ref={(target) => {
            observe(target);
          }}
          className={"h-30"}
        />
      )}
    </div>
  );
};

export default ArtistManagement;
