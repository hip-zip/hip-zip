"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { AlbumListProps, AlbumListType } from "@/app/main/page";
import CDD from "@/public/static/cddProfile.jpeg";
import { useRouter, useSearchParams } from "next/navigation";
import fetchSupabase from "@/app/hooks/fetchSupabase";

const AlbumListContainer = (props: {
  albumList: AlbumListProps;
  setAlbumList: Function;
  setScrollLocation: Function;
}) => {
  const router = useRouter();
  const observeElement = useRef<HTMLDivElement | undefined>(undefined);
  const [pagination, setPagination] = useState<number>(2);
  const param = useSearchParams();
  const [total, setTotal] = useState<number>();

  useEffect(() => {
    const fetchTotal = async () => {
      const year = param.get("year");
      const response = await fetch(`/api/album/total?year=${year}`);
      const fetchData = await response.json();
      setTotal(fetchData.count);
    };
    // Fetch total immediately on mount
    fetchTotal();
  }, [param]);

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(
      async (entries: IntersectionObserverEntry[]) => {
        if (entries[0].isIntersecting && entries[0].intersectionRatio >= 0.3) {
          if (total === undefined || pagination < total / 40 + 1) {
            const year = param.get("year");
            const response = await fetch(
              `/api/album/?page=${pagination}&year=${year}`,
            );
            const fetchData = await response.json();
            props.setAlbumList((prev) => [...prev, ...fetchData.data]);
            setPagination((prev) => prev + 1);
          } else {
            console.log("DD CONSOLE CHECK > finish");
          }
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
  }, [props.albumList]);

  return (
    <>
      <div className="h-full flex justify-center items-center overflow-hidden">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 overflow-auto max-h-full">
          {props.albumList?.map((item) => (
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
      <div ref={observeElement} className={"h-48"} />
    </>
  );
};

export default AlbumListContainer;
