import {
  ArtistDetailType,
  ArtistImageType,
} from "@/app/components/atom/Images/Artist";
import { ImageGridType } from "@/app/components/template/Management/ArtistManagement";

const getFetch = async <T>(endPoint: string, obj: Record<any, any>) => {
  const params = Object.fromEntries(
    Object.entries(obj).filter(
      ([key, value]) => value !== "" && value !== null && value !== undefined,
    ),
  );

  const queryString = new URLSearchParams(params).toString();
  const url = `${endPoint}?${queryString}`;

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

const customFetch = async <T>(method: string, url: string, obj: T) => {
  try {
    const response = await fetch(process.env.baseURL + url, {
      method: `${method}`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
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
    size: 20,
    page: page,
  };

  return (await getFetch("/artists", params)) as ImageGridType[];
};

export const getArtistDetail = async (id: number) => {
  return (await getFetch(`/artists/${id}`, {})) as ArtistDetailType;
};

export const searchArtist = async (query: string) => {
  const params = {
    name: query,
  };
  return (await getFetch("/artists/search", params)) as ImageGridType[];
};

export const postArtist = async <T>(params: T) => {
  const response = await customFetch("POST", "/artists", params);
  return response;
};

export const putArtist = async <T>(params: T) => {
  return await customFetch("PUT", "/artists", params);
};
