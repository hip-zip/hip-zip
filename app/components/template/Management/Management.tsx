"use client";

import React, { useEffect, useLayoutEffect, useState } from "react";
import { ArtistDetailType } from "@/app/components/atom/Images/Artist";
import Input from "@/app/components/atom/Input/Input";
import useDebouncedSearch from "@/app/hook/useDebouncedSearch";
import { getArtist, getArtistDetail, searchArtist } from "@/app/hook/util";
import ArtistPostModal from "@/app/components/organism/Modal/ArtistPostModal";
import AlbumModal from "../../organism/Modal/AlbumModal";
import ImageGrid from "@/app/components/molecule/ImageGrid/ImageGrid";
import ArtistModifyModal from "@/app/components/organism/Modal/ArtistModifyModal";

interface ManagementProps {
  type: "artists" | "albums";
}

export type ImageGridType = {
  id: number;
  name: string;
  image: string;
};

const Management = (props: ManagementProps) => {
  const [response, onSearchQueryChange] = useDebouncedSearch<ImageGridType[]>(
    (query: string): Promise<ImageGridType[]> => searchArtist(query),
    300,
  );
  const [initialData, setInitialData] = useState<ImageGridType[]>([]);
  const [modifyModalStatus, setModifyModalStatus] = useState<boolean>(false);
  const [detailData, setDetailData] = useState<ArtistDetailType | undefined>();
  const [searchStatus, setSearchStatus] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);

  const handleImageClick = async (id: number) => {
    const response = await getArtistDetail(id);
    await setDetailData(response);
    await setId(id);
    await setModifyModalStatus(true);
  }; // Detail API 부르고 해당 정보 받아서 모달에 띄울 예정

  const initialFetch = async () => {
    const response = await getArtist();
    setInitialData(response);
  };

  useEffect(() => {
    initialFetch();
  }, []); // 이후 Page 단에서 데이터 fetch 해서 넘겨주는 방식으로 변경 예정

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
      <ImageGrid
        data={!searchStatus ? initialData : response}
        handleImageClick={handleImageClick}
      />
      {props.type === "artists" && <ArtistPostModal />}
      {props.type === "albums" && <AlbumModal />}
      <ArtistModifyModal
        open={modifyModalStatus}
        setOpen={setModifyModalStatus}
        detailData={detailData}
        id={id}
      />
    </div>
  );
};

export default Management;
