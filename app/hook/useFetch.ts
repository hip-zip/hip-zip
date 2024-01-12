import { useEffect, useState } from "react";

const useFetch = <T, U>(method: (obj: U) => Promise<T>, obj: U): T => {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await method(obj);
        // setData((prev) => [...prev, result]);
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [method, obj]); // 이후 무한루프 체크 필요

  return data as T;
};

export default useFetch;
