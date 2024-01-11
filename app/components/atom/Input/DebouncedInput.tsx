import Input, { InputProps } from "@/app/components/atom/Input/Input";
import React, { useState } from "react";

interface DebouncedInputProps extends InputProps {}

const DebouncedInput = (props: DebouncedInputProps) => {
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );

  const onDebouncedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(e);

    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    setSearchTimeout(
      setTimeout(() => {
        if (e.target.value.length >= 1) {
          props.onChange(e);
          return;
        }
      }, 300),
    );
  };

  return <Input {...props} onChange={onDebouncedChange} />;
};
