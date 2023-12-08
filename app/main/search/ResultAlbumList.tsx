import React, { useEffect } from "react";

interface ResultAlbumListProps {
  searchParam: string;
}

const ResultAlbumList: React.FC<ResultAlbumListProps> = (props: {
  searchParam;
}) => {
  useEffect(() => {
    console.log("DD CONSOLE CHECK > Search UseEffect");
  }, [props.searchParam]);

  return <div>result</div>;
};

export default ResultAlbumList;
