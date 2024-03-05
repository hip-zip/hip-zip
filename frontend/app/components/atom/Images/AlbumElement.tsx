import React from "react";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { AlbumType } from "../../type";
interface AlbumElementProps {
  album: AlbumType;
  setScrollLocation: React.Dispatch<React.SetStateAction<number>>;
}

export const AlbumElement = (props: AlbumElementProps) => {
  const router = useRouter();

  return (
    <div key={props.album.id} className="flex justify-center items-center">
      <Image
        src={props.album.image}
        alt={"개발자한테 사진 넣으라고 전해주세요"}
        width={250}
        height={250}
        className="rounded-md transition-transform hover:scale-95 hover:brightness-95"
        title={`${props.album.name}`}
        onClick={() => {
          if (document?.startViewTransition) {
            document.startViewTransition(() => {
              props.setScrollLocation(window.scrollY);
              router.push(`/main/detail/album/${props.album.id}`);
            });
          } else {
            props.setScrollLocation(window.scrollY);
            router.push(`/main/detail/album/${props.album.id}`);
          }
        }}
      />
    </div>
  );
};
