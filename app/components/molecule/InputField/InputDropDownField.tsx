import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import React from "react";
import { cn } from "@/lib/utils";
import DropDown from "@/app/components/atom/DropDown/DropDown";

interface InputFieldProps {
  label: string;
  placeholder?: string;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = (props: InputFieldProps) => {
  return (
    <div className={"flex justify-between items-center"}>
      <Label className="text-right w-24">{props.label}</Label>
      <DropDown />
    </div>
  );
};

export default InputField;
