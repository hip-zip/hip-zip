"use client";

import React, { useEffect, useMemo } from "react";
import Artist from "@/app/components/atom/Images/Artist";
import { cn } from "@/lib/utils";
import { AlbumType } from "@/app/admin/album/page";
import { ArtistType } from "@/app/components/type";
import ArtistImageGrid from "@/app/components/molecule/ImageGrid/ArtistImageGrid";
import AlbumImageGrid from "@/app/components/molecule/ImageGrid/AlbumImageGrid";

interface ImageGridProps<T> {
  data: T[];
  handleImageClick: (item: T) => void;
  className?: string;
}

type ConditionalImageGridProps<T> = T extends "artists"
  ? ImageGridProps<ArtistType>
  : T extends "albums"
    ? ImageGridProps<AlbumType>
    : never;

const ImageGrid = <T,>(props: ConditionalImageGridProps<T>) => {
  const Contents = useMemo<Record<string, React.ReactNode>>(
    () => ({
      artists: (
        <ArtistImageGrid
          artists={props.data}
          handleImageClick={props.handleImageClick}
        />
      ),
      albums: <AlbumImageGrid />,
    }),
    [],
  );

  const OptionalGrid = Contents[props.type];

  return (
    <div className={"flex justify-center"}>
      <div
        className={cn(
          "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 overflow-auto max-h-full",
          props.className || "",
        )}
      >
        {props.data?.map((item, index) => (
          <Artist
            key={item.id}
            artist={item as ArtistImageGridType}
            handleArtistClick={() => props.handleImageClick(props.data[index])}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGrid;
