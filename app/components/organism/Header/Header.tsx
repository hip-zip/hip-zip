"use client";

import Link from "next/link";
import { useSessionStorage } from "usehooks-ts";
import Label from "@/app/components/atom/Label/Label";
import { AboutIcon } from "@/app/components/atom/Icon/AboutIcon";
import { SearchIcon } from "@/app/components/atom/Icon/SearchIcon";

export default function Header() {
  const [scrollLocation, setScrollLocation] = useSessionStorage("scroll", 0);

  return (
    <div className={"p-2"}>
      <div
        className={
          "street w-full flex justify-evenly items-center gap-12 h-20 text-lg border rounded border-slate-800"
        }
      >
        <Link href={"/main/about"}>
          <AboutIcon />
        </Link>
        <Link href={"/main"} onClick={() => setScrollLocation(0)}>
          <Label message={"HIPZIP"} className={"text-hipzip-white"} />
        </Link>
        <Link href={"/main/search"}>
          <SearchIcon />
        </Link>
      </div>
    </div>
  );
}
