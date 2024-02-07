import React from "react";
import { AlbumType } from "@/app/components/type";
import Album from "@/app/components/atom/Images/Album";

interface AlbumImageGridProps {
  albums: AlbumType[];
  handleImageClick: (item: AlbumType) => void;
  className?: string;
}

const AlbumImageGrid = (props: AlbumImageGridProps) => {
  return (
    <>
      {props.albums?.map((album) => (
        <Album
          key={album.id}
          album={album}
          handleAlbumClick={props.handleImageClick}
        />
      ))}
    </>
  );
};

export default AlbumImageGrid;
