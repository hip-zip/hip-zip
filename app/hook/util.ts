import { ArtistType } from "@/app/components/atom/Images/Artist";

const getFetch = async <T>(endPoint: string, obj: T) => {
  const queryString = new URLSearchParams(obj).toString();
  const url = `${endPoint}?${queryString}`;

  try {
    const response = await fetch(process.env.baseURL + url);
    if (!response.ok) {
      throw new Error("Backend Response Error");
    }
    return await response.json();
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
    return await response.json();
  } catch (e) {
    throw e;
  }
};

export const searchArtist = async (query: string) => {
  const obj = {
    name: query,
  };

  const response = (await getFetch("/artists", obj)) as ArtistType[];
  return response;
};

export const postArtist = async <T>(obj: T) => {
  const response = await customFetch("POST", "/artists", obj);
  return response;
};

export const putArtist = async <T>(obj: T) => {
  return await customFetch("PUT", "/artists", obj);
};
