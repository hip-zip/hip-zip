import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import React from "react";
import { cn } from "@/lib/utils";
import ComboBox from "@/app/components/atom/DropDown/ComboBox";

interface InputComboBoxFieldProps {
  label: string;
  placeholder?: string;
  className?: string;
  key?: string;
  onSelect: React.Dispatch<React.SetStateAction<string>>;
  defaultValue?: string;
}

const InputComboBoxField = (props: InputComboBoxFieldProps) => {
  return (
    <div className={"flex justify-between items-center"}>
      <Label className="text-right w-24">{props.label}</Label>
      <ComboBox onSelect={props.onSelect} defaultValue={props.defaultValue} />
    </div>
  );
};

export default InputComboBoxField;
