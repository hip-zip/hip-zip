"use client";

import { useEffect } from "react";
import Artist, { ArtistImageType } from "@/app/components/atom/Images/Artist";
import { cn } from "@/lib/utils";
import { ArtistImageGridType } from "@/app/admin/artist/page";

interface ArtistImageGridProps {
  data:
    | {
        id: number;
        name: string;
        image: string;
        artistType: string;
      }[]
    | null;
  handleImageClick: (item: ArtistImageGridType) => void;
  className?: string;
}

const ArtistImageGrid = (props: ArtistImageGridProps) => {
  return (
    <div
      className={cn(
        "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 overflow-auto max-h-full",
        props.className || "",
      )}
    >
      {props.data?.map((item) => (
        <Artist
          key={item.id}
          data={item}
          handleArtistClick={props.handleImageClick}
        />
      ))}
    </div>
  );
};

export default ArtistImageGrid;
