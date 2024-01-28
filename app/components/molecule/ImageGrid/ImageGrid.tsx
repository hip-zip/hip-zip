"use client";

import { useEffect } from "react";
import Artist, { ArtistImageType } from "@/app/components/atom/Images/Artist";
import { cn } from "@/lib/utils";
import { ArtistImageGridType } from "@/app/admin/artist/page";
import { AlbumImageGridType } from "@/app/admin/album/page";

interface ArtistImageGridProps<
  T extends ArtistImageGridType | AlbumImageGridType,
> {
  data: T[];
  handleImageClick: (item: T) => void;
  className?: string;
}

const ImageGrid = <T extends ArtistImageGridType | AlbumImageGridType>(
  props: ArtistImageGridProps<T>,
) => {
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
            data={item as ArtistImageGridType}
            handleArtistClick={() => props.handleImageClick(props.data[index])}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGrid;
