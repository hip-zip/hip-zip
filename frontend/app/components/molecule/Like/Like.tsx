"use client";

import React, { useState } from "react";

interface LikeDislikeProps {
  onClick: () => void;
  count: number;
}

const Like = (props: LikeDislikeProps) => {
  const [likeClickState, setLikeClickState] = useState<Boolean>(false);

  return (
    <div className="flex flex-col gap-4 pt-10 pb-10">
      <span
        className={`cursor-pointer flex justify-center items-center w-32 h-32 rounded-full bg-opacity-0 text-7xl border border-hipzip-white
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
