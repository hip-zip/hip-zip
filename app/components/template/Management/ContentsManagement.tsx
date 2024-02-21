import React, { useEffect, useRef, useState } from "react";
import Input from "@/app/components/atom/Input/Input";
import useDebouncedSearch from "@/app/hook/useDebouncedSearch";
import {
  getArtist,
  getArtistDetail,
  searchArtist,
} from "@/app/api/fetch/requests";
import ImageGrid from "@/app/components/molecule/ImageGrid/ImageGrid";
import useIntersectionObserver from "@/app/hook/useIntersectionObserver";
import { AlbumType } from "@/app/admin/album/page";
import { ArtistType } from "@/app/components/type";

interface ContentsManagementProps<T extends ArtistType | AlbumType> {
  label: string;
  type: "artists" | "albums";
  handlePostModalOpen: () => void;
  handleModifyModalOpen: (item: T) => void;
  fetch: (page: number) => Promise<T[]>;
  search: (query: string) => Promise<T[]>;
}

const ContentsManagement = <T extends ArtistType | AlbumType>(
  props: ContentsManagementProps<T>,
) => {
  const [response, onSearchQueryChange] = useDebouncedSearch<T>(
    (query: string) => searchArtist(query),
    300,
  );
  const [initialData, setInitialData] = useState<T[]>([]);
  const [searchStatus, setSearchStatus] = useState<boolean>(false);
  const [page, setPage] = useState<number>(-1);
  const [keepFetch, setKeepFetch] = useState<boolean>(true);
  const [renderBlock, setRenderBlock] = useState<boolean>(true);
  const target = useRef(null);

  const [observe, unobserve] = useIntersectionObserver(() => {
    setPage((prev) => prev + 1);
  });

  const handleImageClick = async (item: T) => {
    props.handleModifyModalOpen(item);
  };

  useEffect(() => {
    setRenderBlock(false);
  }, []);

  useEffect(() => {
    observe(target.current);
    return () => unobserve(target.current);
  }, [observe, unobserve]);

  useEffect(() => {
    if (page === -1) return;
    const fetch = async () => {
      if (!keepFetch) return;
      const response = await props.fetch(page);
      if (response.length === 0) setKeepFetch(false);
      setInitialData((prev) => [...prev, ...response]);
    };
    fetch();
  }, [page]);

  return (
    <>
      <div className={"w-full h-full p-4"}>
        <Input
          className={"text-center text-base mb-4"}
          type={"text"}
          placeholder={`${props.label} 검색`} // props로 받아서 처리 예정
          onChange={(e) => {
            if (e.target.value === "") {
              setSearchStatus(false);
              return;
            }
            onSearchQueryChange(e);
            setSearchStatus(true);
          }}
        />
        <ImageGrid<T>
          data={!searchStatus ? initialData : response} // 검색 결과 데이터와 Fetch 데이터를 구분지어 관리
          type={props.type}
          handleImageClick={handleImageClick}
        />
        <button
          className={
            "p-3 fixed bg-hipzip-black bottom-10 left-10 text-sm rounded-lg border border-hipzip-white"
          }
          onClick={props.handlePostModalOpen}
        >
          {props.label} 등록하기
        </button>
        {!renderBlock && (
          <div
            ref={(target) => {
              observe(target);
            }}
            className={"h-30"}
          />
        )}
      </div>
    </>
  );
};

export default ContentsManagement;
