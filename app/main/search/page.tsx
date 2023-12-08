"use client";

import SearchInput from "@/app/main/search/SearchInput";
import ResultAlbumList from "@/app/main/search/ResultAlbumList";
import { useEffect, useState } from "react";

export default function Page() {
  const searchQuery = async (param: string) => {
    const response = await fetch(`/api/album/search/?search=${param}`);
  };

  return (
    <>
      <SearchInput searchQuery={searchQuery} />
    </>
  );
}
