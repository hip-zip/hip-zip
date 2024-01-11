import { useEffect, useState } from "react";

interface fetchOption {
  url: string;
  method?: string;
  param?: string;
  obj?: any;
}

const useFetch = (option: fetchOption) => {
  const [data, setData] = useState([]);

  return [data];
};

// export default useFetch;
