import React from "react";
import { SetFormValue } from "@/app/hook/useContinualInput";

const useFormInput = <T>(
  setFormValue: SetFormValue<T>,
  key: string,
): [(e: React.ChangeEvent<HTMLInputElement>) => void] => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  return [handleChange];
};

export default useFormInput;
