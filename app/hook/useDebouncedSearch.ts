import React, { useState } from "react";

const useDebouncedSearch = <T>(
  method: (query: string) => Promise<T[]>,
  delay: number,
): [T[], (e: React.ChangeEvent<HTMLInputElement>) => void] => {
  const [inputTimeout, setInputTimeout] = useState<NodeJS.Timeout | null>(null);
  const [data, setData] = useState<T[]>([]);

  const onSearchQueryChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (inputTimeout) {
      clearTimeout(inputTimeout);
    }

    setInputTimeout(
      setTimeout(async () => {
        if (e.target.value !== "") {
          const inputValue = e.target.value;
          const response = await method(inputValue);
          setData(response);
          return;
        }
      }, delay),
    );
  };

  return [data, onSearchQueryChange];
};

export default useDebouncedSearch;
