"use client";

import React from "react";
import Image from "next/image";
import Logo from "@/public/static/logo.png";
import Label from "@/app/components/atom/Label/Label";
import KakaoLoginIcon from "@/public/static/kakaoLoginIcon.png";
import RedirectButton from "@/app/components/atom/Button/RedirectButton";
import { getKakaoAuthURL } from "@/app/api/Client/requests";
import KakaoIcon from "@/app/components/atom/Icon/KakaoIcon";

interface IntroContainerProps {}

const IntroContainer = (props: IntroContainerProps) => {
  const handleKaKaoAuth = async () => {
    const response = await getKakaoAuthURL();
    window.location.href = await response.text();
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
        {/*<Image*/}
        {/*  src={KakaoLoginIcon}*/}
        {/*  alt={"개발자한테 문의주세요"}*/}
        {/*  className={"w-72 h-10 cursor-pointer"}*/}
        {/*  */}
        {/*/>*/}
        <button
          className={
            "w-72 h-10 cursor-pointer flex items-center text-xs justify-between bg-kakao-yellow text-hipzip-black rounded-md p-3"
          }
          onClick={handleKaKaoAuth}
        >
          <span>
            <KakaoIcon className={"w-5 h-5"} />
          </span>
          <span>카카오 로그인</span>
          <span className={"w-5 h-5"} />
        </button>
      </div>
      <div className={"mt-2 flex justify-center"}>
        <RedirectButton
          redirectUrl={"main"}
          message={"앨범 리스트를 확인하러 가봅시다 🔥"}
        />
      </div>
    </div>
  );
};

export default IntroContainer;
