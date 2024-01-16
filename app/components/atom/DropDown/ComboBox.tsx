"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect } from "react";

const artistType = [
  {
    value: "SOLO",
    label: "솔로 아티스트",
  },
  {
    value: "GROUP",
    label: "그룹 아티스트",
  },
];

interface ComboBoxProps {
  onSelect: React.Dispatch<React.SetStateAction<string>>;
  defaultValue?: string;
}

const ComboBox = (props: ComboBoxProps) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  useEffect(() => {
    if (props.defaultValue) {
      setValue(props.defaultValue);
    }
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[70%] justify-between"
        >
          {value
            ? artistType.find((type) => type.value === value)?.label
            : "아티스트 유형 선택"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-1 bg-hipzip-black text-hipzip-white">
        <Command>
          <CommandGroup>
            {artistType.map((type) => (
              <CommandItem
                key={type.value}
                value={type.value}
                onSelect={(currentValue) => {
                  const current = currentValue.toUpperCase();
                  setValue(current);
                  props.onSelect(current);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4 text-hipzip-white",
                    value === type.value ? "opacity-100" : "opacity-0",
                  )}
                />
                {type.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ComboBox;
