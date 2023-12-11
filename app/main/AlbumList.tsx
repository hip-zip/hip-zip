"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AlbumListType } from "@/app/main/page";
import { useSessionStorage } from "usehooks-ts";
import YearSelection from "@/app/main/YearSelection";
import AlbumListContainer from "@/app/main/AlbumListContainer";

const AlbumList = (props: { albumList: AlbumListType[] }) => {
  // const [albumList, setAlbumList] = useState<AlbumListType[]>(props.albumList);
  const [scrollLocation, setScrollLocation] = useSessionStorage("scroll", 0);

  useEffect(() => {
    window.scrollTo(0, scrollLocation);
  }, []);

  return (
    <div className={"w-full h-full border border-slate-800 rounded"}>
      <YearSelection setScrollLocation={setScrollLocation} />
      <AlbumListContainer setScrollLocation={setScrollLocation} />
    </div>
  );
};

export default AlbumList;
