import React, { useEffect, useState } from "react";
import { searchArtist } from "@/app/hook/util";

const useDebouncedFetch = <Data>(url: string, delay: number) => {
  const [data, setData] = useState<Data>(); // response type은 호출함수에서 정의
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );

  const onSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    setSearchTimeout(
      setTimeout(async () => {
        if (e.target.value.length >= 1) {
          switch (url) {
            case "/artists":
              const response = await searchArtist(
                url + `?name=${e.target.value}`,
              );
              setData(response);
              break;
          }
        }
      }, delay),
    );
  };

  return [data, onSearchQueryChange];
};

export default useDebouncedFetch;
