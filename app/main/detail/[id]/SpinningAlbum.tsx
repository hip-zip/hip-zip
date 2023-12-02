import Image from "next/image";
import React from "react";

const SpinningAlbum = (props: {
  albumImage: string;
  cdVector: { r: string; cx: string; cy: string; fill: string };
}) => {
  return (
    <div className="relative p-10 overflow-hidden">
      <Image
        src={`${props.albumImage}`}
        alt={`개발자에게 얼른 사진 넣어라고 전해주세요`}
        width={350}
        height={350}
        className="rounded-full transition-transform hover:scale-95 hover:brightness-95 animate-spin-slow cd-image"
        // sd-md sd-white shadow-lg shadow-amber-800
      />
      <svg
        className="absolute inset-0 rounded-full"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <mask id="cd-mask" x="0" y="0" width="100%" height="100%">
            <circle
              cx={props.cdVector.cx ? props.cdVector.cx : "50%"}
              cy={props.cdVector.cy ? props.cdVector.cy : "50%"}
              r={props.cdVector.r ? props.cdVector.r : "15%"}
              fill={props.cdVector.fill}
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
  );
};

export default SpinningAlbum;
