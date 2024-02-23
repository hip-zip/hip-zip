import { AlbumDetailType } from "@/app/components/type";
import { Get, Post } from "@/app/api/Server/wrapper";

export const getAlbumDetail = async (id: number | string) => {
  const params = {};
  return (await Get(`/albums/${id}`, params)) as AlbumDetailType;
};

export const getKakaoToken = async (code: string) => {
  const response = await Post(
    `/oauth/kakao/callback?state=string&code=${code}`,
    {},
  );

  return response;
};
