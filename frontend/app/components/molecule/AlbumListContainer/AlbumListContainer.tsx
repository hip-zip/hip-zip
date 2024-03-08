"use client";

import React, { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useInfiniteQuery } from "@tanstack/react-query";
import { AlbumElement } from "@/app/components/atom/Images/AlbumElement";
import { IAlbum } from "@/app/components/type";
import { getInfiniteAlbum } from "@/app/api/Client/requests";

interface AlbumFetchType {
  data: IAlbum[];
  nextCursor: number;
}

interface AlbumListContainerProps {
  setScrollLocation: React.Dispatch<React.SetStateAction<number>>;
}

const AlbumListContainer = (props: AlbumListContainerProps) => {
  const router = useRouter();
  const param = useSearchParams();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<AlbumFetchType, Error>({
      queryKey: ["albums", param.get("year")],
      queryFn: ({ pageParam = 1 }) =>
        // Client(`/api/album?page=${pageParam}`).then((res) => res.json()),
        getInfiniteAlbum(pageParam),
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      initialPageParam: 0, // Add this line to specify the initialPageParam
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
            .map((album) => (
              <AlbumElement
                key={album.id}
                album={album}
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
