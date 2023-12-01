"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AlbumListProps, AlbumListType } from "@/app/main/page";
import { useSessionStorage } from "usehooks-ts";

const AlbumList = ({ albumList }: AlbumListProps) => {
  const router = useRouter();
  const [filterAlbumList, setFilterAlbumList] =
    useState<AlbumListType[]>(albumList);
  const [yearArray] = useState([2023, 2022, 2021, 2020]);
  const [scrollLocation, setScrollLocation] = useSessionStorage("scroll", 0);

  useEffect(() => {
    window.scrollTo(0, scrollLocation);
  }, []);

  const getAlbumListByYear = async (year: number) => {
    try {
      const response = await fetch(`/api/album/?year=${year}`);
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const fetchData = await response.json();
      setFilterAlbumList((prev: AlbumListType[]) => fetchData.data);
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <>
      <div className={"flex flex-col gap-2"}>
        <div className={"flex justify-center items-center mb-8"}>
          {yearArray.map((item: number) => (
            <button
              key={item}
              className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
              onClick={async () => {
                await getAlbumListByYear(item);
              }}
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                {item}
              </span>
            </button>
          ))}
        </div>

        <div className="h-full flex justify-center items-center overflow-hidden">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 overflow-auto max-h-full">
            {filterAlbumList?.map((item, index) => (
              <div key={item.id} className="flex justify-center items-center">
                <Image
                  src={`${item.album_image}`}
                  alt={"개발자한테 사진 넣으라고 전해주세요"}
                  width={250}
                  height={250}
                  className="rounded-md transition-transform hover:scale-95 hover:brightness-95"
                  title={`${item.album_name} - ${item.artist_name}`}
                  onClick={() => {
                    if (document?.startViewTransition) {
                      document.startViewTransition(() => {
                        setScrollLocation(window.scrollY);
                        router.push(`/main/detail/${item.id}`);
                      });
                    } else {
                      setScrollLocation(window.scrollY);
                      router.push(`/main/detail/${item.id}`);
                    }
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AlbumList;
