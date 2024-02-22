"use client";

import Image from "next/image";
import RedirectButton from "@/app/components/atom/Button/RedirectButton";
import Logo from "@/public/static/logo.png";
import Label from "@/app/components/atom/Label/Label";
import KakaoLoginIcon from "@/public/static/kakaoLoginIcon.png";
import { getKakaoAuthURL } from "@/app/api/fetch/requests";

export default function Home() {
  const handleKaKaoAuth = async () => {
    // const response = await getKakaoAuthURL();
    window.location.href =
      "https://accounts.kakao.com/login/?continue=https%3A%2F%2Fkauth.kakao.com%2Foauth%2Fauthorize%3Fscope%3Dopenid%252Caccount_email%26response_type%3Dcode%26redirect_uri%3Dhttp%253A%252F%252Flocalhost%253A3000%252Foauth%252Fkakao%252Fcallback%26through_account%3Dtrue%26client_id%3D8ddca437c7016b2818e52c567828dbb4#login";

    // window.open(await response.text(), "_blank");
    //
    // const linkElement = document.createElement("a");
    // linkElement.href = await response.text();

    // const popup = window.open(
    //   await response.text(),
    //   "KakaoAuthPopup",
    //   "width=600,height=600",
    // );
  };

  return (
    <div className={"h-screen flex flex-col justify-center items-center"}>
      <Image
        src={Logo}
        alt={"Logo Image"}
        width={300}
        height={300}
        className={"animate-bounce"}
      />
      <Label
        className={"text-4xl s-core-bold text-hipzip-white pb-5"}
        message={"HIPZIP"}
      />
      <div className={"flex justify-center"}>
        <Image
          src={KakaoLoginIcon}
          alt={"개발자한테 문의주세요"}
          className={"w-72 h-10 cursor-pointer"}
          onClick={handleKaKaoAuth}
        />
      </div>
      <div className={"mt-2 flex justify-center"}>
        <RedirectButton
          redirectUrl={"main"}
          message={"앨범 리스트를 확인하러 가봅시다 🔥"}
        />
      </div>
    </div>
  );
}
