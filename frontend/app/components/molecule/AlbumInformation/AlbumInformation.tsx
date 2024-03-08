"use client";

import React, { useEffect, useRef, useState } from "react";
import Label from "@/app/components/atom/Label/Label";
import { IArtist } from "@/app/components/type";
import { useRouter } from "next/navigation";

interface AlbumInformationProps {
  albumName: string;
  artist: IArtist;
}

const AlbumInformation = (props: AlbumInformationProps) => {
  const router = useRouter();

  useEffect(() => {}, []);

  return (
    <>
      <Label className={"text-hipzip-amber p-5"} message={props.albumName} />
      <Label className={"text-hipzip-white p-5"} message={"By"} />
      <Label
        className={"text-hipzip-amber p-5 cursor-pointer"}
        message={props.artist.name}
        onClick={() => {
          router.push(`/main/detail/artist/${props.artist.id}`);
        }}
      />
    </>
  );
};

export default AlbumInformation;
