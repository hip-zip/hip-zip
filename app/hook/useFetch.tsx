import { useEffect, useState } from "react";
import { postArtist, searchArtist } from "@/app/hook/util";

interface fetchOption {
  url: string;
  method?: string;
  param?: string;
  obj?: any;
}

const useFetch = (option: fetchOption) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    switch (option.url) {
      case "/artists":
        if (option.method === "GET") {
          const response = searchArtist(option.param || "");
          console.log(response);
          return;
        }
        if (option.method === "POST") {
          const response = postArtist(option.obj);
          console.log(response);
          return;
        }
        break;
      default:
        break;
    }
  }, [option]);

  return [data];
};

// export default useFetch;
