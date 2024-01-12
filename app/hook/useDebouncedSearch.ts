import React, { useState } from "react";

const useDebouncedSearch = <T>(
  method: (query: string) => Promise<T>,
  delay: number,
): [T | null, (e: React.ChangeEvent<HTMLInputElement>) => void] => {
  const [inputTimeout, setInputTimeout] = useState<NodeJS.Timeout | null>(null);
  const [data, setData] = useState<T | null>(null);

  const onSearchQueryChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (inputTimeout) {
      clearTimeout(inputTimeout);
    }

    setInputTimeout(
      setTimeout(async () => {
        const inputValue = e.target.value;
        if (inputValue.length >= 1) {
          return await method(inputValue);
        }
      }, delay),
    );
  };

  return [data, onSearchQueryChange];
};

export default useDebouncedSearch;
