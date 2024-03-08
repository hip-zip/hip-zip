"use client";

import React, { useState } from "react";

interface LikeDislikeProps {
  onClick: () => void;
  count: number;
}

const Like = (props: LikeDislikeProps) => {
  const [likeClickState, setLikeClickState] = useState<Boolean>(false);
  const [dislikeClickState, setDislikeClickState] = useState<Boolean>(false); // 모바일 용 EVENT 처리

  const handleButtonClick = (status: string) => {
    if (status === "like") {
      setLikeClickState((prev) => !prev);
      setTimeout(() => setLikeClickState((prev) => !prev), 200);
    } else {
      setDislikeClickState((prev) => !prev);
      setTimeout(() => setDislikeClickState((prev) => !prev), 200);
    }
  };

  return (
    <div className="flex flex-col gap-4 pt-10 pb-10">
      <span
        className={`cursor-pointer flex justify-center items-center w-16 h-16 rounded-full border border-gray-500 bg-opacity-0 
                  ${likeClickState ? "bg-slate-900 scale-125" : ""} 
                  transform transition-all duration-200 ease-in-out`}
        onClick={props.onClick}
      >
        🔥
      </span>
      <div className={"text-center"}>{props.count}</div>
    </div>
  );
};

export default Like;
