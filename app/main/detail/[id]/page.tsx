import fetchSupabase from "@/app/hooks/fetchSupabase";
import { AlbumListType } from "@/app/main/page";
import fetchDetailSupabase from "@/app/hooks/fetchDetailSupabase";
import AlbumDetail from "@/app/main/detail/[id]/AlbumDetail";

export const revalidate = 1;

export async function generateStaticParams() {
  const albums: AlbumListType[] = await fetchSupabase(); // param 목적으로 가져오는 함수나 훅을 하나 더 만들 예정

  return albums.map((album: AlbumListType) => ({
    id: `${album.id}`,
  }));
}

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const detail = await fetchDetailSupabase(id);

  console.log("DD CONSOLE CHECK > ", detail[0]);

  return (
    <div className={"h-full w-full"}>
      <AlbumDetail detail={detail[0]} />
    </div>
  ); // Server Component Fetching
}
