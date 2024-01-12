import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps {
  className?: string;
  type?: string;
  placeholder?: string;
  defaultValue?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = (props: InputProps) => {
  return (
    <input
      className={cn(
        "placeholder:text-gray-300 w-full text-center bg-transparent border border-slate-300 rounded-md p-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 mb-4",
        props.className || "",
      )}
      placeholder={props.placeholder}
      defaultValue={props.defaultValue}
      type={props.type || "text"}
      name={"search"}
      onChange={props.onChange}
    />
  );
};

export default Input;
