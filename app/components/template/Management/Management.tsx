import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Input from "@/app/components/atom/Input/Input";
import useDebouncedSearch from "@/app/hook/useDebouncedSearch";
import {
  ArtistDetailType,
  getArtist,
  getArtistDetail,
  searchArtist,
} from "@/app/hook/util";
import ArtistPostModal from "@/app/components/organism/Modal/ArtistPostModal";
import ArtistImageGrid from "@/app/components/molecule/ImageGrid/ArtistImageGrid";
import ArtistModifyModal from "@/app/components/organism/Modal/ArtistModifyModal";
import useIntersectionObserver from "@/app/hook/useIntersectionObserver";
import GroupModifyModal from "@/app/components/organism/Modal/GroupModifyModal";
import { ArtistImageType } from "@/app/components/atom/Images/Artist";
import AlbumPostModal from "@/app/components/organism/Modal/AlbumPostModal";

interface ManagementProps<ImageType, DetailType> {
  label: string;
  type: "artists" | "albums";
  fetch: (page: number) => Promise<ImageType[]>;
  search: (query: string) => Promise<ImageType[]>;
  detail: (id: number) => Promise<DetailType>;
}

const Management = <ImageType, DetailType>(
  props: ManagementProps<ImageType, DetailType>,
) => {
  const [response, onSearchQueryChange] = useDebouncedSearch<ImageType[]>(
    (query: string): Promise<ImageType[]> => searchArtist(query),
    300,
  );
  const [initialData, setInitialData] = useState<ImageType[]>([]);
  const [postModalStatus, setPostModalStatus] = useState<boolean>(false);
  const [modifyModalStatus, setModifyModalStatus] = useState<boolean>(false);
  const [detailData, setDetailData] = useState<DetailType | undefined>();
  const [searchStatus, setSearchStatus] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);
  const [page, setPage] = useState<number>(-1);
  const [keepFetch, setKeepFetch] = useState<boolean>(true);
  const [renderBlock, setRenderBlock] = useState<boolean>(true);
  const target = useRef(null);

  const [observe, unobserve] = useIntersectionObserver(() => {
    setPage((prev) => prev + 1);
  });

  const handleImageClick = async (id: number) => {
    const response = await props.detail(id);
    setDetailData(response);
    setId(id);
    setModifyModalStatus(true);
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
          placeholder={""} // props로 받아서 처리 예정
          onChange={(e) => {
            if (e.target.value === "") {
              setSearchStatus(false);
              return;
            }
            onSearchQueryChange(e);
            setSearchStatus(true);
          }}
        />
        <ArtistImageGrid
          data={!searchStatus ? initialData : response} // 검색 결과 데이터와 Fetch 데이터를 구분지어 관리
          handleImageClick={handleImageClick}
        />
        {props.type === "artists" && <ArtistPostModal />}
        {props.type === "albums" && (
          <AlbumPostModal open={postModalStatus} setOpen={setPostModalStatus} />
        )}
        {/*{detailData?.artistType? === "SOLO" && (*/}
        {/*  <ArtistModifyModal*/}
        {/*    open={modifyModalStatus}*/}
        {/*    setOpen={setModifyModalStatus}*/}
        {/*    detailData={detailData}*/}
        {/*    id={id}*/}
        {/*  />*/}
        {/*)}*/}
        {/*{detailData?.artistType === "GROUP" && (*/}
        {/*  <GroupModifyModal*/}
        {/*    open={modifyModalStatus}*/}
        {/*    setOpen={setModifyModalStatus}*/}
        {/*    detailData={detailData}*/}
        {/*    id={id}*/}
        {/*  />*/}
        {/*)}*/}
        <button
          className={
            "p-3 fixed bg-hipzip-black bottom-10 left-10 text-sm rounded-lg border border-hipzip-white"
          }
          onClick={() => setPostModalStatus(true)}
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
