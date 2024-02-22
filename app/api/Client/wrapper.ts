import { param } from "ts-interface-checker";
import { useTokenStore } from "@/app/store/useTokenStore";
import { cookies } from "next/headers";

const getCookie = (name: string) => {
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");
  if (parts.length === 2) return parts.pop()?.split(";").shift();
};

const getToken = () => {
  return getCookie("token");
};

export const Get = async <T>(
  endpoint: string,
  paramObj: Record<string, any>,
) => {
  const params = Object.fromEntries(
    Object.entries(paramObj).filter(
      ([key, value]) => value !== "" && value !== null && value !== undefined,
    ),
  );

  const queryString = new URLSearchParams(params).toString();
  const url = `${endpoint}?${queryString}`;
  const token = getToken();

  try {
    const response = await fetch(process.env.baseURL + url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Backend Response Error");
    }
    return (await response.json()) as T;
  } catch (e) {
    throw e;
  }
};

export const Post = async (endpoint: string, paramObj: Record<string, any>) => {
  try {
    const response = await fetch(process.env.baseURL + endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
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

export const Put = async (endpoint: string, paramObj: Record<string, any>) => {
  try {
    const response = await fetch(process.env.baseURL + endpoint, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
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

export const Delete = async <T>(method: string, endpoint: string) => {
  try {
    const response = await fetch(process.env.baseURL + endpoint, {
      method: "Delete",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response;
  } catch (e) {
    throw e;
  }
};
