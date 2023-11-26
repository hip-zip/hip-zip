"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const AlbumDetail = ({ detail }: any) => {
  const [isiPhone, setIsiPhone] = useState(false);
  const [cdVector, setCdVector] = useState({
    cx: "",
    cy: "",
    r: "",
    fill: "#fff",
  });
  const router = useRouter();

  useEffect(() => {
    const userAgent = navigator.userAgent;
    const iPhoneRegex = /iphone/i;

    window.addEventListener("popstate", function (event) {
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
      }
      if (document?.startViewTransition) {
        document.startViewTransition(() => {
          router.push(`/main`);
        });
      } else {
        router.push(`/main`);
      }
    });

    setIsiPhone(iPhoneRegex.test(userAgent));

    if (!iPhoneRegex.test(userAgent)) {
      setCdVector((prev) => ({
        ...prev,
        cx: "50%",
        cy: "50%",
        r: "15%",
      }));
    } else {
      setCdVector((prev) => ({
        ...prev,
        cx: "64%",
        cy: "64%",
        r: "15%",
      }));
    }
  }, []);

  return (
    <div className={"w-full flex flex-col justify-center items-center"}>
      <div className="relative p-10 overflow-hidden">
        <Image
          src={`${detail.album_image}`}
          alt={`개발자에게 얼른 사진 넣어라고 전해주세요`}
          width={350}
          height={350}
          className="rounded-full transition-transform hover:scale-95 hover:brightness-95 animate-spin-slow cd-image sd-md sd-white shadow-lg shadow-amber-800"
        />
        <svg
          className="absolute inset-0 rounded-full"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <mask id="cd-mask" x="0" y="0" width="100%" height="100%">
              <circle
                cx={cdVector.cx ? cdVector.cx : "50%"}
                cy={cdVector.cy ? cdVector.cy : "50%"}
                r={cdVector.r ? cdVector.r : "15%"}
                fill={cdVector.fill}
              />
            </mask>
          </defs>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="#000"
            mask="url(#cd-mask)"
          />
        </svg>
      </div>
      <div className="p-5 text-4xl text-amber-400 text-center">
        {detail.album_name}
      </div>
      <div className="p-5 text-4xl text-center">BY</div>
      <div className="p-5 text-4xl text-amber-400 text-center">
        {detail.artist_name}
      </div>
      <div
        className={"mv-container"}
        style={{
          position: "relative",
          // width: "70%",
          // paddingBottom: "45%" /* 16:9 비율 */,
          // paddingBottom: "70%",
        }}
      >
        <iframe
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
          }}
          src={detail.music_video}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className={"pt-10"}
        ></iframe>
      </div>
      <div className={"h-48"} />
    </div>
  );
};

export default AlbumDetail;
