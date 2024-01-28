import { AlbumImageGridType } from "@/app/admin/album/page";
import { ArtistImageGridType } from "@/app/admin/artist/page";

const getFetch = async <T>(endpoint: string, paramObj: Record<string, any>) => {
  // TODO: paramObj 타입 개선
  const params = Object.fromEntries(
    Object.entries(paramObj).filter(
      ([key, value]) => value !== "" && value !== null && value !== undefined,
    ),
  );

  const queryString = new URLSearchParams(params).toString();
  const url = `${endpoint}?${queryString}`;

  try {
    const response = await fetch(process.env.baseURL + url);
    if (!response.ok) {
      throw new Error("Backend Response Error");
    }
    return (await response.json()) as T;
  } catch (e) {
    throw e;
  }
};

const customFetch = async <T>(
  method: string,
  endpoint: string,
  paramObj: T,
) => {
  try {
    const response = await fetch(process.env.baseURL + endpoint, {
      method: `${method}`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paramObj),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response;
  } catch (e) {
    throw e;
  }
};

export const getArtist = async (page: number) => {
  const params = {
    size: 40,
    page: page,
  };

  return (await getFetch("/artists", params)) as ArtistImageGridType[];
};

export interface ArtistDetailType {
  name: string;
  image: string;
  artistType: string;
  group: {
    id: number;
    name: string;
    image: string;
  } | null;
  groupMembers: {
    id: number;
    name: string;
    image: string;
  }[];
  hashtag: string[];
}

export const getArtistDetail = async (id: number) => {
  return (await getFetch(`/artists/${id}`, {})) as ArtistDetailType;
};

export const searchArtist = async <T>(query: string) => {
  const params = {
    name: query,
  };
  return (await getFetch("/artists/search", params)) as T[];
};

export const postArtist = async <T>(params: T) => {
  const response = await customFetch("POST", "/artists", params);
  return response;
};

export const putArtist = async <T>(params: T) => {
  return await customFetch("PUT", "/artists", params);
};

export const getAlbum = async (page: number) => {
  const response: any[] = [];
  return response as any;
}; // TODO

export const postAlbum = async <T>(params: T) => {};

export const putAlbum = async <T>(params: T) => {};

export const searchAlbum = async (query: string) => {
  const response: any[] = [];
  return response as any;
}; // TODO

export interface AlbumDetailType {
  name: string;
  image: string;
  artist: string;
}

export const getAlbumDetail = async (id: number) => {
  const response: any = {};
  return response as any;
}; // TODO
