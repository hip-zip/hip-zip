"use client";

import { useEffect } from "react";
import Artist from "@/app/components/atom/Images/Artist";

interface ImageGridProps {
  data:
    | {
        id: number;
        name: string;
        image: string;
      }[]
    | null;
  handleImageClick: (id: number) => void;
}

const ImageGrid = (props: ImageGridProps) => {
  return (
    <div
      className={
        "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 overflow-auto max-h-full"
      }
    >
      {props.data?.map((item) => (
        <Artist
          key={item.id}
          item={item}
          handleArtistClick={props.handleImageClick}
        />
      ))}
    </div>
  );
};

export default ImageGrid;
