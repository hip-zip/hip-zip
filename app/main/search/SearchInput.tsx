"use client";

import React, { useEffect, useState } from "react";
import { useSessionStorage } from "usehooks-ts";

const SearchInput = (props: { searchQuery: Function }) => {
  const [searchSession, setSearchSession] = useSessionStorage("search", "");
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );

  const handleSearchInputChange = (event: any) => {
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
      <div className={"text-2xl md:text-3xl xl:text-4xl pb-8"}>
        앨범, 아티스트 이름으로 검색해보세요!
      </div>
      <input
        className="placeholder:text-gray-300 w-9/12 text-center bg-transparent border border-slate-300 rounded-md p-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm xl:text-xl"
        placeholder=""
        defaultValue={searchSession}
        type="text"
        name="search"
        onChange={handleSearchInputChange}
      />
    </>
  );
};

export default SearchInput;
