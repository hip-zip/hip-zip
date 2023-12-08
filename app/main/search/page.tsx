"use client";

import SearchInput from "@/app/main/search/SearchInput";
import ResultAlbumList from "@/app/main/search/ResultAlbumList";
import { useEffect, useState } from "react";
import { AlbumListType } from "@/app/main/page";

export default function Page() {
  const [albumList, setAlbumList] = useState<AlbumListType[]>([]);

  const searchQuery = async (param: string) => {
    if (param !== "empty") {
      const response = await fetch(`/api/album/search/?search=${param}`);
      const data = await response.json();
      setAlbumList((prev) => data.data);
    } else {
      setAlbumList((prev) => []);
    }
  };

  return (
    <>
      <SearchInput searchQuery={searchQuery} />
      <ResultAlbumList albumList={albumList} />
    </>
  );
}
