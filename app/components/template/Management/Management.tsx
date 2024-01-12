"use client";

import React from "react";
import { ArtistType } from "@/app/components/atom/Images/Artist";
import Input from "@/app/components/atom/Input/Input";
import useDebouncedFetch from "@/app/hook/useDebouncedFetch";
import { searchArtist } from "@/app/hook/util";
import Button from "@/app/components/atom/Button/Button";

interface ManagementProps {
  type: "artists" | "albums";
}

type SearchParamsType = {
  name: string;
};

const Management = (props: ManagementProps) => {
  const [data, onSearchQueryChange] = useDebouncedFetch<ArtistType[]>(
    (query: string): Promise<ArtistType[]> => searchArtist(query),
    300,
  );
  // const [searchQuery, setSearchQuery] = useState("");
  // const data = useFetch<ArtistType>(() => searchArtist, searchQuery);

  return (
    <>
      <Input
        className={"text-center"}
        type={"text"}
        placeholder={"아티스트를 입력하세요"}
        onChange={onSearchQueryChange}
      />
      <Button className={"fixed bottom-10 right-10"} message={"등록하기"} />
    </>
  );
};

export default Management;
