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
  date?: string;
}

const InputDateField = (props: InputDateFieldProps) => {
  return (
    <div className={"flex justify-between items-center"}>
      <Label className="text-right w-24">{props.label}</Label>
      <DatePicker
        onSelect={props.onSelect}
        className={"w-[70%]"}
        date={props.date}
      />
    </div>
  );
};

export default InputDateField;
