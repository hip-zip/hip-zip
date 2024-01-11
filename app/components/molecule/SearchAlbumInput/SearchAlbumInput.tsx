"use client";

import React, { useEffect, useState } from "react";
import { useSessionStorage } from "usehooks-ts";
import Input from "@/app/components/atom/Input/Input";
import Label from "@/app/components/atom/Label/Label";

const SearchAlbumInput = (props: { searchQuery: Function }) => {
  const [searchSession, setSearchSession] = useSessionStorage("search", "");
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );

  const onSearchQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setSearchSession(inputValue);

    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    setSearchTimeout(
      setTimeout(() => {
        if (inputValue.length >= 1) {
          props.searchQuery(inputValue);
        } else {
          props.searchQuery("empty");
        }
      }, 300),
    );
  };

  useEffect(() => {
    if (searchSession.length >= 1) {
      // Perform initial search when component mounts
      props.searchQuery(searchSession);
    }
  }, []);

  return (
    <>
      <Label
        className={"text-xl text-hipzip-white p-2"}
        message={"아티스트, 앨범의 이름으로 앨범을 검색해보세요 !"}
      />
      <Input
        className={"text-base"}
        type="text"
        placeholder="Ex) 창모 or UNDERGROUND ROCKSTAR"
        defaultValue={searchSession}
        name="search"
        onChange={onSearchQueryChange}
      />
    </>
  );
};

export default SearchAlbumInput;
