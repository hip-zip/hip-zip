"use client";

import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  onSelect: (date: Date | undefined) => void;
  date?: string;
  className?: string;
}

// TODO: 캘린더는 높이고정 되도록 수정해야 함. 혹은 PopOver가 밑으로 나와야 함
export function DatePicker(props: DatePickerProps) {
  const [date, setDate] = React.useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !date && "text-muted-foreground",
            props.className || "",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(date, "yyyy-MM-dd")
          ) : props.date ? (
            props.date
          ) : (
            <span>발매일을 선택해주세요</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-full p-0 bg-hipzip-black text-hipzip-white"
        align="start"
      >
        <Calendar
          mode="single"
          selected={date}
          captionLayout="dropdown-buttons"
          onSelect={(date) => {
            setDate(date);
            props.onSelect(date);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
