"use client";

import React, { useLayoutEffect } from "react";
import { useSessionStorage } from "usehooks-ts";
import AlbumListContainer from "@/app/components/molecule/AlbumListContainer/AlbumListContainer";

interface AlbumListProps {}

const AlbumList = (props: AlbumListProps) => {
  const [scrollLocation, setScrollLocation] = useSessionStorage("scroll", 0);

  useLayoutEffect(() => {
    window.scrollTo(0, scrollLocation);
  }, [scrollLocation]);

  return <AlbumListContainer setScrollLocation={setScrollLocation} />;
};

export default AlbumList;
