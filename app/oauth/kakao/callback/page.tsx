import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getKakaoToken } from "@/app/api/Server/requests";
import LoginModule from "@/app/oauth/kakao/callback/LoginModule";

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | undefined };
}) {
  const code = searchParams?.code;
  let token = "";

  // if (code) {
  //   const response = await getKakaoToken(code);
  //   const body = await response.arrayBuffer();
  //   const decoder = new TextDecoder("utf-8");
  //   token = decoder.decode(body);
  // }

  return <LoginModule token={token} />;
}
