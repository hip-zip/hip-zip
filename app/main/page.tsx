import React, { Suspense } from "react";
import AlbumList from "@/app/main/AlbumList";
import fetchSupabase from "@/app/hooks/fetchSupabase";

export default async function Page() {
  const albumList = fetchSupabase();

  return (
    <Suspense>
      <AlbumList />
    </Suspense>
  );
}
