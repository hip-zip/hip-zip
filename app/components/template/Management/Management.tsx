"use client";

import React, { useState } from "react";
import { ArtistType } from "@/app/components/atom/Images/Artist";
import Input from "@/app/components/atom/Input/Input";
import useDebouncedSearch from "@/app/hook/useDebouncedSearch";
import { searchArtist } from "@/app/hook/util";
import Button from "@/app/components/atom/Button/Button";
import ArtistModal from "@/app/components/organism/Modal/ArtistModal";
import AlbumModal from "../../organism/Modal/AlbumModal";

interface ManagementProps {
  type: "artists" | "albums";
}

type SearchParamsType = {
  name: string;
};

const Management = (props: ManagementProps) => {
  const [data, onSearchQueryChange] = useDebouncedSearch<ArtistType[]>(
    (query: string): Promise<ArtistType[]> => searchArtist(query),
    300,
  );

  // const [searchQuery, setSearchQuery] = useState("");
  // const data = useFetch<ArtistType>(() => searchArtist, searchQuery);

  return (
    <>
      <Input
        className={"text-center text-base"}
        type={"text"}
        placeholder={"아티스트를 입력하세요"}
        onChange={onSearchQueryChange}
      />
      {/*<AlbumModal></AlbumModal>*/}
      <ArtistModal />
    </>
  );
};

export default Management;
