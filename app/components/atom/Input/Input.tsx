import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps {
  className?: string;
  type?: string;
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  maxLength?: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Input = (props: InputProps) => {
  return (
    <input
      className={cn(
        "placeholder:text-gray-300 w-full bg-transparent border border-slate-300 rounded-md p-4 shadow-sm focus:outline-none focus:ring-none",
        props.className || "",
      )}
      placeholder={props.placeholder}
      defaultValue={props.defaultValue}
      type={props.type || "text"}
      value={props.value ? props.value : undefined}
      maxLength={props.maxLength ? props.maxLength : undefined}
      name={"search"}
      onChange={props.onChange}
      onKeyDown={props.onKeyDown}
    />
  );
};

export default Input;
