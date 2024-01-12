import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import React from "react";

interface InputFieldProps {
  label: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = (props: InputFieldProps) => {
  return (
    <>
      <Label className="text-right">{props.label}</Label>
      <Input
        className="col-span-3 text-hipzip-black"
        onChange={props.onChange}
        placeholder={props.placeholder || ""}
      />
    </>
  );
};

export default InputField;
