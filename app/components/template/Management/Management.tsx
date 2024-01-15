"use client";

import React, { useState } from "react";
import { ArtistType } from "@/app/components/atom/Images/Artist";
import Input from "@/app/components/atom/Input/Input";
import useDebouncedSearch from "@/app/hook/useDebouncedSearch";
import { searchArtist } from "@/app/hook/util";
import Button from "@/app/components/atom/Button/Button";
import ArtistModal from "@/app/components/organism/Modal/ArtistModal";
import AlbumModal from "../../organism/Modal/AlbumModal";
import { AlbumType } from "@/app/components/atom/Images/Album";
import ImageGrid from "@/app/components/molecule/ImageGrid/ImageGrid";
import { useInfiniteQuery } from "@tanstack/react-query";

interface ManagementProps {
  type: "artists" | "albums";
}

export type ArtistGridType = {
  id: number;
  name: string;
  image: string;
};

const Management = (props: ManagementProps) => {
  const [response, onSearchQueryChange] = useDebouncedSearch<ArtistGridType[]>(
    (query: string): Promise<ArtistGridType[]> => searchArtist(query),
    300,
  );

  const handleImageClick = (id: number) => {}; // Detail API 부르고 해당 정보 받아서 모달에 띄울 예정

  return (
    <>
      <Input
        className={"text-center text-base"}
        type={"text"}
        placeholder={"아티스트를 입력하세요"}
        onChange={onSearchQueryChange}
      />
      <ImageGrid data={response} handleImageClick={handleImageClick} />
      {props.type === "artists" && <ArtistModal />}
      {props.type === "albums" && <AlbumModal />}
    </>
  );
};

export default Management;
