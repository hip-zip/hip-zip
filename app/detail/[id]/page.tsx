import fetchSupabase from "@/app/hooks/fetchSupabase";
import { AlbumListType } from "@/app/main/page";

export async function generateStaticParams() {
  const albums: AlbumListType[] = await fetchSupabase(); // param 목적으로 가져오는 함수나 훅을 하나 더 만들 예정

  return albums.map((album: AlbumListType) => ({
    id: `${album.id}`,
  }));
}

// Three versions of this page will be statically generated
// using the `params` returned by `generateStaticParams`
// - /product/1
// - /product/2
// - /product/3
export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  return <div>{params.id}</div>;
  // ...
}
