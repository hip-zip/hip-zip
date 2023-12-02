"use client";

import Link from "next/link";
import Logo from "@/public/static/logo.png";
import Image from "next/image";
import { useSessionStorage } from "usehooks-ts";

export default function Header() {
  const [scrollLocation, setScrollLocation] = useSessionStorage("scroll", 0);

  return (
    <div
      className={
        "font-serif w-full border-2 border-amber-500 opacity-75 text-yellow-500 flex justify-evenly items-center p-10 h-20 text-lg"
      }
    >
      <Link href={"/main/post"}>post</Link>
      <Link href={"/main"} onClick={() => setScrollLocation(0)}>
        <Image src={Logo} alt={"Logo Image"} width={80} height={80} />
      </Link>
      <Link href={"/main/about"}>about</Link>
    </div>
  );
}
