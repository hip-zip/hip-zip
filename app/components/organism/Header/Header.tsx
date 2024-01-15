"use client";

import Link from "next/link";
import { useSessionStorage } from "usehooks-ts";
import Label from "@/app/components/atom/Label/Label";
import { AboutIcon } from "@/app/components/atom/Icon/AboutIcon";
import { SearchIcon } from "@/app/components/atom/Icon/SearchIcon";
import BellIcon from "@/app/components/atom/Icon/BellIcon";
import UserIcon from "@/app/components/atom/Icon/UserIcon";
import IdentificationIcon from "@/app/components/atom/Icon/IdentificationIcon";
import { useEffect } from "react";

export default function Header() {
  const [scrollLocation, setScrollLocation] = useSessionStorage("scroll", 0);

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
          <Link href={"/main/search"}>
            <UserIcon />
          </Link>
          <Link href={"/main/about"}>
            <AboutIcon />
          </Link>
          <Link href={"/main/search"}>
            <SearchIcon />
          </Link>
        </div>
      </div>
    </div>
  );
}
