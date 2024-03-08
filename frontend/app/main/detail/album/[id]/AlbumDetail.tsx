"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import MusicVideoContainer from "@/app/components/atom/YoutubeEmbededVideo/YoutubeEmbededVideo";
import AlbumInformation from "@/app/components/molecule/AlbumInformation/AlbumInformation";
import SpinningAlbum from "@/app/components/atom/Images/SpinningAlbum";
import Like from "@/app/components/molecule/Like/Like";
import { IAlbumDetail } from "@/app/components/type";
import { postAlbumVote } from "@/app/api/Client/requests";
import { debounce } from "lodash";
import { setVibrate, stopVibrate } from "@/app/store/useVibrateStore";
import { vibrate } from "@/app/util/util";
import { useTokenStore } from "@/app/store/useTokenStore";
interface AlbumDetailProps {
  album: IAlbumDetail;
}

const AlbumDetail = (props: AlbumDetailProps) => {
  const router = useRouter();
  const token = useTokenStore((state) => state.token);
  const [likeCount, setLikeCount] = useState<number>(props.album.vote);
  const [fetchLikeCount, setFetchLikeCount] = useState<number>(1);

  useEffect(() => {
    window.addEventListener("popstate", function (event) {
      if (document?.startViewTransition) {
        document.startViewTransition(() => {});
      } // startViewTransition 적용
    });
  }, []);

  const handleArtistLabelClick = () => {
    if (document?.startViewTransition) {
      document.startViewTransition(() => {
        router.push(`/main/artist/${props.album.artistResponse.id}`);
      });
    } else {
      router.push(`/main/artist/${props.album.artistResponse.id}`);
    }
  };

  const handleLikeClick = async () => {
    if (token === "") {
      alert("로그인이 필요한 작업입니다.");
      return;
    }

    setLikeCount((prev) => prev + 1);
    setFetchLikeCount((prev) => prev + 1);
    handleVoteDebounce(fetchLikeCount);
    vibrate();
  };

  const handleVoteDebounce = useCallback(
    debounce(async (count: number) => {
      const response = await postAlbumVote(props.album.id, count);
      setFetchLikeCount(1);
    }, 1000),
    [],
  );

  return (
    <div className={"w-full flex flex-col justify-center items-center"}>
      <SpinningAlbum image={props.album.image} />
      <AlbumInformation
        albumName={props.album.name}
        artist={props.album.artistResponse}
      />
      <Like onClick={handleLikeClick} count={likeCount} />
      <MusicVideoContainer src={props.album.musicVideo} />
      <div className={"h-48"} />
    </div>
  );
};

export default AlbumDetail;
