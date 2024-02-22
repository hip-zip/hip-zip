import { cookies } from "next/headers";

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
  const cookie = cookies().get("token");
  const token = cookie?.value;

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

// TODO: Server Action 관련 함수 필요
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
      console.log("wrapper.ts:46 - response = ", response);
      throw new Error("Network response was not ok");
    }
    return response;
  } catch (e) {
    throw e;
  }
};
