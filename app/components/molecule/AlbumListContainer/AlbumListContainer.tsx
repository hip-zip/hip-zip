"use client";

import React, { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Album } from "@/app/components/atom/Album/Album";

interface AlbumType {
  id: number;
  album_name: string;
  album_description: string;
  album_image: string;
  album_tracks: string[];
  album_release_date: string;
  music_video: string;
  artist_name: string;
  artist_image: string;
}

interface AlbumFetchType {
  album: AlbumType[];
  nextCursor: number;
}

const AlbumListContainer = (props: { setScrollLocation: Function }) => {
  const router = useRouter();
  const param = useSearchParams();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<AlbumFetchType, Error>({
      queryKey: ["albums", param.get("year")],
      queryFn: ({ pageParam = 1 }) =>
        fetch(`/api/album/?page=${pageParam}&year=${param.get("year")}`).then(
          (res) => res.json(),
        ),
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      initialPageParam: 1, // Add this line to specify the initialPageParam
    });

  const observeElement = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(
      async (entries: IntersectionObserverEntry[]) => {
        if (
          entries[0].isIntersecting &&
          entries[0].intersectionRatio >= 0.3 &&
          hasNextPage &&
          !isFetchingNextPage
        ) {
          await fetchNextPage();
        }
      },
      { threshold: 0.7 },
    );

    if (observeElement.current) {
      intersectionObserver.observe(observeElement.current);
    }

    // Cleanup the observer when the component is unmounted
    return () => {
      if (observeElement.current) {
        intersectionObserver.unobserve(observeElement.current);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <>
      <div className="p-2 h-full flex justify-center items-center overflow-hidden">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 overflow-auto max-h-full">
          {data?.pages
            .flatMap((page) => page.data)
            .map((item: AlbumType) => (
              <Album
                key={item.id}
                item={item}
                setScrollLocation={props.setScrollLocation}
              />
            ))}
        </div>
      </div>
      <div ref={(el) => (observeElement.current = el)} className={"h-2.5"} />
    </>
  );
};

export default AlbumListContainer;
