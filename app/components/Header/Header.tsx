"use client";

import Link from "next/link";
import Logo from "@/public/static/logo.png";
import Image from "next/image";
import SearchIcon from "@/public/static/search_icon.svg";
import { useSessionStorage } from "usehooks-ts";

export default function Header() {
  const [scrollLocation, setScrollLocation] = useSessionStorage("scroll", 0);

  return (
    <div
      className={
        "font-serif w-full flex justify-evenly items-center h-20 text-lg shadow-md shadow-white"
      }
    >
      <Link href={"/main/about"}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="45"
          viewBox="0 -960 960 960"
          width="45"
          className={"fill-white"}
        >
          <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" />
        </svg>
      </Link>
      <Link href={"/main"} onClick={() => setScrollLocation(0)}>
        <Image src={Logo} alt={"Logo Image"} width={80} height={80} />
      </Link>
      <Link href={"/main/search"}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="fill-white"
          height="45"
          viewBox="0 -960 960 960"
          width="45"
        >
          <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
        </svg>
      </Link>
    </div>
  );
}
