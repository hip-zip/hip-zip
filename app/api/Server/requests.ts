import { AlbumDetailType } from "@/app/components/type";
import { Get, Post, Put, Delete } from "@/app/api/Server/wrapper";

export const getAlbumDetail = async (id: number | string) => {
  const params = {};
  return (await Get(`/albums/${id}`, params)) as AlbumDetailType;
};
