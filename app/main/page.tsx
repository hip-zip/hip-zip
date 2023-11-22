import React, { Suspense } from "react";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import AlbumList from "@/app/main/AlbumList";
import useFetch from "@/app/hooks/useFetch";

export default async function Page() {
  const albumList = useFetch();

  return (
    <div className={"grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4"}>
      <Suspense>
        <AlbumList />
      </Suspense>
    </div>
  );
}
