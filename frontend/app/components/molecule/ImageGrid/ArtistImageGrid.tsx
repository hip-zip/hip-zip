"use client";

import Artist from "@/app/components/atom/Images/Artist";
import { cn } from "@/lib/utils";
import { IArtist } from "@/app/components/type";
import { useEffect } from "react";

interface ArtistImageGridProps {
  artists: IArtist[];
  handleImageClick: (item: IArtist) => void;
  className?: string;
}

const ArtistImageGrid = (props: ArtistImageGridProps) => {
  useEffect(() => {}, [props.artists]);

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
