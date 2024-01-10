import React from "react";

interface InputProps {
  handleSearchQuery: () => string;
}

const Input = (props: InputProps) => {
  return (
    <input
      className="placeholder:text-gray-300 w-9/12 text-center bg-transparent border border-slate-300 rounded-md p-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 mb-4"
      placeholder=""
      defaultValue={""}
      type="text"
      name="search"
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        props.handleSearchQuery
      }
    />
  );
};

export default Input;
