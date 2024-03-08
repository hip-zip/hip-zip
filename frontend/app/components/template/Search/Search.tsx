import { useState } from "react";
import {
  ISupabaseAlbumList,
  SearchForm,
} from "@/app/components/organism/SearchForm/SearchForm";

export const Search = () => {
  const [albumList, setAlbumList] = useState<ISupabaseAlbumList[]>([]);

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
