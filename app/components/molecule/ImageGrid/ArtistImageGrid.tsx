"use client";

import Artist from "@/app/components/atom/Images/Artist";
import { cn } from "@/lib/utils";
import { ArtistType } from "@/app/components/type";

interface ArtistImageGridProps {
  artists: ArtistType[];
  handleImageClick: (item: ArtistType) => void;
  className?: string;
}

const ArtistImageGrid = (props: ArtistImageGridProps) => {
  return (
    <>
      {props.artists?.map((artist) => (
        <Artist
          key={artist.id}
          artist={artist}
          handleArtistClick={props.handleImageClick}
        />
      ))}
    </>
  );
};

export default ArtistImageGrid;
