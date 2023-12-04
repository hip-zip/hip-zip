"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AlbumListProps, AlbumListType } from "@/app/main/page";
import { useSessionStorage } from "usehooks-ts";
import YearSelection from "@/app/main/YearSelection";
import AlbumListContainer from "@/app/main/AlbumListContainer";

const AlbumList = (props: { albumList: AlbumListType[] }) => {
  const router = useRouter();
  const [albumList, setAlbumList] = useState<AlbumListType[]>(props.albumList);
  const [yearArray] = useState([2023, 2022, 2021, 2020]);
  const [scrollLocation, setScrollLocation] = useSessionStorage("scroll", 0);
  const yearParams = useSearchParams();

  useEffect(() => setScrollLocation(0), []);

  useEffect(() => {
    const year = yearParams.get("year");
    if (year !== null) {
      getAlbumListByYear(parseInt(year));
    } else {
      setAlbumList(albumList);
    }
    window.scrollTo(0, scrollLocation);
    window.message = "hello world";
  }, [yearParams]);

  const getAlbumListByYear = async (year: number) => {
    try {
      const response = await fetch(`/api/album/?page=1&year=${year}`);
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const fetchData = await response.json();
      setAlbumList((prev: AlbumListType[]) => fetchData.data);
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <>
      <YearSelection setScrollLocation={setScrollLocation} />
      <AlbumListContainer
        albumList={albumList}
        setAlbumList={setAlbumList}
        setScrollLocation={setScrollLocation}
      />
    </>
  );
};

export default AlbumList;
