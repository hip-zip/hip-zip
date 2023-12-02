import React from "react";

const MusicVideoContainer = (props: { src: string }) => {
  return (
    <div
      className={"mv-container"}
      style={{
        position: "relative",
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
        src={props.src}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className={"pt-10"}
      ></iframe>
    </div>
  );
};

export default MusicVideoContainer;
