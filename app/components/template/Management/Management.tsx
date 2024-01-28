import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Input from "@/app/components/atom/Input/Input";
import useDebouncedSearch from "@/app/hook/useDebouncedSearch";
import {
  AlbumDetailType,
  ArtistDetailType,
  getArtist,
  getArtistDetail,
  searchArtist,
} from "@/app/hook/util";
import ArtistPostModal from "@/app/components/organism/Modal/ArtistPostModal";
import ImageGrid from "@/app/components/molecule/ImageGrid/ImageGrid";
import ArtistModifyModal from "@/app/components/organism/Modal/ArtistModifyModal";
import useIntersectionObserver from "@/app/hook/useIntersectionObserver";
import GroupModifyModal from "@/app/components/organism/Modal/GroupModifyModal";
import { ArtistImageType } from "@/app/components/atom/Images/Artist";
import AlbumPostModal from "@/app/components/organism/Modal/AlbumPostModal";
import { ArtistImageGridType } from "@/app/admin/artist/page";
import { AlbumImageGridType } from "@/app/admin/album/page";

interface ManagementProps<T extends ArtistImageGridType | AlbumImageGridType> {
  label: string;
  type: "artists" | "albums";
  handlePostModalOpen?: () => void;
  handleModifyModalOpen?: (item: T) => void;
  fetch: (page: number) => Promise<T[]>;
  search: (query: string) => Promise<T[]>;
  // detail: (id: number) => Promise<U>;
}

const Management = <T extends ArtistImageGridType | AlbumImageGridType>(
  props: ManagementProps<T>,
) => {
  const [response, onSearchQueryChange] = useDebouncedSearch<T>(
    (query: string) => searchArtist(query),
    300,
  );
  const [initialData, setInitialData] = useState<T[]>([]);
  const [postModalStatus, setPostModalStatus] = useState<boolean>(false);
  const [modifyModalStatus, setModifyModalStatus] = useState<boolean>(false);
  // const [detailData, setDetailData] = useState<U | undefined>();
  const [searchStatus, setSearchStatus] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);
  const [page, setPage] = useState<number>(-1);
  const [keepFetch, setKeepFetch] = useState<boolean>(true);
  const [renderBlock, setRenderBlock] = useState<boolean>(true);
  const target = useRef(null);

  const [observe, unobserve] = useIntersectionObserver(() => {
    setPage((prev) => prev + 1);
  });

  const handleImageClick = async (item: T) => {
    // const response = await props.detail(id);
    // setDetailData(response);
    // setId(id);
    // setModifyModalStatus(true);
    props.handleModifyModalOpen?.(item);
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

export default Management;
