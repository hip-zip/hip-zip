import React, { Suspense } from "react";
import AlbumList from "@/app/components/organism/AlbumList/AlbumList";
import fetchSupabase from "@/app/hook/fetchSupabase";

export const revalidate = 10;

export default async function Page() {
  // const albumList = await fetchSupabase(0); // 첫 로드 시에만 40개 정도 가져오는 방식으로 사용 예정
  // Deprecated

  return (
    <Suspense>
      <AlbumList />
    </Suspense>
  );
} // server -> client
