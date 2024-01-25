"use client";

import { useEffect } from "react";
import Artist from "@/app/components/atom/Images/Artist";
import { cn } from "@/lib/utils";

interface ArtistImageGridProps {
  data:
    | {
        id: number;
        name: string;
        image: string;
      }[]
    | null;
  handleImageClick: (id: number) => void;
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
          artist={item}
          handleArtistClick={props.handleImageClick}
        />
      ))}
    </div>
  );
};

export default ArtistImageGrid;
