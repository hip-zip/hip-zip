import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import React from "react";
import { cn } from "@/lib/utils";

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
      <Input
        className={cn(
          "col-span-3 text-hipzip-black text-base w-[70%] focus:outline-none focus:ring-none",
          props.className,
        )}
        onChange={props.onChange}
        placeholder={props.placeholder || ""}
      />
    </div>
  );
};

export default InputField;
