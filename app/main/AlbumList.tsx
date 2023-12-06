"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AlbumListType } from "@/app/main/page";
import { useSessionStorage } from "usehooks-ts";
import YearSelection from "@/app/main/YearSelection";
import AlbumListContainer from "@/app/main/AlbumListContainer";

const AlbumList = (props: { albumList: AlbumListType[] }) => {
  // const [albumList, setAlbumList] = useState<AlbumListType[]>(props.albumList);
  const [yearArray] = useState([2023, 2022, 2021, 2020]);
  const [scrollLocation, setScrollLocation] = useSessionStorage("scroll", 0);

  useEffect(() => {
    window.scrollTo(0, scrollLocation);
  }, []);

  return (
    <>
      <YearSelection setScrollLocation={setScrollLocation} />
      <AlbumListContainer setScrollLocation={setScrollLocation} />
    </>
  );
};

export default AlbumList;
