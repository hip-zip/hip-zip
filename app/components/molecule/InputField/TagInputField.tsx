import { Label } from "@/components/ui/label";
import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import Input from "@/app/components/atom/Input/Input";
import { Badge } from "@/components/ui/badge";

interface TagInputFieldProps {
  label: string;
  placeholder?: string;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  tagList?: Array<string>;
}

const TagInputField = (props: TagInputFieldProps) => {
  useEffect(() => {
    console.log("TagInputField > ", props.tagList);
  }, [props.tagList]);

  return (
    <div className={"flex justify-between items-center"}>
      <Label className="text-right w-24">{props.label}</Label>
      <span
        className={"w-[70%] h-48 bg-hipzip-white rounded-md p-2 overflow-auto"}
      >
        {props.tagList?.map((tag, index) => (
          <span className={"pl-0.5"} key={index}>
            <Badge
              className={"text-hipzip-white bg-hipzip-black text-sm p-2 m-0.5"}
            >
              {tag}
            </Badge>
          </span>
        ))}
        <Input
          className={cn(
            "col-span-3 text-hipzip-black bg-hipzip-white text-base w-1/2 h-10 border-none p-3 shadow-none",
            props.className,
          )}
          maxLength={12}
          onChange={props.onChange}
          onKeyDown={props.onKeyDown}
          placeholder={props.placeholder || ""}
        />
      </span>
    </div>
  );
};

export default TagInputField;
