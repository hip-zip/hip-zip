import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import React from "react";
import { cn } from "@/lib/utils";
import { DatePicker } from "@/app/components/atom/DatePicker/DatePicker";

interface InputDateFieldProps {
  label: string;
  placeholder?: string;
  className?: string;
  defaultValue?: string;
  onSelect: (date: Date | undefined) => void;
}

const InputDateField = (props: InputDateFieldProps) => {
  return (
    <div className={"flex justify-between items-center"}>
      <Label className="text-right w-24">{props.label}</Label>
      {/*<Input*/}
      {/*  className={cn(*/}
      {/*    "col-span-3 text-hipzip-black text-base w-[70%] focus:outline-none focus:ring-none",*/}
      {/*    props.className || "",*/}
      {/*  )}*/}
      {/*  defaultValue={props.defaultValue}*/}
      {/*  onChange={props.onChange}*/}
      {/*  placeholder={props.placeholder || ""}*/}
      {/*/>*/}
      <DatePicker onSelect={props.onSelect} className={"w-[70%]"} />
    </div>
  );
};

export default InputDateField;
