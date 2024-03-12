"use client";

import Link from "next/link";
import { useSessionStorage } from "usehooks-ts";
import Label from "@/app/components/atom/Label/Label";
import { AboutIcon } from "@/app/components/atom/Icon/AboutIcon";
import { SearchIcon } from "@/app/components/atom/Icon/SearchIcon";
import BellIcon from "@/app/components/atom/Icon/BellIcon";
import UserIcon from "@/app/components/atom/Icon/UserIcon";
import IdentificationIcon from "@/app/components/atom/Icon/IdentificationIcon";
import React, { useEffect } from "react";
import { setUserInfo, useUserInfoStore } from "@/app/store/useUserInfoStore";
import UnLockIcon from "@/app/components/atom/Icon/UnLockIcon";
import LockIcon from "@/app/components/atom/Icon/LockIcon";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { setToken } from "@/app/store/useTokenStore";
import { getKakaoAuthURL } from "@/app/api/Client/requests";

export default function Header() {
  const [scrollLocation, setScrollLocation] = useSessionStorage("scroll", 0);
  const userInfo = useUserInfoStore((state) => state.userInfo);
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);

  const router = useRouter();

  useEffect(() => {
    console.log("Header.tsx:19 - userInfo = ", userInfo);
  }, []);

  const handleLogout = () => {
    removeCookie("token");
    setUserInfo(undefined);
    setToken(undefined);
    router.push("/");
  };

  const handleLogin = async () => {
    const response = await getKakaoAuthURL();
    window.location.href = await response.text();
  };

  return (
    <div className={"p-2"}>
      <div
        className={
          "street w-full flex justify-between items-center gap-12 h-20 text-lg p-10"
        }
      >
        <Link href={"/main"} onClick={() => setScrollLocation(0)}>
          <Label message={"HIPZIP"} className={"text-2xl text-hipzip-white"} />
        </Link>
        <div className={"flex gap-5"}>
          {userInfo && (
            <>
              <div className={"truncate w-24"}>{userInfo?.nickName} 님</div>
              <UnLockIcon onClick={handleLogout} />
            </>
          )}
          {!userInfo && <LockIcon onClick={handleLogin} />}
          <Link href={"/admin"}>
            <UserIcon />
          </Link>
          {/*<Link href={"/main/about"}>*/}
          {/*  <AboutIcon />*/}
          {/*</Link>*/}
          <Link href={"/main/search"}>
            <SearchIcon />
          </Link>
        </div>
      </div>
    </div>
  );
}
