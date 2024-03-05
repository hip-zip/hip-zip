import React, { useState } from "react";

export type SetFormValue<T> = React.Dispatch<React.SetStateAction<T>>;

const useContinualInput = <T>(
  tagList: string[],
  setFormValue: SetFormValue<T>,
  key: string,
): [
  string[] | [],
  (e: React.ChangeEvent<HTMLInputElement>) => void,
  (e: React.KeyboardEvent<HTMLInputElement>) => void,
] => {
  const [arrayValue, setArrayValue] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (e.nativeEvent.isComposing) return;

      if (e.currentTarget.value === "") {
        return;
      }

      if (tagList.length > 10) {
        alert("최대 10개까지 입력 가능합니다.");
        return;
      }

      setFormValue((prev) => {
        if (typeof prev === "object" && prev !== null) {
          const updatedValue = { ...(prev as Record<string, unknown>) };
          if (Array.isArray(updatedValue[key])) {
            updatedValue[key] = [
              ...(updatedValue[key] as string[]),
              inputValue,
            ];
          }
          return updatedValue as T;
        }
        return prev;
      });

      setArrayValue((prev) => [...prev, inputValue]);
      // setInputValue("");
      e.currentTarget.value = "";
    }

    if (e.key === "Backspace" && e.currentTarget.value === "") {
      setFormValue((prev) => {
        if (typeof prev === "object" && prev !== null) {
          const updatedValue = { ...(prev as Record<string, unknown>) };
          if (Array.isArray(updatedValue[key])) {
            updatedValue[key] = (updatedValue[key] as string[]).slice(0, -1);
          }
          return updatedValue as T;
        }
        return prev;
      });
    } // GPT LOGIC
  };

  return [arrayValue, handleInputChange, handleInputKeyDown];
};

export default useContinualInput;
