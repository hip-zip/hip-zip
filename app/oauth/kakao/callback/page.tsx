import { redirect } from "next/navigation";
import { getKakaoToken } from "@/app/api/fetch/requests";
import { cookies } from "next/headers";

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | undefined };
}) {
  const loginRedirect = async () => {
    const code = searchParams?.code;

    if (code) {
      // const response = await getKakaoToken(code);
      const response = await fetch(
        "http://localhost:3000/api/oauth/kakao/callback?code=" + code,
      );
      console.log("page.tsx:18 - response = ", response);

      redirect("/main");
    } else {
      redirect("/");
    }
  };

  await loginRedirect();

  return;
}
