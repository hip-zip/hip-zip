import React, { useState } from "react";

const LikeDislike = (props: { onClick: () => void }) => {
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
    <div className="flex gap-4 pt-10 pb-10">
      <span
        className={`cursor-pointer flex justify-center items-center w-16 h-16 rounded-full border border-gray-500 bg-opacity-0 
                  ${likeClickState ? "bg-slate-900 scale-125" : ""} 
                  transform transition-all duration-300 ease-in-out`}
        onClick={() => handleButtonClick("like")}
      >
        🔥
      </span>
      <span
        className={`cursor-pointer flex justify-center items-center w-16 h-16 rounded-full border border-gray-500 bg-opacity-0 
                  ${dislikeClickState ? "bg-slate-900 scale-125" : ""} 
                  transform transition-all duration-300 ease-in-out`}
        onClick={() => handleButtonClick("dislike")}
      >
        💀
      </span>
    </div>
  );
};

export default LikeDislike;
