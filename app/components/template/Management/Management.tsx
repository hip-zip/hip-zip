"use client";

import React, { useEffect, useState } from "react";
import { ArtistType } from "@/app/components/atom/Images/Artist";
import Input from "@/app/components/atom/Input/Input";
import useDebouncedFetch from "@/app/hook/useDebouncedFetch";

interface ManagementProps {
  type: string;
}

const Management = (props: ManagementProps) => {
  const [data, onSearchQueryChange] = useDebouncedFetch("/artists", 300);

  return (
    <>
      <Input
        className={"text-center"}
        type={"text"}
        placeholder={"아티스트를 입력하세요"}
        onChange={onSearchQueryChange}
      />
    </>
  );
};

export default Management;
