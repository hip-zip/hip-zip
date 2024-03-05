"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps {
  className?: string;
  type?: "button" | "submit" | "reset";
  message?: string;
  handleButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = (props: ButtonProps) => {
  return (
    <button
      className={cn(
        "px-4 py-2 border border-sky-500 text-hipzip-white text-sm bg-transparent rounded-md hover:bg-sky-500 hover:text-gray-800 transition-all",
        props.className || "",
      )}
      value={props.message}
      type={props.type}
      onClick={props.handleButtonClick}
    >
      {props.message}
    </button>
  );
};

export default Button;
