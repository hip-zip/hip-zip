import { useState } from "react";
import { AlbumListType } from "@/app/main/page";
import { SearchForm } from "@/app/components/organism/SearchForm/SearchForm";

export const Search = () => {
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
      <SearchForm searchQuery={searchQuery} albumList={albumList} />
    </>
  );
};
