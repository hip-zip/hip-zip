import { ArtistType } from "@/app/components/atom/Images/Artist";

const getFetch = async (url: string) => {
  try {
    const response = await fetch(process.env.baseURL + url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (e) {
    throw e;
  }
};

const customFetch = async (method, url, obj: any) => {
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

export const searchArtist = async (name: string) => {
  return (await getFetch(`/artists?name=${name}`)) as ArtistType[];
};

export const postArtist = async (obj: any) => {
  return await customFetch("POST", "/artists", obj);
};

export const putArtist = async (obj: any) => {
  return await customFetch("PUT", "/artists", obj);
};
