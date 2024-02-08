import React, { useEffect, useMemo } from "react";
import Artist from "@/app/components/atom/Images/Artist";
import { cn } from "@/lib/utils";
import { AlbumType } from "@/app/admin/album/page";
import { ArtistType } from "@/app/components/type";
import ArtistImageGrid from "@/app/components/molecule/ImageGrid/ArtistImageGrid";
import AlbumImageGrid from "@/app/components/molecule/ImageGrid/AlbumImageGrid";

interface ImageGridProps<T extends AlbumType | ArtistType> {
  data: T[];
  handleImageClick: (item: T) => void;
  type: "artists" | "albums";
  className?: string;
}

const ImageGrid = <T extends AlbumType | ArtistType>(
  props: ImageGridProps<T>,
) => {
  useEffect(() => {
    console.log("ImageGrid.tsx:20 - props.type = ", props.type);
  }, [props.type]);

  const Contents = useMemo<Record<string, React.ReactNode>>(
    () => ({
      artists: (
        <ArtistImageGrid
          artists={props.data as ArtistType[]}
          handleImageClick={
            props.handleImageClick as (item: ArtistType) => void
          } // Type assertion to ArtistType
        />
      ),
      albums: (
        <AlbumImageGrid
          albums={props.data as AlbumType[]}
          handleImageClick={props.handleImageClick as (item: AlbumType) => void} // Type assertion to AlbumType
        />
      ),
    }),
    [props.type, props.data],
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
        {OptionalGrid}
      </div>
    </div>
  );
};

export default ImageGrid;
