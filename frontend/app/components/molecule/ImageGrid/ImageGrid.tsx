import React, { useEffect, useMemo } from "react";
import Artist from "@/app/components/atom/Images/Artist";
import { cn } from "@/lib/utils";
import { IAlbum } from "@/app/admin/album/page";
import { IArtist } from "@/app/components/type";
import ArtistImageGrid from "@/app/components/molecule/ImageGrid/ArtistImageGrid";
import AlbumImageGrid from "@/app/components/molecule/ImageGrid/AlbumImageGrid";
import Image from "next/image";

interface ImageGridTypes {
  id: number;
  image: string;
  name: string;
}

interface ImageGridProps<T extends ImageGridTypes> {
  data: T[];
  handleImageClick: (item: T) => void;
  type: "artists" | "albums";
  className?: string;
}

// type ImageGridProps =
//   | {
//       data: ArtistType[];
//       className?: string;
//       type: "artists";
//       handleImageClick: (item: ArtistType) => void;
//     }
//   | {
//       data: AlbumType[];
//       className?: string;
//       type: "albums";
//       handleImageClick: (item: AlbumType) => void;
//     }; // solo5star Solution

const ImageGrid = <T extends ImageGridTypes>(props: ImageGridProps<T>) => {
  // const Contents = useMemo<Record<string, React.ReactNode>>(
  //   () => ({
  //     artists: (
  //       <ArtistImageGrid
  //         artists={props.data}
  //         handleImageClick={props.handleImageClick}
  //       />
  //     ),
  //     albums: (
  //       <AlbumImageGrid
  //         albums={props.data}
  //         handleImageClick={props.handleImageClick}
  //       />
  //     ),
  //   }),
  //   [props.type, props.data],
  // );
  //
  // const OptionalGrid = Contents[props.type];

  return (
    <div className={"flex justify-center"}>
      <div
        className={cn(
          "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 overflow-auto max-h-full",
          props.className || "",
        )}
      >
        {props.data?.map((content) => (
          <Image
            key={content.id}
            src={content.image}
            alt={"개발자한테 사진 넣으라고 전해주세요"}
            width={250}
            height={250}
            className="rounded-md transition-transform hover:scale-95 hover:brightness-95"
            title={`${content.name}`}
            onClick={() => props.handleImageClick(content)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGrid;
