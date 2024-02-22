import { Get, Post, Put } from "@/app/api/fetch/fetchWrapper";
import {
  AlbumDetailType,
  AlbumType,
  ArtistDetailType,
  ArtistType,
} from "@/app/components/type";

export const getArtist = async (page: number) => {
  const params = {
    size: 40,
    page: page,
  };
  return (await Get("/artists", params)) as ArtistType[];
};

export const postArtist = async <T>(
  params: T extends Record<string, any> ? T : never,
) => {
  return await Post("/artists", params);
};

export const putArtist = async <T>(
  params: T extends Record<string, any> ? T : never,
) => {
  return await Put("/artists", params);
};

export const getArtistDetail = async (id: number | string) => {
  return (await Get(`/artists/${id}`, {})) as ArtistDetailType;
};

export const searchArtist = async <T>(query: string) => {
  const params = {
    name: query,
  };
  return (await Get("/artists/search", params)) as T[];
};

export const getAlbum = async (page: number) => {
  const params = {
    size: 40,
    page: page,
  };

  return (await Get("/albums", params)) as AlbumType[];
};

export const getInfiniteAlbum = async (page: any) => {
  const params = {
    size: 40,
    page: page,
  };

  const response = (await Get("/albums", params)) as AlbumType[];
  if (response?.length === 0) {
    return { data: response, nextCursor: undefined };
  }
  return { data: response, nextCursor: page + 1 };
};

export const postAlbum = async <T>(
  params: T extends Record<string, any> ? T : never,
) => {
  return await Post("/albums", params);
};

export const putAlbum = async <T>(
  params: T extends Record<string, any> ? T : never,
) => {
  return await Put("/albums", params);
};

export const searchAlbum = async (query: string) => {
  return {} as any;
}; // TODO

export const getAlbumDetail = async (id: number | string) => {
  const params = {};
  return (await Get(`/albums/${id}`, params)) as AlbumDetailType;
};

export const getKakaoAuthURL = async () => {
  return await Get("/oauth/kakao", {});
};

export const getKakaoToken = async (code: string) => {
  const response = await Post(
    `/oauth/kakao/callback?state=string&code=${code}`,
    {},
  );

  return response;
};
