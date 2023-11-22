import React, { Suspense } from "react";
import AlbumList from "@/app/main/AlbumList";
import useFetch from "@/app/hooks/useFetch";

export default async function Page() {
  const albumList = useFetch();

  return (
    <Suspense>
      <AlbumList />
    </Suspense>
  );
}
