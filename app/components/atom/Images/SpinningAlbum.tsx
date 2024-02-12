import Image from "next/image";
import React, { useEffect, useState } from "react";

interface SpinningAlbumProps {
  image: string;
}
const SpinningAlbum = (props: SpinningAlbumProps) => {
  const [iphoneState, setIphoneState] = useState(false);
  const [cdVector, setCdVector] = useState({
    cx: "",
    cy: "",
    r: "",
    fill: "#fff",
  });

  useEffect(() => {
    const userAgent = navigator.userAgent;
    const iPhoneRegex = /iphone/i;

    setIphoneState(iPhoneRegex.test(userAgent));

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
    <div className="relative p-10 overflow-hidden">
      <Image
        src={`${props.image}`}
        alt={`개발자에게 얼른 사진 넣어라고 전해주세요`}
        width={350}
        height={350}
        className="rounded-full transition-transform hover:scale-95 hover:brightness-95 animate-spin-slow cd-image"
        // sd-md sd-white shadow-lg shadow-amber-800
      />
      {/*<svg*/}
      {/*  className="absolute inset-0 rounded-full opacity-20"*/}
      {/*  viewBox="0 0 100 100"*/}
      {/*  xmlns="http://www.w3.org/2000/svg"*/}
      {/*>*/}
      {/*  <defs>*/}
      {/*    <mask id="cd-mask" x="0" y="0" width="100%" height="100%">*/}
      {/*      <circle*/}
      {/*        cx={cdVector.cx ? cdVector.cx : "50%"}*/}
      {/*        cy={cdVector.cy ? cdVector.cy : "50%"}*/}
      {/*        r={cdVector.r ? cdVector.r : "15%"}*/}
      {/*        fill={cdVector.fill}*/}
      {/*      />*/}
      {/*    </mask>*/}
      {/*  </defs>*/}
      {/*  <rect*/}
      {/*    x="0"*/}
      {/*    y="0"*/}
      {/*    width="100%"*/}
      {/*    height="100%"*/}
      {/*    fill="#000"*/}
      {/*    mask="url(#cd-mask)"*/}
      {/*  />*/}
      {/*</svg>*/}
    </div>
  );
};

export default React.memo(SpinningAlbum);
