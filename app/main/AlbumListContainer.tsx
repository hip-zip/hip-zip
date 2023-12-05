"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { AlbumListProps, AlbumListType } from "@/app/main/page";
import CDD from "@/public/static/cddProfile.jpeg";
import { useRouter, useSearchParams } from "next/navigation";
import { useInfiniteQuery } from "@tanstack/react-query";

const AlbumListContainer = (props: {
  setAlbumList: Function;
  setScrollLocation: Function;
}) => {
  const router = useRouter();
  const param = useSearchParams();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<AlbumListProps, Error>({
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
    if (data) {
      props.setAlbumList(data.pages.flatMap((page) => page.data));
    }
  }, [data, props.setAlbumList]);

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
      <div className="h-full flex justify-center items-center overflow-hidden">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 overflow-auto max-h-full">
          {data?.pages
            .flatMap((page) => page.data)
            .map((item) => (
              <div key={item.id} className="flex justify-center items-center">
                <Image
                  src={item.album_image ?? CDD}
                  alt={"개발자한테 사진 넣으라고 전해주세요"}
                  width={250}
                  height={250}
                  className="rounded-md transition-transform hover:scale-95 hover:brightness-95"
                  title={`${item.album_name} - ${item.artist_name}`}
                  onClick={() => {
                    if (document?.startViewTransition) {
                      document.startViewTransition(() => {
                        props.setScrollLocation(window.scrollY);
                        router.push(`/main/detail/${item.id}`);
                      });
                    } else {
                      props.setScrollLocation(window.scrollY);
                      router.push(`/main/detail/${item.id}`);
                    }
                  }}
                />
              </div>
            ))}
        </div>
      </div>
      <div ref={(el) => (observeElement.current = el)} className={"h-48"} />
    </>
  );
};

export default AlbumListContainer;
